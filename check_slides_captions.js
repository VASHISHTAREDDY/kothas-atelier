const fs = require('fs');
const content = fs.readFileSync('public/index.html', 'utf8');

// Find all slides in index.html
const regex = /<li[^>]*class="[^"]*slides[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let m;
// Or let's find data-link in index.html
let links = content.match(/data-link="[^"]*"/g);
console.log('index.html data-links:', links);

// Also captions
let captions = content.match(/<div class="caption">([\s\S]*?)<\/div>/g);
if (captions) {
  captions.forEach(c => console.log('Caption:', c.replace(/\s+/g, ' ')));
}
