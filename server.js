const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { handleContactRequest } = require('./contact-api');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = __dirname;
const SITE_DIR = path.join(__dirname, 'public');
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg']);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  // Dedicated Contact API & Form Submissions
  if (reqPath === '/api/contact' || reqPath.startsWith('/api/contact') || reqPath.includes('/feedback') || reqPath.startsWith('/wp-json/contact-form-7/')) {
    return handleContactRequest(req, res);
  }

  // Generic API status
  if (reqPath.startsWith('/api/') || reqPath.startsWith('/wp-json/')) {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ status: 'ok', success: true }));
    return;
  }
  if (reqPath === '/') reqPath = '/index.html';

  // Project renames: 301 redirects for seamless backward-compatibility
  if (reqPath.startsWith('/residential-portfolio/cannon-place') || reqPath.startsWith('/residential-portfolio/cannon-palace')) {
    const newPath = reqPath
      .replace('/residential-portfolio/cannon-place', '/residential-portfolio/the-urban-edge')
      .replace('/residential-portfolio/cannon-palace', '/residential-portfolio/the-urban-edge');
    const target = newPath.endsWith('/') || newPath.includes('.') ? newPath : `${newPath}/`;
    res.writeHead(301, {
      'Location': target,
      'Cache-Control': 'no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end();
    return;
  }
  if (reqPath.startsWith('/residential-portfolio/broomwood')) {
    const newPath = reqPath.replace('/residential-portfolio/broomwood', '/residential-portfolio/dovetail-house');
    const target = newPath.endsWith('/') || newPath.includes('.') ? newPath : `${newPath}/`;
    res.writeHead(301, {
      'Location': target,
      'Cache-Control': 'no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end();
    return;
  }

  // Check in SITE_DIR first
  let filePath = path.join(SITE_DIR, reqPath);

  // If path is directory, check index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback to ROOT_DIR
  if (!fs.existsSync(filePath)) {
    let altPath = path.join(ROOT_DIR, reqPath);
    if (fs.existsSync(altPath)) {
      if (fs.statSync(altPath).isDirectory()) {
        altPath = path.join(altPath, 'index.html');
      }
      if (fs.existsSync(altPath) && fs.statSync(altPath).isFile()) {
        filePath = altPath;
      }
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(filePath);
    const range = req.headers.range;

    req.on('error', () => {});
    res.on('error', () => {});

    // Cache strategy:
    // HTML is kept revalidated so edits reflect immediately
    // Static images, css, and js always require revalidation (no-cache, must-revalidate)
    // with dynamic ETag & Last-Modified so any file replaced on disk is IMMEDIATELY picked up
    // Media videos (.mp4) are cached for 24h for smooth playback and seeking
    const etag = `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    const lastModified = stat.mtime.toUTCString();

    let cacheHeader;
    if (ext === '.mp4') {
      cacheHeader = 'public, max-age=86400';
    } else {
      cacheHeader = 'no-cache, must-revalidate';
    }

    // Check conditional request headers (ETag / If-Modified-Since)
    const ifNoneMatch = req.headers['if-none-match'];
    const ifModifiedSince = req.headers['if-modified-since'];
    const clientModTime = ifModifiedSince ? Math.floor(new Date(ifModifiedSince).getTime() / 1000) : null;
    const fileModTime = Math.floor(stat.mtimeMs / 1000);

    if (
      (ifNoneMatch && (ifNoneMatch === etag || ifNoneMatch === `W/${etag}`)) ||
      (clientModTime !== null && !ifNoneMatch && clientModTime >= fileModTime)
    ) {
      res.writeHead(304, {
        'ETag': etag,
        'Last-Modified': lastModified,
        'Cache-Control': cacheHeader,
        'Access-Control-Allow-Origin': '*',
      });
      res.end();
      return;
    }

    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      file.on('error', () => {});
      res.on('close', () => { file.destroy(); });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'ETag': etag,
        'Last-Modified': lastModified,
        'Cache-Control': cacheHeader,
        'Access-Control-Allow-Origin': '*',
      });
      file.pipe(res);
    } else if (ext === '.html') {
      let html = fs.readFileSync(filePath, 'utf8');

      // Universal Automatic Cache-Buster:
      // Automatically updates EVERY image reference anywhere in the HTML
      // (src, data-desktop, data-mobile, data-poster, background-image: url(...), srcset, json-ld)
      // to match the exact modification time of the file on disk.
      // Whenever a file is replaced, the served HTML immediately reflects its new timestamp.
      const imgUrlRegex = /(["'\(])(\/?wp-content\/(?:uploads|themes)\/[^"'()\s>]+\.(?:jpg|jpeg|png|gif|svg|webp|ico))(?:\?[^"'()\s>]*)?(["'\)])/gi;
      html = html.replace(imgUrlRegex, (fullMatch, prefix, cleanUrl, suffix) => {
        const relPath = decodeURIComponent(cleanUrl.replace(/^\//, ''));
        const diskPath = path.join(SITE_DIR, relPath);
        try {
          if (fs.existsSync(diskPath)) {
            const imgStat = fs.statSync(diskPath);
            const mtimeSeconds = Math.floor(imgStat.mtimeMs / 1000);
            return `${prefix}${cleanUrl}?v=${mtimeSeconds}${suffix}`;
          }
        } catch (e) {}
        return fullMatch;
      });

      // High-Quality Image Display Guarantee:
      // Preserves uploaded image sharpness and prevents muddy downsampling
      if (!html.includes('id="auto-high-quality-render"')) {
        const qualityStyles = `<style id="auto-high-quality-render">
img, .background, .image-container, .img-responsive, [style*="background-image"] {
  image-rendering: -webkit-optimize-contrast !important;
  image-rendering: high-quality !important;
}
</style></head>`;
        html = html.replace('</head>', qualityStyles);
      }

      const htmlBuf = Buffer.from(html, 'utf8');
      const acceptEncoding = req.headers['accept-encoding'] || '';
      if (acceptEncoding.includes('gzip')) {
        const gz = zlib.gzipSync(htmlBuf);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding',
          'ETag': etag,
          'Last-Modified': lastModified,
          'Cache-Control': cacheHeader,
          'Access-Control-Allow-Origin': '*',
        });
        res.end(gz);
      } else {
        res.writeHead(200, {
          'Content-Length': htmlBuf.length,
          'Content-Type': contentType,
          'ETag': etag,
          'Last-Modified': lastModified,
          'Cache-Control': cacheHeader,
          'Access-Control-Allow-Origin': '*',
          'Accept-Ranges': 'bytes',
        });
        res.end(htmlBuf);
      }
    } else {
      const acceptEncoding = req.headers['accept-encoding'] || '';
      const stream = fs.createReadStream(filePath);
      stream.on('error', () => {});
      res.on('close', () => { stream.destroy(); });

      if (COMPRESSIBLE.has(ext) && acceptEncoding.includes('gzip')) {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding',
          'ETag': etag,
          'Last-Modified': lastModified,
          'Cache-Control': cacheHeader,
          'Access-Control-Allow-Origin': '*',
        });
        const gz = zlib.createGzip();
        gz.on('error', () => {});
        stream.pipe(gz).pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': contentType,
          'ETag': etag,
          'Last-Modified': lastModified,
          'Cache-Control': cacheHeader,
          'Access-Control-Allow-Origin': '*',
          'Accept-Ranges': 'bytes',
        });
        stream.pipe(res);
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${reqPath}`);
  }
});

process.on('uncaughtException', (err) => {
  if (err.code !== 'ECONNRESET' && err.code !== 'EPIPE') {
    console.error('Server handled exception:', err.message);
  }
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  Kotha's Atelier website is running locally:`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
