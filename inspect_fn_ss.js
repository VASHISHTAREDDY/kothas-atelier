const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('.fn.smoothState');
console.log('Found .fn.smoothState at:', pos);
console.log(js.slice(pos, pos + 600));
