const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Opening hamburger menu...');
  await page.click('.navbar-toggle-overlay');
  await page.waitForTimeout(1000);

  const menuInfo = await page.evaluate(() => {
    const sideMenu = jQuery('#side-menu-container');
    const portfolioTrigger = jQuery('.main a[data-trigger="3394"]');
    return {
      sideMenuVisible: sideMenu.is(':visible'),
      sideMenuClasses: sideMenu.attr('class'),
      portfolioTriggerText: portfolioTrigger.text(),
      submenu3394Count: jQuery('.submenu.first [class*="3394"]').length
    };
  });
  console.log('Menu info before clicking Portfolio:', menuInfo);

  console.log('Clicking Portfolio...');
  await page.click('.main a[data-trigger="3394"]');
  await page.waitForTimeout(1200);

  const afterClickInfo = await page.evaluate(() => {
    const sideMenu = jQuery('#side-menu-container');
    const sub3394 = jQuery('.submenu.first [class*="3394"]');
    const subFirst = jQuery('.submenu.first');
    return {
      sideMenuClasses: sideMenu.attr('class'),
      subFirstVisibility: subFirst.css('visibility'),
      subFirstOpacity: subFirst.css('opacity'),
      subFirstTransform: subFirst.css('transform'),
      sub3394Display: sub3394.css('display'),
      sub3394Visible: sub3394.is(':visible'),
      links: sub3394.find('a').map((i, el) => ({ text: jQuery(el).text().trim(), href: jQuery(el).attr('href') })).get()
    };
  });
  console.log('Menu info after clicking Portfolio:', afterClickInfo);

  await browser.close();
})();
