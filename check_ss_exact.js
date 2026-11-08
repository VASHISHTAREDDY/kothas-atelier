const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

console.log(js.slice(702700, 706000));
