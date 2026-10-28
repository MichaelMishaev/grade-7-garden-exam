// Numeric answers for the physics exam, checked exactly like the teacher's practice site (num() / grade()):
// trim; Unicode minus or en dash -> "-"; the FIRST comma -> "." (so "5,7" is 5.7, but "2,400" is 2.4);
// only a plain number or a fraction "a/b" is accepted (no units, no spaces inside the number);
// correct when |value - expected| < tolerance (the site uses 1e-8, i.e. exact).
(function (root) {
  function parseNumber(input) {
    const v = String(input ?? '').trim().replace(/[−–]/g, '-').replace(',', '.');
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*\/\s*[+-]?\d+(?:\.\d*)?)?$/.test(v)) return NaN;
    const parts = v.split('/').map(Number);
    if (parts.length === 2) return parts[1] !== 0 ? parts[0] / parts[1] : NaN;
    return parts[0];
  }

  // expected: { value, tolerance, unit } as stored in questions.correct for type 'fill'.
  // Returns 'empty' for a blank answer, otherwise true / false.
  function checkNumber(input, expected) {
    if (String(input ?? '').trim() === '') return 'empty';
    const n = parseNumber(input);
    const tolerance = Number.isFinite(expected?.tolerance) ? expected.tolerance : 1e-8;
    return Number.isFinite(n) && Math.abs(n - expected.value) < tolerance;
  }

  const api = { parseNumber, checkNumber };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NumericAnswer = api;
})(typeof window !== 'undefined' ? window : globalThis);
