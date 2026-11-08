const fs = require('fs');
const content = fs.readFileSync('public/index.html', 'utf8');

const idx = content.indexOf('captions-full');
console.log('captions-full idx:', idx);
if (idx !== -1) {
  console.log(content.slice(idx, idx + 4000));
}
