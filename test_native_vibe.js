const { chromium } = require('playwright-core');

(async () => {
  try {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });

    // Desktop
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:8080/residential-portfolio/alexander-place/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    // Click View Project
    const btn = await page.locator('.captions-full .is-selected .loadpage');
    if (await btn.count() > 0) {
      await btn.first().click();
      await page.waitForTimeout(1800);
    } else {
      await page.evaluate(() => window.scrollTo(0, 950));
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: 'villa_native_vibe_desktop.png' });

    // Mobile
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://localhost:8080/residential-portfolio/alexander-place/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2500);
    const mbtn = await mobilePage.locator('.captions-full .is-selected .loadpage');
    if (await mbtn.count() > 0) {
      await mbtn.first().click();
      await mobilePage.waitForTimeout(1800);
    } else {
      await mobilePage.evaluate(() => window.scrollTo(0, 950));
      await mobilePage.waitForTimeout(1000);
    }
    await mobilePage.screenshot({ path: 'villa_native_vibe_mobile.png' });

    console.log('Screenshots taken successfully!');
    await browser.close();
  } catch (e) {
    console.error(e.message);
  }
})();
