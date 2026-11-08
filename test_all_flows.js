const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('\n--- TEST 1: Homepage Slide Button ---');
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // Check initial index & select slide 1 (Residential Architectural Design)
  await page.evaluate(() => {
    const flk = jQuery('.slider-nav>.slider-wrapper>.slides').data('flickity');
    if (flk) flk.select(1, false, true);
  });
  await page.waitForTimeout(1000);

  const btnText = await page.locator('.captions-full .is-selected button.loadpage').innerText().catch(() => 'no btn');
  console.log('Selected slide button text:', btnText);

  const t0 = Date.now();
  await page.click('.captions-full .is-selected button.loadpage');
  console.log('Clicked slide button. Waiting for URL to change...');
  
  let changed = false;
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(100);
    if (page.url() !== 'http://localhost:8080/') {
      console.log(`URL changed to ${page.url()} after ${Date.now() - t0}ms`);
      changed = true;
      break;
    }
  }
  if (!changed) console.log('URL DID NOT CHANGE after 4 seconds! Still:', page.url());

  console.log('\n--- TEST 2: Project Page Expanding CTA ---');
  await page.goto('http://localhost:8080/residential-portfolio/no-40/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Current page URL:', page.url());
  const ctaLink = await page.locator('.component-expanding-cta a').first();
  console.log('Expanding CTA exists:', await ctaLink.count());
  const ctaHref = await ctaLink.getAttribute('href');
  console.log('Expanding CTA href:', ctaHref);

  const t2 = Date.now();
  await ctaLink.click();
  console.log('Clicked expanding CTA. Waiting for navigation...');
  changed = false;
  for (let i = 0; i < 50; i++) {
    await page.waitForTimeout(100);
    if (!page.url().includes('no-40')) {
      console.log(`URL changed to ${page.url()} after ${Date.now() - t2}ms`);
      changed = true;
      break;
    }
  }
  if (!changed) console.log('URL DID NOT CHANGE after 5 seconds! Still:', page.url());

  console.log('\n--- TEST 3: Side Menu Navigation ---');
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Opening side menu...');
  await page.click('.navbar-toggle-overlay');
  await page.waitForTimeout(800);

  const menuVisible = await page.locator('#side-menu-container').isVisible();
  console.log('Side menu visible:', menuVisible);

  console.log('Clicking Portfolio in menu...');
  await page.click('.main a[data-trigger="3394"]');
  await page.waitForTimeout(800);

  const subVisible = await page.locator('.submenu.first-level.3394, .first-level.3394').isVisible().catch(() => false);
  console.log('Portfolio submenu visible:', subVisible);

  console.log('Clicking Residential in submenu...');
  const resLink = page.locator('.first-level.3394 a[href*="residential-portfolio"]');
  console.log('Residential link count:', await resLink.count());
  const t3 = Date.now();
  await resLink.click();
  await page.waitForTimeout(2000);
  console.log('URL after clicking Residential:', page.url(), '(took', Date.now() - t3, 'ms)');

  await browser.close();
})();
