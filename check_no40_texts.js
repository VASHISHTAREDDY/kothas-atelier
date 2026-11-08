const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8');

const regex = /<h1[^>]*>([\s\S]*?)<\/h1>/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log('h1:', m[1].trim());
}
const regexH2 = /<h2[^>]*class="title"[^>]*>([\s\S]*?)<\/h2>/g;
while ((m = regexH2.exec(content)) !== null) {
  console.log('h2 title:', m[1].trim());
}
