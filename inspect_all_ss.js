const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = 0;
while ((pos = js.indexOf('.smoothState(', pos)) !== -1) {
  console.log('Found .smoothState( at:', pos);
  console.log(js.slice(Math.max(0, pos - 100), Math.min(js.length, pos + 250)));
  console.log('---');
  pos += 12;
}
