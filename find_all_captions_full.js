const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = 0;
while ((pos = js.indexOf('.captions-full', pos)) !== -1) {
  console.log('Found .captions-full at:', pos);
  console.log(js.slice(Math.max(0, pos - 50), Math.min(js.length, pos + 250)));
  console.log('---');
  pos += 14;
}
