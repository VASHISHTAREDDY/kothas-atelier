const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[PAGE ERROR] ${err.message}`));

  console.log('--- STEP 1: Load Homepage ---');
  let t = Date.now();
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  console.log('Homepage loaded in', Date.now() - t, 'ms. Title:', await page.title());

  console.log('--- STEP 2: Navigate to /residential-portfolio/ via menu ---');
  t = Date.now();
  await page.click('.navbar-toggle-overlay');
  await page.waitForTimeout(600);
  await page.click('.main a[data-trigger="3394"]');
  await page.waitForTimeout(600);
  await page.click('.submenu.first [class*="3394"] a[href*="residential-portfolio"]');
  await page.waitForTimeout(2000);
  console.log('Navigated to', page.url(), 'in', Date.now() - t, 'ms. Title:', await page.title());

  console.log('--- STEP 3: Click "VIEW PROJECT" on first slide (The Urban Edge) ---');
  t = Date.now();
  const urbanBtn = page.locator('.captions-full .is-selected button.loadpage');
  console.log('Button text:', await urbanBtn.innerText().catch(() => 'none'));
  await urbanBtn.click();
  
  // Track URL change
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('the-urban-edge')) break;
  }
  console.log('URL reached:', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  console.log('--- STEP 4: Next Project CTA on The Urban Edge ---');
  t = Date.now();
  const cta1 = page.locator('.component-expanding-cta a');
  console.log('CTA link:', await cta1.getAttribute('href'));
  await cta1.click();
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('dovetail-house')) break;
  }
  console.log('URL reached:', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  console.log('--- STEP 5: Next Project CTA on Dovetail House ---');
  t = Date.now();
  const cta2 = page.locator('.component-expanding-cta a');
  console.log('CTA link:', await cta2.getAttribute('href'));
  await cta2.click();
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('seymour-walk')) break;
  }
  console.log('URL reached:', page.url(), 'in', Date.now() - t, 'ms');

  console.log('\n--- ERRORS & LOGS ENCOUNTERED ---');
  logs.filter(l => l.includes('ERROR') || l.includes('error') || l.includes('fail')).forEach(l => console.log(l));

  await browser.close();
})();
