const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- 1. Start at Dovetail House ---');
  await page.goto('http://localhost:8080/residential-portfolio/dovetail-house/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  console.log('Dovetail House:', page.url(), '| Header:', await page.locator('.project .case').innerText());

  console.log('--- 2. Click to Seymour Walk (Farmhouse) ---');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('Seymour Walk:', page.url(), '| Header:', await page.locator('.project .case').innerText());

  console.log('--- 3. Click to Alexander Place (Villa) ---');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('Alexander Place:', page.url(), '| Header:', await page.locator('.project .case').innerText());

  console.log('--- 4. Click to No.40 (House) ---');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('No-40:', page.url(), '| Header:', await page.locator('.project .case').innerText());

  console.log('--- 5. Click to The Urban Edge ---');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('The Urban Edge:', page.url(), '| Header:', await page.locator('.project .case').innerText());

  await browser.close();
})();
