const fs = require('fs');
const css = fs.readFileSync('public/wp-content/themes/pegasus/dist/css/global.min3c82.css', 'utf8');

let pos = 0;
while ((pos = css.indexOf('.project', pos)) !== -1) {
  console.log(css.slice(Math.max(0, pos - 20), Math.min(css.length, pos + 150)));
  console.log('---');
  pos += 8;
}
