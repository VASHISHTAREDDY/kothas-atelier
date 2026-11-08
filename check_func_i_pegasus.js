const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const idx = js.indexOf('function i(a,b){', 742238);
console.log(js.slice(idx, idx + 800));
