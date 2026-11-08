const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const start = 702846;
const end = 745000;
const region = js.slice(start, end);

// Find smoothState assignments
const matches = region.match(/[a-zA-Z0-9_$]+\s*=\s*[^,;]*smoothState/g) || [];
console.log('smoothState assignments:');
matches.forEach(m => console.log(' ', m));

// Find ".data("
const dataMatches = region.match(/[a-zA-Z0-9_$]+\s*=\s*[^,;]*\.data\([^)]+\)/g) || [];
console.log('data matches:');
dataMatches.forEach(m => console.log(' ', m));
