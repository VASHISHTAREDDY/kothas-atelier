const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/residential-portfolio/no-40/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Set the text in .case
  await page.evaluate(() => {
    jQuery('.project .case').text('House');
    jQuery('.project').css('opacity', 1);
  });

  const rectBefore = await page.evaluate(() => {
    const img = document.querySelector('.image');
    const proj = document.querySelector('.project');
    const svg = document.querySelector('#logo_svg');
    return {
      img: img.getBoundingClientRect(),
      proj: proj.getBoundingClientRect(),
      svg: svg.getBoundingClientRect()
    };
  });
  console.log('Before moving outside:', rectBefore);

  // Now move .project outside .image
  await page.evaluate(() => {
    const img = document.querySelector('.image');
    const proj = document.querySelector('.project');
    img.parentNode.insertBefore(proj, img.nextSibling);
  });

  const rectAfter = await page.evaluate(() => {
    const img = document.querySelector('.image');
    const proj = document.querySelector('.project');
    const svg = document.querySelector('#logo_svg');
    return {
      img: img.getBoundingClientRect(),
      proj: proj.getBoundingClientRect(),
      svg: svg.getBoundingClientRect()
    };
  });
  console.log('After moving outside:', rectAfter);

  await browser.close();
})();
