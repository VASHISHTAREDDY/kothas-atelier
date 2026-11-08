const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = "s.load(a)";
const idx = js.indexOf(target);
console.log('s.load(a) at:', idx);

// Search backwards for `s=`
let cur = idx;
for (let i = 0; i < 5; i++) {
  cur = js.lastIndexOf("s=", cur - 1);
  console.log(`s= at ${cur}:`, js.slice(cur - 20, cur + 80));
}
