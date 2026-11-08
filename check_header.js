const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');

for (let i = 0; i < 500; i++) {
  const l = lines[i];
  if (l && (l.includes('nav-container') || l.includes('desktop-nav') || l.includes('header') || l.includes('navbar') || l.includes('portfolio'))) {
    console.log((i+1) + ': ' + l.trim());
  }
}
