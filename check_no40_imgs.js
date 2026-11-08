const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8');

console.log('6-8 in no-40?:', content.includes('6-8'));
console.log('6-9 in no-40?:', content.includes('6-9'));
console.log('Title in no-40:', content.match(/<title>[\s\S]*?<\/title>/));
console.log('h1/h4 in no-40:', content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g));
