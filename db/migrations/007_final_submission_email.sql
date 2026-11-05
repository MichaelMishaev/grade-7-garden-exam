-- Only new submissions created by the final-mail flow enter this queue.
ALTER TABLE submissions
  ADD COLUMN final_mail_due_at timestamptz,
  ADD COLUMN final_mail_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN final_mail_send_started_at timestamptz;

CREATE INDEX submissions_final_mail_due ON submissions (final_mail_due_at)
  WHERE final_mail_due_at IS NOT NULL AND email_status <> 'accepted';
