const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/the-urban-edge/index.html', 'utf8');

const idx = content.indexOf('component-expanding-cta');
console.log(content.slice(idx + 300, idx + 1000));
