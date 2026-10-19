const siteAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const siteImages = {
  hero: { mainBella: siteAsset('assets/bella/hero.png'), thumbProcedure1: siteAsset('assets/bella/gallery/studio-behind-scenes-01.webp'), thumbProcedure2: siteAsset('assets/bella/lashes.jpg') },
  aboutMe: {
    liviaPhoto: siteAsset('assets/bella/gallery/livia-portrait-01.webp'),
    liviaFeaturePhoto: siteAsset('assets/bella/gallery/livia-portrait-02.webp'),
    clinicSpace: siteAsset('assets/bella/gallery/studio-mirror-area.webp'),
    treatmentRoom: siteAsset('assets/bella/gallery/studio-treatment-room.webp'),
  },
  brand: { logoEmblem: siteAsset('assets/bella/logo.png'), logoWordmark: siteAsset('assets/bella/logo.png'), goldEmblemStamp: siteAsset('assets/bella/logo.png'), logoHorizontalDark: siteAsset('assets/bella/logo.png'), goldSignatureBadge: siteAsset('assets/bella/logo.png') },
  services: {
    browTreatment: siteAsset('assets/bella/gallery/studio-behind-scenes-01.webp'),
    facialTreatment: siteAsset('assets/bella/dermaplaning-facial-treatment.webp'),
    microblading: siteAsset('assets/bella/gallery/studio-behind-scenes-01.webp'),
    lipBlush: siteAsset('assets/bella/cosmetic-tattooing.png'),
    brows: siteAsset('assets/bella/gallery/studio-behind-scenes-01.webp'),
    lashes: siteAsset('assets/bella/lashes.jpg'),
    // Approved real facial-care image; the old pigment-vial photograph is removed.
    treatments: siteAsset('assets/bella/dermaplaning-facial-treatment.webp'),
    waxing: siteAsset('assets/bella/waxing.png'),
    courses: siteAsset('assets/bella/courses.png'),
  },
  gallery: { hero: siteAsset('assets/bella/hero.png'), livia: siteAsset('assets/bella/gallery/livia-portrait-03.webp') },
  locations: { greenslopes: siteAsset('assets/bella/gallery/studio-treatment-room.webp') },
};

export const SITE_IMAGES = {
  ...siteImages,
  about: { clinicInterior: siteImages.aboutMe.clinicSpace, founderAndTeam: siteImages.aboutMe.liviaPhoto, treatmentRoom: siteImages.aboutMe.treatmentRoom },
  hero: { ...siteImages.hero, mainBackground: siteImages.hero.mainBella, fallbackBackground: siteImages.hero.mainBella },
  drawers: { clinicHoursPhoto: siteImages.aboutMe.clinicSpace },
};

export { siteAsset };
