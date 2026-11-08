const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to http://localhost:8080/residential-portfolio/no-40/ ...');
  await page.goto('http://localhost:8080/residential-portfolio/no-40/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const headerText = await page.locator('.project .case').innerText();
  console.log('Project header text on no-40:', headerText);

  console.log('Clicking on .project in header...');
  await page.click('.project .case');
  await page.waitForTimeout(1000);
  console.log('URL after clicking project title on no-40:', page.url());

  console.log('Now clicking the LOGO svg...');
  await page.click('#logo_svg');
  await page.waitForTimeout(1000);
  console.log('URL after clicking logo SVG:', page.url());

  await browser.close();
})();
