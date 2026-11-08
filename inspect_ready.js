const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');
const start = js.lastIndexOf('$(function(){', 744000);
console.log('start at:', start);
console.log(js.slice(start, start + 3000));
