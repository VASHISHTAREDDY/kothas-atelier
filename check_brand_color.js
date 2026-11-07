const fs = require('fs');
const content = fs.readFileSync('minaleandmann.com/residential-portfolio/alexander-place/index.html', 'utf8');

const s1 = content.indexOf('brand-color');
console.log('--- Brand color section 1: ---');
console.log(content.substring(s1 - 100, s1 + 800));

const s2 = content.indexOf('brand-color', s1 + 100);
console.log('--- Brand color section 2: ---');
console.log(content.substring(s2 - 100, s2 + 800));
