const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const idx = content.indexOf('seymour-walk');
console.log(content.slice(idx - 100, idx + 2500));
