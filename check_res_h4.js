const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const regex = /<h4>([\s\S]*?)<\/h4>/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log('h4:', m[1].trim());
}
