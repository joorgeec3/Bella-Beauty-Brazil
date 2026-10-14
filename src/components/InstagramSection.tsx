import React from 'react';
import { Play } from 'lucide-react';
import { INSTAGRAM_POSTS, Language } from '../data/siteData';

interface InstagramSectionProps {
  language: Language;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ language }) => {
  return (
    <section className="bg-site py-16 lg:py-24 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12 reveal-on-scroll">
          <p className="font-raleway text-sm font-semibold tracking-widest text-neutral-500 uppercase mb-1">
            {language === 'en' ? 'Follow us on' : language === 'pt' ? 'Siga-nos no' : 'Síguenos en'}
          </p>
          <h2 className="font-raleway text-3xl sm:text-4xl font-light text-neutral-900 uppercase tracking-wider">
            {language === 'en' ? 'our Instagram' : language === 'pt' ? 'nosso Instagram' : 'nuestro Instagram'}
          </h2>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>

        {/* Mídias públicas somente quando disponíveis de forma estável */}
        {INSTAGRAM_POSTS.length > 0 && <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 reveal-on-scroll reveal-delay-1">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-neutral-200 block shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt="Bella Beauty Brazil Instagram post"
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Play icon overlay if video */}
              {post.isVideo && (
                <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white pointer-events-none">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              )}

              {/* Hover Dark Overlay with Caption Snippet */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white text-[11px] leading-tight">
                <p className="line-clamp-4 font-montserrat text-neutral-200">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>}

        {/* Follow Button */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/bellabeautybrazil/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#408bd1] hover:bg-[#3273b0] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full shadow-md transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <span>{language === 'en' ? 'Follow on Instagram' : language === 'pt' ? 'Siga-nos no Instagram' : 'Síguenos en Instagram'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
