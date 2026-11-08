const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const idx = content.indexOf('captions-full');
const idxSeymour = content.indexOf('seymour-walk', idx);
console.log(content.slice(idxSeymour - 100, idxSeymour + 1000));
