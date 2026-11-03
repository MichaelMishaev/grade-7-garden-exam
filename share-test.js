// Share only the public test link; no student state is read.
function testShareControl(link, title) {
  const control = document.createElement('div');
  control.className = 'test-share';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'test-share-button';
  button.textContent = 'שיתוף';
  button.setAttribute('aria-label', `שיתוף ${title}`);
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
          await navigator.share({ title: `${title} | PrepX`, url });
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
