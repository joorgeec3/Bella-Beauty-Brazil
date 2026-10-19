const siteAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const siteImages = {
  hero: { mainBella: siteAsset('assets/bella/hero.png'), thumbProcedure1: siteAsset('assets/bella/gallery/studio-behind-scenes-01.webp'), thumbProcedure2: siteAsset('assets/bella/lashes.jpg') },
  client: {
    browTools: siteAsset('assets/bella/client-2026-10/brow-tools.webp'),
    browStyling: siteAsset('assets/bella/client-2026-10/brow-styling.webp'),
    waxingTreatment: siteAsset('assets/bella/client-2026-10/waxing-treatment.webp'),
    lipBlushPalette: siteAsset('assets/bella/client-2026-10/lip-blush-palette.webp'),
    lipBlushProcedure: siteAsset('assets/bella/client-2026-10/lip-blush-procedure.webp'),
    lipBlushPhotography: siteAsset('assets/bella/client-2026-10/lip-blush-photography.webp'),
    nanoStrokesProcedure: siteAsset('assets/bella/client-2026-10/nano-strokes-procedure.webp'),
    nanoStrokesMirror: siteAsset('assets/bella/client-2026-10/nano-strokes-mirror.webp'),
    nanoStrokesFinishing: siteAsset('assets/bella/client-2026-10/nano-strokes-finishing.webp'),
    salonBrandWall: siteAsset('assets/bella/client-2026-10/salon-brand-wall.webp'),
    salonDetails: siteAsset('assets/bella/client-2026-10/salon-details.webp'),
    salonConsultation: siteAsset('assets/bella/client-2026-10/salon-consultation.webp'),
    salonExperience: siteAsset('assets/bella/client-2026-10/salon-client-experience.webp'),
    salonCelebration: siteAsset('assets/bella/client-2026-10/salon-celebration.webp'),
    aboutLivia01: siteAsset('assets/bella/client-2026-10/about-livia-01.webp'),
    aboutLivia02: siteAsset('assets/bella/client-2026-10/about-livia-02.webp'),
    aboutLivia03: siteAsset('assets/bella/client-2026-10/about-livia-03.webp'),
  },
  aboutMe: {
    liviaPhoto: siteAsset('assets/bella/client-2026-10/about-livia-01.webp'),
    liviaFeaturePhoto: siteAsset('assets/bella/client-2026-10/about-livia-02.webp'),
    clinicSpace: siteAsset('assets/bella/gallery/studio-mirror-area.webp'),
    treatmentRoom: siteAsset('assets/bella/gallery/studio-treatment-room.webp'),
  },
  brand: { logoEmblem: siteAsset('assets/bella/logo.png'), logoWordmark: siteAsset('assets/bella/logo.png'), goldEmblemStamp: siteAsset('assets/bella/logo.png'), logoHorizontalDark: siteAsset('assets/bella/logo.png'), goldSignatureBadge: siteAsset('assets/bella/logo.png') },
  services: {
    browTreatment: siteAsset('assets/bella/client-2026-10/brow-tools.webp'),
    facialTreatment: siteAsset('assets/bella/dermaplaning-facial-treatment.webp'),
    microblading: siteAsset('assets/bella/client-2026-10/nano-strokes-procedure.webp'),
    lipBlush: siteAsset('assets/bella/client-2026-10/lip-blush-procedure.webp'),
    brows: siteAsset('assets/bella/client-2026-10/brow-styling.webp'),
    lashes: siteAsset('assets/bella/lashes.jpg'),
    // Approved real facial-care image; the old pigment-vial photograph is removed.
    treatments: siteAsset('assets/bella/dermaplaning-facial-treatment.webp'),
    waxing: siteAsset('assets/bella/client-2026-10/waxing-treatment.webp'),
    courses: siteAsset('assets/bella/courses.png'),
  },
  gallery: { hero: siteAsset('assets/bella/hero.png'), livia: siteAsset('assets/bella/client-2026-10/about-livia-03.webp') },
  locations: { greenslopes: siteAsset('assets/bella/gallery/studio-treatment-room.webp') },
};

export const SITE_IMAGES = {
  ...siteImages,
  about: { clinicInterior: siteImages.aboutMe.clinicSpace, founderAndTeam: siteImages.aboutMe.liviaPhoto, treatmentRoom: siteImages.aboutMe.treatmentRoom },
  hero: { ...siteImages.hero, mainBackground: siteImages.hero.mainBella, fallbackBackground: siteImages.hero.mainBella },
  drawers: { clinicHoursPhoto: siteImages.aboutMe.clinicSpace },
};

export { siteAsset };
