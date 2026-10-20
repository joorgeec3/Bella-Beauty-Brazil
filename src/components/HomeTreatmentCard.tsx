import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { Language, Service } from '../data/siteData';
import { getServicePhotos } from './ServicePhotoGallery';

interface HomeTreatmentCardProps {
  service: Service;
  language: Language;
  onNavigate: (serviceId: string) => void;
  position: number;
}

const labels = {
  en: { view: 'View photos & service', previous: 'Previous', next: 'Next', photo: 'Photo', of: 'of' },
  pt: { view: 'Ver fotos e serviço', previous: 'Anterior', next: 'Próxima', photo: 'Foto', of: 'de' },
  es: { view: 'Ver fotos y servicio', previous: 'Anterior', next: 'Siguiente', photo: 'Foto', of: 'de' },
};

export const HomeTreatmentCard: React.FC<HomeTreatmentCardProps> = ({
  service, language, onNavigate, position,
}) => {
  const approvedPhotos = getServicePhotos(service.id);
  const photos = approvedPhotos.length > 0
    ? approvedPhotos
    : [{ src: service.image, alt: service.title, caption: service.title }];
  const [activeIndex, setActiveIndex] = useState(0);
  const startTouch = useRef<{ x: number; y: number } | null>(null);
  const ignoreClick = useRef(false);
  const active = photos[activeIndex % photos.length];
  const label = labels[language];
  const serviceUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${service.id}`;
  const changePhoto = (direction: number) =>
    setActiveIndex((current) => (current + direction + photos.length) % photos.length);

  const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (ignoreClick.current) {
      event.preventDefault();
      ignoreClick.current = false;
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(service.id);
  };

  return (
    <article
      data-home-treatment={service.id}
      className={`group relative h-96 rounded-2xl overflow-hidden reveal-scale shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl reveal-on-scroll text-left bg-[#3c3033] ${position === 1 ? 'reveal-delay-1' : position === 2 ? 'reveal-delay-2' : position === 3 ? 'reveal-delay-3' : ''}`}
      onTouchStart={(event) => {
        if (photos.length < 2) return;
        startTouch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={(event) => {
        const initial = startTouch.current;
        startTouch.current = null;
        if (!initial || photos.length < 2) return;
        const deltaX = event.changedTouches[0].clientX - initial.x;
        const deltaY = event.changedTouches[0].clientY - initial.y;
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
          changePhoto(deltaX < 0 ? 1 : -1);
          ignoreClick.current = true;
          window.setTimeout(() => { ignoreClick.current = false; }, 300);
        }
      }}
    >
      <div className="absolute inset-0 overflow-hidden scroll-motion-layer" data-scroll-motion>
        <img
          src={active.src}
          alt={active.alt}
          className="service-card-image w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 pointer-events-none" />
      <a
        href={serviceUrl}
        onClick={onLinkClick}
        aria-label={`${service.title} — ${label.view}`}
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-4 focus-visible:outline-[#efb7c8] focus-visible:outline-offset-[-5px]"
      />
      {photos.length > 1 && <>
        <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white pointer-events-none" aria-live="polite">
          <Images className="w-3.5 h-3.5" aria-hidden="true" /> {activeIndex + 1}/{photos.length}
        </span>
        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={() => changePhoto(-1)}
            aria-label={`${label.previous} ${service.title} ${label.photo.toLowerCase()}`}
            className="pointer-events-auto h-10 w-10 rounded-full bg-white/95 text-[#5b3239] flex items-center justify-center shadow-lg hover:bg-[#efb7c8] focus-visible:outline-2 focus-visible:outline-[#efb7c8] cursor-pointer"
          ><ChevronLeft className="w-5 h-5" aria-hidden="true" /></button>
          <button
            type="button"
            onClick={() => changePhoto(1)}
            aria-label={`${label.next} ${service.title} ${label.photo.toLowerCase()}`}
            className="pointer-events-auto h-10 w-10 rounded-full bg-white/95 text-[#5b3239] flex items-center justify-center shadow-lg hover:bg-[#efb7c8] focus-visible:outline-2 focus-visible:outline-[#efb7c8] cursor-pointer"
          ><ChevronRight className="w-5 h-5" aria-hidden="true" /></button>
        </div>
      </>}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white pointer-events-none">
        <span className="text-[11px] font-bold tracking-widest text-amber-300 uppercase mb-1">{service.subtitle || 'Bella Beauty Treatment'}</span>
        <h3 className="font-raleway text-xl font-bold uppercase tracking-wider text-white mb-2">{service.title}</h3>
        <div className="w-8 h-0.5 bg-[#efb7c8] mb-3" />
        <p className="font-montserrat text-xs text-neutral-200 line-clamp-3 leading-relaxed mb-4">{service.description}</p>
        <span className="inline-flex items-center text-xs font-semibold text-amber-200">
          {label.view}<ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
};
