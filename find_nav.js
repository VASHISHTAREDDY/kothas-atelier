const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, i) => {
  if (l.includes('<header') || l.includes('class="nav') || l.includes('class="header') || l.includes('id="desktop-nav"') || l.includes('nav-container')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
