const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, i) => {
  if (l.includes('portfolio') || l.includes('Portfolio')) {
    if (l.includes('<a ') || l.includes('href=') || l.includes('data-link=')) {
      console.log((i+1) + ': ' + l.trim());
    }
  }
});
