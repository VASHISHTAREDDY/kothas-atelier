const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const rel = path.relative('public', filePath);
  lines.forEach((l, i) => {
    if (/portfolio/i.test(l)) {
      if (l.includes('<a') || l.includes('data-link') || l.includes('button') || l.includes('class="project') || l.includes('data-trigger')) {
        console.log(`${rel}:${i+1} -> ${l.trim().substring(0, 120)}`);
      }
    }
  });
}

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanDir(full);
    else if (entry.name.endsWith('.html')) checkFile(full);
  }
}

scanDir('public');
