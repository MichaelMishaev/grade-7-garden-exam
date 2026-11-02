export function israelDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

if (typeof document !== 'undefined') {
  const upcoming = document.getElementById('calendar-upcoming-rows');
  const past = document.getElementById('calendar-past-rows');
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
