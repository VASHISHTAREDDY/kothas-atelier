const fs = require('fs');
const html = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8');
const idx = html.indexOf('page-header');
console.log('page-header idx:', idx);
console.log(html.slice(idx, idx + 2000).replace(/<path[^>]+>/g, '<path...>'));
