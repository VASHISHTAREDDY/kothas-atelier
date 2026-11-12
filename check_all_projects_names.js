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
  const title = content.match(/<title>([\s\S]*?)<\/title>/);
  const h1 = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const caseMatch = content.match(/<span class="case">([\s\S]*?)<\/span>/);
  const firstH4 = content.match(/<h4>([\s\S]*?)<\/h4>/);
  console.log('--- FILE:', p);
  console.log('  title:', title ? title[1].trim() : 'none');
  console.log('  case:', caseMatch ? caseMatch[1].trim() : 'none');
  console.log('  firstH4:', firstH4 ? firstH4[1].trim() : 'none');
});
