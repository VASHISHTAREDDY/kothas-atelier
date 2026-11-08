const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const slidesMatch = content.match(/<ul[^>]*class="[^"]*slides[^"]*"[^>]*>([\s\S]*?)<\/ul>/);
const captionsMatch = content.match(/<div class="captions-full">[\s\S]*?<ul>([\s\S]*?)<\/ul>/);

if (slidesMatch) {
  const lis = slidesMatch[1].match(/<li[\s\S]*?<\/li>/g);
  console.log('Total slides in .slides:', lis ? lis.length : 0);
}
if (captionsMatch) {
  const lis = captionsMatch[1].match(/<li[\s\S]*?<\/li>/g);
  console.log('Total slides in captions:', lis ? lis.length : 0);
}
