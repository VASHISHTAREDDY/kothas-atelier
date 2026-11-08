const fs = require('fs');
const content = fs.readFileSync('public/residential-portfolio/index.html', 'utf8');

const slidesMatch = content.match(/<ul[^>]*class="[^"]*slides[^"]*"[^>]*>([\s\S]*?)<\/ul>/)[1];
const captionsMatch = content.match(/<div class="captions-full">[\s\S]*?<ul>([\s\S]*?)<\/ul>/)[1];

const sLis = slidesMatch.match(/<li[\s\S]*?<\/li>/g);
const cLis = captionsMatch.match(/<li[\s\S]*?<\/li>/g);

for (let i = 0; i < 5; i++) {
  console.log(`=== SLIDE ${i + 1} ===`);
  const sLink = sLis[i].match(/data-link="([^"]*)"/);
  const sBg = sLis[i].match(/style="([^"]*)"/);
  const sPoster = sLis[i].match(/data-poster="([^"]*)"/);
  const sDesktop = sLis[i].match(/data-desktop="([^"]*)"/);
  const sAppP = sLis[i].match(/<p>([\s\S]*?)<\/p>/);
  
  const cLink = cLis[i].match(/data-link="([^"]*)"/);
  const cH4 = cLis[i].match(/<h4>([\s\S]*?)<\/h4>/);
  const cSeo = cLis[i].match(/<div class="seo-title">([\s\S]*?)<\/div>/);
  
  console.log('Slide link:', sLink ? sLink[1] : '');
  console.log('Slide img:', sDesktop ? sDesktop[1] : (sPoster ? sPoster[1] : (sBg ? sBg[1] : '')));
  console.log('Slide append text:', sAppP ? sAppP[1].trim() : '');
  console.log('Caption link:', cLink ? cLink[1] : '');
  console.log('Caption h4:', cH4 ? cH4[1].trim() : '');
  console.log('Caption seo:', cSeo ? cSeo[1].trim() : '');
}
