import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Language } from '../data/siteData';
import { homeGallery, galleryVideos, BellaGalleryCategory } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';

type Filter = 'All' | BellaGalleryCategory;
const labels: Record<Language, Record<Filter, string>> = {
  en: { All:'All', Brows:'Brows', Lips:'Lips', Lashes:'Lashes', Skin:'Skin', Whitening:'Teeth Whitening', Studio:'Studio', Livia:'Meet Livia', Waxing:'Waxing' },
  pt: { All:'Todas', Brows:'Sobrancelhas', Lips:'Lábios', Lashes:'Cílios', Skin:'Pele', Whitening:'Clareamento Dental', Studio:'Estúdio', Livia:'Conheça Livia', Waxing:'Depilação' },
  es: { All:'Todas', Brows:'Cejas', Lips:'Labios', Lashes:'Pestañas', Skin:'Piel', Whitening:'Blanqueamiento Dental', Studio:'Estudio', Livia:'Conoce a Livia', Waxing:'Depilación' },
};

export const GalleryMarquee: React.FC<{language:Language}> = ({ language }) => {
  const [filter,setFilter] = useState<Filter>('All');
  const [limit,setLimit] = useState(16);
  const [lightboxIndex,setLightboxIndex] = useState<number|null>(null);
  // Manual Pause must not be undone by mouse-leave, focus loss or video controls.
  const [manualPaused,setManualPaused] = useState(false);
  const [hoverPaused,setHoverPaused] = useState(false);
  const [focusPaused,setFocusPaused] = useState(false);
  const [touchPaused,setTouchPaused] = useState(false);
  const [arrowPaused,setArrowPaused] = useState(false);
  const [videoPlaying,setVideoPlaying] = useState(false);
  const isAutoScrollPaused = manualPaused || hoverPaused || focusPaused || touchPaused || arrowPaused || videoPlaying;
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const driftDirectionRef = useRef(1);
  const playingVideosRef = useRef(new Set<string>());
  const videoStripRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const categories = useMemo(() => (['All', 'Brows', 'Lips', 'Lashes', 'Skin', 'Whitening', 'Studio', 'Livia', 'Waxing'] as Filter[]).filter(c => c==='All' || homeGallery.some(item=>item.category===c) || galleryVideos.some(item=>item.category===c)),[]);
  const current = useMemo(() => homeGallery.filter(item=>filter==='All'||item.category===filter),[filter]);
  const shown = filter==='All' ? current.slice(0,limit) : current;
  const currentVideos = galleryVideos.filter(item => filter === 'All' || item.category === filter);
  // Render each customer photograph exactly once, even on wide screens.
  const autoScrollEnabled = shown.length >= 2;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || shown.length < 2) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || isAutoScrollPaused || lightboxIndex !== null) return;
    const speed = window.innerWidth < 640 ? 44 : 66;
    // Ping-pong between the ends instead of cloning the photos for an infinite loop.
    const tick = (time: number) => {
      const delta = Math.min(time - (lastTimeRef.current ?? time), 40);
      lastTimeRef.current = time;
      const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      if (max > 2) {
        const next = viewport.scrollLeft + (speed * delta / 1000) * driftDirectionRef.current;
        viewport.scrollLeft = Math.max(0, Math.min(max, next));
        if (viewport.scrollLeft >= max - 1) driftDirectionRef.current = -1;
        if (viewport.scrollLeft <= 1) driftDirectionRef.current = 1;
      }
      frameRef.current = window.requestAnimationFrame(tick);
    };
    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [filter, limit, isAutoScrollPaused, lightboxIndex, shown.length]);

  const changeFilter = (category:Filter) => {
    setFilter(category);
    setLimit(16);
    setLightboxIndex(null);
    setArrowPaused(false);
    playingVideosRef.current.clear();
    setVideoPlaying(false);
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
    lastTimeRef.current = null;
    driftDirectionRef.current = 1;
    if (viewportRef.current) viewportRef.current.scrollLeft = 0;
  };
  const move = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setArrowPaused(true);
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    viewport.scrollBy({ left: direction * Math.max(viewport.clientWidth * 0.72, 260), behavior: 'smooth' });
    // Only release the temporary arrow pause; manual pause and video playback remain respected.
    resumeTimerRef.current = window.setTimeout(() => {
      setArrowPaused(false);
      resumeTimerRef.current = null;
    }, 1700);
  };

  const onVideoPlay = (id: string, current: HTMLVideoElement) => {
    // Playing a second video pauses the first to avoid overlapping audio.
    videoStripRef.current?.querySelectorAll('video').forEach(video => {
      if (video !== current && !video.paused) video.pause();
    });
    playingVideosRef.current.add(id);
    setVideoPlaying(true);
  };
  const onVideoPause = (id: string) => {
    playingVideosRef.current.delete(id);
    setVideoPlaying(playingVideosRef.current.size > 0);
  };
  useEffect(() => () => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
  }, []);

  return <section id="gallery" className="bg-site text-[#3c3033] py-16 lg:py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center reveal-on-scroll">
      <p className="font-raleway text-sm font-semibold tracking-widest text-[#9a5967] uppercase mb-1">{language==='en'?'Our Work':language==='pt'?'Nosso trabalho':'Nuestro trabajo'}</p>
      <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider text-[#3c3033]">{language==='en'?'Gallery':language==='pt'?'Galeria':'Galería'}</h2>
      <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4"/>
      <div className="flex flex-wrap justify-center gap-2 mt-7" role="tablist" aria-label={language==='en'?'Gallery categories':language==='pt'?'Categorias da galeria':'Categorías de la galería'}>{categories.map(category => <button key={category} type="button" onClick={()=>changeFilter(category)} aria-pressed={filter===category} className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${filter===category?'bg-[#5b3239] text-white':'bg-[#f3d9d0] text-[#5b3239] hover:bg-[#efb7c8]'}`}>{labels[language][category]}</button>)}</div>
    </div>
    <div className="relative max-w-7xl mx-auto scroll-motion-layer" data-scroll-motion>
      <button type="button" onClick={()=>move(-1)} aria-label={language==='en'?'Previous gallery photos':language==='pt'?'Fotos anteriores':'Fotos anteriores'} className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#5b3239]/90 text-white shadow-lg transition hover:bg-[#7a4753] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#efb7c8] cursor-pointer"><ChevronLeft className="h-5 w-5" /></button>
      <div ref={viewportRef} className="gallery-marquee-viewport overflow-x-auto px-12 sm:px-16 pb-3" onMouseEnter={()=>setHoverPaused(true)} onMouseLeave={()=>setHoverPaused(false)} onFocus={()=>setFocusPaused(true)} onBlur={(event)=>{if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusPaused(false);}} onTouchStart={()=>setTouchPaused(true)} onTouchEnd={()=>setTouchPaused(false)} onTouchCancel={()=>setTouchPaused(false)} tabIndex={0} aria-label={language==='en'?'Automatically scrolling gallery':language==='pt'?'Galeria com rolagem automática':'Galería con desplazamiento automático'}>
        <div className="flex w-max gap-4">
          {shown.map((item,index)=><button key={`${filter}-${item.id}-${index}`} type="button" onClick={()=>setLightboxIndex(index % shown.length)} data-bella-gallery-card className="group relative shrink-0 w-[min(58vw,208px)] sm:w-[250px] lg:w-[270px] aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-[#d8be9b]/60 cursor-pointer bg-[#eae0da] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#9a5967]" aria-hidden={undefined} aria-label={`${item.alt} - ${language==='pt'?'ampliar':language==='es'?'ampliar':'expand'}`} tabIndex={0}>
            <img src={item.image} alt={item.alt} loading="lazy" draggable={false} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            {item.serviceName && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-10 text-left text-xs font-semibold text-white">{item.serviceName}</span>}
          </button>)}
        </div>
      </div>
      <button type="button" onClick={()=>move(1)} aria-label={language==='en'?'Next gallery photos':language==='pt'?'Próximas fotos':'Fotos siguientes'} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#5b3239]/90 text-white shadow-lg transition hover:bg-[#7a4753] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#efb7c8] cursor-pointer"><ChevronRight className="h-5 w-5" /></button>
    </div>
    <div className="mt-6 flex items-center justify-center gap-3 text-[11px] tracking-wide text-[#675960]">
      {autoScrollEnabled && <button type="button" onClick={()=>setManualPaused(value=>!value)} className="inline-flex items-center gap-1.5 rounded-full border border-[#9a5967]/40 px-3 py-1.5 hover:bg-[#f3d9d0] cursor-pointer" aria-pressed={manualPaused}>{manualPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}{manualPaused ? (language==='en'?'Play':language==='pt'?'Reproduzir':'Reproducir') : (language==='en'?'Pause':language==='pt'?'Pausar':'Pausar')}</button>}
      <span>{autoScrollEnabled ? (language==='en'?'Auto-scroll · Hover or focus to pause · Swipe to browse':language==='pt'?'Rolagem automática · Passe o mouse ou foque para pausar · Deslize para navegar':'Desplazamiento automático · Pase el cursor o enfoque para pausar · Deslice para navegar') : (language==='en'?'Swipe or use arrows to browse':language==='pt'?'Deslize ou use as setas para navegar':'Deslice o use las flechas para navegar')}</span>
    </div>
    {filter==='All'&&limit<current.length&&<div className="text-center mt-9"><button type="button" onClick={()=>setLimit(v=>v+16)} className="rounded-full px-8 py-3 bg-[#5b3239] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#7a4753] cursor-pointer">{language==='en'?'Show More':language==='pt'?'Ver Mais':'Ver Más'}</button></div>}
    {currentVideos.length > 0 && <div id="gallery-videos" className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-3 items-end justify-between mb-5">
        <div>
          <span className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#9a5967]">{language==='en'?'Behind the scenes':language==='pt'?'Nos bastidores':'Tras las cámaras'}</span>
          <h3 className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239] mt-2">{language==='en'?'Treatment Videos':language==='pt'?'Vídeos dos tratamentos':'Vídeos de tratamientos'}</h3>
          <p className="text-sm text-[#675960] mt-2">{language==='en'?'Real treatment videos, organised by service. Press play to watch.':language==='pt'?'Vídeos reais, separados por serviço. Toque para reproduzir.':'Vídeos reales, organizados por servicio. Pulsa para reproducir.'}</p>
        </div>
        <span className="font-montserrat text-xs rounded-full bg-[#f3d9d0] px-3 py-2 text-[#5b3239]">{currentVideos.length} {language==='pt'?'vídeos':language==='es'?'vídeos':'videos'}</span>
      </div>
      <div ref={videoStripRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" aria-label={language==='pt'?'Galeria de vídeos dos serviços':'Treatment video gallery'}>
        {currentVideos.map((item,index)=><article key={item.id} data-bella-gallery-video data-service={item.serviceName} className="shrink-0 w-[min(75vw,240px)] sm:w-[270px] overflow-hidden rounded-2xl border border-[#d8be9b]/60 bg-white shadow-md snap-start">
          <div className="aspect-[3/4] bg-[#22181b]">
            <video src={item.src} controls playsInline preload="metadata" aria-label={`${item.serviceName} — ${language==='pt'?'vídeo':language==='es'?'vídeo':'video'} ${index+1}`} onPlay={(event)=>onVideoPlay(item.id,event.currentTarget)} onPause={()=>onVideoPause(item.id)} onEnded={()=>onVideoPause(item.id)} className="h-full w-full object-contain" />
          </div>
          <div className="px-3 py-3">
            <p className="font-montserrat text-xs font-semibold text-[#5b3239]">{item.serviceName}</p>
            <p className="text-[11px] text-[#846f75] mt-1">{language==='pt'?'Vídeo real do serviço':language==='es'?'Vídeo real del servicio':'Real treatment video'}</p>
          </div>
        </article>)}
      </div>
      <p className="text-xs text-[#846f75] mt-2">{language==='pt'?'Deslize horizontalmente para ver todos os vídeos.':language==='es'?'Desliza horizontalmente para ver todos los vídeos.':'Scroll sideways to see every video.'}</p>
    </div>}
    <GalleryLightbox images={shown} index={lightboxIndex} onClose={()=>setLightboxIndex(null)} onIndexChange={setLightboxIndex} language={language}/>
  </section>;
};
