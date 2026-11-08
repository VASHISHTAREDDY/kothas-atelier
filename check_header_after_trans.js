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

  const headerInfo = await page.evaluate(() => {
    return {
      navClasses: jQuery('.nav-container').attr('class'),
      projectText: jQuery('.project .case').text(),
      projectOpacity: jQuery('.project').css('opacity'),
      projectVis: jQuery('.project').css('visibility')
    };
  });
  console.log('Header info after transition:', headerInfo);

  await browser.close();
})();
