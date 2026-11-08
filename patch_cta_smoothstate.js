const fs = require('fs');

let js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const targetOld = `b.length&&(!c&&$(".slider-nav").length||b.removeClass("smoothstate"),b.find("a").click(function(a){`;
const targetNew = `b.length&&(b.find("a").click(function(a){`;

console.log('Target found:', js.includes(targetOld));
if (js.includes(targetOld)) {
  js = js.replace(targetOld, targetNew);
  fs.writeFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', js, 'utf8');
  console.log('Successfully kept smoothstate on expanding CTA!');
}
