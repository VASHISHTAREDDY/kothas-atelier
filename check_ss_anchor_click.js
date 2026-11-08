const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = js.indexOf('click', 532000);
console.log(js.slice(pos - 100, pos + 500));
