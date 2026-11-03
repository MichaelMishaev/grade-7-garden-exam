// Share only the public test link; no student state is read.
function testShareControl(link, title) {
  const getTitle = typeof title === 'function' ? title : () => title;
  const control = document.createElement('div');
  control.className = 'test-share';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'test-share-button';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 16V3m-4 4 4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>';
  button.title = 'שיתוף';
  button.setAttribute('aria-label', `שיתוף ${getTitle()}`);
  const status = document.createElement('span');
  status.className = 'test-share-status';
  status.setAttribute('role', 'status');
  const label = document.createElement('label');
  label.className = 'test-share-manual';
  label.hidden = true;
  label.append('קישור להעתקה ידנית');
  const input = document.createElement('input');
  input.type = 'url';
  input.readOnly = true;
  input.dir = 'ltr';
  label.append(input);
  control.append(button, status, label);
  button.addEventListener('click', async () => {
    const url = new URL(link.getAttribute('href'), location.href).href;
    button.disabled = true;
    status.textContent = '';
    label.hidden = true;
    try {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: `${getTitle()} | PrepX`, url });
          return;
        } catch (error) {
          if (error.name === 'AbortError') return;
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = 'הקישור הועתק. אפשר להדביק ולשתף אותו.';
      } catch {
        input.value = url;
        label.hidden = false;
        status.textContent = 'אפשר להעתיק את הקישור ולשתף אותו.';
        input.focus();
        input.select();
      }
    } finally {
      button.disabled = false;
    }
  });
  return control;
}

// Keep the control outside changing exam/practice stages and share a fresh attempt.
function mountInTestShare() {
  const main = document.querySelector('main[data-test-share]');
  if (!main) return;
  const url = new URL(location.href);
  const quiz = url.searchParams.get('quiz');
  url.search = '';
  url.hash = '';
  if (url.pathname.endsWith('/practice.html') && quiz) url.searchParams.set('quiz', quiz);
  const link = document.createElement('a');
  link.href = url.href;
  const title = () => document.querySelector('#quiz-title, #page-title')?.textContent || document.title;
  const control = testShareControl(link, title);
  control.classList.add('test-share-top');
  const brand = main.querySelector(':scope > .prepx-brand');
  if (brand) {
    const toolbar = document.createElement('div');
    toolbar.className = 'test-toolbar';
    brand.before(toolbar);
    toolbar.append(brand, control);
  } else {
    main.querySelector('header').append(control);
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountInTestShare, { once: true });
} else {
  mountInTestShare();
}
