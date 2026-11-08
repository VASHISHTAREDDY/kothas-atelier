const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const sLoadIdx = js.indexOf("s.load(");
console.log('s.load at:', sLoadIdx);

// Look backwards from sLoadIdx for the start of this block or function
// Check for "function("
let fIdx = sLoadIdx;
for (let i = 0; i < 10; i++) {
  fIdx = js.lastIndexOf("function", fIdx - 1);
  console.log(`function at ${fIdx}:`, js.slice(fIdx, fIdx + 60));
}
