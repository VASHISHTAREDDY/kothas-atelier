const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const idx = content.indexOf('captions-full');
console.log(content.slice(idx, idx + 4000));
