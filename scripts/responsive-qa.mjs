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
      const featurePhotos = await page.locator('.feature-card-image').evaluateAll(images => images.map(img => img.getAttribute('src') || ''));
      assert.equal(featurePhotos.length, 2, 'The third feature is a non-photographic skin-care editorial, to avoid reusing the real procedure image');
      assert(featurePhotos[0].includes('studio-behind-scenes-01.webp'), 'Brows feature should show an actual brow treatment');
      assert(featurePhotos[1].includes('lashes-result-05.webp'), 'Lashes feature should show an actual lash treatment, not brows');
      assert.equal(await page.locator('.service-editorial-image').count(), 1, 'Skin Treatments should have one hero photo');
      assert((await page.locator('.service-editorial-image').getAttribute('src')).includes('dermaplaning-facial-treatment.webp'), 'Skin Treatments must show a real facial procedure rather than the empty treatment room');
      const skinCard = page.locator('#skin-treatments-feature');
      assert.equal(await skinCard.count(), 1, 'Premium Skin Treatments section is missing');
      const treatmentNames = await skinCard.innerText();
      for (const treatment of ['Dermaplaning', 'Microneedling', 'Facial Spa', 'Deluxe Facial']) {
        assert(treatmentNames.includes(treatment), 'Skin Treatments should explain the service options: ' + treatment);
      }
      assert(await skinCard.getByRole('link', { name: /Explore skin treatments|Ver tratamentos de pele|Ver tratamientos de piel/ }).isVisible(), 'Skin Treatments CTA unavailable');
      const topServicePhotos = await page.locator('.service-card-image').evaluateAll(images => images.map(img => img.getAttribute('src') || ''));
      assert.equal(topServicePhotos.length, 4, 'Four topic-specific treatment cards are needed');
      for (const file of ['nano-strokes-procedure.webp', 'lip-blush-procedure.webp', 'lashes.jpg', 'waxing-treatment.webp']) {
        assert(topServicePhotos.some(src => src.endsWith('/' + file)), 'Missing topic-matched homepage service photo: ' + file);
      }
      assert(!topServicePhotos.some(src => src.includes('dermaplaning-facial-treatment.webp')), 'Do not repeat facial treatment photo from featured section');

      // The first impression must not recycle treatment, founder, studio, gallery or result photos.
      const photoSelectors = [
        '.hero-image-drift',
        '.feature-card-image',
        '.meet-livia-image',
        '.service-card-image',
        '.service-editorial-image',
        '#gallery [data-bella-gallery-card] img',
        '#results .before-after-track img',
        '#salon img',
      ].join(', ');
      const homepagePhotos = await page.locator(photoSelectors).evaluateAll(images => images.map(img => img.getAttribute('src')).filter(Boolean));
      assert(homepagePhotos.length >= 25, 'Homepage photo selection is unexpectedly sparse');
      assert.equal(new Set(homepagePhotos).size, homepagePhotos.length, 'Homepage repeats photos between the first blocks or within a carousel: ' + homepagePhotos.filter((src, i) => homepagePhotos.indexOf(src) !== i).join(', '));
      assert.equal(await page.locator('#gallery [data-bella-gallery-card]').count(), await page.locator('#gallery [data-bella-gallery-card] img').count(), 'Gallery repeats cloned image cards');
      assert.equal(await page.locator('#results .before-after-track img').count(), 10, 'All ten unique result photos should remain visible without cloned copies');
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

    await check(`${width}px services, 27 routes, authentic photos, search, filtering, booking`, async () => {
      await page.goto(base + '/');
      await page.locator('.hero-cta-sequence button').nth(2).click();
      await page.locator('input[type="search"]').waitFor();
      assert(page.url().endsWith('/services'), 'Hero button does not lead to services');
      assert.equal(await page.locator('main article').count(), 27, 'All 27 featured and PDF-only treatment pages must be accessible');
      assert.equal(await page.getByRole('heading', { name: 'Shadow Brows', exact: true }).count(), 1, 'Shadow Brows must be a selectable cosmetic tattoo service');
      const priceGroups = page.locator('#full-price-list details');
      assert.equal(await priceGroups.count(), 7, 'Approved PDF must show seven price groups including women and men waxing');
      assert(await page.locator('#prices-skin').evaluate((node) => node.open), 'Skin Treatments group should start expanded');
      const skinList = await page.locator('#prices-skin').innerText();
      assert(skinList.includes('Lip Bliss Hydration') && skinList.includes('Grow Up Hair') && skinList.includes('Deluxe Facial'), 'Approved PDF Skin Treatments are incomplete');
      await page.locator('#prices-cosmetic summary').click();
      const cosmetic = await page.locator('#prices-cosmetic').innerText();
      assert(cosmetic.includes('A$630') && cosmetic.includes('A$150'), 'New Cosmetic Tattooing pricing is missing');
      const imageSources = await page.locator('main article img').evaluateAll((images) => images.map((image) => image.getAttribute('src')));
      assert(imageSources.length >= 10, 'Brow, Lip Blush, Nano Strokes and Waxing previews should have real photos');
      assert(imageSources.some(src => src?.includes('client-2026-10/nano-strokes-procedure.webp')), 'Nano Strokes must use its own client photo');
      assert(imageSources.every(src => !/brows\.png|treatments\.png|brows-result-04|lashes-result-02/.test(src)), 'Removed client photo still shown on a service card');
      const bookingLinks = await page.locator('main article a[href*="gettimely.com"]').evaluateAll((links) => links.map((a) => a.href));
      assert.equal(bookingLinks.length, 27);
      assert(bookingLinks.every((url) => url.includes('book.gettimely.com/bellabrazil/book/')), 'Booking button opened Timely home or wrong destination');
      await page.screenshot({ path: `qa-screenshots/${width}-services.png`, fullPage: true, animations: 'disabled', timeout: 15000 });
      const search = page.locator('input[type="search"]');
      await search.fill('lip blush');
      assert.equal(await page.locator('main article').count(), 1, 'Treatment search results incorrect');
      await search.fill('not-a-treatment-at-bella');
      assert.equal(await page.locator('main article').count(), 0);
      await page.getByRole('button', { name: /Clear filters|Limpar filtros|Limpiar filtros/ }).first().click();
      assert.equal(await page.locator('main article').count(), 27);
      await page.locator('[role="group"] button').filter({ hasText: 'Lashes' }).click();
      assert.equal(await page.locator('main article').count(), 8, 'The PDF-added lash treatments must be individually available');
      await page.locator('[role="group"] button').filter({ hasText: 'Skin' }).click();
      assert.equal(await page.locator('main article').count(), 7, 'Approved Skin & Hair treatment cards must total seven');
      await go('/services');
    });

    await check(`${width}px Book Now opens Timely service selection in the current tab`, async () => {
      await go('/services');
      await page.route('https://book.gettimely.com/**', route => route.fulfill({
        status: 200, contentType: 'text/html', body: '<html><body><h1>Timely service selection</h1></body></html>',
      }));
      const booking = page.locator('main article a[href*="book.gettimely.com"]').first();
      assert.equal(await booking.getAttribute('target'), null, 'Mobile and tablet booking must not open a separate tab');
      await booking.click();
      await page.waitForURL((url) => url.hostname === 'book.gettimely.com' && url.pathname.startsWith('/bellabrazil/book/'));
      assert((await page.locator('h1').innerText()).includes('Timely service selection'), 'Booking did not open the Timely selection directly');
      await page.unroute('https://book.gettimely.com/**');
      await go('/');
    });

    await check(`${width}px treatment, courses, contact and 404 routes`, async () => {
      await go('/services/lip-blush');
      const lipGallery = page.locator('#service-photos');
      assert.equal(await lipGallery.locator('button[aria-pressed]').count(), 3, 'Three client-supplied Lip Blush photos must be accessible');
      const before = await lipGallery.locator('img').first().getAttribute('src');
      await lipGallery.getByRole('button', { name: /Next photo|Próxima foto|Foto siguiente/ }).click();
      assert.notEqual(await lipGallery.locator('img').first().getAttribute('src'), before, 'Gallery arrows must change the selected photo');
      assert((await lipGallery.getByRole('link', { name: /Open full photo|Abrir foto inteira|Abrir foto completa/ }).count()) > 0, 'Full photo access missing');
      await go('/services/shadow-brows');
      assert((await page.locator('#root main').first().innerText()).includes('Shading creates a softly filled-in appearance'), 'Full PDF-approved Shadow Brows description is missing');
      await go('/services/nano-strokes');
      const approvedNano = page.locator('#service-photos img').first();
      assert((await approvedNano.getAttribute('src'))?.includes('nano-strokes-procedure.webp'), 'Only approved Nano Strokes procedure photo should display');
      const deletedPaths = ['nano-strokes-mirror.webp', 'nano-strokes-finishing.webp'];
      const allRenderedPhotos = await page.locator('img').evaluateAll(images => images.map(img => img.getAttribute('src') || ''));
      assert(allRenderedPhotos.every(src => deletedPaths.every(file => !src.includes(file))), 'A photo marked for removal is still displayed');

      assert.equal(await page.locator('#service-photos button[aria-pressed]').count(), 0, 'Nano Strokes should show just the one approved procedure photo');
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

    await check(`${width}px salon section and 15 approved uploaded images`, async () => {
      await go('/');
      const photos = page.locator('#salon img');
      assert.equal(await photos.count(), 5, 'Salon section must show five distinct salon pictures');
      const salonImageUrls = await photos.evaluateAll(images => images.map(image => image.getAttribute('src')));
      assert.equal(new Set(salonImageUrls).size, 5, 'Salon section repeats images');
      const allClientImagePaths = [
        'brow-tools.webp','brow-styling.webp','waxing-treatment.webp',
        'lip-blush-palette.webp','lip-blush-procedure.webp','lip-blush-photography.webp',
        'nano-strokes-procedure.webp',
        'salon-brand-wall.webp','salon-details.webp','salon-consultation.webp',
        'salon-client-experience.webp','salon-celebration.webp',
        'about-livia-01.webp','about-livia-02.webp','about-livia-03.webp',
      ];
      assert.equal(allClientImagePaths.length, 15, 'Only 15 client photos should remain in public assets');
      for (const removedFile of ['nano-strokes-mirror.webp', 'nano-strokes-finishing.webp']) {
        const response = await page.request.get(base + '/assets/bella/client-2026-10/' + removedFile);
        assert.equal(response.headers()['content-type']?.includes('image'), false, 'Deleted photo remains accessible as an image: ' + removedFile);
      }
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
