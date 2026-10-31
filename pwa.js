(() => {
  const button = document.getElementById('install-app');
  const dialog = document.getElementById('install-help');
  const instructions = document.getElementById('install-instructions');
  const standalone = window.matchMedia('(display-mode: standalone)');
  let installPrompt = null;
  let installed = false;
  const update = () => { button.hidden = installed || standalone.matches || navigator.standalone === true; };
  update();
  standalone.addEventListener('change', update);

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    update();
  });
  window.addEventListener('appinstalled', () => {
    installed = true;
    installPrompt = null;
    if (dialog.open) dialog.close();
    update();
  });

  const showHelp = () => {
    const apple = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    instructions.textContent = apple
      ? 'פתחו את PrepX ב־Safari, לחצו על שיתוף ובחרו ״הוספה למסך הבית״. לאחר מכן לחצו ״הוספה״.'
      : 'בתפריט הדפדפן חפשו ״התקנת אפליקציה״ או ״הוספה למסך הבית״. אם האפשרות לא מופיעה, נסו לפתוח את האתר ב־Chrome או ב־Edge.';
    if (!dialog.open) dialog.showModal();
  };
  button.addEventListener('click', async () => {
    if (!installPrompt) { showHelp(); return; }
    const prompt = installPrompt;
    installPrompt = null;
    button.disabled = true;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') { installed = true; update(); }
    } catch {
      showHelp();
    } finally {
      button.disabled = false;
    }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { if (!button.hidden) button.focus(); });

  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Installation through the browser menu remains available; retry on the next visit.
    });
  }
})();
