import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Language } from '../data/siteData';
import { bellaGallery, BellaGalleryCategory } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';

type Filter = 'All' | BellaGalleryCategory;
const labels: Record<Language, Record<Filter, string>> = {
  en: { All:'All', Brows:'Brows', Lips:'Lips', Lashes:'Lashes', Skin:'Skin', Studio:'Studio', Livia:'Meet Livia' },
  pt: { All:'Todas', Brows:'Sobrancelhas', Lips:'Lábios', Lashes:'Cílios', Skin:'Pele', Studio:'Estúdio', Livia:'Conheça Livia' },
  es: { All:'Todas', Brows:'Cejas', Lips:'Labios', Lashes:'Pestañas', Skin:'Piel', Studio:'Estudio', Livia:'Conoce a Livia' },
};

export const GalleryMarquee: React.FC<{language:Language}> = ({ language }) => {
  const [filter,setFilter] = useState<Filter>('All');
  const [limit,setLimit] = useState(10);
  const [lightboxIndex,setLightboxIndex] = useState<number|null>(null);
  const [paused,setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const driftDirectionRef = useRef(1);
  const hoveredRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const categories = useMemo(() => (['All', 'Brows', 'Lips', 'Lashes', 'Skin', 'Studio', 'Livia'] as Filter[]).filter(c => c==='All' || bellaGallery.some(item=>item.category===c)),[]);
  const current = useMemo(() => bellaGallery.filter(item=>filter==='All'||item.category===filter),[filter]);
  const shown = filter==='All' ? current.slice(0,limit) : current;
  // Never show cloned cards side-by-side when a filtered category has too few photos.
  const isLooping = shown.length >= 6;
  const duplicated = isLooping ? [...shown, ...shown] : shown;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || shown.length < 2) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || paused || lightboxIndex !== null) return;
    // The old 20–30px/s movement was barely noticeable; CSS scroll snapping also resisted it.
    const speed = window.innerWidth < 640 ? 44 : 66;
    const cards = viewport.querySelectorAll<HTMLElement>('[data-bella-gallery-card]');
    const loopPoint = isLooping && cards[shown.length] && cards[0]
      ? cards[shown.length].offsetLeft - cards[0].offsetLeft : 0;
    const tick = (time: number) => {
      const last = lastTimeRef.current ?? time;
      const delta = Math.min(time - last, 40);
      lastTimeRef.current = time;
      const distance = (speed * delta) / 1000;
      if (isLooping && loopPoint > 0) {
        viewport.scrollLeft += distance;
        if (viewport.scrollLeft >= loopPoint) viewport.scrollLeft -= loopPoint;
      } else {
        // With only a few genuine photos, move between the edges instead of cloning them.
        const end = viewport.scrollWidth - viewport.clientWidth;
        if (end > 2) {
          viewport.scrollLeft = Math.min(end, Math.max(0, viewport.scrollLeft + distance * driftDirectionRef.current));
          if (viewport.scrollLeft >= end - 1) driftDirectionRef.current = -1;
          if (viewport.scrollLeft <= 1) driftDirectionRef.current = 1;
        }
      }
      frameRef.current = window.requestAnimationFrame(tick);
    };
    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [filter, limit, paused, lightboxIndex, isLooping, shown.length]);

  const changeFilter = (category:Filter) => {
    setFilter(category);
    setLimit(10);
    setLightboxIndex(null);
    setPaused(false);
    lastTimeRef.current = null;
    driftDirectionRef.current = 1;
    if (viewportRef.current) viewportRef.current.scrollLeft = 0;
  };
  const move = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setPaused(true);
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    viewport.scrollBy({ left: direction * Math.max(viewport.clientWidth * 0.72, 260), behavior: 'smooth' });
    // An arrow click must not stop autoplay permanently.
    resumeTimerRef.current = window.setTimeout(() => {
      if (!hoveredRef.current) setPaused(false);
      resumeTimerRef.current = null;
    }, 1700);
  };

  return <section id="gallery" className="bg-site text-[#3c3033] py-16 lg:py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center reveal-on-scroll">
      <p className="font-raleway text-sm font-semibold tracking-widest text-[#9a5967] uppercase mb-1">{language==='en'?'Our Work':language==='pt'?'Nosso trabalho':'Nuestro trabajo'}</p>
      <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider text-[#3c3033]">{language==='en'?'Gallery':language==='pt'?'Galeria':'Galería'}</h2>
      <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4"/>
      <div className="flex flex-wrap justify-center gap-2 mt-7" role="tablist" aria-label={language==='en'?'Gallery categories':language==='pt'?'Categorias da galeria':'Categorías de la galería'}>{categories.map(category => <button key={category} type="button" onClick={()=>changeFilter(category)} aria-pressed={filter===category} className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${filter===category?'bg-[#5b3239] text-white':'bg-[#f3d9d0] text-[#5b3239] hover:bg-[#efb7c8]'}`}>{labels[language][category]}</button>)}</div>
    </div>
    <div className="relative max-w-7xl mx-auto scroll-motion-layer" data-scroll-motion>
      <button type="button" onClick={()=>move(-1)} aria-label={language==='en'?'Previous gallery photos':language==='pt'?'Fotos anteriores':'Fotos anteriores'} className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#5b3239]/90 text-white shadow-lg transition hover:bg-[#7a4753] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#efb7c8] cursor-pointer"><ChevronLeft className="h-5 w-5" /></button>
      <div ref={viewportRef} className="gallery-marquee-viewport overflow-x-auto px-12 sm:px-16 pb-3" onMouseEnter={()=>{hoveredRef.current=true;setPaused(true);}} onMouseLeave={()=>{hoveredRef.current=false;setPaused(false);}} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)} onTouchStart={()=>setPaused(true)} onTouchEnd={()=>setPaused(false)} tabIndex={0} aria-label={language==='en'?'Automatically scrolling gallery':language==='pt'?'Galeria com rolagem automática':'Galería con desplazamiento automático'}>
        <div className="flex w-max gap-4">
          {duplicated.map((item,index)=><button key={`${filter}-${item.id}-${index}`} type="button" onClick={()=>{setPaused(true);setLightboxIndex(index % shown.length);}} data-bella-gallery-card className="group shrink-0 w-[min(58vw,208px)] sm:w-[250px] lg:w-[270px] aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-[#d8be9b]/60 cursor-pointer bg-[#eae0da] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#9a5967]" aria-hidden={index >= shown.length ? true : undefined} aria-label={`${item.alt} - ${language==='pt'?'ampliar':language==='es'?'ampliar':'expand'}`} tabIndex={index >= shown.length ? -1 : 0}>
            <img src={item.image} alt={index >= shown.length ? '' : item.alt} loading="lazy" draggable={false} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
          </button>)}
        </div>
      </div>
      <button type="button" onClick={()=>move(1)} aria-label={language==='en'?'Next gallery photos':language==='pt'?'Próximas fotos':'Fotos siguientes'} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#5b3239]/90 text-white shadow-lg transition hover:bg-[#7a4753] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#efb7c8] cursor-pointer"><ChevronRight className="h-5 w-5" /></button>
    </div>
    <div className="mt-6 flex items-center justify-center gap-3 text-[11px] tracking-wide text-[#675960]">
      {isLooping && <button type="button" onClick={()=>setPaused(value=>!value)} className="inline-flex items-center gap-1.5 rounded-full border border-[#9a5967]/40 px-3 py-1.5 hover:bg-[#f3d9d0] cursor-pointer" aria-pressed={paused}>{paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}{paused ? (language==='en'?'Play':language==='pt'?'Reproduzir':'Reproducir') : (language==='en'?'Pause':language==='pt'?'Pausar':'Pausar')}</button>}
      <span>{isLooping ? (language==='en'?'Auto-scroll · Hover or focus to pause · Swipe to browse':language==='pt'?'Rolagem automática · Passe o mouse ou foque para pausar · Deslize para navegar':'Desplazamiento automático · Pase el cursor o enfoque para pausar · Deslice para navegar') : (language==='en'?'Swipe or use arrows to browse':language==='pt'?'Deslize ou use as setas para navegar':'Deslice o use las flechas para navegar')}</span>
    </div>
    {filter==='All'&&limit<current.length&&<div className="text-center mt-9"><button type="button" onClick={()=>{setLimit(v=>v+10);setPaused(false);}} className="rounded-full px-8 py-3 bg-[#5b3239] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#7a4753] cursor-pointer">{language==='en'?'Show More':language==='pt'?'Ver Mais':'Ver Más'}</button></div>}
    <GalleryLightbox images={shown} index={lightboxIndex} onClose={()=>{setLightboxIndex(null);setPaused(false);}} onIndexChange={setLightboxIndex} language={language}/>
  </section>;
};
