const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

// Between 740000 and 743640
const snippet = js.slice(741000, 743640);
const funcMatches = snippet.match(/[a-zA-Z0-9_$.]+\s*=\s*function\s*\([^)]*\)/g) || [];
console.log('Function definitions between 741000 and 743640:');
funcMatches.forEach(f => console.log(' ', f));

// Let's also check right around 741000 - 741500
console.log('\nSnippet:');
console.log(snippet.slice(0, 1000));
