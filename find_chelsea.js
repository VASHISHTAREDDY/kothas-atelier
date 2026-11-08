const fs = require('fs');

function walk(dir, results = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = dir + '/' + file;
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') walk(full, results);
    } else if (file.endsWith('.html')) {
      const txt = fs.readFileSync(full, 'utf8');
      if (txt.includes('Chelsea, London') || /farm\s*house/i.test(txt)) {
        results.push(full);
      }
    }
  });
  return results;
}

const matches = walk('public');
console.log('Matches:', matches);
