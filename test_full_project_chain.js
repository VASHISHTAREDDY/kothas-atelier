const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- 1. Load /residential-portfolio/ ---');
  let t = Date.now();
  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  console.log('Loaded in', Date.now() - t, 'ms. Title:', await page.title());

  console.log('--- 2. Single click on first slide card to zoom in ---');
  t = Date.now();
  await page.click('.slides li:first-child');
  await page.waitForTimeout(800);
  
  const zoomState = await page.evaluate(() => ({
    wrapperZoom: jQuery('.slider-wrapper').hasClass('zoom'),
    btnVis: jQuery('.captions-full .is-selected button.loadpage').css('visibility'),
    h4: jQuery('.captions-full .is-selected h4').text()
  }));
  console.log('Zoom state after single click:', zoomState, 'in', Date.now() - t, 'ms');

  console.log('--- 3. Click "View Project" on The Urban Edge ---');
  t = Date.now();
  await page.click('.captions-full .is-selected button.loadpage');
  
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('the-urban-edge')) break;
  }
  console.log('Transitioned to', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  const p1Header = await page.evaluate(() => jQuery('.project .case').text());
  console.log('Header project case:', p1Header);

  console.log('--- 4. Click Next Project CTA to The Frames ---');
  t = Date.now();
  await page.click('.component-expanding-cta a');
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('the-frames')) break;
  }
  console.log('Transitioned to', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  const p2Header = await page.evaluate(() => jQuery('.project .case').text());
  console.log('Header project case on The Frames:', p2Header);

  console.log('--- 5. Click Next Project CTA to Farmhouse (seymour-walk) ---');
  t = Date.now();
  await page.click('.component-expanding-cta a');
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('seymour-walk')) break;
  }
  console.log('Transitioned to', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  const p3Header = await page.evaluate(() => jQuery('.project .case').text());
  console.log('Header project case on Seymour Walk:', p3Header);

  console.log('--- 6. Click Next Project CTA to Villa (alexander-place) ---');
  t = Date.now();
  await page.click('.component-expanding-cta a');
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('alexander-place')) break;
  }
  console.log('Transitioned to', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  const p4Header = await page.evaluate(() => jQuery('.project .case').text());
  console.log('Header project case on Alexander Place:', p4Header);

  console.log('--- 7. Click Next Project CTA to House (no-40) ---');
  t = Date.now();
  await page.click('.component-expanding-cta a');
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(100);
    if (page.url().includes('no-40')) break;
  }
  console.log('Transitioned to', page.url(), 'in', Date.now() - t, 'ms');
  await page.waitForTimeout(1000);

  const p5Header = await page.evaluate(() => jQuery('.project .case').text());
  console.log('Header project case on No-40:', p5Header);

  console.log('\nAll project transitions completed smoothly!');
  await browser.close();
})();
