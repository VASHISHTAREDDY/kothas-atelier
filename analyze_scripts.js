const fs = require('fs');

const content = fs.readFileSync('public/index.html', 'utf8');
const scriptMatches = content.match(/<script[^>]*src=["'][^"']+["'][^>]*><\/script>/gi);
console.log('Scripts in index.html:');
if (scriptMatches) scriptMatches.forEach(s => console.log(s));

// Also check for inline scripts
console.log('\nChecking inline scripts in index.html:');
const inlineMatches = content.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi);
if (inlineMatches) {
  console.log(`Found ${inlineMatches.length} inline scripts.`);
  inlineMatches.forEach((s, idx) => {
    console.log(`--- Inline Script ${idx + 1} (${s.length} chars) ---`);
    console.log(s.slice(0, 200).replace(/\n/g, ' ') + '...');
  });
}
