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
      // Six concise signature services with client-approved English copy and relevant images.
      const featureCards = page.locator('article').filter({ has: page.locator('.feature-card-image') });
      const signatureCards = page.locator('section').filter({ hasText: 'Bella Beauty Signature Care' }).first().locator('article').filter({ hasText: /Cosmetic Tattooing|Brow Artistry|Lash Treatments|Skin Treatments|Teeth Whitening|Waxing/ });
      assert.equal(await signatureCards.count(), 6, 'Signature Care must show all six requested service categories');
      const sixNames = ['Cosmetic Tattooing', 'Brow Artistry', 'Lash Treatments', 'Skin Treatments', 'Teeth Whitening', 'Waxing'];
      const sixCopy = [
        'Nano Strokes • Powder Brows • Lip Blush • Cosmetic Tattoo Removal.',
        'Brow Sculpting • Tinting • Brow Dye • Brow Lamination.',
        'Lash Lift & Tint • Lash Extensions.',
        'Dermaplaning • Microneedling • Facial Spa.',
        'A brighter smile with professional teeth whitening.',
        'Face & Body Waxing • Brazilian Waxing.',
      ];
      for (let i = 0; i < sixNames.length; i++) {
        assert((await signatureCards.nth(i).innerText()).includes(sixCopy[i]), 'Signature copy differs from client-approved text for ' + sixNames[i]);
      }
      const featurePhotos = await page.locator('.feature-card-image').evaluateAll(images => images.map(img => img.getAttribute('src') || ''));
      assert.equal(featurePhotos.length, 6, 'All six service categories now have topical visuals, including real teeth-whitening photos');
      for (const name of ['lips-result-01.webp', 'studio-behind-scenes-01.webp', 'lashes-result-05.webp', 'dermaplaning-facial-treatment.webp', 'teeth-whitening-01.webp', 'waxing.png']) {
        assert(featurePhotos.some(src => src.includes(name)), 'Missing relevant signature image ' + name);
      }
      assert.equal(await page.locator('.service-editorial-image').count(), 0, 'Do not duplicate the Skin Treatments photo further down the homepage');
      const topServicePhotos = await page.locator('.service-card-image').evaluateAll(images => images.map(img => img.getAttribute('src') || ''));
      assert.equal(topServicePhotos.length, 4, 'Four topic-specific treatment cards are needed');
      for (const name of ['nano-strokes-procedure.webp', 'lip-blush-procedure.webp', 'lash-lift-01.webp', 'brow-sculpt-01.webp']) {
        assert(topServicePhotos.some(src => src.includes(name)), 'Missing topic-matched homepage service photo ' + name);
      }

      const founderSection = page.locator('.meet-livia-copy');
      assert.equal(await founderSection.count(), 1, 'Meet Livia section should remain on the homepage');
      const founderText = await founderSection.innerText();
      for (const text of [
        'A little about me',
        'Hi, I’m Livia, founder of Bella Beauty Brazil, brow artist, cosmetic tattoo artist and beauty educator.',
        'Originally from the Amazon region of Brazil',
        'I take my time with every appointment',
        'Personalised Care',
        'Attention to Detail',
        'Natural Results',
      ]) {
        assert(founderText.toLocaleLowerCase('en-AU').includes(text.toLocaleLowerCase('en-AU')), 'Client-approved Meet Livia text missing: ' + text);
      }
      assert(!founderText.includes('Care with Purpose & Precision'), 'Old founder title still displayed');
      assert(await page.locator('.meet-livia-image').count() === 1, 'Keep the existing approved photo of Livia');

      // The client supplied three different Lip Blush photos: they must all be accessible in the home card.
      const lipCard = page.locator('[data-home-treatment="lip-blush"]');
      assert.equal(await lipCard.count(), 1, 'Lip Blush featured card missing');
      assert.equal(await lipCard.locator('.service-card-image').count(), 1, 'Show one photo at a time, never repeated side-by-side');
      const nextLip = lipCard.getByRole('button', { name: 'Next Lip Blush photo' });
      const previousLip = lipCard.getByRole('button', { name: 'Previous Lip Blush photo' });
      assert(await nextLip.isVisible(), 'Lip Blush gallery arrows must be visible on mobile and tablet');
      assert((await lipCard.locator('.service-card-image').getAttribute('src')).includes('lip-blush-procedure.webp'));
      await nextLip.click();
      assert((await lipCard.locator('.service-card-image').getAttribute('src')).includes('lip-blush-palette.webp'), 'Second real Lip Blush photo not accessible');
      await nextLip.click();
      assert((await lipCard.locator('.service-card-image').getAttribute('src')).includes('lip-blush-photography.webp'), 'Third real Lip Blush photo not accessible');
      await nextLip.click();
      assert((await lipCard.locator('.service-card-image').getAttribute('src')).includes('lip-blush-procedure.webp'), 'Lip gallery should cycle back to the first photo');
      await previousLip.click();
      assert((await lipCard.locator('.service-card-image').getAttribute('src')).includes('lip-blush-photography.webp'), 'Previous photo control is not working');
      await nextLip.click();
      assert((await lipCard.locator('.service-card-image').getAttribute('src')).includes('lip-blush-procedure.webp'));
      assert((await lipCard.getByRole('link', { name: /Lip Blush — View photos & service/ }).getAttribute('href'))?.endsWith('/services/lip-blush'), 'Lip Blush photo card should lead to the individual gallery');
      const nanoCard = page.locator('[data-home-treatment="nano-strokes"]');
      assert.equal(await nanoCard.locator('button').count(), 0, 'Do not put back the two photos the client requested to delete');
      assert((await nanoCard.locator('.service-card-image').getAttribute('src')).includes('nano-strokes-procedure.webp'), 'Retain the approved Nano Strokes procedure photo');

      // Full client-requested categories must be readable on phone, tablet and desktop.
      const signatureHead = page.locator('section').filter({ hasText: 'Bella Beauty Signature Care' }).locator('h2').first();
      const signatureCopy = (await signatureHead.innerText()).replace(/\s+/g, ' ').trim();
      for (const name of ['Cosmetic Tattooing', 'Brows', 'Lashes', 'Skin Treatments', 'Teeth Whitening', 'Waxing']) {
        assert(signatureCopy.toLowerCase().includes(name.toLowerCase()), 'Signature heading is missing service category: ' + name);
      }
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
      const newFounderPortrait = await page.locator('.meet-livia-image').getAttribute('src');
      assert(newFounderPortrait?.includes('/about-livia-03.webp'), 'Meet Livia should use the approved curtain-background portrait rather than the kitchen photograph');
      const homepageVideos = await page.locator('#gallery [data-bella-gallery-video] video').evaluateAll(elements =>
        elements.map(video => video.getAttribute('src') || ''));
      assert.equal(homepageVideos.length, 14, 'All fourteen treatment videos must appear in the homepage Gallery');
      assert.equal(new Set(homepageVideos).size, 14, 'No gallery video should be repeated');
      for (const videoPath of homepageVideos) {
        assert(videoPath.includes('/client-2026-10-v2/') && videoPath.endsWith('.mp4'), 'Gallery video is from an incorrect folder: ' + videoPath);
      }
      const photoExpand = page.locator('#gallery').getByRole('button', { name: /^Show More$/ });
      for (let i = 0; i < 5 && (await photoExpand.count()) > 0; i++) await photoExpand.click();
      const galleryPhotos = await page.locator('#gallery [data-bella-gallery-card] img').evaluateAll(elements =>
        elements.map(img => img.getAttribute('src') || ''));
      const newMediaPhotos = galleryPhotos.filter(src => src.includes('/client-2026-10-v2/'));
      assert.equal(newMediaPhotos.length, 43, 'Every one of the 43 photos must be reachable in the homepage Gallery');
      assert.equal(new Set(newMediaPhotos).size, 43, 'Do not duplicate client photos in the main Gallery');
      const whiteningFilter = page.locator('#gallery [role="tablist"]').getByRole('button', { name: 'Teeth Whitening', exact: true });
      await whiteningFilter.click();
      assert.equal(await page.locator('#gallery [data-bella-gallery-card] img').count(), 3, 'Whitening category must show its three original photos');
      assert.equal(await page.locator('#gallery [data-bella-gallery-video] video').count(), 1, 'Whitening category must show its dedicated treatment video');
      await page.locator('#gallery [role="tablist"]').getByRole('button', { name: 'All', exact: true }).click();

      assert.equal(await page.locator('#results .before-after-track img').count(), 9, 'Nine unique results after reserving one Cosmetic Tattooing photo for the signature cards');
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
      assert.equal(await lipGallery.locator('button[aria-pressed]').count(), 6, 'Six new Lip Blush photos must be accessible in the service detail gallery');
      assert((await lipGallery.locator('img').first().getAttribute('src')).includes('/client-2026-10-v2/lip-blush/lip-blush-01.webp'), 'Lip Blush must start with a real new photo from the client archive');
      const before = await lipGallery.locator('img').first().getAttribute('src');
      await lipGallery.getByRole('button', { name: /Next photo|Próxima foto|Foto siguiente/ }).click();
      assert.notEqual(await lipGallery.locator('img').first().getAttribute('src'), before, 'Gallery arrows must change the selected photo');
      assert((await lipGallery.getByRole('link', { name: /Open full photo|Abrir foto inteira|Abrir foto completa/ }).count()) > 0, 'Full photo access missing');
      // Confirm photo categories, unique file paths and original assets at one representative mobile viewport.
      if (width === 375) {
        const categories = [
          ['brow-sculpt', 7], ['brow-sculpt-tint', 2], ['male-brow-sculpt', 1],
          ['shadow-brows', 5], ['brow-lamination', 3], ['lash-lift', 9],
          ['lip-blush', 6], ['lip-bliss-hydration', 3], ['dermaplaning', 2],
          ['facial-spa', 2], ['teeth-whitening', 3],
        ];
        const allPaths = new Set();
        let total = 0;
        for (const [serviceId, expectedCount] of categories) {
          await go('/services/' + serviceId);
          const gallery = page.locator('#service-photos');
          assert.equal(await gallery.count(), 1, 'Missing new client gallery for ' + serviceId);
          const images = await gallery.locator('button[aria-pressed] img').evaluateAll(list =>
            list.map(img => img.getAttribute('src') || ''));
          const galleryPaths = expectedCount > 1
            ? images
            : [await gallery.locator('img').first().getAttribute('src')];
          assert.equal(galleryPaths.length, expectedCount, 'Wrong photo count in ' + serviceId);
          for (const photoPath of galleryPaths) {
            assert(photoPath.includes('/client-2026-10-v2/' + serviceId + '/'), 'Photo is in the wrong service: ' + photoPath);
            assert(!allPaths.has(photoPath), 'Repeated photo in more than one service: ' + photoPath);
            allPaths.add(photoPath);
            total += 1;
          }
          const response = await page.request.get(base + galleryPaths[0]);
          assert.equal(response.status(), 200, 'Service image returned 404: ' + serviceId);
          assert((response.headers()['content-type'] || '').includes('image/'), 'Service image MIME type invalid: ' + serviceId);
          assert(await gallery.locator('img').first().isVisible(), 'Image inaccessible on phone: ' + serviceId);
        }
        assert.equal(total, 43, 'Every one of the 43 approved new photos must be mapped once');

        // Check every one of the 14 real treatment videos, including response MIME and matching service folder.
        const videoCounts = {
          'brow-sculpt': 2,
          'brow-lamination': 5,
          'dreamy-brows': 1,
          'facial-spa': 2,
          'lip-blush': 1,
          'lip-bliss-hydration': 1,
          'shadow-brows': 1,
          'teeth-whitening': 1,
        };
        const videoFiles = new Set();
        let videoTotal = 0;
        for (const [serviceId, expectedVideoCount] of Object.entries(videoCounts)) {
          await go('/services/' + serviceId);
          const videoSection = page.locator('#service-videos');
          await videoSection.waitFor({ state: 'visible', timeout: 15000 });
          const videos = await videoSection.locator('video').evaluateAll(elements =>
            elements.map(video => video.getAttribute('src') || ''));
          assert.equal(videos.length, expectedVideoCount, 'Incorrect video count for ' + serviceId);
          for (const videoPath of videos) {
            assert(videoPath.includes('/client-2026-10-v2/' + serviceId + '/'), 'Incorrect video category: ' + videoPath);
            assert(videoPath.endsWith('.mp4'), 'Video file format should be MP4: ' + videoPath);
            assert(!videoFiles.has(videoPath), 'Video repeated in multiple services: ' + videoPath);
            videoFiles.add(videoPath);
            const result = await page.request.head(base + videoPath);
            assert.equal(result.status(), 200, 'Video returned HTTP error: ' + videoPath);
            assert((result.headers()['content-type'] || '').includes('video/'), 'Invalid video MIME type: ' + videoPath);
            videoTotal += 1;
          }
        }
        assert.equal(videoTotal, 14, 'All fourteen approved video clips must be accessible');
        await go('/services/lip-blush');
      }
      // Client-approved Lip Blush copy, price and Timely CTA in all six responsive widths.
      const lipMain = page.locator('#root main').first();
      const lipText = await lipMain.innerText();
      assert(lipText.includes('Enhance your natural lip colour and add definition with a shade selected especially for you.'), 'Preserve the original About this treatment intro');
      assert(lipText.includes('Who may this treatment suit?'), 'Preserve the original suitability section');
      assert(lipText.includes('For clients considering a softly enhanced lip tone'), 'Preserve the original suitability explanation');
      assert(lipText.includes('A soft, natural finish'), 'Lip Blush replacement heading missing');
      assert(lipText.includes('Lip Blush enhances your natural lip colour and gently defines the lip border. The shade is selected with you to suit your preferences. The healed result is a soft wash of colour rather than a full lipstick look.'), 'Exact Lip Blush description is missing');
      assert(!lipText.includes('How is it different?'), 'Remove old Lip Blush difference section');
      assert(!lipText.includes('Treatment description provided by Bella Beauty Brazil.'), 'Remove unwanted attribution from Lip Blush');
      const lipBenefits = [
        'Soft, natural-looking lip colour',
        'More defined lip borders',
        'Personalised shade selection',
        'Colour appears stronger initially and softens as the lips heal',
      ];
      for (const benefit of lipBenefits) assert(lipText.includes(benefit), 'Missing approved Lip Blush benefit: ' + benefit);
      const lipBooking = page.getByRole('heading', { name: 'Book this service', exact: true }).locator('..');
      const lipBookingText = await lipBooking.innerText();
      assert(lipBookingText.includes('A$630'), 'Keep Lip Blush price at A$630');
      assert(lipBookingText.includes('Touch-up after 45–60 days: $120.'), 'Missing approved Lip Blush touch-up detail');
      const lipBookingLink = lipBooking.getByRole('link', { name: /Book Your Appointment/i });
      assert.equal(await lipBookingLink.count(), 1, 'Book Your Appointment button missing');
      assert((await lipBookingLink.getAttribute('href'))?.includes('book.gettimely.com/bellabrazil/book/'), 'Timely booking destination changed');
      assert(!lipBookingText.includes('Choose treatment on Timely'), 'Old Lip Blush booking label remains');

      // Client-approved Brow Sculpt page: no Signature, no generic comparison, only requested benefits and FAQs.
      await go('/services/brow-sculpt');
      const browMain = page.locator('#root main').first();
      const browText = await browMain.innerText();
      assert((await page.getByRole('heading', { name: 'Brow Sculpt', exact: true }).count()) === 1, 'Service title must be Brow Sculpt, without Signature');
      assert(!browText.includes('Brow Sculpt Signature'), 'Remove Signature throughout Brow Sculpt page');
      const approvedBrowDescription = 'Personalised brow shaping with mapping, careful trimming, waxing and tweezing where needed. Each appointment enhances your natural shape while preserving fullness. Tint and dye are not included.';
      assert(browText.includes(approvedBrowDescription), 'Brow Sculpt About this treatment copy differs from approved text');
      assert(browText.includes('For anyone wanting tidier, more defined brows while keeping their natural colour and fullness.'), 'Brow Sculpt suitability copy differs from approved text');
      assert(!browText.includes('Treatment description provided by Bella Beauty Brazil.'), 'Remove Brow Sculpt attribution');
      assert(!browText.includes('How is it different?'), 'Remove generic comparison heading on Brow Sculpt');
      for (const benefit of ['Personalised brow mapping', 'A tidy, defined shape', 'Natural fullness preserved']) {
        assert(browText.includes(benefit), 'Missing approved Brow Sculpt benefit: ' + benefit);
      }
      assert(!browText.includes('Official Timely booking'), 'Remove irrelevant Brow Sculpt benefit');
      const browFaq1 = browMain.locator('details').filter({ hasText: 'What should I avoid before my appointment?' });
      assert.equal(await browFaq1.count(), 1, 'Brow Sculpt preparation FAQ missing');
      assert((await browFaq1.innerText()).includes('Avoid applying retinol, AHAs, BHAs or other exfoliating acids around your brows before your appointment, as these can make the skin more sensitive to waxing. Please let me know if you use these products or any prescription skin treatments so I can advise on suitable timing.'), 'Brow Sculpt preparation FAQ answer must be exact');
      const browFaq2 = browMain.locator('details').filter({ hasText: 'Does Brow Sculpt include tint or dye?' });
      assert.equal(await browFaq2.count(), 1, 'Brow Sculpt dye FAQ missing');
      await browFaq2.locator('summary').click();
      assert(await browFaq2.locator('p').isVisible(), 'Opening the Brow Sculpt dye FAQ must reveal its answer');
      assert((await browFaq2.locator('p').innerText()).includes('No. Brow Sculpt focuses on shaping only. For added colour, please book Brow Sculpt & Tint or Brow Sculpt & Dye.'), 'Brow Sculpt dye FAQ answer is not exact');
      assert(!browText.includes('What should I know before booking?'), 'Remove generic FAQ on Brow Sculpt');
      assert(!browText.includes('Where can I confirm the latest price?'), 'Remove redundant price FAQ on Brow Sculpt');
      const browBooking = page.getByRole('heading', { name: 'Book this service', exact: true }).locator('..');
      assert((await browBooking.innerText()).includes('A$56'), 'Keep the existing Brow Sculpt price A$56');
      const browBookingButton = browBooking.getByRole('link', { name: /Book Your Appointment/i });
      assert.equal(await browBookingButton.count(), 1, 'Brow Sculpt booking button must say Book Your Appointment');
      assert((await browBookingButton.getAttribute('href'))?.includes('book.gettimely.com/bellabrazil/book/'), 'Brow Sculpt Timely destination must not change');

      await go('/services/shadow-brows');
      const shadowMain = page.locator('#root main').first();
      const shadowText = await shadowMain.innerText();
      assert(shadowText.includes('Shadow Brows creates a soft, shaded effect, similar to the look of freshly dyed brows. The shape, colour and intensity are tailored to your features and preferences, from subtle definition to a more defined finish.'), 'Client-approved Shadow Brows description is not exact');
      assert(!shadowText.includes('Treatment description provided by Bella Beauty Brazil.'), 'Remove Shadow Brows attribution');
      const shadowBenefits = [
        'Soft, shaded finish',
        'Personalised brow shape and colour',
        'Colour appears stronger initially and softens as the brows heal',
      ];
      for (const benefit of shadowBenefits) assert(shadowText.includes(benefit), 'Shadow Brows benefit missing: ' + benefit);
      const shadowFaq = shadowMain.locator('details').filter({ hasText: 'Is Shadow Brows the same as brow dye?' });
      assert.equal(await shadowFaq.count(), 1, 'Missing client-approved Shadow Brows FAQ question');
      assert((await shadowFaq.innerText()).includes('No. Shadow Brows is a cosmetic tattooing treatment that creates a soft, shaded brow effect. Brow dye temporarily colours the existing hairs and can also stain the skin.'), 'Shadow Brows FAQ answer differs from approved text');
      assert(!shadowText.includes('What should I know before booking?'), 'Generic FAQ question must be replaced on Shadow Brows');
      assert(!shadowText.includes('Where can I confirm the latest price?'), 'Remove redundant latest-price FAQ from Shadow Brows');
      const shadowBooking = page.getByRole('heading', { name: 'Book this service', exact: true }).locator('..');
      const shadowBookingText = await shadowBooking.innerText();
      assert(shadowBookingText.includes('A$630'), 'Shadow Brows initial price must remain A$630');
      assert(shadowBookingText.includes('Touch-up after 45–60 days: $120.'), 'Missing Shadow Brows touch-up details');
      const shadowButton = shadowBooking.getByRole('link', { name: /Book Your Appointment/i });
      assert.equal(await shadowButton.count(), 1, 'Shadow Brows Book Your Appointment button missing');
      assert((await shadowButton.getAttribute('href'))?.includes('book.gettimely.com/bellabrazil/book/'), 'Shadow Brows original Timely booking link changed');
      assert(!shadowBookingText.includes('Choose treatment on Timely'), 'Old Timely CTA remains on Shadow Brows');
      await go('/services/nano-strokes');
      const approvedNano = page.locator('#service-photos img').first();
      assert((await approvedNano.getAttribute('src'))?.includes('nano-strokes-procedure.webp'), 'Only approved Nano Strokes procedure photo should display');
      const deletedPaths = ['nano-strokes-mirror.webp', 'nano-strokes-finishing.webp'];
      const allRenderedPhotos = await page.locator('img').evaluateAll(images => images.map(img => img.getAttribute('src') || ''));
      assert(allRenderedPhotos.every(src => deletedPaths.every(file => !src.includes(file))), 'A photo marked for removal is still displayed');

      assert.equal(await page.locator('#service-photos button[aria-pressed]').count(), 0, 'Nano Strokes should show just the one approved procedure photo');
      // Client-approved Nano Strokes changes: preserve the Tebori introduction and original Timely booking URL.
      const nanoMain = page.locator('#root main').first();
      const nanoIntro = page.getByRole('heading', { name: 'About this treatment', exact: true }).locator('..');
      assert((await nanoIntro.getByRole('heading', { name: 'About this treatment' }).count()) === 1, 'Keep the approved About this treatment introduction');
      const nanoText = await nanoIntro.innerText();
      assert(nanoText.includes('Nano Strokes is an advanced form of microblading'), 'Original approved Tebori introduction must remain');
      assert(!nanoText.includes('Treatment description provided by Bella Beauty Brazil'), 'Remove the attribution sentence');
      assert((await nanoIntro.getByRole('heading', { name: 'How does it work?' }).count()) === 1, 'Rename Nano Strokes explanation section');
      assert(nanoText.includes('Using a manual Tebori tool, I create fine, hair-like strokes that blend with your natural brow hairs. Each brow pattern is individually designed to complement your features, add definition and fill sparse areas.'), 'Client-supplied How does it work? text is not exact');
      assert(!nanoText.includes('How is it different?') && !nanoText.includes('Brow Sculpt & Tint') && !nanoText.includes('Hybrid Brows') && !nanoText.includes('published Timely catalogue'), 'Remove the old comparison section and unrelated brow treatments');
      const nanoBooking = page.getByRole('heading', { name: 'Book this service', exact: true }).locator('..');
      const bookingText = await nanoBooking.innerText();
      assert(bookingText.includes('A$630'), 'Nano Strokes initial treatment price must remain A$630');
      assert(bookingText.includes('Touch-up after 45–60 days: $120.'), 'Missing 45–60 day touch-up price');
      const nanoBookingButton = nanoBooking.getByRole('link', { name: /Book Your Appointment/i });
      assert((await nanoBookingButton.count()) === 1, 'Nano Strokes booking CTA label is incorrect');
      assert((await nanoBookingButton.getAttribute('href'))?.includes('book.gettimely.com/bellabrazil/book/'), 'Preserve the Timely booking destination');
      assert(!bookingText.includes('Choose treatment on Timely'), 'Old booking label must not appear');

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
