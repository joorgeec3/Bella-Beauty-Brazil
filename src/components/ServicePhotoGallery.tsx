import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Images } from 'lucide-react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

type TreatmentPhoto = { src: string; alt: string; caption: string };

// Each newly supplied photo belongs to exactly one service category.
// Folder membership was verified against the supplied archive and the original-file mapping.
const currentClientMedia = 'assets/bella/client-2026-10-v2';
const newPhotoGroup = (slug: string, service: string, count: number): TreatmentPhoto[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `${import.meta.env.BASE_URL}${currentClientMedia}/${slug}/${slug}-${String(index + 1).padStart(2, '0')}.webp`,
    alt: `${service} — real client-supplied photo ${index + 1} of ${count} from Bella Beauty Brazil`,
    caption: `${service} · Photo ${index + 1} of ${count}`,
  }));

const nanoPhotos: TreatmentPhoto[] = [
  { src: siteImages.client.nanoStrokesProcedure, alt: 'Livia performing an approved Nano Strokes brow treatment', caption: 'Nano Strokes procedure' },
];
const waxPhotos: TreatmentPhoto[] = [
  { src: siteImages.client.waxingTreatment, alt: 'Waxing treatment at Bella Beauty Brazil', caption: 'Waxing treatment' },
];

// No photo from one group is reused in another service's gallery.
// Nano Strokes retains only the one approved photo; do not restore the two removed images.
const groupedPhotos: Record<string, TreatmentPhoto[]> = {
  'nano-strokes': nanoPhotos,
  'cosmetic-tattoo-removal': [{ src: `${import.meta.env.BASE_URL}assets/bella/client-2026-10-v3/tattoo-removal/tattoo-removal-cover.webp`, alt: 'Real before-and-after brow pigment removal photograph supplied by Bella Beauty Brazil', caption: 'Cosmetic tattoo removal — client-supplied photo' }],
  'brow-sculpt': newPhotoGroup('brow-sculpt', 'Brow Sculpt', 7),
  'brow-sculpt-tint': newPhotoGroup('brow-sculpt-tint', 'Brow Sculpt & Tint', 2),
  'male-brow-sculpt': newPhotoGroup('male-brow-sculpt', 'Male Brow Sculpt', 1),
  'shadow-brows': newPhotoGroup('shadow-brows', 'Shadow Brows', 5),
  'brow-lamination': newPhotoGroup('brow-lamination', 'Brow Lamination', 3),
  'lash-lift': newPhotoGroup('lash-lift', 'Lash Lift & Tint', 9),
  'lip-blush': newPhotoGroup('lip-blush', 'Lip Blush', 6),
  'lip-bliss-hydration': newPhotoGroup('lip-bliss-hydration', 'Lip Bliss Hydration', 3),
  'dermaplaning': newPhotoGroup('dermaplaning', 'Dermaplaning', 2),
  'facial-spa': newPhotoGroup('facial-spa', 'Facial Spa', 2),
  'teeth-whitening': newPhotoGroup('teeth-whitening', 'Teeth Whitening', 3),
  'waxing': waxPhotos,
};

export const getServicePhotos = (serviceId: string): TreatmentPhoto[] => groupedPhotos[serviceId] || [];

/** The approved archive has no specific result for these related treatments.
 * The photographs below MUST be explicitly identified as illustrative. */
const fromRelatedService = (slug: string, count: number, title: string): TreatmentPhoto[] =>
  newPhotoGroup(slug, title, count).map((photo) => ({
    ...photo,
    alt: title + ' at Bella Beauty Brazil — related treatment photograph, not a result of this specific service',
    caption: title + ' · Related studio photo (illustrative)',
  }));
const extensionsExample: TreatmentPhoto = {
  src: import.meta.env.BASE_URL + 'assets/bella/client-2026-10-v3/lash-extensions/lash-extensions-cover.webp',
  alt: 'Photo of lash extensions provided by Bella Beauty Brazil; exact extension style not verified',
  caption: 'Lash extensions · Specific style not confirmed (illustrative)',
};
const hybridDyeExample: TreatmentPhoto = {
  src: import.meta.env.BASE_URL + 'assets/bella/client-2026-10-v3/brow-dye/brow-dye-cover.webp',
  alt: 'Photo of Brow Dye supplied by Bella Beauty Brazil — related to but not proof of Hybrid Dye service',
  caption: 'Brow Dye · Related to Hybrid Dye (illustrative)',
};
const scalpStudioExample: TreatmentPhoto = {
  src: siteImages.aboutMe.clinicSpace,
  alt: 'Bella Beauty Brazil studio interior; not a scalp treatment result',
  caption: 'Bella Beauty Brazil studio · No scalp treatment results supplied',
};
const illustrativeServicePhotos: Record<string, TreatmentPhoto[]> = {
  'shadow-hybrid': [hybridDyeExample, ...fromRelatedService('brow-sculpt-tint', 2, 'Brow Sculpt & Tint')],
  'dreamy-brows': fromRelatedService('brow-sculpt', 2, 'Brow Sculpt'),
  'lash-lift-only': fromRelatedService('lash-lift', 3, 'Lash Lift & Tint'),
  'lash-tint': fromRelatedService('lash-lift', 2, 'Lash Lift & Tint'),
  'classic-eyelashes': [extensionsExample],
  'hybrid-eyelashes': [extensionsExample],
  'wet-look-lashes': [extensionsExample],
  'russian-volume': [extensionsExample],
  'lash-extension-removal': [extensionsExample],
  'microneedling': fromRelatedService('facial-spa', 2, 'Facial Spa'),
  'deluxe-facial': [
    ...fromRelatedService('facial-spa', 2, 'Facial Spa'),
    ...fromRelatedService('dermaplaning', 2, 'Dermaplaning'),
  ],
  'grow-up-hair-brows': fromRelatedService('brow-sculpt', 2, 'Brow Sculpt'),
  'grow-up-hair-scalp': [scalpStudioExample],
};
export const getServiceGallery = (serviceId: string): { photos: TreatmentPhoto[]; illustrative: boolean } => {
  const exact = getServicePhotos(serviceId);
  return exact.length
    ? { photos: exact, illustrative: false }
    : { photos: illustrativeServicePhotos[serviceId] ?? [], illustrative: true };
};


