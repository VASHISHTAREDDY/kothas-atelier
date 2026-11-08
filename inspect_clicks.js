const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = 742238;
const end = 773880;
const chunk = js.slice(pos, end);

const regex = /\.(?:on\(\s*["']click["']|click\()/g;
let m;
while ((m = regex.exec(chunk)) !== null) {
  console.log('Match:', m[0], 'at rel pos:', m.index);
  console.log(chunk.slice(Math.max(0, m.index - 80), Math.min(chunk.length, m.index + 120)));
  console.log('---');
}
