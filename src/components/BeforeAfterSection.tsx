import React, { useMemo, useState } from 'react';
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
  const looping = filtered.length > 1;
  const displayed = looping ? [...filtered, ...filtered] : filtered;
  const seconds = Math.max(22, filtered.length * 6);
  return <section id="results" className="bg-site-soft text-[#3c3033] py-16 lg:py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 reveal-on-scroll">
      <p className="font-raleway text-sm font-semibold tracking-widest text-[#9a5967] uppercase">{copy.eyebrow}</p>
      <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider mt-1">{copy.title}</h2>
      <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
      <p className="text-sm text-[#675960] mt-5 max-w-2xl mx-auto">{copy.intro}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-7">{(['All','Brows','Lips','Lashes'] as Filter[]).map(cat=><button type="button" key={cat} onClick={()=>{setFilter(cat);setLightboxIndex(null);}} aria-pressed={filter===cat} className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${filter===cat?'bg-[#5b3239] text-white':'bg-[#f3d9d0] text-[#5b3239] hover:bg-[#efb7c8]'}`}>{copy.filter[cat]}</button>)}</div>
    </div>
    <div className="scroll-motion-layer" data-scroll-motion>
    <div className="w-full overflow-hidden relative before-after-viewport reveal-scale">
      <div key={filter} className={`before-after-track flex items-stretch gap-4 px-2 ${looping ? 'before-after-auto' : 'justify-center'}`} style={{ '--before-after-duration': `${seconds}s` } as React.CSSProperties}>
        {displayed.map((item,index)=><button key={`${filter}-${item.id}-${index}`} type="button" aria-label={`${item.alt} — ${language==='en'?'view larger':language==='pt'?'ampliar':'ampliar'}`} onClick={()=>setLightboxIndex(index%filtered.length)} tabIndex={index>=filtered.length ? -1:0} aria-hidden={index>=filtered.length ? true:undefined} className="group shrink-0 w-[min(62vw,250px)] sm:w-[270px] lg:w-[300px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-[#d8be9b]/60 cursor-pointer bg-[#eae0da] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#9a5967]"><img src={item.image} alt={index>=filtered.length?'':item.alt} loading="lazy" draggable={false} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.025]" /></button>)}
      </div>
    </div>
    </div>
    <p className="text-center text-[11px] tracking-wide text-[#675960] mt-6">{language==='en'?'Images move automatically · Hover to pause · Tap to enlarge':language==='pt'?'Imagens passam automaticamente · Passe o mouse para pausar · Toque para ampliar':'Imágenes en movimiento automático · Pase el cursor para pausar · Toque para ampliar'}</p>
    <GalleryLightbox images={filtered} index={lightboxIndex} onClose={()=>setLightboxIndex(null)} onIndexChange={setLightboxIndex} language={language}/>
  </section>;
};
