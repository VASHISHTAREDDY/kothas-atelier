const fs = require('fs');
const content = fs.readFileSync('minaleandmann.com/residential-portfolio/the-urban-edge/index.html', 'utf8');
const idx = content.indexOf('Interior Design');
console.log(content.substring(idx - 300, idx + 800));
