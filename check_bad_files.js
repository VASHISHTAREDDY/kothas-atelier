const fs = require('fs');

['public/residential-portfolio/broomwood/index.html', 'public/residential-portfolio/cannon-place/index.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(f, 'length:', content.length);
  console.log(content.slice(0, 300));
});
