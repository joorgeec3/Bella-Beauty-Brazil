import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, Clock3, Images, MapPin } from 'lucide-react';
import { SERVICES, Language, getLocalizedService, getServiceBookingUrl, BOOKING_URL, WHATSAPP_URL } from '../data/siteData';
import { getServiceGroup, SERVICE_GROUPS } from '../data/serviceGroups';
import { APPROVED_SERVICE_CATALOG, approvedDescriptionFor } from '../data/approvedServiceCatalog';
import { SERVICE_GUIDES } from '../data/serviceGuides';
import { NanoStrokesContent } from '../components/NanoStrokesContent';
import { serviceCoverFor } from '../data/serviceCoverPhotos';
import { getServiceGallery, ServicePhotoGallery } from '../components/ServicePhotoGallery';
import { ServiceVideoGallery } from '../components/ServiceVideoGallery';
import { homeGallery } from '../data/galleryData';

type Props = {
  groupId: string;
  language: Language;
  onNavigate: (tab: string, param?: string) => void;
};

const words = {
  en: { priceDuration: 'Price & duration', durationNotListed: 'Duration to confirm with the studio', lipTouchUp: 'Touch-up after 60 days · Price to be confirmed with the studio', all: 'All services', opening: 'Select a treatment to see its complete information, photographs, videos, prices and booking in one place.', photos: 'Photos & videos', view: 'View all treatment details', book: 'Book now', price: 'Price', care: 'Suitability & guidance', results: 'Related treatment comparisons', note: 'Representative category photos are not proof of a particular result.', extra: 'Other waxing options & prices', more: 'View details & photos', whatsapp: 'Confirm details with the studio', none: 'Ask the studio' },
  pt: { priceDuration: 'Preço e duração', durationNotListed: 'Duração a confirmar com o estúdio', lipTouchUp: 'Retoque após 60 dias · Valor a confirmar com o estúdio', all: 'Todos os serviços', opening: 'Abra um tratamento para ver informações, fotos, vídeos, valores e agendamento reunidos em um só lugar.', photos: 'Fotos e vídeos', view: 'Ver página completa do tratamento', book: 'Agendar agora', price: 'Valor', care: 'Indicação e orientações', results: 'Comparações de tratamentos relacionados', note: 'Fotos representativas da categoria não comprovam o resultado de um procedimento específico.', extra: 'Outras opções de depilação e preços', more: 'Ver detalhes e fotos', whatsapp: 'Confirmar detalhes com o estúdio', none: 'Consultar estúdio' },
  es: { priceDuration: 'Precio y duración', durationNotListed: 'Duración por confirmar con el estudio', lipTouchUp: 'Retoque después de 60 días · Precio por confirmar con el estudio', all: 'Todos los servicios', opening: 'Abre un tratamiento para ver su información, fotos, vídeos, precios y reservas en un solo lugar.', photos: 'Fotos y vídeos', view: 'Ver página completa del tratamiento', book: 'Reservar ahora', price: 'Precio', care: 'Indicaciones', results: 'Comparaciones de tratamientos relacionados', note: 'Las fotos representativas no garantizan un resultado específico.', extra: 'Otras opciones de depilación y precios', more: 'Ver detalles y fotos', whatsapp: 'Confirmar detalles con el estudio', none: 'Consultar al estudio' },
} as const;

