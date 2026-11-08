const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:8080/residential-portfolio/no-40/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const res = await page.evaluate(() => {
    var cur = (window.location.pathname || "").replace(/\/index\.html$/, "").replace(/\/$/, "");
    var slug = cur.split("/").pop();
    var map = {
      "the-urban-edge": "The Urban Edge",
      "dovetail-house": "Dovetail House",
      "seymour-walk": "Farmhouse",
      "alexander-place": "Villa",
      "no-40": "House",
      "residential-portfolio": "Portfolio",
      "commercial-portfolio": "Portfolio",
      "the-archway-69": "The Archway 69",
      "the-rock": "The Rock"
    };
    return {
      pathname: window.location.pathname,
      cur: cur,
      slug: slug,
      mapped: map[slug],
      caseText: jQuery('.project .case').text()
    };
  });
  console.log('Evaluation on no-40:', res);

  await browser.close();
})();
