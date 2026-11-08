const fs = require('fs');

const jsPath = 'public/wp-content/themes/pegasus/dist/js/global.min3c82.js';
const js = fs.readFileSync(jsPath, 'utf8');

const targetIndex = 705136;
const start = Math.max(0, targetIndex - 3000);
const end = Math.min(js.length, targetIndex + 5000);

fs.writeFileSync('smoothstate_config.txt', js.slice(start, end), 'utf8');
console.log('Saved snippet around smoothState config to smoothstate_config.txt');
