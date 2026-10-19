import React, { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../data/siteData';
import { bellaBeforeAfter } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';

type Filter = 'All' | 'Brows' | 'Lips' | 'Lashes';
const translations: Record<Language, {eyebrow:string;title:string;intro:string;more:string;filter:Record<Filter,string>}> = {
  en:{eyebrow:'Real Treatment Results',title:'Before & After',intro:'Real comparison photos supplied by Bella Beauty Brazil. Individual results may vary.',more:'View All Results',filter:{All:'All',Brows:'Brows',Lips:'Lips',Lashes:'Lashes'}},
  pt:{eyebrow:'Resultados Reais',title:'Antes e Depois',intro:'Fotos comparativas fornecidas pela Bella Beauty Brazil. Os resultados variam de pessoa para pessoa.',more:'Ver Todos os Resultados',filter:{All:'Todos',Brows:'Sobrancelhas',Lips:'Lábios',Lashes:'Cílios'}},
  es:{eyebrow:'Resultados Reales',title:'Antes y Después',intro:'Fotos comparativas proporcionadas por Bella Beauty Brazil. Los resultados pueden variar.',more:'Ver Todos los Resultados',filter:{All:'Todos',Brows:'Cejas',Lips:'Labios',Lashes:'Pestañas'}}
};
export const BeforeAfterSection: React.FC<{language:Language}> = ({ language }) => {
  const [filter,setFilter] = useState<Filter>('All');
  const [lightboxIndex,setLightboxIndex]=useState<number|null>(null);
  const copy=translations[language];
  const filtered=useMemo(()=>bellaBeforeAfter.filter(item=>filter==='All'||item.category===filter),[filter]);
  // Keep a single copy of each result photo and allow scrolling by touch or arrows.
  const viewportRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) => viewportRef.current?.scrollBy({
    left: direction * Math.max((viewportRef.current?.clientWidth || 280) * 0.7, 260),
    behavior: 'smooth',
  });
  return <section id="results" className="bg-site-soft text-[#3c3033] py-16 lg:py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 reveal-on-scroll">
      <p className="font-raleway text-sm font-semibold tracking-widest text-[#9a5967] uppercase">{copy.eyebrow}</p>
      <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider mt-1">{copy.title}</h2>
      <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
      <p className="text-sm text-[#675960] mt-5 max-w-2xl mx-auto">{copy.intro}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-7">{(['All','Brows','Lips','Lashes'] as Filter[]).map(cat=><button type="button" key={cat} onClick={()=>{setFilter(cat);setLightboxIndex(null);}} aria-pressed={filter===cat} className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${filter===cat?'bg-[#5b3239] text-white':'bg-[#f3d9d0] text-[#5b3239] hover:bg-[#efb7c8]'}`}>{copy.filter[cat]}</button>)}</div>
    </div>
    <div className="scroll-motion-layer" data-scroll-motion>
      <div className="relative w-full max-w-7xl mx-auto before-after-viewport reveal-scale">
        <button type="button" aria-label={language === 'en' ? 'Previous results' : language === 'pt' ? 'Resultados anteriores' : 'Resultados anteriores'} onClick={() => move(-1)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#5b3239]/90 text-white p-3 shadow-lg cursor-pointer hover:bg-[#7a4753] focus-visible:outline-2 focus-visible:outline-[#efb7c8]"><ChevronLeft className="w-5 h-5" /></button>
        <div key={filter} ref={viewportRef} className="before-after-track flex items-stretch gap-4 px-12 sm:px-16 pb-4 overflow-x-auto scroll-smooth snap-x snap-mandatory" aria-label={language === 'en' ? 'Swipe through before-and-after results' : language === 'pt' ? 'Deslize para ver antes e depois' : 'Desliza para ver antes y después'} tabIndex={0}>
          {filtered.map((item,index)=><button key={item.id} type="button" aria-label={`${item.alt} — ${language==='en'?'view larger':'ampliar'}`} onClick={()=>setLightboxIndex(index)} className="group shrink-0 snap-center w-[min(62vw,250px)] sm:w-[270px] lg:w-[300px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-[#d8be9b]/60 cursor-pointer bg-[#eae0da] focus-visible:outline-4 focus-visible:outline-[#9a5967]"><img src={item.image} alt={item.alt} loading="lazy" draggable={false} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.025]" /></button>)}
        </div>
        <button type="button" aria-label={language === 'en' ? 'Next results' : language === 'pt' ? 'Próximos resultados' : 'Siguientes resultados'} onClick={() => move(1)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#5b3239]/90 text-white p-3 shadow-lg cursor-pointer hover:bg-[#7a4753] focus-visible:outline-2 focus-visible:outline-[#efb7c8]"><ChevronRight className="w-5 h-5" /></button>
      </div>
    </div>
    <p className="text-center text-[11px] tracking-wide text-[#675960] mt-6">{language === 'en' ? 'Swipe or use the arrows · Tap to enlarge results' : language === 'pt' ? 'Deslize ou use as setas · Toque para ampliar' : 'Desliza o utiliza las flechas · Toca para ampliar'}</p>
    <GalleryLightbox images={filtered} index={lightboxIndex} onClose={()=>setLightboxIndex(null)} onIndexChange={setLightboxIndex} language={language}/>
  </section>;
};
