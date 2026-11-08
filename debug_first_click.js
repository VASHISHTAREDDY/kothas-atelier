const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('1. Go to dovetail-house ...');
  await page.goto('http://localhost:8080/residential-portfolio/dovetail-house/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  console.log('2. Click CTA to go to seymour-walk ...');
  await page.click('.component-expanding-cta a');
  await page.waitForTimeout(2000);
  console.log('Now at:', page.url());

  // Check CTA element on seymour-walk
  const ctaInfo = await page.evaluate(() => {
    const aEl = document.querySelector('.component-expanding-cta a');
    return {
      hrefAttr: aEl.getAttribute('href'),
      hrefProp: aEl.href,
      classes: aEl.parentElement.className,
      hasClickHandler: typeof jQuery._data(aEl, 'events') !== 'undefined'
    };
  });
  console.log('CTA info on seymour-walk:', ctaInfo);

  console.log('3. Clicking CTA on seymour-walk for the first time ...');
  await page.evaluate(() => {
    window._clickedCount = (window._clickedCount || 0) + 1;
    console.log('Triggering click on CTA...');
    document.querySelector('.component-expanding-cta a').click();
  });
  await page.waitForTimeout(2000);
  console.log('URL after first click:', page.url());

  console.log('4. Clicking CTA on seymour-walk for the second time ...');
  await page.evaluate(() => {
    document.querySelector('.component-expanding-cta a').click();
  });
  await page.waitForTimeout(2000);
  console.log('URL after second click:', page.url());

  await browser.close();
})();
