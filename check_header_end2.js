const fs = require('fs');
const html = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8');
const headerIdx = html.indexOf('id="page-header"');
const idx = html.indexOf('class="image"', headerIdx);
const endSvg = html.indexOf('</svg>', idx);
console.log(html.slice(endSvg, endSvg + 500));
