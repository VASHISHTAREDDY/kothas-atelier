const fs = require('fs');

['public/residential-portfolio/broomwood/index.html', 'public/residential-portfolio/cannon-place/index.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const idx = content.indexOf('side-menu-container');
  if (idx !== -1) {
    console.log('---', f, '---');
    console.log(content.slice(idx, idx + 1500));
  } else {
    console.log(f, 'has no side-menu-container!');
  }
});
