const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

// Find all occurrences of "var " between 742238 and 773880
let pos = 742238;
let end = 773880;
const chunk = js.slice(pos, end);
console.log('Closure length:', chunk.length);

// Let's find "var s" or " s=" or ",s=" or ",s,"
const regex = /(?:var|,)\s*s\s*(=|;|,)/g;
let m;
while ((m = regex.exec(chunk)) !== null) {
  console.log('Match:', m[0], 'at relative pos:', m.index, 'abs pos:', pos + m.index);
  console.log(chunk.slice(Math.max(0, m.index - 50), Math.min(chunk.length, m.index + 100)));
}
