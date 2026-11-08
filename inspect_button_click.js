const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const target = 742238 + 25042;
console.log(js.slice(target - 300, target + 300));
