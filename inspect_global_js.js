const fs = require('fs');

const jsPath = 'public/wp-content/themes/pegasus/dist/js/global.min3c82.js';
const js = fs.readFileSync(jsPath, 'utf8');

console.log('File size:', js.length, 'bytes');

// Check for key terms
const terms = ['smoothState', 'smoothstate', 'loadpage', 'data-link', 'portfolio', 'history', 'transition', 'peel', 'zoom', 'flickity', 'scroll', 'redirect'];
terms.forEach(term => {
  const count = (js.match(new RegExp(term, 'gi')) || []).length;
  console.log(`${term}: found ${count} times`);
});
