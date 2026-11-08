const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const state1 = await page.evaluate(() => {
    return {
      wrapperZoom: jQuery('.slider-wrapper').hasClass('zoom'),
      wrapperZoomedOut: jQuery('.slider-wrapper').hasClass('zoomed-out'),
      selectedSlideIndex: jQuery('.slides .is-selected').index()
    };
  });
  console.log('State initially on residential-portfolio:', state1);

  // Now click on the first slide
  console.log('Clicking on first slide...');
  await page.click('.slides li:first-child');
  await page.waitForTimeout(1000);

  const state2 = await page.evaluate(() => {
    return {
      wrapperZoom: jQuery('.slider-wrapper').hasClass('zoom'),
      wrapperZoomedOut: jQuery('.slider-wrapper').hasClass('zoomed-out'),
      selectedSlideIndex: jQuery('.slides .is-selected').index(),
      captionsVis: jQuery('.captions-full').css('visibility'),
      captionsAlpha: jQuery('.captions-full').css('opacity')
    };
  });
  console.log('State after clicking first slide:', state2);

  // Click it again (since first click selects, second click zooms in j())
  console.log('Clicking first slide again...');
  await page.click('.slides li:first-child');
  await page.waitForTimeout(2000);

  const state3 = await page.evaluate(() => {
    return {
      wrapperZoom: jQuery('.slider-wrapper').hasClass('zoom'),
      wrapperZoomedOut: jQuery('.slider-wrapper').hasClass('zoomed-out'),
      captionsVis: jQuery('.captions-full').css('visibility'),
      captionsAlpha: jQuery('.captions-full').css('opacity'),
      btnVis: jQuery('.captions-full .is-selected button.loadpage').css('visibility')
    };
  });
  console.log('State after second click (zoom-in):', state3);

  await browser.close();
})();
