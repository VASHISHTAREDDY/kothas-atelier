const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = 756500;
while ((pos = js.indexOf('.loadpage', pos)) !== -1) {
  console.log('Found .loadpage at:', pos);
  console.log(js.slice(Math.max(0, pos - 100), Math.min(js.length, pos + 200)));
  console.log('---');
  pos += 9;
}
