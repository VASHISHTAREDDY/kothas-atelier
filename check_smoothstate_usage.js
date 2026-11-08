const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const matches = html.match(/class=["'][^"']*smoothstate[^"']*["']/gi) || [];
console.log('smoothstate classes in index.html:', matches.length);
matches.slice(0, 10).forEach(m => console.log(' ', m));

// Check in residential-portfolio/index.html
const rp = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');
const rpMatches = rp.match(/class=["'][^"']*smoothstate[^"']*["']/gi) || [];
console.log('smoothstate classes in residential-portfolio/index.html:', rpMatches.length);
rpMatches.slice(0, 10).forEach(m => console.log(' ', m));

// Check in side menu
const menuMatches = html.match(/<div class="main menu-wrapper">[\s\S]*?<\/div>\s*<\/div>/);
if (menuMatches) {
  console.log('Side menu has smoothstate?', menuMatches[0].includes('smoothstate'));
}
