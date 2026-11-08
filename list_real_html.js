const fs = require('fs');

function walk(dir, results = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = dir + '/' + file;
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') walk(full, results);
    } else if (file.endsWith('.html') && fs.statSync(full).size > 0) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('public');
console.log('Real HTML files count:', files.length);
files.forEach(f => console.log(f));
