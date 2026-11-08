const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');
console.log('Total length:', js.length);
console.log(js.slice(744500, 748000));
