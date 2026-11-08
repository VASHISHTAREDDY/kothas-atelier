const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const regex = /<li class="cell active">([\s\S]*?)<\/li>/g;
let m;
while ((m = regex.exec(content)) !== null) {
  if (m[1].includes('Farmhouse') || m[1].includes('House') || m[1].includes('house')) {
    console.log('--- SLIDE ---');
    console.log(m[1].slice(0, 500).replace(/\s+/g, ' '));
  }
}
