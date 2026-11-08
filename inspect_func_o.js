const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('function o(', 742238);
console.log('function o at:', pos);
console.log(js.slice(pos, pos + 1200));
