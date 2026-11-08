const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = 742238 + 21787;
console.log(js.slice(target - 200, target + 500));
