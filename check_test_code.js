const fs = require('fs');
const content = fs.readFileSync('test_full_project_chain.js', 'utf8');
console.log(content.slice(content.indexOf('--- 7.')));
