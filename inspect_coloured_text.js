const fs = require('fs');
const css = fs.readFileSync('minaleandmann.com/wp-content/themes/pegasus/dist/css/global.min3c82.css', 'utf8');

const parts = css.split('}');
const matched = [];
parts.forEach(p => {
  const pair = p.split('{');
  if (pair.length === 2) {
    const sel = pair[0].trim();
    const body = pair[1].trim();
    if (sel.includes('.component-coloured-text')) {
      matched.push({ sel, body });
    }
  }
});
console.log(JSON.stringify(matched, null, 2));
