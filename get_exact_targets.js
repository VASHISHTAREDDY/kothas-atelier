const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js.bak', 'utf8');

const start1 = js.indexOf('a.pnp.initSmoothstate=function(){');
const end1 = js.indexOf('a.pnp.syncProjectHeader=function(){');
console.log('Target 1 exact length:', end1 - start1);
console.log('Target 1 snippet:', js.slice(start1, start1 + 100));

const start5 = js.indexOf('a.pnp.syncProjectHeader=function(){');
const end5 = js.indexOf('a.pnp.initPage=function(b){');
console.log('Target 5 exact length:', end5 - start5);
console.log('Target 5 snippet:', js.slice(start5, end5));
