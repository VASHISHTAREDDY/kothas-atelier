const fs = require('fs');
const content = fs.readFileSync('public/index.html', 'utf8');

const idx = content.indexOf('slider-wrapper');
console.log('slider-wrapper idx:', idx);
if (idx !== -1) {
  console.log(content.slice(idx, idx + 4000));
}
