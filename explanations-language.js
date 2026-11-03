const hebrewCopy = {
  home: 'חזרה לבית →',
  kicker: 'מגלים משהו חדש',
  title: 'הסברים',
  intro: 'בוחרים רעיון. מנסים ומבינים.',
  category: 'מדעי המחשב',
  category_intro: 'רעיונות גדולים, בצעדים קטנים.',
  lesson_count: 'שיעור אחד',
  preview_question: 'שאלה אחת…',
  preview_answer: '…רק מסלול אחד מתבצע.',
  lesson_number: 'שיעור 01',
  lesson_intro: 'שאלה אחת.<br>שני מסלולים אפשריים.',
  animation: '▶ אנימציה',
  playground: '↔ מתנסים בעצמכם',
  questions: '✓ 5 שאלות',
  start: 'בואו ננסה',
  languages: 'עברית + English',
  footer: 'לומדים כשמנסים.'
};
const hebrewAria = {
  home_brand: 'PrepX — עמוד הבית',
  language_picker: 'שפת העמוד',
  preview: 'ציון 75 גדול או שווה ל־60, ולכן מתבצע מסלול True ומודפס You passed.',
  lesson_tools: 'מה כלול בשיעור'
};

const textNodes = [...document.querySelectorAll('[data-hub-copy]')].map(node => ({ node, english: node.innerHTML }));
const ariaNodes = [...document.querySelectorAll('[data-hub-aria]')].map(node => ({ node, english: node.getAttribute('aria-label') }));
const languageButtons = [...document.querySelectorAll('[data-hub-language]')];
const description = document.querySelector('meta[name="description"]');
const englishDescription = description.content;

function setLanguage(language, updateURL = false) {
  const hebrew = language === 'he';
  document.documentElement.lang = language;
  document.documentElement.dir = hebrew ? 'rtl' : 'ltr';
  document.title = hebrew ? 'הסברים | PrepX' : 'Explanations | PrepX';
  description.content = hebrew ? 'צופים ברעיון, מתנסים בעצמכם ומבינים. הסברים אינטראקטיביים במדעי המחשב למתחילים.' : englishDescription;
  for (const { node, english } of textNodes) {
    // Both languages are fixed lesson copy; no learner input is inserted as markup.
    node.innerHTML = hebrew ? hebrewCopy[node.dataset.hubCopy] : english;
    node.lang = language;
    node.dir = hebrew ? 'rtl' : 'ltr';
  }
  for (const { node, english } of ariaNodes) node.setAttribute('aria-label', hebrew ? hebrewAria[node.dataset.hubAria] : english);
  for (const button of languageButtons) button.setAttribute('aria-pressed', String(button.dataset.hubLanguage === language));
  document.querySelector('.discovery-start').setAttribute('href', `if-else.html?lang=${language}#playground`);
  document.querySelector('.discovery-start-arrow').textContent = hebrew ? '←' : '→';
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }
}

for (const button of languageButtons) button.addEventListener('click', () => setLanguage(button.dataset.hubLanguage, true));
setLanguage(new URLSearchParams(location.search).get('lang') === 'he' ? 'he' : 'en');
