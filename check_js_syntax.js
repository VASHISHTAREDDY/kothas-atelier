const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

try {
  new Function(js);
  console.log('JS syntax is VALID (no parse errors)!');
} catch (e) {
  console.error('JS Syntax Error:', e.message);
}
