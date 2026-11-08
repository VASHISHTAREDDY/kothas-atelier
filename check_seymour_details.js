const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/seymour-walk/index.html', 'utf8');

console.log('Title:', content.match(/<title>[\s\S]*?<\/title>/));
console.log('h1/h2/h4:', content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g));
// Find images in seymour-walk
const imgs = content.match(/src="[^"]*"/g);
console.log('First 10 imgs:', imgs ? imgs.slice(0, 10) : null);
