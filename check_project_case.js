const fs = require('fs');

const lines = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8').split('\n');
console.log(lines.slice(1390, 1435).join('\n'));
