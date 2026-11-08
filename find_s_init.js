const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const sLoadIdx = 744091;
// Find where s is initialized. In smoothState, usually: var s = $('#content').smoothState({...}).data('smoothState')!
let pos = js.lastIndexOf(".data(\"smoothState\")", sLoadIdx);
let pos2 = js.lastIndexOf(".smoothState(", sLoadIdx);
console.log('data("smoothState") at:', pos);
console.log('.smoothState( at:', pos2);

if (pos !== -1) {
  console.log(js.slice(pos - 100, pos + 100));
}
if (pos2 !== -1) {
  console.log(js.slice(pos2 - 100, pos2 + 100));
}
