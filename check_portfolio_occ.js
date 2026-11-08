const fs = require('fs');

['public/residential-portfolio/index.html', 'public/residential-portfolio/no-40/index.html'].forEach(f => {
  console.log('=== ' + f + ' ===');
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.toLowerCase().includes('portfolio') && (l.includes('<a') || l.includes('<button') || l.includes('class='))) {
      console.log((i+1) + ': ' + l.trim());
    }
  });
});
