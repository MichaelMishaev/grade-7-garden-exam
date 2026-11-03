const escape = value => String(value || '').replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);

export function questionMedia(question) {
  const context = question.context ? `<p dir="auto">${escape(question.context)}</p>` : '';
  const image = typeof question.image === 'string' && /^https:\/\/user\.cdn\.wordwall\.net\/content-images\/[a-zA-Z0-9/_-]+$/.test(question.image)
    ? `<img src="${escape(question.image)}" alt="${escape(question.imageAlt)}" referrerpolicy="no-referrer" style="display:block;max-width:100%;width:auto;height:100px;object-fit:contain;margin:8px auto">` : '';
  return context + image;
}
