const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('function l(', 743000);
if (pos === -1) pos = js.indexOf('function l()', 743000);
console.log('function l at:', pos);
console.log(js.slice(pos, pos + 600));
