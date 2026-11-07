/**
 * Automatic Asset Cache Buster for Kotha's Atelier
 *
 * Ensures that whenever images or static assets are replaced on disk,
 * references in HTML files receive an updated cache-busting version query (?v=<timestamp>),
 * preventing browsers and CDNs from serving stale cached images to visitors.
 *
 * Usage:
 *   node cache_bust.js               # Scan all HTML files and bust cache for recently replaced images
 *   node cache_bust.js --all         # Bust cache for all images based on disk mtime
 *   node cache_bust.js 7.jpg         # Target specific image filename or path
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SITE_DIR = fs.existsSync(path.join(ROOT_DIR, 'public'))
  ? path.join(ROOT_DIR, 'public')
  : path.join(ROOT_DIR, 'minaleandmann.com');
const UPLOADS_DIR = path.join(SITE_DIR, 'wp-content', 'uploads');

function getAllFiles(dir, filterFn, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(full, filterFn, list);
    } else if (filterFn(full)) {
      list.push(full);
    }
  }
  return list;
}

function cacheBust(targetPattern = null, bustAll = false) {
  console.log('==================================================');
  console.log('  Kotha\'s Atelier - Asset Cache Buster');
  console.log('==================================================\n');

  // Find all HTML files
  const htmlFiles = getAllFiles(SITE_DIR, (f) => f.endsWith('.html'));
  console.log(`Scanning ${htmlFiles.length} HTML files...`);

  let totalUpdatedFiles = 0;
  let totalBustedTags = 0;

  for (const htmlPath of htmlFiles) {
    let content = fs.readFileSync(htmlPath, 'utf8');
    const orig = content;

    // Match ANY image URL in wp-content/uploads/ or wp-content/themes/
    const imgRegex = /(["'\(])(\/?wp-content\/(?:uploads|themes)\/[^"'()\s>]+\.(?:jpg|jpeg|png|gif|svg|webp|ico))(?:\?[^"'()\s>]*)?(["'\)])/gi;

    content = content.replace(imgRegex, (match, prefix, cleanUrl, suffix) => {
      const relPath = decodeURIComponent(cleanUrl.replace(/^\//, ''));
      const diskPath = path.join(SITE_DIR, relPath);

      if (fs.existsSync(diskPath) && fs.statSync(diskPath).isFile()) {
        const stat = fs.statSync(diskPath);
        const mtimeSeconds = Math.floor(stat.mtimeMs / 1000);

        let shouldBust = false;
        if (targetPattern) {
          shouldBust = cleanUrl.toLowerCase().includes(targetPattern.toLowerCase());
        } else if (bustAll) {
          shouldBust = true;
        } else {
          // Default: bust if modified within last 7 days
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          shouldBust = stat.mtimeMs > sevenDaysAgo;
        }

        if (shouldBust) {
          const versionedUrl = `${cleanUrl}?v=${mtimeSeconds}`;
          if (match !== `${prefix}${versionedUrl}${suffix}`) {
            totalBustedTags++;
            return `${prefix}${versionedUrl}${suffix}`;
          }
        }
      }
      return match;
    });

    if (content !== orig) {
      fs.writeFileSync(htmlPath, content, 'utf8');
      console.log(`  Updated: ${path.relative(ROOT_DIR, htmlPath)}`);
      totalUpdatedFiles++;
    }
  }

  console.log(`\nCache busting complete:`);
  console.log(`  Files updated : ${totalUpdatedFiles}`);
  console.log(`  Tags refreshed: ${totalBustedTags}\n`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const isAll = args.includes('--all');
  const target = args.find(a => !a.startsWith('--'));
  cacheBust(target, isAll);
}

module.exports = { cacheBust };
