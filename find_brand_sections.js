const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const fp = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules') search(fp);
    else if (f.isFile() && f.name.endsWith('.html')) {
      const c = fs.readFileSync(fp, 'utf8');
      if (c.includes('component-coloured-text') && c.includes('brand-color')) {
        console.log('Found brand-color in:', fp);
      }
    }
  }
}
search('minaleandmann.com');
