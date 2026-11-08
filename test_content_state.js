const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('1. Going to /residential-portfolio/ ...');
  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('2. Clicking first slide to zoom in ...');
  await page.click('.slides li:first-child');
  await page.waitForTimeout(1500);

  console.log('3. Clicking "View Project" button ...');
  await page.click('.captions-full .is-selected button.loadpage');
  await page.waitForTimeout(3500);

  const info = await page.evaluate(() => {
    return {
      url: window.location.href,
      contentHtmlLength: jQuery('#content').html().length,
      oldContentLength: jQuery('.old-content').length,
      oldContentHtmlLength: jQuery('.old-content').html() ? jQuery('.old-content').html().length : 0,
      contentChildrenTags: jQuery('#content').children().map((i, el) => el.tagName + '.' + el.className).get(),
      visibleText: jQuery('#content').text().slice(0, 300).replace(/\s+/g, ' ')
    };
  });
  console.log('After transition info:', info);

  await browser.close();
})();
