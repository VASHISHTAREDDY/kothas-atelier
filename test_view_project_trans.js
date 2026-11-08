const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('1. Going to /residential-portfolio/ ...');
  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('2. Clicking first slide to zoom in ...');
  await page.click('.slides li:first-child');
  await page.waitForTimeout(1500);

  // Check button
  const btn = page.locator('.captions-full .is-selected button.loadpage');
  console.log('Button visible?', await btn.isVisible());

  console.log('3. Clicking "View Project" button ...');
  const t0 = Date.now();
  await btn.click();

  // Watch URL and DOM state
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(200);
    const url = page.url();
    const contentHtml = await page.evaluate(() => {
      return {
        url: window.location.href,
        contentCount: jQuery('#content').length,
        nestedContentCount: jQuery('#content #content').length,
        oldContentCount: jQuery('.old-content').length,
        h1: jQuery('h1').first().text(),
        h2: jQuery('h2').first().text()
      };
    });
    console.log(`+${Date.now() - t0}ms:`, contentHtml);
    if (url.includes('the-urban-edge')) break;
  }

  await browser.close();
})();