export const ServicePhotoGallery: React.FC<{ serviceId: string; language: Language }> = ({ serviceId, language }) => {
  const { photos, illustrative } = getServiceGallery(serviceId);
  const [index, setIndex] = useState(0);
  // Switching between related services should always open at the first real photo.
  // The router reuses this component, so local state otherwise leaks across treatments.
  useEffect(() => setIndex(0), [serviceId]);
  if (!photos.length) return null;
  const labels = {
    en: { heading: 'Real photos from the studio', lead: 'Browse the photos supplied by Bella Beauty Brazil.', illustrativeHeading: 'Related studio photos', illustrativeLead: 'Photographs from related treatments or the studio, not results of this particular service.', prev: 'Previous photo', next: 'Next photo', full: 'Open full photo', note: 'Brow styling photographs show the studio and technique, not a promised result for a particular tint or tattoo service.' },
    pt: { heading: 'Fotos reais do estúdio', lead: 'Veja as fotografias enviadas pela Bella Beauty Brazil.', illustrativeHeading: 'Fotos de serviços relacionados', illustrativeLead: 'Fotografias de outros tratamentos relacionados ou do estúdio, não resultados deste serviço específico.', prev: 'Foto anterior', next: 'Próxima foto', full: 'Abrir foto inteira', note: 'As fotografias de sobrancelhas mostram o atendimento e a técnica, não um resultado prometido de uma coloração ou tatuagem específica.' },
    es: { heading: 'Fotos reales del estudio', lead: 'Explora las fotografías proporcionadas por Bella Beauty Brazil.', illustrativeHeading: 'Fotos de tratamientos relacionados', illustrativeLead: 'Fotografías de otros tratamientos relacionados o del estudio, no resultados de este servicio específico.', prev: 'Foto anterior', next: 'Foto siguiente', full: 'Abrir foto completa', note: 'Las fotos de cejas muestran el estudio y la técnica, no un resultado prometido de un tinte o tatuaje específico.' },
  }[language];
  const current = photos[index % photos.length];
  const move = (direction: number) => setIndex((value) => (value + direction + photos.length) % photos.length);
  const browEditorial = serviceId === 'shadow-hybrid';
  return (
    <section id="service-photos" aria-labelledby="service-photos-heading" className="bg-[#fffaf9] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-[#e8d6d5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#9a5967] mb-2"><Images className="w-4 h-4" /><span className="text-[11px] uppercase tracking-widest font-bold">Bella Beauty Brazil</span></div>
            <h2 id="service-photos-heading" className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239]">{illustrative ? labels.illustrativeHeading : labels.heading}</h2>
            <p className="font-montserrat text-sm text-[#675960] mt-2">{illustrative ? labels.illustrativeLead : labels.lead}</p>
          </div>
          <span className="font-montserrat text-sm tabular-nums text-[#75525c]">{index + 1} / {photos.length}</span>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-[#eee2df] border border-[#e8d6d5]">
          <img src={current.src} alt={current.alt} loading="eager" className="w-full h-[320px] sm:h-[440px] lg:h-[520px] object-contain bg-[#f5eeec]" />
          {photos.length > 1 && <>
            <button type="button" onClick={() => move(-1)} aria-label={labels.prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 text-[#5b3239] p-3 rounded-full shadow-lg hover:bg-[#efb7c8] cursor-pointer"><ArrowLeft className="w-5 h-5" /></button>
            <button type="button" onClick={() => move(1)} aria-label={labels.next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 text-[#5b3239] p-3 rounded-full shadow-lg hover:bg-[#efb7c8] cursor-pointer"><ArrowRight className="w-5 h-5" /></button>
          </>}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-montserrat text-sm text-[#675960]">{current.caption}</p>
          <a href={current.src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#5b3239] underline underline-offset-2 shrink-0">{labels.full}<ExternalLink className="w-3.5 h-3.5" /></a>
        </div>
        {photos.length > 1 && <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mt-5">
          {photos.map((photo, position) => <button type="button" key={photo.src} onClick={() => setIndex(position)} aria-label={photo.caption} aria-pressed={index === position} className={`overflow-hidden rounded-xl border-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9a5967] ${index === position ? 'border-[#9a5967]' : 'border-transparent'}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-24 sm:h-36 object-cover" />
          </button>)}
        </div>}
        {browEditorial && !illustrative && <p className="font-montserrat text-xs text-[#846f75] leading-relaxed mt-4">{labels.note}</p>}
      </div>
    </section>
  );
};
