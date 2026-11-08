const fs = require('fs');

const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

const ssDef = js.indexOf("a.fn.smoothState=function");
const ssCode = js.slice(ssDef, ssDef + 10000);
console.log(ssCode.slice(0, 3000));
