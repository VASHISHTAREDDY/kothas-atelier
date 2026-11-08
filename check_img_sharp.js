const sharp = require('sharp');

sharp('public/wp-content/uploads/2018/05/slide_02-1600x1068.jpg').metadata().then(m => {
  console.log('slide_02 metadata:', m.width, m.height);
});
sharp('public/wp-content/uploads/2018/04/1-New-size.jpg').metadata().then(m => {
  console.log('1-New-size metadata:', m.width, m.height);
});
