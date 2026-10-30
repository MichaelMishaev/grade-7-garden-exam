// One original illustration atlas, three separate escape moments. No network service.
export const COMPLETION_ART = [
  { title: 'יצאתם אל האור!', message: 'השער נפתח. עוד הרפתקה מאחוריכם.', alt: 'הרפתקן וארנב ליד שער מבוך פתוח באור הבוקר', position: '0%' },
  { title: 'מצאתם את הדרך!', message: 'גם שביל מלא אתגרים מוביל החוצה.', alt: 'הרפתקן ושועל חוצים גשר אבן לאור הירח', position: '50%' },
  { title: 'המבוך מאחוריכם!', message: 'מכאן כבר רואים כמה רחוק הגעתם.', alt: 'הרפתקן וינשוף משקיפים על המבוך בזריחה', position: '100%' }
];
export const isCompletionArt = value => Number.isInteger(value) && value >= 0 && value < COMPLETION_ART.length;
export function chooseCompletionArt(saved, previous, random = Math.random) {
  if (isCompletionArt(saved)) return saved;
  if (isCompletionArt(previous)) return (previous + 1) % COMPLETION_ART.length;
  return Math.min(COMPLETION_ART.length - 1, Math.max(0, Math.floor(random() * COMPLETION_ART.length)));
}
