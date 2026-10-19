import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
const sizes = [375, 390, 430, 768, 1024, 1440];
const errors = [];
const server = spawn(process.execPath, ['./node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'pipe' });
server.stderr.on('data', (chunk) => process.stderr.write(chunk));
server.stdout.on('data', (chunk) => process.stdout.write(chunk));
const fail = (message, error) => errors.push(`${message}: ${error instanceof Error ? error.message : String(error)}`);
const check = async (name, fn) => { try { await fn(); console.log('PASS', name); } catch (e) { fail(name,e); console.error('FAIL',name,e?.message||e); } };
const available = async () => {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(base)).ok) return; } catch {}
    await new Promise((res) => setTimeout(res, 250));
  }
  throw new Error('Vite preview server did not start');
};
let browser;
try {
  await available();
  await mkdir('qa-screenshots', { recursive: true });
  browser = await chromium.launch({ headless: true });
  for (const width of sizes) {
    const page = await browser.newPage({ viewport: { width, height: 860 }, deviceScaleFactor: 1 });
    page.setDefaultTimeout(7500);
    page.setDefaultNavigationTimeout(15000);
    const jsErrors = [];
    page.on('pageerror', (error) => jsErrors.push(error.message));
    const go = async (path) => {
      const response = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      assert(response?.ok(), `${path}: HTTP status ${response?.status()}`);
      await page.locator('#root h1').first().waitFor();
      await page.waitForTimeout(250);
      const overflow = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth);
      assert(overflow <= 3, `${path} horizontal overflow by ${overflow}px`);
    };

    await check(`${width}px homepage hero, navigation, overflow`, async () => {
      await go('/');
      assert.equal(await page.locator('.hero-cta-sequence button').count(), 3, 'Hero needs Book, Courses and Services');
      const banned = await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')).filter(src => /brows\.png|treatments\.png|brows-result-04|lashes-result-02/.test(src || '')));
      assert.deepEqual(banned, [], 'Client-requested removed photos remain in homepage/gallery');
      await page.screenshot({ path: `qa-screenshots/${width}-home.png`, fullPage: true, animations: 'disabled', timeout: 15000 });
    });

    await check(`${width}px tablet/mobile menu`, async () => {
      if (width >= 1280) return;
      const menu = page.locator('button[aria-controls="bella-mobile-menu"]');
      assert(await menu.isVisible(), 'Menu trigger invisible');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    });

    await check(`${width}px services, 17 routes, unique photos, search, filtering, booking`, async () => {
      await page.goto(base + '/');
      await page.locator('.hero-cta-sequence button').nth(2).click();
      await page.locator('input[type="search"]').waitFor();
      assert(page.url().endsWith('/services'), 'Hero button does not lead to services');
      assert.equal(await page.locator('main article').count(), 17, 'Expected 17 treatment cards');
      const priceGroups = page.locator('#full-price-list details');
      assert.equal(await priceGroups.count(), 7, 'Approved PDF must show seven price groups including women and men waxing');
      assert(await page.locator('#prices-skin').evaluate((node) => node.open), 'Skin Treatments group should start expanded');
      const skinList = await page.locator('#prices-skin').innerText();
      assert(skinList.includes('Lip Bliss Hydration') && skinList.includes('Grow Up Hair') && skinList.includes('Deluxe Facial'), 'Approved PDF Skin Treatments are incomplete');
      const cosmetic = await page.locator('#prices-cosmetic').innerText();
      assert(cosmetic.includes('A$630') && cosmetic.includes('A$150'), 'New Cosmetic Tattooing pricing is missing');
      const imageSources = await page.locator('main article img').evaluateAll((images) => images.map((image) => image.getAttribute('src')));
      assert.equal(imageSources.length, 7, 'Show seven distinct service photos with the new Nano Strokes image');
      assert.equal(new Set(imageSources).size, imageSources.length, 'Repeated service card photos');
      assert(imageSources.every(src => !/brows\.png|treatments\.png|brows-result-04|lashes-result-02/.test(src)), 'Removed client photo still shown on a service card');
      const bookingLinks = await page.locator('main article a[target="_blank"]').evaluateAll((links) => links.map((a) => a.href));
      assert.equal(bookingLinks.length, 17);
      assert(bookingLinks.every((url) => url.includes('book.gettimely.com/bellabrazil/book/')), 'Booking button opened Timely home or wrong destination');
      await page.screenshot({ path: `qa-screenshots/${width}-services.png`, fullPage: true, animations: 'disabled', timeout: 15000 });
      const search = page.locator('input[type="search"]');
      await search.fill('lip blush');
      assert.equal(await page.locator('main article').count(), 1, 'Treatment search results incorrect');
      await search.fill('not-a-treatment-at-bella');
      assert.equal(await page.locator('main article').count(), 0);
      await page.getByRole('button', { name: /Clear filters|Limpar filtros|Limpiar filtros/ }).first().click();
      assert.equal(await page.locator('main article').count(), 17);
      await page.locator('[role="group"] button').filter({ hasText: 'Lashes' }).click();
      assert.equal(await page.locator('main article').count(), 4, 'Lashes category does not contain four services');
      await go('/services');
    });

    await check(`${width}px treatment, courses, contact and 404 routes`, async () => {
      await go('/services/nano-strokes');
      assert(await page.locator('h1').first().innerText());
      assert((await page.locator('a[href*="book.gettimely.com"]').count()) > 0, 'Treatment booking link not found');
      await go('/courses');
      assert.equal(await page.locator('main article').count(), 3, 'Expected three courses in the client-approved PDF');
      await go('/contact');
      assert((await page.locator('a[href^="tel:"]').count()) > 0, 'Phone action missing');
      await go('/services/unknown-treatment');
      assert((await page.locator('h1').first().innerText()).toLowerCase().includes('not found'), 'Unknown service did not show not-found page');
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,follow');
    });

    await check(`${width}px salon section and 17 real uploaded images`, async () => {
      await go('/');
      const photos = page.locator('#salon img');
      assert.equal(await photos.count(), 5, 'Salon section must show five distinct salon pictures');
      const salonImageUrls = await photos.evaluateAll(images => images.map(image => image.getAttribute('src')));
      assert.equal(new Set(salonImageUrls).size, 5, 'Salon section repeats images');
      const allClientImagePaths = [
        'brow-tools.webp','brow-styling.webp','waxing-treatment.webp',
        'lip-blush-palette.webp','lip-blush-procedure.webp','lip-blush-photography.webp',
        'nano-strokes-procedure.webp','nano-strokes-mirror.webp','nano-strokes-finishing.webp',
        'salon-brand-wall.webp','salon-details.webp','salon-consultation.webp',
        'salon-client-experience.webp','salon-celebration.webp',
        'about-livia-01.webp','about-livia-02.webp','about-livia-03.webp',
      ];
      for (const file of allClientImagePaths) {
        const response = await page.request.get(base + '/assets/bella/client-2026-10/' + file);
        assert(response.ok(), 'Missing real client image from project public assets: ' + file);
        assert((response.headers()['content-type'] || '').includes('image'), 'Invalid image MIME: ' + file);
      }
    });

    await check(`${width}px gallery dialog and keyboard controls`, async () => {
      await go('/');
      // Pause the intentionally moving gallery through its real, accessible Pause control.
      // Scrolling a card into view while autoplay moves it is inherently unstable.
      const pause = page.locator('#gallery').getByRole('button', { name: /^Pause$/ });
      await pause.click();
      assert(await page.locator('#gallery').getByRole('button', { name: /^Play$/ }).isVisible(),
        'Gallery did not stop on Pause');
      const first = page.locator('#gallery [data-bella-gallery-card]:not([aria-hidden="true"])').first();
      await first.scrollIntoViewIfNeeded();
      await first.click();
      const dialog = page.getByRole('dialog', { name: /gallery/i });
      await dialog.waitFor();
      assert.equal(await dialog.getAttribute('aria-modal'), 'true');
      assert(await dialog.getByRole('button', { name: /^Close image$/ }).evaluate((element) => document.activeElement === element), 'Dialog close button is not focused');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Escape');
      assert.equal(await dialog.count(), 0, 'Gallery did not close on Escape');
    });

    await check(`${width}px browser runtime exceptions`, async () => {
      assert.equal(jsErrors.length, 0, jsErrors.join('; '));
    });
    await page.close();
  }
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}

if (errors.length) {
  console.error(`Responsive browser QA failed: ${errors.length} issue(s)\n` + errors.map((error) => '- ' + error).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Responsive browser QA passed all ${sizes.length} widths, navigation, filters, links, galleries and runtime checks.`);
}
