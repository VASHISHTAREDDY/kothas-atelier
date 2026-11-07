const fs = require('fs');
const css = fs.readFileSync('minaleandmann.com/wp-content/themes/pegasus/dist/css/global.min3c82.css', 'utf8');

function findRules(keywords) {
  const parts = css.split('}');
  const matched = [];
  parts.forEach(p => {
    const pair = p.split('{');
    if (pair.length === 2) {
      const sel = pair[0].trim();
      const body = pair[1].trim();
      for (const kw of keywords) {
        if (sel.includes(kw)) {
          matched.push({ sel, body });
          break;
        }
      }
    }
  });
  return matched;
}

console.log('--- Coloured text rules: ---');
console.log(findRules(['.component-coloured-text']).slice(0, 8));

console.log('--- Captions-full rules: ---');
console.log(findRules(['.captions-full h4', '.captions-full .subtitle', '.captions-full .caption', '.captions-full p']).slice(0, 8));

console.log('--- Pinned text rules: ---');
console.log(findRules(['.component-pinned-text']).slice(0, 8));

console.log('--- Button rules: ---');
console.log(findRules(['.loadpage', 'captions-full ul li button']).slice(0, 8));
