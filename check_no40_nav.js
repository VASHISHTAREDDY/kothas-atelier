const fs = require('fs');

const lines = fs.readFileSync('public/residential-portfolio/no-40/index.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (i > 1350 && i < 1550) {
    if (l.includes('<header') || l.includes('<nav') || l.includes('class="project') || l.includes('case') || l.includes('Portfolio')) {
      console.log((i+1) + ': ' + l.trim());
    }
  }
});
