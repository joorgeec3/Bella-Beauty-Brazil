import React from 'react';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import { Language } from '../data/siteData';
import { SITE_IMAGES, siteAsset } from '../data/siteImages';
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/Bella+Beauty+Brazil/@-27.5003667,153.0458694,17z/data=!3m1!4b1!4m6!3m5!1s0x6b915be1863d226d:0xf2af46acda7422cc!8m2!3d-27.5003667!4d153.0458694!16s%2Fg%2F11s7l5j5wl?hl=en';
const SERIF = "'Cormorant Garamond', 'Instrument Serif', serif";
interface HeroSliderProps { onOpenAppointment: () => void; onOpenCourses: () => void; onOpenServices: () => void; language: Language; }

/**
 * Editorial hero (light-theme test, Nov 2026): ivory panel with the studio
 * name and main treatments on one side, Livia's hero photograph on the other.
 * On phones the photo sits on top and the text below.
 */
export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenAppointment, onOpenServices }) => (
  <section className="relative w-full overflow-hidden bg-[#f8f3f0] select-none">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] items-stretch lg:min-h-[640px]">
      {/* Photo */}
      <div className="relative order-1 lg:order-2 lg:ring-1 lg:ring-[#d9c3a3] lg:ring-offset-8 lg:ring-offset-[#f8f3f0] h-[56vh] min-h-[340px] max-h-[560px] lg:h-auto lg:max-h-none lg:my-10 lg:mr-8 overflow-hidden lg:rounded-[32px] scroll-motion-layer" data-scroll-motion>
        <img src={SITE_IMAGES.hero.mainBella} alt="Bella Beauty Brazil beauty studio in Greenslopes, Brisbane" className="hero-image-drift w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f3f0] via-transparent to-transparent lg:hidden" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="relative order-2 lg:order-1 -mt-16 lg:mt-0 px-6 sm:px-10 lg:pl-12 xl:pl-16 lg:pr-6 pb-14 lg:py-16 flex flex-col justify-center text-center lg:text-left hero-content-reveal">
        <p className="font-montserrat text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.32em] text-[#9c7650]">Greenslopes · Brisbane Southside</p>
        <p style={{ fontFamily: SERIF }} className="mt-4 text-[15px] sm:text-lg tracking-[0.34em] uppercase text-[#5b3239]">Bella Beauty Brazil</p>
        <h1 style={{ fontFamily: SERIF }} className="mt-3 font-medium text-[#5b3239] text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
          Signature Care
          <span className="block italic font-normal text-[#9a5967] text-[1.6rem] sm:text-4xl lg:text-[2.7rem] mt-2">for brows, lashes &amp; skin</span>
        </h1>
        <div className="mx-auto lg:mx-0 mt-6 h-px w-20 bg-gradient-to-r from-[#c9a87e] to-[#e6d3b8]" aria-hidden="true" />
        <p className="mt-6 max-w-md mx-auto lg:mx-0 font-montserrat text-sm sm:text-base leading-relaxed text-[#4c3b42]">
          Cosmetic tattoo, brow lamination, lash lift and more, personalised by Livia Rego with 9 years of experience.
        </p>
        <div className="hero-cta-sequence mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 max-w-xs sm:max-w-none mx-auto lg:mx-0 w-full sm:w-auto">
          <button onClick={onOpenAppointment} className="inline-flex justify-center items-center gap-2.5 bg-[#5b3239] hover:bg-[#7a4753] text-white font-montserrat font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full shadow-[0_8px_22px_-10px_rgba(91,50,57,0.6)] transition-colors cursor-pointer"><Calendar className="w-4 h-4" /><span>Book now</span></button>
          <button onClick={onOpenServices} className="inline-flex justify-center items-center gap-2 border border-[#5b3239]/40 hover:bg-[#5b3239] hover:text-white text-[#5b3239] font-montserrat font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-colors cursor-pointer"><span>Our treatments</span><ArrowRight className="w-4 h-4" /></button>
        </div>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" aria-label="See Bella Beauty Brazil’s Google reviews: rated 5.0 from 126 reviews" className="group mt-7 inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start font-montserrat text-xs text-[#5b3239] hover:text-[#9a5967] transition-colors">
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm"><img src={siteAsset('/assets/bella/google-g-logo.png')} alt="" aria-hidden="true" className="h-[14px] w-[14px] object-contain" /></span>
          <span className="font-semibold">5.0</span>
          <span className="inline-flex gap-px" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3 w-3 fill-[#c9a87e] text-[#c9a87e]" />)}</span>
          <span className="underline underline-offset-4 decoration-[#c9a87e]">126 Google reviews</span>
        </a>
      </div>
    </div>
  </section>
);
