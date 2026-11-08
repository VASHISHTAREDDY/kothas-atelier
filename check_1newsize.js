const fs = require('fs');

console.log('1-New-size.jpg exists:', fs.existsSync('public/wp-content/uploads/2018/04/1-New-size.jpg'));
if (fs.existsSync('public/wp-content/uploads/2018/04/1-New-size.jpg')) {
  console.log('size:', fs.statSync('public/wp-content/uploads/2018/04/1-New-size.jpg').size);
}
