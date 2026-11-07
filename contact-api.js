const fs = require('fs');
const path = require('path');

const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'contacts.json');
const SUBMISSIONS_LOG = path.join(SUBMISSIONS_DIR, 'contacts.log');

// Ensure submissions directory exists
if (!fs.existsSync(SUBMISSIONS_DIR)) {
  fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
}

function parseUrlEncoded(str) {
  const result = {};
  if (!str) return result;
  for (const pair of str.split('&')) {
    const parts = pair.split('=');
    const k = parts[0];
    const v = parts.slice(1).join('=');
    if (k) {
      result[decodeURIComponent(k.replace(/\+/g, ' '))] = decodeURIComponent((v || '').replace(/\+/g, ' '));
    }
  }
  return result;
}

function parseMultipart(buffer, boundary) {
  const result = {};
  if (!buffer || !boundary) return result;
  const boundaryBuffer = Buffer.from('--' + boundary);
  let start = 0;
  while (true) {
    const bIndex = buffer.indexOf(boundaryBuffer, start);
    if (bIndex === -1) break;
    const nextStart = bIndex + boundaryBuffer.length;
    if (buffer[nextStart] === 45 && buffer[nextStart + 1] === 45) break; // Trailing '--'
    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), nextStart);
    if (headerEnd === -1) break;
    const headersStr = buffer.slice(nextStart, headerEnd).toString('utf8');
    const nameMatch = headersStr.match(/name="([^"]+)"/);
    if (nameMatch) {
      const fieldName = nameMatch[1];
      const partBodyStart = headerEnd + 4;
      const nextBIndex = buffer.indexOf(boundaryBuffer, partBodyStart);
      if (nextBIndex !== -1) {
        const partBodyEnd = (buffer[nextBIndex - 2] === 13 && buffer[nextBIndex - 1] === 10) ? nextBIndex - 2 : nextBIndex;
        result[fieldName] = buffer.slice(partBodyStart, partBodyEnd).toString('utf8').trim();
      }
    }
    start = nextStart;
  }
  return result;
}

function saveSubmission(data) {
  try {
    let list = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      try {
        list = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
      } catch (e) {
        list = [];
      }
    }
    list.push(data);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');

    // Append to human-readable log
    const logLine = `[${data.receivedAt}] ${data.name} <${data.email}> | Phone: ${data.phone} | Subject: ${data.subject}\nMessage: ${data.message}\n---\n`;
    fs.appendFileSync(SUBMISSIONS_LOG, logLine, 'utf8');
  } catch (err) {
    console.error('Error saving contact submission:', err.message);
  }
}

function handleContactRequest(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Authorization'
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const chunks = [];
  let totalLength = 0;

  req.on('data', chunk => {
    chunks.push(chunk);
    totalLength += chunk.length;
    // Limit to 5MB
    if (totalLength > 5 * 1024 * 1024) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Payload Too Large' }));
      req.destroy();
    }
  });

  req.on('end', () => {
    const rawBuffer = Buffer.concat(chunks);
    const contentType = req.headers['content-type'] || '';
    let fields = {};

    try {
      if (contentType.includes('application/json')) {
        fields = JSON.parse(rawBuffer.toString('utf8') || '{}');
      } else if (contentType.includes('multipart/form-data')) {
        const boundaryMatch = contentType.match(/boundary=([^;]+)/i);
        if (boundaryMatch) {
          const boundary = boundaryMatch[1].trim().replace(/^"|"$/g, '');
          fields = parseMultipart(rawBuffer, boundary);
        }
      } else {
        fields = parseUrlEncoded(rawBuffer.toString('utf8'));
      }
    } catch (parseErr) {
      console.error('Failed to parse contact form body:', parseErr.message);
    }

    // Extract standardized inquiry fields
    const formId = fields._wpcf7 || fields._wpcf7_unit_tag || '3299';
    const submission = {
      id: 'inq_' + Date.now(),
      receivedAt: new Date().toISOString(),
      name: fields['your-name'] || fields.name || fields.fullName || 'Prospective Client',
      email: fields['your-email'] || fields.email || '',
      phone: fields['your-phone'] || fields['your-tel'] || fields.phone || fields.tel || '',
      subject: fields['your-subject'] || fields.subject || "Kotha's Atelier Website Inquiry",
      message: fields['your-message'] || fields.message || fields.comments || '',
      sourceUrl: fields['current-url'] || req.headers.referer || '/',
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
      raw: fields
    };

    saveSubmission(submission);

    console.log(`\n==================================================`);
    console.log(`  [NEW CONTACT INQUIRY RECEIVED]`);
    console.log(`  Name:    ${submission.name}`);
    console.log(`  Email:   ${submission.email}`);
    console.log(`  Phone:   ${submission.phone}`);
    console.log(`  Message: ${submission.message}`);
    console.log(`  Saved to: submissions/contacts.json`);
    console.log(`==================================================\n`);

    const responsePayload = {
      success: true,
      status: 'mail_sent',
      into: '#' + (fields._wpcf7_unit_tag || 'wpcf7-f3299-p1731-o1'),
      message: "Thank you for your message. It has been sent to Kotha's Atelier Architects."
    };

    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(responsePayload));
  });
}

module.exports = {
  handleContactRequest,
  saveSubmission
};
