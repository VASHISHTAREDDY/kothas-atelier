const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const idx = html.indexOf('side-menu-container');
console.log(html.slice(idx, idx + 2500));
