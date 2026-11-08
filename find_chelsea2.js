const fs = require('fs');

function walk(dir, results = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = dir + '/' + file;
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') walk(full, results);
    } else if (file.endsWith('.html') || file.endsWith('.js')) {
      const txt = fs.readFileSync(full, 'utf8');
      if (txt.includes('CONSERVATION & HERITAGE') || txt.includes('Victorian house conversion project in Chelsea')) {
        results.push(full);
      }
    }
  });
  return results;
}

console.log(walk('public'));
