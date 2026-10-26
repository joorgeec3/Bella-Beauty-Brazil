import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Images, X } from 'lucide-react';
import { Language } from '../data/siteData';


// All treatment imagery is sourced from the exact client folder in one registry.
import { servicePhotosFor, serviceGalleryFor } from '../data/bellaApprovedMedia';
export const getServicePhotos = servicePhotosFor;
export const getServiceGallery = serviceGalleryFor;

export const ServicePhotoGallery: React.FC<{ serviceId: string; language: Language; excludeSrc?: string }> = ({ serviceId, language, excludeSrc }) => {
  const { photos: allPhotos, illustrative } = getServiceGallery(serviceId);
  // Hide the main cover photograph from the gallery immediately below it.
  const allFiltered = allPhotos.filter(photo => photo.src !== excludeSrc);
  // Lead with genuinely upright eyebrow results. Keep the full original
  // set and straighten the sideways source thumbnails when displayed.
  const nanoPriority = ['03.webp', '06.webp', '07.webp', '09.webp', '01.webp', '02.webp', '04.webp', '05.webp', '10.webp'];
  const photos = serviceId === 'nano-strokes'
    ? [...allFiltered].sort((a,b) => nanoPriority.findIndex(name => a.src.endsWith(name)) - nanoPriority.findIndex(name => b.src.endsWith(name)))
    : allFiltered;
  // Source photographs 01, 02 and 05 turn left; 04 and 10 turn right.
  // Using their actual orientations avoids upside-down brows on mobile.
  const nanoRotation = (src: string) =>
    serviceId !== 'nano-strokes' ? '' :
    /\/(01|02|05)\.webp(?:\?.*)?$/.test(src) ? 'nano-turn-left' :
    /\/(04|10)\.webp(?:\?.*)?$/.test(src) ? 'nano-turn-right' : '';
  const isNano = serviceId === 'nano-strokes';
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreen(false);
      if (event.key === 'ArrowLeft') setIndex(value => (value - 1 + photos.length) % photos.length);
      if (event.key === 'ArrowRight') setIndex(value => (value + 1) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen, photos.length]);
  // Switching between related services should always open at the first real photo.
  // The router reuses this component, so local state otherwise leaks across treatments.
  useEffect(() => {setIndex(0); setFullscreen(false)}, [serviceId, excludeSrc]);
  if (!photos.length) return null;
  const labels = {
    en: { heading: 'Real photos from the studio', lead: 'Explore this treatment in photos.', illustrativeHeading: 'Related studio photos', illustrativeLead: 'Photographs from related treatments or the studio, not results of this particular service.', prev: 'Previous photo', next: 'Next photo', full: 'Open full photo', note: 'Brow styling photographs show the studio and technique, not a promised result for a particular tint or tattoo service.' },
    pt: { heading: 'Fotos reais do estúdio', lead: 'Veja as fotografias enviadas pela Bella Beauty Brazil.', illustrativeHeading: 'Fotos de serviços relacionados', illustrativeLead: 'Fotografias de outros tratamentos relacionados ou do estúdio, não resultados deste serviço específico.', prev: 'Foto anterior', next: 'Próxima foto', full: 'Abrir foto inteira', note: 'As fotografias de sobrancelhas mostram o atendimento e a técnica, não um resultado prometido de uma coloração ou tatuagem específica.' },
    es: { heading: 'Fotos reales del estudio', lead: 'Explora las fotografías proporcionadas por Bella Beauty Brazil.', illustrativeHeading: 'Fotos de tratamientos relacionados', illustrativeLead: 'Fotografías de otros tratamientos relacionados o del estudio, no resultados de este servicio específico.', prev: 'Foto anterior', next: 'Foto siguiente', full: 'Abrir foto completa', note: 'Las fotos de cejas muestran el estudio y la técnica, no un resultado prometido de un tinte o tatuaje específico.' },
  }[language];
  const current = photos[index % photos.length];
  const move = (direction: number) => setIndex((value) => (value + direction + photos.length) % photos.length);
  const browEditorial = serviceId === 'shadow-hybrid';
  return (
    <section id={`service-photos-${serviceId}`} aria-labelledby={`service-photos-heading-${serviceId}`} className={`bg-[#fffaf9] px-4 sm:px-6 lg:px-8 ${serviceId === 'nano-strokes' ? 'py-5 sm:py-8' : 'py-10 sm:py-14'} border-b border-[#e8d6d5]`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#9a5967] mb-2"><Images className="w-4 h-4" /><span className="text-[11px] uppercase tracking-widest font-bold">Bella Beauty Brazil</span></div>
            <h2 id={`service-photos-heading-${serviceId}`} className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239]">{illustrative ? labels.illustrativeHeading : labels.heading}</h2>
            <p className="font-montserrat text-sm text-[#675960] mt-2">{illustrative ? labels.illustrativeLead : labels.lead}</p>
          </div>
          <span className="font-montserrat text-sm tabular-nums text-[#75525c]">{index + 1} / {photos.length}</span>
        </div>
        <div className={`relative overflow-hidden rounded-2xl bg-[#eee2df] border border-[#e8d6d5] ${isNano ? 'nano-photo-frame' : ''}`}>
          <img src={current.src} alt={current.alt} loading="eager"
            className={isNano
              ? nanoRotation(current.src) ? `nano-rotated-image ${nanoRotation(current.src)}` : 'w-full h-full object-contain bg-[#f5eeec]'
              : 'w-full h-[290px] sm:h-[410px] lg:h-[480px] object-contain bg-[#f5eeec]'} />
          {photos.length > 1 && <>
            <button type="button" onClick={() => move(-1)} aria-label={labels.prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 text-[#5b3239] p-3 rounded-full shadow-lg hover:bg-[#efb7c8] cursor-pointer"><ArrowLeft className="w-5 h-5" /></button>
            <button type="button" onClick={() => move(1)} aria-label={labels.next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 text-[#5b3239] p-3 rounded-full shadow-lg hover:bg-[#efb7c8] cursor-pointer"><ArrowRight className="w-5 h-5" /></button>
          </>}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-montserrat text-sm text-[#675960]">{current.caption}</p>
          {isNano
            ? <button type="button" onClick={() => setFullscreen(true)} className="inline-flex items-center gap-1 text-xs font-bold text-[#5b3239] underline underline-offset-2 shrink-0 cursor-pointer">{labels.full}<ExternalLink className="w-3.5 h-3.5" /></button>
            : <a href={current.src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#5b3239] underline underline-offset-2 shrink-0">{labels.full}<ExternalLink className="w-3.5 h-3.5" /></a>}
        </div>
        {photos.length > 1 && <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mt-5">
          {photos.map((photo, position) => <button type="button" key={photo.src} onClick={() => setIndex(position)} aria-label={photo.caption} aria-pressed={index === position} className={`overflow-hidden rounded-xl border-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9a5967] ${isNano ? 'nano-thumb-frame' : ''} ${index === position ? 'border-[#9a5967]' : 'border-transparent'}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" className={isNano
              ? nanoRotation(photo.src) ? `nano-rotated-image ${nanoRotation(photo.src)}` : 'w-full h-full object-contain bg-[#f5eeec]'
              : 'w-full h-24 sm:h-36 object-cover'} />
          </button>)}
        </div>}
        {browEditorial && !illustrative && <p className="font-montserrat text-xs text-[#846f75] leading-relaxed mt-4">{labels.note}</p>}
      </div>
      {isNano && fullscreen && <div role="presentation" className="fixed inset-0 z-[100] bg-[#1e1418]/95 flex items-center justify-center p-3 sm:p-6" onMouseDown={(event) => {if(event.target === event.currentTarget) setFullscreen(false)}}>
        <div role="dialog" aria-modal="true" aria-label={labels.full} className="relative bg-[#f5eeec] rounded-2xl p-3 sm:p-5 max-w-full shadow-2xl">
          <button type="button" onClick={() => setFullscreen(false)} aria-label={language==='en'?'Close photo':language==='pt'?'Fechar foto':'Cerrar foto'} className="absolute top-2 right-2 z-10 rounded-full bg-white shadow-md text-[#5b3239] p-3 cursor-pointer"><X className="w-5 h-5"/></button>
          <div className="nano-full-photo-frame">
            <img src={current.src} alt={current.alt} className={nanoRotation(current.src) ? `nano-rotated-image ${nanoRotation(current.src)}` : 'h-full w-full object-contain'} />
          </div>
          <p className="max-w-[90vw] font-montserrat text-sm text-[#5b3239] text-center mt-3">{current.caption}</p>
        </div>
      </div>}
    </section>
  );
};
