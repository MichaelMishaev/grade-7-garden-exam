import { israelDate } from './exam-date-chip.js?v=1';
export { israelDate };

if (typeof document !== 'undefined') {
  const upcoming = document.getElementById('calendar-upcoming-rows');
  const past = document.getElementById('calendar-past-rows');
  const content = document.getElementById('calendar-content');
  const calendar = document.getElementById('exam-calendar');
  const dialog = document.getElementById('calendar-dialog');
  const expandButtons = document.querySelectorAll('[data-calendar-expand]');
  const previewAnchor = document.createComment('calendar preview');
  content.before(previewAnchor);
  for (const button of expandButtons) {
    button.addEventListener('click', () => {
      document.getElementById('calendar-dialog-body').append(content);
      dialog.showModal();
      document.body.classList.add('calendar-is-open');
    });
  }
  dialog.addEventListener('close', () => {
    previewAnchor.after(content);
    document.body.classList.remove('calendar-is-open');
    // A long expanded table must not leave the compact calendar scrolled out of view.
    calendar.scrollIntoView({ block: 'nearest' });
  });
  const rows = [...upcoming.rows].sort((a, b) =>
    a.querySelector('time').dateTime.localeCompare(b.querySelector('time').dateTime));
  let displayedDate;

  function refreshCalendar() {
    const today = israelDate();
    if (today === displayedDate) return;
    displayedDate = today;
    for (const row of rows) {
      const date = row.querySelector('time').dateTime;
      row.classList.toggle('calendar-today', date === today);
      row.querySelector('.calendar-today-badge')?.remove();
      if (date === today) {
        const badge = document.createElement('span');
        badge.className = 'calendar-today-badge';
        badge.textContent = 'היום';
        row.querySelector('th').append(' ', badge);
      }
      (date < today ? past : upcoming).append(row);
    }
    document.getElementById('calendar-upcoming').hidden = upcoming.rows.length === 0;
    document.getElementById('calendar-empty').hidden = upcoming.rows.length > 0;
    document.getElementById('calendar-past').hidden = past.rows.length === 0;
    document.getElementById('calendar-past-count').textContent = past.rows.length;
  }

  refreshCalendar();
  setInterval(refreshCalendar, 60_000);
  document.addEventListener('visibilitychange', refreshCalendar);
}
