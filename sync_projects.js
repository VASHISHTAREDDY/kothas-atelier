/**
 * Automatic Project Name Synchronizer for Kotha's Atelier (Node.js version).
 * 
 * Whenever you change project names in residential-portfolio/index.html:
 * Simply run:
 *     node sync_projects.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : path.join(__dirname, 'minaleandmann.com');
const PORTFOLIO_INDEX = path.join(SITE_DIR, 'residential-portfolio', 'index.html');
const PORTFOLIO_DIR = path.join(SITE_DIR, 'residential-portfolio');
const GLOBAL_JS = path.join(SITE_DIR, 'wp-content', 'themes', 'pegasus', 'dist', 'js', 'global.min3c82.js');

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

  // Also support legacy slugs
  registry['cannon-place'] = registry['the-urban-edge'];
  registry['cannon-palace'] = registry['the-urban-edge'];
  registry['broomwood'] = registry['dovetail-house'];

  console.log('Master Project Names from residential-portfolio/index.html:');
  for (const [slug, name] of Object.entries(registry)) {
    console.log(`  ${slug.padEnd(20)}: ${name}`);
  }

  function getSlugFromLink(link) {
    if (!link) return null;
    for (const slug of Object.keys(registry)) {
      if (link.includes(slug)) return slug;
    }
    return null;
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

        // Update slider-nav using slug matching
        const sPos = content.indexOf('class="component slider-nav"');
        const cPos = content.indexOf('class="captions-full"');
        if (sPos !== -1 && cPos !== -1) {
          let sBlock = content.substring(sPos, cPos);
          const origBlock = sBlock;

          sBlock = sBlock.replace(/(<li\b[\s\S]*?<\/li>)/gi, (liMatch) => {
            const linkM = liMatch.match(/data-link="([^"]*)"/i);
            if (!linkM) return liMatch;
            const slug = getSlugFromLink(linkM[1]);
            if (!slug || !registry[slug]) return liMatch;

            return liMatch.replace(
              /(<div class="append">\s*<div class="inner">\s*<p>)[^<]*(<\/p>)/gi,
              `$1${registry[slug]}$2`
            );
          });

          if (sBlock !== origBlock) {
            content = content.substring(0, sPos) + sBlock + content.substring(cPos);
          }
        }

        // Update captions-full using slug matching
        const capPos = content.indexOf('class="captions-full"');
        if (capPos !== -1) {
          const mPos = content.indexOf('<main id="content">', capPos);
          if (mPos !== -1) {
            let capBlock = content.substring(capPos, mPos);
            const origBlock = capBlock;

            capBlock = capBlock.replace(/(<li\b[\s\S]*?<\/li>)/gi, (liMatch) => {
              const linkM = liMatch.match(/data-link="([^"]*)"/i);
              if (!linkM) return liMatch;
              const slug = getSlugFromLink(linkM[1]);
              if (!slug || !registry[slug]) return liMatch;

              return liMatch.replace(/(<h4>)[^<]*(<\/h4>)/gi, `$1${registry[slug]}$2`);
            });

            if (capBlock !== origBlock) {
              content = content.substring(0, capPos) + capBlock + content.substring(mPos);
            }
          }
        }

        // Update expanding CTAs
        const ctaIdx = content.indexOf('class="component component-expanding-cta');
        if (ctaIdx !== -1) {
          const ctaEnd = content.indexOf('</section>', ctaIdx);
          if (ctaEnd !== -1) {
            let ctaBlock = content.substring(ctaIdx, ctaEnd + 10);
            for (const [slug, name] of Object.entries(registry)) {
              if (ctaBlock.includes(`/${slug}/`) || ctaBlock.includes(`../${slug}/`)) {
                ctaBlock = ctaBlock.replace(/(<h4>)[^<]*(<\/h4>)/i, `$1${name}$2`);
                break;
              }
            }
            content = content.substring(0, ctaIdx) + ctaBlock + content.substring(ctaEnd + 10);
          }
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

  try {
    const { cacheBust } = require('./cache_bust');
    cacheBust();
  } catch (err) {
    console.error('Cache busting failed:', err.message);
  }
}

if (require.main === module) {
  syncProjects();
}

module.exports = { syncProjects };
