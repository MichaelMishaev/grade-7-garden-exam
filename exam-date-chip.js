export function israelDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

if (typeof document !== 'undefined') {
  function refreshExamDateChips() {
    const today = israelDate();
    document.querySelectorAll('[data-exam-date]').forEach(card => {
      const passed = card.dataset.examDate < today;
      const existing = card.querySelector('.exam-date-chip');
      if (passed && !existing) {
        const chip = document.createElement('span');
        chip.className = 'exam-date-chip';
        chip.textContent = 'מועד המבחן עבר';
        card.querySelector('.exam-copy > strong').append(' ', chip);
      } else if (!passed) {
        existing?.remove();
      }
    });
  }
  refreshExamDateChips();
  document.addEventListener('exam-cards-ready', refreshExamDateChips);
  document.addEventListener('visibilitychange', refreshExamDateChips);
  setInterval(refreshExamDateChips, 60_000);
}
