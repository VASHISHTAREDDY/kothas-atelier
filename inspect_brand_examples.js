const fs = require('fs');

function inspectFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let idx = 0;
  console.log('=== ' + filePath + ' ===');
  while ((idx = content.indexOf('brand-color', idx)) !== -1) {
    console.log(content.substring(idx - 150, idx + 700));
    console.log('-------------------------------------------');
    idx += 11;
  }
}

inspectFile('minaleandmann.com/about/index.html');
inspectFile('minaleandmann.com/residential-portfolio/the-urban-edge/index.html');
