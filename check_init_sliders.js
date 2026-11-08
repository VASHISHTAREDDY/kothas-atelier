const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const targetIdx = 744091;
// Find "$.pnp.init" backwards
const initIdx = js.lastIndexOf("$.pnp.init", 743000);
console.log('$.pnp.init at:', initIdx, js.slice(initIdx, initIdx + 80));

// Let's print from initIdx to initIdx + 500
console.log('\nFrom init:');
console.log(js.slice(initIdx, initIdx + 500));
