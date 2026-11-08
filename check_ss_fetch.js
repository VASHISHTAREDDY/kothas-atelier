const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('r=function(b,c){', 528000);
if (pos === -1) pos = js.indexOf('fetch:r', 528000);
console.log('pos:', pos);
console.log(js.slice(pos - 1000, pos + 200));
