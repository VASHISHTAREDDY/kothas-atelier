const fs = require('fs');

let js = fs.readFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js.bak', 'utf8');

// --- 1. Replace a.pnp.initSmoothstate ---
const start1 = js.indexOf('a.pnp.initSmoothstate=function(){');
const end1 = js.indexOf('a.pnp.syncProjectHeader=function(){');

const target1New = `a.pnp.initSmoothstate=function(){var b=a("#content");if(!b.length||b.data("smoothState"))return;if(!b.children(".old-content").length)b.wrapInner('<div class="old-content">');a(".smoothstate").length&&b.smoothState({cacheLength:4,debug:!1,anchors:".smoothstate a, .smoothstate button",blacklist:"form, .no-smoothState, .wpcf7-form",forms:"form",prefetch:!0,prefetchOn:"aim",scroll:!1,loadingClass:"",onBefore:function(url,container){},onStart:{duration:320,render:function(container){null!==window.countDown&&void 0!==window.countDown&&(window.countDown.pause(),window.countDown.seek(0));var c=a(".component-expanding-cta");c.addClass("clicked");a(".nav-container").hasClass("white")||a(".nav-container").addClass("white");a(".nav-container").hasClass("black")&&a(".nav-container").removeClass("black");TweenMax.to(a(".nav-container .project"),.3,{autoAlpha:0});if(a.pnp.triggeredFromFooter){TweenMax.to(c.find("a"),1.2,{height:"100vh",ease:Cubic.easeInOut,onStart:function(){if(a(".slider-nav").length&&(a(".nav-container").hasClass("black")&&a(".nav-container").removeClass("black"),a(".slider-nav ul li").each(function(b){var c=a(this),d=c.find(".inner").attr("data-link");var curTargetClean=(a.pnp.currentTarget||"").replace(window.location.origin,"").replace(/^https?:\\\/\\\/[^\\\/]+/,"").replace(/\\\/index\\.html$/,"").replace(/\\\/$/,""),slideClean=(d||"").replace(window.location.origin,"").replace(/^https?:\\\/\\\/[^\\\/]+/,"").replace(/\\\/index\\.html$/,"").replace(/\\\/$/,"");var getSlug=function(u){return(u||"").split("?")[0].split("#")[0].replace(/\\\/index\\.html$/,"").replace(/\\\/$/,"").split("/").pop()};var curTargetSlug=getSlug(a.pnp.currentTarget),slideSlug=getSlug(d);if(slideClean&&slideClean!=="#"&&(slideClean===curTargetClean||a.pnp.currentTarget.indexOf(d)>-1||(curTargetSlug&&curTargetSlug===slideSlug))&&"http://mm.test"!==d&&"http://minaleandmannnew.pnpd.co.uk"!==d&&"https://minaleandmannnew.pnpd.co.uk"!==d){var e=a(".slider-nav>.slider-wrapper>.slides"),f=e.data("flickity");f&&f.select(b,!1,!0);var g=a(".slider-nav .captions-full ul"),h=g.data("flickity");h&&h.select(b,!1,!0)}})),window.scenes.length>0){for(var b=0;b<window.scenes.length;b++)window.scenes[b].destroy(!0),window.scenes[b]=null;window.controller.destroy(!0),window.controller=null}}})}else{TweenMax.to(b,0.3,{autoAlpha:0,ease:Power2.easeOut})}}},onReady:{duration:10,render:function(container,newContent){try{var ss=container.data("smoothState");if(ss&&ss.cache&&ss.href&&ss.cache[ss.href]&&ss.cache[ss.href].doc){var bm=ss.cache[ss.href].doc.match(/<body[^>]*class=["']([^"']*)["']/i);if(bm&&bm[1])document.body.className=bm[1];}}catch(e){}container.empty();var wrapped=a('<div class="old-content"></div>').append(newContent);container.append(wrapped);a("html,body").scrollTop(0);window.scrollTo(0,0);if(a.pnp.triggeredFromFooter){if(a(".slider-nav").length){a(".slider-nav").css("display","block");a(".captions-full, .captions-full .caption").css("visibility","hidden");a(".captions-full .caption .loadpage").css("visibility","hidden").removeClass("in");TweenMax.set(a(".captions-full"),{autoAlpha:0});setTimeout(function(){a(".nav-container").removeClass("black");a(".captions-full, .captions-full .caption").css("visibility","visible");TweenMax.to(a(".captions-full"),.5,{autoAlpha:1});},10);}}else{TweenMax.fromTo(container,0.35,{autoAlpha:0},{autoAlpha:1,ease:Power2.easeOut});}a.pnp.enableScroll&&a.pnp.enableScroll();a.pnp.initPage(!0);a.pnp.initViewportChecker();a.pnp.syncProjectHeader&&a.pnp.syncProjectHeader();$window.trigger("resize");}},onAfter:function(b,c){a("input[name=current-url]").length&&a("input[name=current-url]").attr("value",window.location.href);a.pnp.syncProjectHeader&&a.pnp.syncProjectHeader();$window.trigger("resize");}})},`;

