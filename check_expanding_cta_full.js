const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const idx = js.indexOf('a.pnp.initExpandingCTA=function()');
console.log(js.slice(idx, idx + 1200));
