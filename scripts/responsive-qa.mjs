import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

// Browser acceptance suite for the current 2026 one-category-per-page site.
// Runs on a production build served locally; no private Timely access needed.
const base = 'http://127.0.0.1:4173';
const sizes = [375, 390, 768, 1440];
const failures = [];
const server = spawn(process.execPath, ['./node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'pipe' });
server.stderr.on('data', data => process.stderr.write(data));
server.stdout.on('data', data => process.stdout.write(data));
let browser;
const run = async (name, callback) => {
  try { await callback(); console.log('PASS', name); }
  catch (error) { failures.push({ name, error: String(error) }); console.error('FAIL', name, error); }
};
const isVisible = async (locator) => locator.count().then(n => n > 0 ? locator.first().isVisible() : false);
const awaitServer = async () => {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(base)).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Production preview did not start');
};
try {
  await awaitServer();
  await mkdir('qa-screenshots', { recursive: true });
  browser = await chromium.launch({ headless: true });
  for (const width of sizes) {
    const page = await browser.newPage({ viewport: {width, height: 850}, deviceScaleFactor: 1 });
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(18000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const visit = async (path) => {
      const resp = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      assert(resp?.ok(), path + ': HTTP ' + resp?.status());
      await page.locator('h1').first().waitFor();
      await page.waitForTimeout(400);
      const overflow = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth);
      assert(overflow <= 4, path + ' has horizontal overflow of ' + overflow + 'px');
    };
    const capture = async name => page.screenshot({path:'qa-screenshots/' + width + '-' + name + '.png',fullPage:true,animations:'disabled',timeout:30000});
    await run(width + 'px homepage and six categories', async () => {
      await visit('/');
      const cats = ['cosmetic-tattooing','brow-artistry','lash-treatments','skin-treatments','teeth-whitening','waxing'];
      for (const id of cats) {
        assert(await page.locator('a[href$="/services/categories/' + id + '"]').count() > 0, 'Missing category ' + id);
      }
      assert(await page.getByText('Meet Livia', { exact:true }).count() > 0, 'Missing Meet Livia');
      assert.equal(await page.locator('[data-floating-whatsapp]').count(),1,'Expected exactly one global WhatsApp');
      assert.equal(await page.locator('#boton-flotante').count(),1,'Expected exactly one global booking control');
      await capture('home');
    });
    await run(width + 'px services directory', async () => {
      await visit('/services');
      assert(await page.getByRole('heading', {name:/Beauty Treatments in Greenslopes, Brisbane/i}).count() > 0);
      assert(await page.locator('a[href$="/services/categories/waxing"]').count() > 0);
      assert(await page.locator('a[href*="gettimely.com"]').count() > 0);
      if(width < 1024){
        assert.equal(await page.locator('#boton-flotante').evaluate(el => getComputedStyle(el).display),'none');
        assert.equal(await page.locator('[data-floating-whatsapp]').evaluate(el => getComputedStyle(el).display),'none');
        assert(await page.locator('a[href*="wa.me"]').count() > 0,'Inline WhatsApp needed when floating control hides');
      }
      await capture('services');
    });
    await run(width + 'px Cosmetic Tattooing navigation and booking',async()=>{
      await visit('/services/categories/cosmetic-tattooing');
      assert(await page.getByRole('heading',{name:'Cosmetic Tattooing',exact:true}).count() > 0);
      const nano = page.locator('#treatment-nano-strokes');
      assert(await nano.count() === 1,'Nano Strokes category entry missing');
      if(!(await nano.evaluate(el=>el.open))) await nano.locator('summary').click();
      assert((await nano.innerText()).includes('About this treatment'));
      assert((await nano.innerText()).includes('Touch-up from 28 to 45 days: A$150'));
      const lip = page.locator('#treatment-lip-blush');
      assert((await lip.innerText()).includes('Touch-up from 28–45 days'), 'Lip Blush touch-up timeline does not match Timely screenshot');
      // Exact values visible in Livia's updated Timely service screenshot.
      const tattooPage = await page.locator('[data-inline-booking-page]').innerText();
      for (const amount of ['A$630', 'A$150', 'A$35', 'A$300']) {
        assert(tattooPage.includes(amount), 'Missing updated cosmetic tattoo price: ' + amount);
      }
      for (const timing of ['Consultation', '20 minutes', 'Annual Colour', '1 hour, 50 minutes']) {
        assert(tattooPage.includes(timing), 'Missing updated cosmetic tattoo appointment: ' + timing);
      }
      assert(await nano.locator('a[href*="gettimely.com"]').count()>0);
      assert(await nano.locator('a[href*="wa.me"]').count()>0);
      const thumbnailPhotos = await nano.locator('#service-photos-nano-strokes button img').evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
      assert(new Set(thumbnailPhotos).size===thumbnailPhotos.length,'Repeated thumbnail inside Nano gallery');
      if(width < 1024)assert.equal(await page.locator('#boton-flotante').evaluate(el=>getComputedStyle(el).display),'none');
      await capture('cosmetic-tattooing');
    });
    await run(width + 'px Nano Strokes page, images, aftercare and CTAs', async()=>{
      await visit('/services/nano-strokes');
      const body = await page.locator('body').innerText();
      for(const phrase of ['About this treatment','Is this treatment right for me?','Fine, natural-looking hair strokes','Initial appointment: A$630','Touch-up from 28 to 45 days: A$150','Before','After','How long do Nano Strokes last?']){
        assert(body.includes(phrase),'Missing approved Nano copy: '+phrase);
      }
      assert(!body.includes('How does it work?'),'Duplicate How does it work remains');
      assert(!body.includes('Touch-up at 30–45 days: A$120'), 'Superseded Nano Strokes touch-up price remains');
      assert(body.includes('Approximately 1 hour, 30 minutes'), 'Correct Nano Strokes touch-up duration missing');
      const hero = page.locator('[data-nano-strokes-view] img').first();
      assert(await hero.count() > 0,'Nano cover missing');
      await hero.scrollIntoViewIfNeeded();
      await hero.evaluate(img => img.complete ? undefined : new Promise((resolve,reject)=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',reject,{once:true});}));
      assert(await hero.evaluate(img=>img.naturalWidth>0),'Nano cover failed to load');
      assert(await page.locator('a[href*="gettimely.com"]').count() > 0);
      assert(await page.locator('a[href*="wa.me"]').count() > 0);
      if(width < 1024){
        assert.equal(await page.locator('#boton-flotante').evaluate(el=>getComputedStyle(el).display),'none');
        assert.equal(await page.locator('[data-floating-whatsapp]').evaluate(el=>getComputedStyle(el).display),'none');
      }
      await capture('nano-strokes');
    });
    await run(width + 'px course gallery without repeated videos',async()=>{
      await visit('/courses');
      assert.equal(await page.locator('#available-courses article').count(),3,'The site currently offers three verified course cards');
      const nano = await page.locator('#available-courses video').evaluateAll(videos=>videos.map(video=>video.getAttribute('src')).filter(Boolean));
      assert.equal(nano.length,8,'Expected 3 Nano Strokes plus 5 combined-class videos');
      assert.equal(new Set(nano).size,nano.length,'Repeated training video URL');
      await capture('courses');
    });
    assert.equal(errors.length,0,width+'px runtime JavaScript errors: '+errors.join(' | '));
    await page.close();
  }
} finally {
  if(browser)await browser.close();
  server.kill('SIGTERM');
}
if(failures.length){console.error(JSON.stringify({failures},null,2));process.exitCode=1;}
else console.log('PASS all browser smoke tests across phone, tablet and desktop widths.');
