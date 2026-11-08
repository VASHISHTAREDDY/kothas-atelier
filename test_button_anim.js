const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/residential-portfolio/', { waitUntil: 'domcontentloaded' });
  
  for (let s = 0; s <= 6; s++) {
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const btn = jQuery('.captions-full .is-selected button.loadpage');
      const captions = jQuery('.captions-full');
      return {
        captionsVis: captions.css('visibility'),
        captionsAlpha: captions.css('opacity'),
        btnCount: btn.length,
        btnText: btn.text().trim(),
        btnVis: btn.css('visibility'),
        btnIn: btn.hasClass('in'),
        btnOpacity: btn.css('opacity')
      };
    });
    console.log(`After ${s + 1}s:`, info);
  }

  await browser.close();
})();
