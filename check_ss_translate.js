const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('translate:function(');
console.log('translate pos:', pos);
console.log(js.slice(pos, pos + 400));
