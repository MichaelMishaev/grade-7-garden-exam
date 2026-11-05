import { cleanLine, cleanText, renderExamEmail, renderExamText, testLabel } from './email-template.mjs';
import { isAlreadyAccepted } from './resend-send.mjs';

const retrySeconds = attempt => Math.min(900, 5 * 2 ** Math.min(attempt - 1, 8));
const sendWindow = 23 * 60 * 60 * 1000;

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
    const complete = scores => scores && Object.keys(scores).length === open.length && open.every(({ questionId }) =>
      typeof scores[questionId]?.reason === 'string' && scores[questionId].reason.trim());
    let scores = job.ai_status === 'ok' ? job.ai_scores : null;
    if (open.length && !complete(scores)) {
      const result = await grade(job.exam_id, open);
      if (result.status !== 'ok' || !complete(result.scores)) {
        await db.updateAiScores({ id: job.id, status: 'failed' });
        return;
      }
      scores = result.scores;
      const total = Math.round(Object.values(scores).reduce((sum, item) => sum + item.score, 0) * 100) / 100;
      // Save the final marks before calling email. A retry must use the same grade.
      if (!await db.updateAiScores({ id: job.id, status: 'ok', scores, total })) return;
    }

    const answers = job.answers.map((item, i) => {
      const known = truth.answers[i];
      return { ...known, question: cleanText(item.question), answer: cleanText(item.answer), ai: scores?.[known.questionId] };
    });
    const earned = Math.min(100, truth.score.earned + Math.round(Object.values(scores ?? {}).reduce((sum, item) => sum + item.score, 0)));
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
