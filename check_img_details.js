const fs = require('fs');

console.log('slide_02-1600x1068 size:', fs.statSync('public/wp-content/uploads/2018/05/slide_02-1600x1068.jpg').size);
console.log('1-New-size.jpg size:', fs.statSync('public/wp-content/uploads/2018/04/1-New-size.jpg').size);
