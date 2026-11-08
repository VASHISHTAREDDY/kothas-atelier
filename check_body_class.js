const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

console.log(content.match(/<body[^>]*>/));
