import React from 'react';
import { Language, GALLERY_IMAGES } from '../data/siteData';

interface GallerySectionProps {
  language: Language;
}



const GalleryCard: React.FC<{ image: string; index: number; duplicate?: boolean }> = ({
  image,
  index,
  duplicate = false,
}) => (
  <div className="flex-shrink-0 w-64 h-80 sm:w-72 sm:h-96 rounded-xl overflow-hidden shadow-lg border border-[#d8be9b]/60 group">
    <img
      src={image}
      alt={`Bella Beauty Gallery ${index + 1}${duplicate ? ' copy' : ''}`}
      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
  </div>
);

export const GallerySection: React.FC<GallerySectionProps> = ({ language }) => {
  return (
    <section className="bg-site text-[#3c3033] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center reveal-on-scroll">
        <p className="font-raleway text-sm font-semibold tracking-widest text-[#9a5967] uppercase mb-1">
          {language === 'en' ? 'Bella Beauty Gallery' : language === 'pt' ? 'Galeria Bella Beauty' : 'Galería Bella Beauty'}
        </p>
        <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider text-[#3c3033]">
          {language === 'en' ? 'Gallery' : language === 'pt' ? 'Galeria' : 'Galería'}
        </h2>
        <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
      </div>

      <div className="relative w-full overflow-hidden select-none py-2">
        <div className="animate-gallery-marquee flex items-center space-x-4">
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryCard key={`gallery-${index}`} image={image} index={index} />
          ))}
          {/* Duplicate set only for the existing seamless infinite-loop animation. */}
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryCard key={`gallery-copy-${index}`} image={image} index={index} duplicate />
          ))}
        </div>
      </div>
    </section>
  );
};
