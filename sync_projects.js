/**
 * Automatic Project Name Synchronizer for Kotha's Atelier (Node.js version).
 * 
 * Whenever you change project names in residential-portfolio/index.html:
 * Simply run:
 *     node sync_projects.js
 */

const fs = require('fs');
const path = require('path');

const PORTFOLIO_INDEX = path.join(__dirname, 'minaleandmann.com', 'residential-portfolio', 'index.html');
const PORTFOLIO_DIR = path.join(__dirname, 'minaleandmann.com', 'residential-portfolio');
const GLOBAL_JS = path.join(__dirname, 'minaleandmann.com', 'wp-content', 'themes', 'pegasus', 'dist', 'js', 'global.min3c82.js');

const PROJECT_ORDER = [
  'the-urban-edge',
  'dovetail-house',
  'seymour-walk',
  'alexander-place',
  'no-40'
];

function syncProjects() {
  if (!fs.existsSync(PORTFOLIO_INDEX)) {
    console.error('Portfolio index not found:', PORTFOLIO_INDEX);
    return;
  }

  const html = fs.readFileSync(PORTFOLIO_INDEX, 'utf8');

  const sPos = html.indexOf('class="component slider-nav"');
  const cPos = html.indexOf('class="captions-full"');
  if (sPos === -1 || cPos === -1) {
    console.error('Could not find slider-nav block');
    return;
  }

  const sliderBlock = html.substring(sPos, cPos);
  const titleMatches = [...sliderBlock.matchAll(/<div class="inner">\s*<p>([^<]*)<\/p>/g)].map(m => m[1].trim());

  if (titleMatches.length < 5) {
    console.warn(`Warning: only found ${titleMatches.length} slides in portfolio index.`);
    return;
  }

  const titles = titleMatches.slice(0, 5);
  const registry = {};
  PROJECT_ORDER.forEach((slug, idx) => {
    registry[slug] = titles[idx];
  });

  console.log('Master Project Names from residential-portfolio/index.html:');
  for (const [slug, name] of Object.entries(registry)) {
    console.log(`  ${slug.padEnd(20)}: ${name}`);
  }

  // Update static HTML pages
  let updatedFiles = 0;
  function walkDir(dir) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walkDir(full);
      } else if (file.endsWith('.html')) {
        if (path.resolve(full) === path.resolve(PORTFOLIO_INDEX)) continue;

        let content = fs.readFileSync(full, 'utf8');
        const orig = content;

        // Update slider-nav
        const sPos = content.indexOf('class="component slider-nav"');
        const cPos = content.indexOf('class="captions-full"');
        if (sPos !== -1 && cPos !== -1) {
          let sBlock = content.substring(sPos, cPos);
          let sIdx = 0;
          sBlock = sBlock.replace(/<div class="inner">\s*<p>[^<]*<\/p>/g, (m) => {
            if (sIdx < titles.length) {
              const res = `<div class="inner"><p>${titles[sIdx]}</p>`;
              sIdx++;
              return res;
            }
            return m;
          });
          content = content.substring(0, sPos) + sBlock + content.substring(cPos);
        }

        // Update captions-full
        const capPos = content.indexOf('class="captions-full"');
        if (capPos !== -1) {
          const mPos = content.indexOf('<main id="content">', capPos);
          if (mPos !== -1) {
            let capBlock = content.substring(capPos, mPos);
            let cIdx = 0;
            capBlock = capBlock.replace(/<h4>[^<]*<\/h4>/g, (m) => {
              if (cIdx < titles.length) {
                const res = `<h4>${titles[cIdx]}</h4>`;
                cIdx++;
                return res;
              }
              return m;
            });
            content = content.substring(0, capPos) + capBlock + content.substring(mPos);
          }
        }

        // Update expanding CTAs
        for (const [slug, name] of Object.entries(registry)) {
          const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const re = new RegExp(`(href="[^"]*${escaped}[^"]*"[\\s\\S]*?<div class="caption">[\\s\\S]*?<h4>)[^<]*(<\\/h4>)`, 'g');
          content = content.replace(re, `$1${name}$2`);
        }

        if (content !== orig) {
          fs.writeFileSync(full, content, 'utf8');
          console.log('  Synced:', path.relative(PORTFOLIO_DIR, full));
          updatedFiles++;
        }
      }
    }
  }

  walkDir(PORTFOLIO_DIR);
  console.log(`\nStatic HTML pages updated: ${updatedFiles}`);
}

if (require.main === module) {
  syncProjects();
}

module.exports = { syncProjects };
