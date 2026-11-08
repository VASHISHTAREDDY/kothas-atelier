const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.click('.slides li:first-child');
  await page.waitForTimeout(1500);
  await page.click('.captions-full .is-selected button.loadpage');
  await page.waitForTimeout(3500);

  const html = await page.evaluate(() => {
    return document.getElementById('content').innerHTML.slice(0, 1500);
  });
  console.log('HTML after transition:', html);

  await browser.close();
})();
