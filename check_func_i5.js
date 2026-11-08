const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = "function i(a,b){var c=a||";
const idx = js.indexOf(target);
console.log(js.slice(idx, idx + 2000));
