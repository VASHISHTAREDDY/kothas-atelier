const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

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

console.log('=== data-link handlers ===');
const dlMatches = findOccurrences(js, 'data-link');
dlMatches.forEach((m, i) => {
  console.log(`Match ${i+1}:`);
  console.log(m.snippet);
  console.log('-----------------------------------');
});
