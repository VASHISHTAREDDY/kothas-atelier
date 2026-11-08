const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/the-urban-edge/index.html', 'utf8');

const contentStart = content.indexOf('id="content"');
const ctaStart = content.indexOf('component-expanding-cta');
const contentEnd = content.indexOf('</main>');

console.log('contentStart:', contentStart);
console.log('ctaStart:', ctaStart);
console.log('contentEnd:', contentEnd);
console.log('Is CTA inside #content?', ctaStart > contentStart && ctaStart < contentEnd);
