const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('1. Go to homepage');
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const body1 = await page.evaluate(() => document.body.className);
  console.log('Homepage body class:', body1);

  console.log('2. SmoothState navigate to /architectural-design/ via slide button');
  await page.evaluate(() => {
    const flk = jQuery('.slider-nav>.slider-wrapper>.slides').data('flickity');
    if (flk) flk.select(1, false, true);
  });
  await page.waitForTimeout(1000);
  await page.click('.captions-full .is-selected button.loadpage');
  await page.waitForTimeout(3000);

  const body2 = await page.evaluate(() => ({
    url: window.location.href,
    bodyClass: document.body.className
  }));
  console.log('After slide button navigation:', body2);

  await browser.close();
})();
