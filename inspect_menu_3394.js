const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const idx = html.indexOf('3394', html.indexOf('side-menu-container') + 200);
console.log(html.slice(idx - 100, idx + 1500));
