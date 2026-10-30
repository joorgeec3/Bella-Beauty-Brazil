import React from 'react';
import { ArrowRight, Calendar, GraduationCap, Sparkles, Star } from 'lucide-react';
import { Language } from '../data/siteData';
import { SITE_IMAGES, siteAsset } from '../data/siteImages';
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/Bella+Beauty+Brazil/@-27.5003667,153.0458694,17z/data=!3m1!4b1!4m6!3m5!1s0x6b915be1863d226d:0xf2af46acda7422cc!8m2!3d-27.5003667!4d153.0458694!16s%2Fg%2F11s7l5j5wl?hl=en';
interface HeroSliderProps { onOpenAppointment: () => void; onOpenCourses: () => void; onOpenServices: () => void; language: Language; }
export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenAppointment, onOpenCourses, onOpenServices, language }) => (
  <section className="relative w-full min-h-[680px] sm:min-h-[760px] lg:min-h-[850px] flex items-center justify-center overflow-hidden bg-[#5b3239] select-none">
    <div className="absolute inset-0 z-0 overflow-hidden scroll-motion-layer" data-scroll-motion><img src={SITE_IMAGES.hero.mainBella} alt="Bella Beauty Brazil beauty studio" className="hero-image-drift w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.02]" /><div className="absolute inset-0 bg-gradient-to-t from-[#2e2528]/90 via-[#5b3239]/30 to-[#5b3239]/25" /></div>
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none opacity-20 overflow-hidden whitespace-nowrap"><div className="text-[70px] sm:text-[120px] md:text-[180px] lg:text-[230px] font-extrabold uppercase font-montserrat tracking-widest text-white/30 animate-pulse">BROWS · LASHES · BEAUTY · CONFIDENCE</div></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center justify-center text-center hero-content-reveal">
      <p className="font-montserrat font-light text-white tracking-[0.3em] sm:tracking-[0.45em] text-xs sm:text-base uppercase drop-shadow-lg mb-4">{language === 'en' ? 'enhancing beauty, empowering confidence' : language === 'pt' ? 'realçando sua beleza e confiança' : 'realzando tu belleza y confianza'}</p>
      <h2 className="font-raleway font-extralight text-white tracking-[0.18em] text-2xl sm:text-4xl uppercase drop-shadow-lg">BELLA BEAUTY BRAZIL</h2>
      <h1 className="font-raleway font-bold text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase drop-shadow-2xl mb-10">SIGNATURE CARE</h1>
      <div className="hero-cta-sequence flex flex-col items-center gap-3 mt-2">
        <button onClick={onOpenAppointment} className="w-56 justify-center flex items-center gap-3 bg-[#efb7c8] hover:bg-[#f6d0dc] text-[#5b3239] font-montserrat font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"><Calendar className="w-4 h-4" /><span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDAR' : 'RESERVAR'}</span></button>
        <button onClick={onOpenCourses} className="w-56 justify-center flex items-center gap-3 border border-[#efb7c8]/80 bg-[#3c3033]/45 hover:bg-[#efb7c8] hover:text-[#5b3239] text-white font-montserrat font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"><GraduationCap className="w-4 h-4" /><span>{language === 'en' ? 'COURSES' : language === 'pt' ? 'CURSOS' : 'CURSOS'}</span></button>
        <button onClick={onOpenServices} className="w-56 justify-center flex items-center gap-3 border border-[#efb7c8]/80 bg-[#3c3033]/45 hover:bg-[#efb7c8] hover:text-[#5b3239] text-white font-montserrat font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"><Sparkles className="w-4 h-4" /><span>{language === 'en' ? 'SERVICES' : language === 'pt' ? 'SERVIÇOS' : 'SERVICIOS'}</span></button>
      </div>
      <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" aria-label="See Bella Beauty Brazil’s Google reviews: rated 5.0 from 126 reviews" className="hero-google-reviews group mt-4 inline-flex max-w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/35 bg-[#3c3033]/50 px-3 py-2 text-white/95 shadow-md backdrop-blur-sm transition-colors duration-300 hover:border-[#efb7c8]/70 hover:bg-[#3c3033]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb7c8]">
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white"><img src={siteAsset('/assets/bella/google-g-logo.png')} alt="" aria-hidden="true" className="h-[14px] w-[14px] object-contain" /></span>
        <span className="whitespace-nowrap font-montserrat text-[10px] font-semibold tracking-wide sm:text-xs">See Our Google Reviews</span>
        <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden="true" />
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[10px] text-white/90" aria-hidden="true"><span className="font-semibold">5.0</span><span className="inline-flex gap-px">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-2.5 w-2.5 fill-[#fbbc04] text-[#fbbc04]" />)}</span><span className="text-white/70">(126)</span></span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#efb7c8] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </div>
  </section>
);
