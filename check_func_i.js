const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = "b.hasClass(\"direct\")?location.href=b.children(\".inner\").attr(\"data-link\"):i(b.children(\".inner\").attr(\"data-link\"))";
const idx = js.indexOf(target);
const start = Math.max(0, idx - 1500);
const end = Math.min(js.length, idx + 500);

console.log(js.slice(start, end));
