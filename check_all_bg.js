const fs = require('fs');

['public/index.html', 'public/residential-portfolio/index.html', 'public/residential-portfolio/seymour-walk/index.html', 'public/residential-portfolio/no-40/index.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== FILE:', f, '===');
  const bgRegex = /class="background[^"]*"[^>]*>/g;
  let m;
  while ((m = bgRegex.exec(content)) !== null) {
    console.log(m[0]);
  }
});