const treatSlug = (id: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${id}`;

const TreatmentEntry: React.FC<{ id: string; language: Language; first: boolean; onNavigate: Props['onNavigate'] }> = ({ id, language, first, onNavigate }) => {
  const [open, setOpen] = useState(first);
  const source = SERVICES.find(service => service.id === id);
  if (!source) return null;
  const service = getLocalizedService(source, language);
  const cover = serviceCoverFor(id);
  const guide = SERVICE_GUIDES[id]?.[language];
  const photoSet = getServiceGallery(id);
  const copy = words[language];
  const desc = id === 'lip-blush' && language === 'en' ? 'Lip Blush enhances your natural lip colour and definition with a shade selected especially for you. I use a cosmetic tattoo machine to deposit pigment into the lips, creating a softly tinted finish. The colour appears stronger immediately after treatment and softens as the lips heal.' : language === 'en' ? (approvedDescriptionFor(id) || service.description) : service.description;
  const price = typeof service.price === 'number' ? `A$${service.price}` : copy.none;
  const onTreatmentLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate('services', id);
  };

  return <details id={`treatment-${id}`} open={open} onToggle={event => setOpen(event.currentTarget.open)} data-floating-clearance className="group overflow-hidden rounded-2xl border border-[#e8d6d5] bg-white shadow-sm">
    <summary className="cursor-pointer flex gap-4 sm:gap-6 p-4 sm:p-6 items-center text-[#5b3239] list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-[#9a5967]">
      <div className="w-24 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-[#eee2df] flex items-center justify-center">
        {cover ? <img src={cover.src} alt={service.title} loading="lazy" className="w-full h-full object-contain" /> : <span className="font-raleway text-3xl text-[#9a5967]">{service.title.slice(0,1)}</span>}
      </div>
      <span className="min-w-0 flex-1">
        <span className="block font-raleway text-lg sm:text-2xl font-semibold leading-snug">{service.title}</span>
        <span className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-wide text-[#9a5967] mt-3">{copy.more} <ChevronDown aria-hidden="true" className="w-4 h-4 transition-transform group-open:rotate-180" /></span>
      </span>
    </summary>
    {open && <div className="border-t border-[#f0e3e4]">
      {(id === 'nano-strokes' || id === 'shadow-brows')
        ? <NanoStrokesContent variant={id} language={language} media={<>
            {photoSet.photos.some(photo => photo.src !== cover?.src) && <ServicePhotoGallery serviceId={id} language={language} excludeSrc={cover?.src} />}
            <ServiceVideoGallery serviceId={id} language={language} />
          </>} />
        : <>
      <div className="p-5 sm:p-7">
        <section aria-label={copy.priceDuration} className="rounded-2xl bg-[#f3d9d0] border border-[#e8c5c8] p-5 sm:p-7 mb-6">
          <h3 className="font-raleway text-xl sm:text-2xl font-semibold text-[#5b3239]">{copy.priceDuration}</h3>
          <p className="flex flex-wrap items-center gap-2 font-montserrat text-base font-semibold text-[#402d35] mt-3">
            <Clock3 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{price}</span>
            <span aria-hidden="true">·</span>
            <span>{service.duration || copy.durationNotListed}</span>
          </p>
          {id === 'lip-blush' && <p className="font-montserrat text-base text-[#402d35] mt-2">{copy.lipTouchUp}</p>}
        </section>
        <p className="font-montserrat text-sm sm:text-base text-[#55464c] leading-relaxed">{desc}</p>
        {cover && !cover.specific && <p className="font-montserrat text-xs text-[#846f75] mt-3">{copy.note}</p>}
        {id === 'lip-blush' ? <div className="mt-5 rounded-xl bg-[#faf0f2] p-4 sm:p-5"><h3 className="font-raleway font-semibold text-lg text-[#5b3239]">Is this treatment right for me?</h3><p className="font-montserrat text-base leading-7 mt-2 text-[#3f3539]">This treatment may suit you if you would like to enhance pale lips, improve colour definition or achieve a softly tinted look. I assess your natural lip colour and discuss your goals before recommending a personalised treatment.</p></div> : guide && <div className="mt-5 rounded-xl bg-[#faf0f2] p-4 sm:p-5"><h3 className="font-raleway font-semibold text-lg text-[#5b3239]">{copy.care}</h3><p className="font-montserrat text-sm leading-relaxed mt-2 text-[#55464c]">{guide.idealFor}</p><p className="font-montserrat text-sm leading-relaxed mt-2 text-[#55464c]">{guide.comparison}</p></div>}
        <div className="flex flex-wrap gap-3 mt-6 items-center">
          <a href={getServiceBookingUrl(id)} className="inline-flex items-center justify-center gap-2 bg-[#5b3239] text-white rounded-full px-5 py-3 text-xs font-bold hover:bg-[#7a4753]"><CalendarDays className="w-4 h-4"/>{copy.book}</a>
          <a href={treatSlug(id)} onClick={onTreatmentLink} className="inline-flex items-center gap-2 rounded-full border border-[#9a5967]/50 px-5 py-3 text-xs font-semibold text-[#5b3239] hover:bg-[#f3d9d0]">{id === 'lip-blush' ? 'Explore other treatments' : copy.view}<ArrowRight className="w-4 h-4"/></a>
        </div>
      </div>
      {photoSet.photos.some(photo => photo.src !== cover?.src) && <ServicePhotoGallery serviceId={id} language={language} excludeSrc={cover?.src} />}
      <ServiceVideoGallery serviceId={id} language={language} />
        </>}
    </div>}
  </details>;
};

export const ServiceCategoryView: React.FC<Props> = ({ groupId, language, onNavigate }) => {
  const group = getServiceGroup(groupId);
  if (!group) return null;
  const t = words[language];
  const visibleServiceIds = group.serviceIds.filter(id => id !== 'lash-lift-only');
  // Previous homepage category-level pictures remain available here, once
  // each, and are never falsely presented as a result of an exact procedure.
  const usedTreatmentPhotos = new Set(group.serviceIds.flatMap(id => getServiceGallery(id).photos.map(photo => photo.src)));
  const categoryPhotos = homeGallery.filter(item =>
    item.category === group.photoCategory && item.kind === 'editorial' && !usedTreatmentPhotos.has(item.image)
  );
  const waxLists = groupId === 'waxing' ? APPROVED_SERVICE_CATALOG.filter(cat => cat.id === 'women-waxing' || cat.id === 'men-waxing') : [];

  return <div data-inline-booking-page className="bg-site min-h-[70vh]">
    <header className="bg-[#5b3239] text-white px-4 py-11 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <button type="button" onClick={() => onNavigate('services')} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#efb7c8] hover:text-white cursor-pointer"><ArrowLeft className="w-4 h-4" />{t.all}</button>
        <p className="font-montserrat text-xs uppercase tracking-widest text-[#efb7c8] mt-7">Bella Beauty Brazil · Greenslopes, Brisbane</p>
        <h1 className="font-raleway text-3xl sm:text-5xl uppercase tracking-wider mt-3">{group.title[language]}</h1>
        <p className="font-montserrat text-sm sm:text-base text-[#f3dfe6] mt-4 leading-relaxed max-w-2xl">{group.lead[language]}</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[#efb7c8]/65 text-[#f3dfe6] px-4 py-2.5 mt-5 font-montserrat text-xs font-semibold hover:bg-white/10">
          {language === 'en' ? 'Questions? WhatsApp' : language === 'pt' ? 'Dúvidas? WhatsApp' : '¿Preguntas? WhatsApp'}
        </a>
      </div>
    </header>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="font-montserrat text-sm text-[#675960] mb-6 max-w-2xl">{t.opening}</p>
      <div className="flex flex-wrap gap-2 mb-7" role="navigation" aria-label={group.title[language]}>
        {visibleServiceIds.map(id => { const s = SERVICES.find(item => item.id === id); return s ? <a key={id} href={`#treatment-${id}`} onClick={() => { const el=document.getElementById(`treatment-${id}`) as HTMLDetailsElement | null; if(el) el.open=true; }} className="rounded-full border border-[#d8bac3] bg-white px-3.5 py-2.5 font-montserrat text-xs font-semibold text-[#5b3239] hover:bg-[#f3d9d0]">{getLocalizedService(s,language).title}</a> : null; })}
      </div>
      <div className="space-y-4">
        {visibleServiceIds.map((id, i) => <React.Fragment key={id}><TreatmentEntry key={id} id={id} language={language} first={i===0} onNavigate={onNavigate}/>{id === 'lash-lift' && <div className="rounded-xl border border-[#e8d6d5] bg-white px-5 py-4 flex flex-wrap items-center justify-between gap-3"><span className="font-montserrat text-sm font-semibold text-[#5b3239]">Lash Lift Only — without tint</span><span className="font-montserrat text-sm font-semibold text-[#5b3239]">A$119</span></div>}</React.Fragment>)}
      </div>
      {categoryPhotos.length > 0 && <details className="mt-10 rounded-2xl border border-[#e8d6d5] bg-white overflow-hidden">
        <summary className="cursor-pointer px-5 sm:px-7 py-5 font-raleway text-lg sm:text-xl font-semibold text-[#5b3239] focus-visible:outline-2 focus-visible:outline-[#9a5967]">
          {language === 'en' ? 'More studio photos in this category' : language === 'pt' ? 'Mais fotos do estúdio nesta categoria' : 'Más fotos del estudio en esta categoría'} ({categoryPhotos.length})
        </summary>
        <div className="px-4 sm:px-6 pb-6 border-t border-[#f0e3e4]">
          <p className="font-montserrat text-xs text-[#846f75] mt-4 mb-5">
            {language === 'en' ? 'Category-level images are not presented as results of a specific appointment.' : language === 'pt' ? 'Estas imagens ilustram a categoria e não são apresentadas como resultados de um tratamento específico.' : 'Estas imágenes ilustran la categoría y no resultados de un servicio específico.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryPhotos.map(photo => <a key={photo.id} href={photo.image} target="_blank" rel="noopener noreferrer" className="block overflow-hidden bg-[#f5eeec] rounded-xl border border-[#e8d6d5] hover:shadow-md transition-shadow">
              <img src={photo.image} alt={photo.alt} loading="lazy" className="w-full aspect-[4/5] object-contain" />
              <span className="block px-2.5 py-2 font-montserrat text-[11px] text-[#675960] leading-snug">{photo.serviceName || photo.alt}</span>
            </a>)}
          </div>
        </div>
      </details>}
      {groupId === 'cosmetic-tattooing' && <section className="mt-8 sm:mt-10" aria-label={language === 'en' ? 'Additional cosmetic tattoo appointments' : language === 'pt' ? 'Outros atendimentos de tatuagem cosmética' : 'Otras citas de tatuaje cosmético'}>
        <h2 className="font-raleway text-xl sm:text-2xl font-semibold text-[#5b3239] mb-2">
          {language === 'en' ? 'Consultation & colour refresh' : language === 'pt' ? 'Consulta e manutenção da cor' : 'Consulta y mantenimiento del color'}
        </h2>
        <p className="font-montserrat text-xs text-[#675960] mb-4">
          {language === 'en' ? 'Additional appointments listed in the updated Timely menu.' : language === 'pt' ? 'Atendimentos adicionais do menu Timely atualizado.' : 'Citas adicionales del menú Timely actualizado.'}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: 'consultation', title: { en: 'Consultation', pt: 'Consulta', es: 'Consulta' }, duration: { en: '20 minutes', pt: '20 minutos', es: '20 minutos' }, price: 35 },
            { id: 'annual-colour', title: { en: 'Annual Colour · 6–12 months', pt: 'Manutenção anual da cor · 6–12 meses', es: 'Mantenimiento anual del color · 6–12 meses' }, duration: { en: '1 hour, 50 minutes', pt: '1 hora e 50 minutos', es: '1 hora y 50 minutos' }, price: 300 },
          ].map(item => <div key={item.id} className="bg-white border border-[#e8d6d5] rounded-xl p-4 sm:p-5 flex flex-col gap-2">
            <h3 className="font-raleway text-base sm:text-lg font-semibold text-[#5b3239]">{item.title[language]}</h3>
            <p className="font-montserrat text-xs text-[#675960]">{item.duration[language]}</p>
            <strong className="font-montserrat text-lg text-[#5b3239]">A${item.price}</strong>
            <a href={BOOKING_URL} className="mt-1 font-montserrat text-xs font-semibold underline underline-offset-4 text-[#7a4753]">
              {language === 'en' ? 'Find this appointment on Timely' : language === 'pt' ? 'Encontrar este atendimento no Timely' : 'Encontrar esta cita en Timely'}
            </a>
          </div>)}
        </div>
      </section>}
      {waxLists.length>0 && <section className="mt-12" aria-label={t.extra}>
        <h2 className="font-raleway text-2xl sm:text-3xl text-[#5b3239] mb-5">{t.extra}</h2>
        <div className="grid md:grid-cols-2 gap-5">{waxLists.map(list => <div key={list.id} className="rounded-2xl bg-white border border-[#e8d6d5] p-5 sm:p-6">
          <h3 className="font-raleway text-xl font-semibold text-[#5b3239]">{list.title}</h3>
          <div className="mt-3">{list.items.filter(item => item.name!=='Brazilian').map(item => <div key={item.name} className="flex justify-between gap-3 py-2.5 border-b border-[#f0e6e6] text-sm font-montserrat"><span>{item.name}</span><strong className="text-[#5b3239] shrink-0">A${item.aud}</strong></div>)}</div>
        </div>)}</div>
        <a href={BOOKING_URL} className="inline-flex mt-5 rounded-full bg-[#5b3239] text-white px-6 py-3 text-xs font-bold hover:bg-[#7a4753]">{t.book}<ArrowRight className="w-4 h-4 ml-2"/></a>
      </section>}
      <p className="flex gap-2 items-center text-xs font-montserrat text-[#675960] mt-10"><MapPin className="w-4 h-4" />Suite 3, 412 Logan Road, Greenslopes, QLD 4120</p>
      <nav className="mt-7 flex flex-wrap gap-2">{SERVICE_GROUPS.filter(g => g.id !== groupId).map(other => <a key={other.id} href={`${import.meta.env.BASE_URL.replace(/\/$/,'')}/services/categories/${other.id}`} className="inline-flex gap-2 border border-[#d8bac3] rounded-full px-3.5 py-2 text-xs font-semibold text-[#5b3239] hover:bg-[#f3d9d0]">{other.title[language]}<ArrowRight className="w-3 h-3"/></a>)}</nav>
    </div>
  </div>;
};
