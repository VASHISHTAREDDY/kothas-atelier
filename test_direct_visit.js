const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/residential-portfolio/the-urban-edge/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const directInfo = await page.evaluate(() => {
    return {
      h1: jQuery('h1').text(),
      h2: jQuery('h2').map((i, el) => jQuery(el).text()).get(),
      visibleText: jQuery('#content').text().slice(0, 300).replace(/\s+/g, ' '),
      bodyClasses: document.body.className
    };
  });
  console.log('Direct visit info:', directInfo);

  await browser.close();
})();
