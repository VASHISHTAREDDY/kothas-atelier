const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = "function i(a,b){var c=a||";
const idx = js.indexOf(target);
const start = Math.max(0, idx - 8000);

// Search for `s=` or `var s`
const before = js.slice(start, idx);
const sMatches = before.match(/(?:var\s+s\s*=|s\s*=\s*[^,;]+)/g) || [];
console.log('s assignments before function i:');
sMatches.forEach(m => console.log(' ', m));

// Let's find s.load or s=
let pos = before.indexOf(".smoothState(");
console.log('smoothState call in before at relative pos:', pos);
if (pos !== -1) {
  console.log(before.slice(pos - 100, pos + 400));
}