js = js.slice(0, start1) + target1New + js.slice(end1);
console.log('Replaced target 1 (initSmoothstate)');

// --- 2. Loader session skip ---
const target2Old = `var a=2400,b=$(".preload .component-loading-screen"),c=$(".captions-full li:first-child .caption h5").length?$(".captions-full li:first-child .caption h5"):$(".captions-full li:first-child .caption p");try{if(sessionStorage.getItem("mm_skip_loader")==="true"){sessionStorage.removeItem("mm_skip_loader"),b.remove(),$("html").removeClass("preload");return}}catch(e){}`;
const target2New = `var a=2400,b=$(".preload .component-loading-screen"),c=$(".captions-full li:first-child .caption h5").length?$(".captions-full li:first-child .caption h5"):$(".captions-full li:first-child .caption p");try{if(sessionStorage.getItem("mm_visited")==="true"||sessionStorage.getItem("mm_skip_loader")==="true"){sessionStorage.removeItem("mm_skip_loader"),b.remove(),$("html").removeClass("preload");return}else{sessionStorage.setItem("mm_visited","true");}}catch(e){}`;

if (js.includes(target2Old)) {
  js = js.replace(target2Old, target2New);
  console.log('Replaced target 2 (loader)');
}

// --- 3. Zoomed-out click single tap zoom in ---
const target3Old = `D&&u.hasClass("zoomed-out")&&(b.hasClass("is-selected")&&j(),t.flickity("select",a,!1,!1))`;
const target3New = `D&&u.hasClass("zoomed-out")&&(t.flickity("select",a,!1,!1),j())`;

if (js.includes(target3Old)) {
  js = js.replace(target3Old, target3New);
  console.log('Replaced target 3 (zoomed-out card click)');
}

// --- 4. Intercept clicks on .nav-container .project & Sync Project Header ---
const start5 = js.indexOf('a.pnp.syncProjectHeader=function(){');
const end5 = js.indexOf('a.pnp.initPage=function(b){');

const target5New = `$(document).on("click",".nav-container .project",function(e){e.preventDefault();e.stopPropagation();var cur=(window.location.pathname||"").replace(/\\\/index\\.html$/,"").replace(/\\\/$/,"");if(cur.indexOf("/residential-portfolio/")===0&&cur!=="/residential-portfolio"){window.location.href="/residential-portfolio/";}else if(cur.indexOf("/commercial-portfolio/")===0&&cur!=="/commercial-portfolio"){window.location.href="/commercial-portfolio/";}});a.pnp.syncProjectHeader=function(){try{var cur=(window.location.pathname||"").replace(/\\\/index\\.html$/,"").replace(/\\\/$/,"");var slug=cur.split("/").pop();var title="";var map={"the-urban-edge":"The Urban Edge","dovetail-house":"Dovetail House","seymour-walk":"Farmhouse","alexander-place":"Villa","no-40":"House","residential-portfolio":"Portfolio","commercial-portfolio":"Portfolio","the-archway-69":"The Archway 69","the-rock":"The Rock"};if(slug&&map[slug]){title=map[slug];}else if(slug){a(".slider-nav ul.slides li").each(function(){var d=a(this).find(".inner").attr("data-link")||"";var s=d.split("?")[0].split("#")[0].replace(/\\\/index\\.html$/,"").replace(/\\\/$/,"").split("/").pop();if(s===slug){var p=a(this).find(".append p").text()||a(this).find("p").first().text();if(p)title=p;}});}if(!title){var h=a(".captions-full li.is-selected .inner .caption h4");if(h.length)title=h.text();}if(title){a(".project .case, .project>.case").html(title);a(".project").css({opacity:1,visibility:"visible"});}else if(cur===""||cur==="/"){a(".project").css({opacity:0});}}catch(e){}};`;

js = js.slice(0, start5) + target5New + js.slice(end5);
console.log('Replaced target 4 & 5 (project click + header sync)');

fs.writeFileSync('public/wp-content/themes/pegasus/dist/js/global.min3c82.js', js, 'utf8');
console.log('Successfully wrote updated global.min3c82.js!');
