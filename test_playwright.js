const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:8080/ ...');
  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Page Title:', await page.title());

  // Check smoothState
  const ssInfo = await page.evaluate(() => {
    return {
      hasJquery: typeof jQuery !== 'undefined',
      hasSS: typeof jQuery !== 'undefined' && typeof jQuery.fn.smoothState !== 'undefined',
      ssInstance: typeof jQuery !== 'undefined' && !!jQuery('#content').data('smoothState'),
      oldContentLength: jQuery('.old-content').length,
      contentChildren: jQuery('#content').children().length
    };
  });
  console.log('smoothState info on home:', ssInfo);

  // Now let's test navigating to Residential Portfolio
  console.log('Navigating to /residential-portfolio/ ...');
  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const resInfo = await page.evaluate(() => {
    return {
      title: document.title,
      currentProjectHeader: jQuery('.project .case').text(),
      headerImageHref: jQuery('.image').attr('href'),
      isProjectInsideImage: jQuery('.image .project').length > 0,
      activeSlideH4: jQuery('.captions-full .is-selected h4').text(),
      firstH4: jQuery('.captions-full h4').first().text(),
      allH4: jQuery('.captions-full h4').map((i, el) => jQuery(el).text()).get()
    };
  });
  console.log('residential-portfolio info:', resInfo);

  // Let's test clicking the project case in the header!
  console.log('Clicking on .project .case in header...');
  const t0 = Date.now();
  await page.click('.project .case');
  await page.waitForTimeout(1000);
  console.log('URL after clicking .project .case:', page.url(), '(took', Date.now() - t0, 'ms)');

  await browser.close();
})();
