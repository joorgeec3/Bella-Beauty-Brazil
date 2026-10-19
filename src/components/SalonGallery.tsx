import React, { useState } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';
import { GalleryLightbox } from './GalleryLightbox';

// Photographs supplied by Bella Beauty Brazil; original file names begin with SALAO.
const salonPhotos = [
  { image: siteImages.client.salonBrandWall, alt: 'Bella Beauty Brazil salon brand wall in Greenslopes', caption: 'Our studio' },
  { image: siteImages.client.salonDetails, alt: 'Bella Beauty Brazil welcome area and salon decor', caption: 'Thoughtful details' },
  { image: siteImages.client.salonConsultation, alt: 'Client consultation and appointment preparation at Bella Beauty Brazil', caption: 'Personal attention' },
  { image: siteImages.client.salonExperience, alt: 'A client enjoying a visit to Bella Beauty Brazil', caption: 'Your beauty experience' },
  { image: siteImages.client.salonCelebration, alt: 'Celebrating a visit to the Bella Beauty Brazil salon', caption: 'Welcome to Bella' },
];

export const SalonGallery: React.FC<{ language: Language }> = ({ language }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const content = {
    en: { eyebrow: 'A look inside', title: 'Inside the Salon', description: 'Explore our welcoming beauty studio in Greenslopes, Brisbane, where every detail is designed for your comfort.', location: 'Greenslopes · Brisbane', open: 'View salon photo' },
    pt: { eyebrow: 'Conheça nosso espaço', title: 'Nosso Salão', description: 'Conheça o espaço acolhedor da Bella Beauty Brazil em Greenslopes, Brisbane. Um ambiente pensado para seu conforto.', location: 'Greenslopes · Brisbane', open: 'Ampliar foto do salão' },
    es: { eyebrow: 'Conoce nuestro espacio', title: 'Nuestro Salón', description: 'Descubre nuestro acogedor estudio de belleza en Greenslopes, Brisbane, diseñado para tu comodidad.', location: 'Greenslopes · Brisbane', open: 'Ampliar foto del salón' },
  }[language];

  return (
    <section id="salon" aria-labelledby="salon-heading" className="bg-[#f3efee] text-[#3c3033] py-16 lg:py-24 border-t border-[#d8be9b]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">
          <span className="block text-xs uppercase font-bold tracking-[0.22em] text-[#9a5967] mb-3">{content.eyebrow}</span>
          <h2 id="salon-heading" className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider">{content.title}</h2>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#675960] leading-relaxed mt-5">{content.description}</p>
          <span className="inline-flex items-center justify-center gap-2 text-xs tracking-wider uppercase mt-5 text-[#9a5967]"><MapPin className="w-4 h-4" />{content.location}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-5">
          {salonPhotos.map((photo, index) => (
            <button
              key={photo.image}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`${content.open}: ${photo.caption}`}
              className={`group relative overflow-hidden rounded-2xl bg-[#e8d6d5] border border-[#9a5967]/15 shadow-md text-left focus-visible:outline-2 focus-visible:outline-[#9a5967] cursor-pointer ${index < 2 ? 'col-span-1 lg:col-span-3 aspect-[4/5] sm:aspect-[5/4]' : 'col-span-1 lg:col-span-2 aspect-[4/5] sm:aspect-[5/4]'}`}
            >
              <img src={photo.image} alt={photo.alt} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(event) => { event.currentTarget.style.opacity = '0'; }}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 sm:p-5 text-white text-xs sm:text-sm font-medium">{photo.caption}</span>
              <span className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-[#5b3239] shadow-sm"><Camera className="w-4 h-4" /></span>
            </button>
          ))}
        </div>
      </div>
      <GalleryLightbox images={salonPhotos.map(({ image, alt }) => ({ image, alt }))} index={selected} onIndexChange={setSelected} onClose={() => setSelected(null)} language={language} />
    </section>
  );
};
