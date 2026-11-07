const fs = require('fs');
const content = fs.readFileSync('minaleandmann.com/residential-portfolio/alexander-place/index.html', 'utf8');

const idx = content.indexOf('desktop-nav');
console.log(content.substring(idx - 100, idx + 600));
