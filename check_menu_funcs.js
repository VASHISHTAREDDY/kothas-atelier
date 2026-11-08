const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const dtIndex = js.indexOf("b.find(\".parent\").hasClass(\"has-children\")");
const start = Math.max(0, dtIndex - 2500);
const end = Math.min(js.length, dtIndex + 500);

console.log(js.slice(start, end));
