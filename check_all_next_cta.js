const fs = require('fs');

const projects = [
  'public/residential-portfolio/the-urban-edge/index.html',
  'public/residential-portfolio/the-frames/index.html',
  'public/residential-portfolio/seymour-walk/index.html',
  'public/residential-portfolio/alexander-place/index.html',
  'public/residential-portfolio/no-40/index.html'
];

projects.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const idx = content.indexOf('component-expanding-cta');
  if (idx !== -1) {
    const chunk = content.slice(idx, idx + 600);
    const link = chunk.match(/href="([^"]*)"/);
    const h4 = chunk.match(/<h4>([\s\S]*?)<\/h4>/);
    console.log(p, '-> Next:', link ? link[1] : '', '| Title:', h4 ? h4[1].trim() : '');
  } else {
    console.log(p, '-> No expanding cta');
  }
});
