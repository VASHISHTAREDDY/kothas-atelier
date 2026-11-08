const fs = require('fs');

['public/residential-portfolio/index.html', 'public/residential-portfolio/no-40/index.html'].forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const idx = content.indexOf('<a class="image"');
  const end = content.indexOf('</a>', idx);
  console.log('===', p, '===');
  console.log(content.slice(idx, end + 4).replace(/<path[^>]+>/g, '<path...>'));
});
