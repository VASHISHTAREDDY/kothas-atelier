const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/alexander-place/index.html', 'utf8');

const idx = content.indexOf('component-expanding-cta');
console.log(content.slice(idx, idx + 600));
