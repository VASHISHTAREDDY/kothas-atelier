const fs = require('fs');
const path = require('path');

function findLogos(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory() && e.name !== 'node_modules') {
      findLogos(path.join(dir, e.name));
    } else if (e.isFile() && (e.name.includes('logo') || e.name.includes('favicon') || e.name.includes('mm-white'))) {
      console.log(path.join(dir, e.name));
    }
  }
}
findLogos('minaleandmann.com');
