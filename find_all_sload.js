const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

let pos = 0;
while ((pos = js.indexOf("s.load(a)", pos)) !== -1) {
  console.log("Found s.load(a) at:", pos);
  pos += 9;
}
