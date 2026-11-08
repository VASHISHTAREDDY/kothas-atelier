const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log(`HTTP ${resp.status()}: ${resp.url()}`);
    }
  });

  console.log('1. Go to dovetail-house ...');
  await page.goto('http://localhost:8080/residential-portfolio/dovetail-house/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  console.log('2. Click CTA to go to seymour-walk ...');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('Now at:', page.url());

  console.log('3. Clicking CTA on seymour-walk ...');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('URL after click:', page.url());

  await browser.close();
})();
