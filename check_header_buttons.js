const fs = require('fs');

const lines = fs.readFileSync('public/index.html', 'utf8').split('\n');
console.log(lines.slice(1620, 1660).join('\n'));
