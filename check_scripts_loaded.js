const fs = require('fs');
const content = fs.readFileSync('public/index.html', 'utf8');

const scriptRegex = /<script[^>]*src="([^"]*)"[^>]*>/g;
let m;
while ((m = scriptRegex.exec(content)) !== null) {
  console.log('Script:', m[1]);
}
