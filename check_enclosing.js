const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const targetIdx = 744091;
// Find "$.pnp." backwards
const pnpIdx = js.lastIndexOf("$.pnp.", targetIdx);
console.log('$.pnp. at:', pnpIdx, js.slice(pnpIdx, pnpIdx + 100));
