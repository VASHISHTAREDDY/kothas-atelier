const fs = require('fs');

const realPages = [
  'public/index.html',
  'public/about/index.html',
  'public/commercial-design-and-build/index.html',
  'public/commercial-portfolio/index.html',
  'public/commercial-portfolio/the-archway-69/index.html',
  'public/commercial-portfolio/the-rock/index.html',
  'public/contact/index.html',
  'public/planning-applications/index.html',
  'public/privacy-policy/index.html',
  'public/residential-architects/index.html',
  'public/residential-architectural-design-services/index.html',
  'public/residential-interior-design/index.html',
  'public/residential-portfolio/alexander-place/index.html',
  'public/residential-portfolio/dovetail-house/index.html',
  'public/residential-portfolio/index.html',
  'public/residential-portfolio/no-40/index.html',
  'public/residential-portfolio/seymour-walk/index.html',
  'public/residential-portfolio/the-urban-edge/index.html'
];

realPages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const inside = content.includes('<a class="image"') && content.includes('<div class="project">');
  console.log(p, 'has project inside image:', inside);
});
