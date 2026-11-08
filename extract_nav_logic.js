const fs = require('fs');

const jsPath = 'public/wp-content/themes/pegasus/dist/js/global.min3c82.js';
const js = fs.readFileSync(jsPath, 'utf8');

function findOccurrences(str, target, pad = 300) {
  let idx = 0;
  let matches = [];
  while ((idx = str.indexOf(target, idx)) !== -1) {
    const start = Math.max(0, idx - pad);
    const end = Math.min(str.length, idx + target.length + pad);
    matches.push({ index: idx, snippet: str.slice(start, end) });
    idx += target.length;
  }
  return matches;
}

console.log('--- smoothState setup ---');
const ssMatches = findOccurrences(js, 'smoothState');
ssMatches.slice(0, 5).forEach((m, i) => {
  console.log(`Match ${i + 1} at ${m.index}:`);
  console.log(m.snippet);
  console.log('-------------------------------------------');
});

console.log('--- loadpage setup ---');
const lpMatches = findOccurrences(js, 'loadpage');
lpMatches.forEach((m, i) => {
  console.log(`Match ${i + 1} at ${m.index}:`);
  console.log(m.snippet);
  console.log('-------------------------------------------');
});
