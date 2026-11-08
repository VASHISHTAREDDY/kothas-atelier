const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const targetIdx = js.indexOf("$.pnp.initSliders");
console.log('$.pnp.initSliders at:', targetIdx);
console.log(js.slice(targetIdx, targetIdx + 1500));
