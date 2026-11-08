const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const regex = /<li class="cell sub-slide residential"[\s\S]*?<\/li>/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  const link = m[0].match(/data-link="([^"]*)"/);
  const h4 = m[0].match(/<h4>([\s\S]*?)<\/h4>/);
  const p = m[0].match(/<p>([\s\S]*?)<\/p>/);
  const title = m[0].match(/<div class="seo-title">([\s\S]*?)<\/div>/);
  console.log(`Slide ${count}: link=${link ? link[1] : ''}, h4=${h4 ? h4[1].trim() : ''}, title=${title ? title[1].trim() : ''}, p=${p ? p[1].trim() : ''}`);
}
