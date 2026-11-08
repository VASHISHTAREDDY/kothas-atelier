const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8');

const idx = content.indexOf('class="project"');
console.log(content.slice(idx, idx + 200));
