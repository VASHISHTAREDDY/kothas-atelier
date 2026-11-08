const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/the-urban-edge/index.html', 'utf8');

const idx = content.indexOf('id="content"');
console.log(content.slice(idx, idx + 1000));
