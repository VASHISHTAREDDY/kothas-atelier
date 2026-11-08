const sharp = require('sharp');

sharp('public/wp-content/uploads/2018/05/slide_02-1600x1068.jpg')
  .resize(400, 200, { fit: 'cover' })
  .toFile('C:/Users/vashi_qdz23qq/.gemini/antigravity/brain/c199cff4-55a1-45d6-b4db-8e53d9e08884/thumb_slide02.jpg')
  .then(() => console.log('thumb_slide02 created'));

sharp('public/wp-content/uploads/2018/04/1-New-size.jpg')
  .resize(400, 200, { fit: 'cover' })
  .toFile('C:/Users/vashi_qdz23qq/.gemini/antigravity/brain/c199cff4-55a1-45d6-b4db-8e53d9e08884/thumb_1newsize.jpg')
  .then(() => console.log('thumb_1newsize created'));
