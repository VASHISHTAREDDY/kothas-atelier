const fs = require('fs');
const glob = require('path');

function walk(dir, results = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = dir + '/' + file;
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') walk(full, results);
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk('public');
console.log('Total HTML files:', htmlFiles.length);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Find Portfolio in main menu
  const m = content.match(/<a[^>]*data-trigger="3394"[^>]*>([\s\S]*?)<\/a>/);
  const m2 = content.match(/<a[^>]*href="[^"]*portfolio[^"]*"[^>]*>([\s\S]*?)<\/a>/g);
  if (m) {
    // console.log(file, 'has data-trigger="3394":', m[0].trim());
  } else {
    console.log(file, 'DOES NOT have data-trigger="3394"!');
    if (m2) console.log('Found other portfolio links:', m2);
  }
});
