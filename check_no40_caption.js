const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const idx = content.indexOf('captions-full');
const idxNo40 = content.indexOf('no-40', idx);
console.log(content.slice(idxNo40 - 100, idxNo40 + 1000));
