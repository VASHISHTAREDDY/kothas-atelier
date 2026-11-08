const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = "b.hasClass(\"direct\")?location.href=b.children(\".inner\").attr(\"data-link\"):i(b.children(\".inner\").attr(\"data-link\"))";
const idx = js.indexOf(target);

// Search backwards for "function i(" or "i=function"
let iIdx = js.lastIndexOf("function i(", idx);
let iIdx2 = js.lastIndexOf("i=function(", idx);
console.log('function i( at:', iIdx);
console.log('i=function( at:', iIdx2);

const chosen = Math.max(iIdx, iIdx2);
if (chosen !== -1) {
  console.log(js.slice(chosen, chosen + 800));
}
