const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('a.fn.smoothState=', 530000);
if (pos === -1) pos = js.indexOf('.smoothState=', 528000);
console.log('Found .smoothState= at:', pos);
console.log(js.slice(pos, pos + 1000));
