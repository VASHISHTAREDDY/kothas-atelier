const fs = require('fs');
const html = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8');
const idx = html.indexOf('class="image"');
const endA = html.indexOf('</a>', idx);
console.log(html.slice(endA - 200, endA + 500));
