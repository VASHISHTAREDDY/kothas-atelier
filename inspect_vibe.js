const fs = require('fs');

const css = fs.readFileSync('minaleandmann.com/wp-content/themes/pegasus/dist/css/global.min3c82.css', 'utf8');

// Let's find font-family definitions in global css
const fontMatches = css.match(/font-family:[^;}]*/g);
console.log('Unique font families:');
console.log([...new Set(fontMatches)].slice(0, 20));

// Let's check how headings h1, h2, h3, h4 are styled in the theme
const headingRules = [];
['h1', 'h2', 'h3', 'h4', '.title', '.subtitle', 'brand-color'].forEach(selector => {
  const reg = new RegExp(`(^|[,}])\\s*([^,{}]*${selector}[^{]*)\\{([^}]*)\\}`, 'g');
  let m;
  while ((m = reg.exec(css)) !== null) {
    if (m[3].includes('font') || m[3].includes('color') || m[3].includes('letter-spacing')) {
      headingRules.push({ sel: m[2].trim(), props: m[3].trim() });
    }
  }
});
console.log('\nSample heading rules:', headingRules.slice(0, 15));
