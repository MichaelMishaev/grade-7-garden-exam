import { cleanLine, cleanText, renderExamEmail, renderExamText, testLabel } from './email-template.mjs';
import { isAlreadyAccepted } from './resend-send.mjs';

const retrySeconds = attempt => Math.min(900, 5 * 2 ** Math.min(attempt - 1, 8));
const sendWindow = 23 * 60 * 60 * 1000;

// Use the same complete, bounded result for the teacher and the student.
export function finalExamScore(truth, scores) {
  if (!truth?.score || truth.answers.some(answer => !answer.matched)) return null;
  const ids = truth.answers.filter(answer => answer.correct === undefined).map(answer => answer.questionId);
  const marks = scores ?? {};
  if (Object.keys(marks).length !== ids.length || !ids.every(id => {
    const mark = marks[id];
    return mark && Number.isFinite(mark.score) && Number.isFinite(mark.max) &&
      mark.score >= 0 && mark.score <= mark.max && typeof mark.reason === 'string' && mark.reason.trim();
  })) return null;
  return Math.min(100, Math.max(0, truth.score.earned + Math.round(ids.reduce((sum, id) => sum + marks[id].score, 0))));
}

export function createFinalExamMailer({ db, env, exams, judge, grade, send, teacherAddress, now }) {
  async function deliver(job) {
    const exam = exams[job.exam_id];
    const truth = judge(job.exam_id, job.answers);
    if (!exam || !truth.score || job.answers.length !== exam.count || truth.answers.some(answer => !answer.matched)) {
      throw new Error('Submission question keys unavailable');
    }

    const open = truth.answers.flatMap((answer, i) => answer.correct === undefined
      ? [{ questionId: answer.questionId, question: job.answers[i].question, answer: job.answers[i].answer }]
      : []);
    let scores = job.ai_status === 'ok' ? job.ai_scores : null;
    if (open.length && finalExamScore(truth, scores) === null) {
      const result = await grade(job.exam_id, open);
      if (result.status !== 'ok' || finalExamScore(truth, result.scores) === null) {
        await db.updateAiScores({ id: job.id, status: 'failed' });
        return;
      }
      scores = result.scores;
      const total = Math.round(Object.values(scores).reduce((sum, item) => sum + item.score, 0) * 100) / 100;
      // Save the final marks before calling email. A retry must use the same grade.
      if (!await db.updateAiScores({ id: job.id, status: 'ok', scores, total, conclusion: result.conclusion })) return;
    }

    const answers = job.answers.map((item, i) => {
      const known = truth.answers[i];
      return { ...known, question: cleanText(item.question), answer: cleanText(item.answer), ai: scores?.[known.questionId] };
    });
    const earned = finalExamScore(truth, scores);
    if (earned === null) return;
    const message = {
      name: cleanLine(job.student_name), code: exam.code, attempt: job.attempt, answers,
      score: { earned, pending: 0, final: true }, notes: truth.notes
    };
    const times = job.started_at && job.finished_at
      ? { startedAt: job.started_at.toISOString(), finishedAt: job.finished_at.toISOString() }
      : {};
    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return;
    const firstSend = await db.startFinalMailSend(job.id);
    if (!firstSend) return;
    if (now() - Number(firstSend) >= sendWindow) {
      console.error('Final submission email held after the idempotency window');
      return 'held';
    }
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `${job.exam_code ? exam.idempotencyPrefix : 'garden-exam'}/${job.dedupe_key}`
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL, to: [teacherAddress],
        subject: `${exam.subject} · ${testLabel(exam.code, job.attempt)}`,
        text: renderExamText({ ...message, times, safe: true }),
        html: renderExamEmail({ ...message, ...times, title: exam.title, subtitle: exam.subtitle, origin: env.APP_ORIGIN || 'https://hitech.agnon.online' })
      })
    }, { deadline: now() + 15000 });
    const resendId = response.data?.id;
    if (!isAlreadyAccepted(response.status, response.data) && !(response.ok && typeof resendId === 'string' && resendId)) {
      console.error('Final submission email rejected', response.status);
      return;
    }
    await db.markEmail(job.id, { status: 'accepted', resendId, httpStatus: response.status });
  }

  async function process(id) {
    const job = await db.claimFinalMail(id);
    if (!job) return;
    let result;
    try {
      result = await deliver(job);
    } catch (error) {
      console.error('Final submission email attempt failed', error?.code ?? error?.name);
    } finally {
      await db.deferFinalMail({ id: job.id, attempt: job.final_mail_attempts, seconds: result === 'held' ? null : retrySeconds(job.final_mail_attempts) });
    }
  }

  return { process };
}
