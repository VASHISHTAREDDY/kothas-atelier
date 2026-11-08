const fs = require('fs');
const js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', 'utf8');

// 1. initSmoothstate
const ssStart = js.indexOf('a.pnp.initSmoothstate=function(){');
const ssEnd = js.indexOf('a.pnp.syncProjectHeader=function(){');
console.log('initSmoothstate from', ssStart, 'to', ssEnd);
console.log(js.slice(ssStart, ssStart + 200));
console.log('--- END ---');
console.log(js.slice(ssEnd - 100, ssEnd));

// 2. loader
const loaderStart = js.indexOf('var a=2400,b=$(".preload .component-loading-screen")');
console.log('loaderStart:', loaderStart);
console.log(js.slice(loaderStart - 50, loaderStart + 250));

// 3. isMatch / portfolio slide match
const matchStart = js.indexOf('var isMatch=(!isHome&&targetP&&targetP!=="#"&&');
console.log('matchStart:', matchStart);
console.log(js.slice(matchStart - 50, matchStart + 350));
