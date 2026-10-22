import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Clock3, MapPin, Search, X } from 'lucide-react';
import { BOOKING_URL, SERVICES, Language, getLocalizedService, getServiceBookingUrl } from '../data/siteData';
import { siteImages } from '../data/siteImages';
import { ApprovedPriceList } from '../components/ApprovedPriceList';
import { approvedDescriptionFor } from '../data/approvedServiceCatalog';
import { getServicePhotos } from '../components/ServicePhotoGallery';
import { serviceCoverFor } from '../data/serviceCoverPhotos';

interface ServicesViewProps {
  initialServiceId?: string;
  onOpenAppointment: () => void;
  onNavigateToService: (serviceId: string) => void;
  language: Language;
}

const categories = ['All', 'Brows', 'Lips', 'Lashes', 'Skin', 'Smile', 'Waxing'] as const;
type Category = typeof categories[number];

const categoryLabels: Record<Language, Record<Category, string>> = {
  en: { All: 'All', Brows: 'Brows', Lips: 'Lips', Lashes: 'Lashes', Skin: 'Skin', Smile: 'Smile', Waxing: 'Waxing' },
  pt: { All: 'Todos', Brows: 'Sobrancelhas', Lips: 'Lábios', Lashes: 'Cílios', Skin: 'Pele', Smile: 'Sorriso', Waxing: 'Depilação' },
  es: { All: 'Todos', Brows: 'Cejas', Lips: 'Labios', Lashes: 'Pestañas', Skin: 'Piel', Smile: 'Sonrisa', Waxing: 'Depilación' },
};

const copy: Record<Language, {
  title: string; intro: string; search: string; quick: string; explore: string;
  result: string; results: string; clear: string; noResults: string; noResultsText: string;
  details: string; book: string; enquire: string; from: string;
  helpTitle: string; helpText: string; helpCta: string;
}> = {
  en: {
    title: 'Our Services',
    intro: 'Choose a category, open a service to read the approved description and browse our real photos, then book through Timely.',
    search: 'Search treatments, e.g. nano strokes or lash lift',
    quick: 'Quick access',
    explore: 'Explore treatments',
    result: 'service', results: 'services', clear: 'Clear filters',
    noResults: 'No treatments found',
    noResultsText: 'Try a different word or choose another category.',
    details: 'Photos & details', book: 'Choose on Timely', enquire: 'Ask the studio',
    from: 'Prices and availability may change. Confirm on Timely.',
    helpTitle: 'Not sure which treatment to book?',
    helpText: 'Our studio can help you choose a suitable appointment and explain preparation and aftercare.',
    helpCta: 'Check appointments on Timely',
  },
  pt: {
    title: 'Nossos serviços',
    intro: 'Escolha uma categoria, abra o serviço para ler a descrição e passar as fotos reais, depois agende pelo Timely.',
    search: 'Buscar tratamentos: nano strokes, cílios...',
    quick: 'Acesso rápido',
    explore: 'Explore os tratamentos',
    result: 'serviço', results: 'serviços', clear: 'Limpar filtros',
    noResults: 'Nenhum tratamento encontrado',
    noResultsText: 'Tente outra palavra ou escolha outra categoria.',
    details: 'Ver fotos e detalhes', book: 'Escolher no Timely', enquire: 'Consultar o estúdio',
    from: 'Preços e horários podem mudar. Confirme no Timely.',
    helpTitle: 'Não sabe qual tratamento escolher?',
    helpText: 'O estúdio pode orientar sobre o atendimento adequado, preparo e cuidados após o procedimento.',
    helpCta: 'Ver horários no Timely',
  },
  es: {
    title: 'Nuestros servicios',
    intro: 'Elige una categoría, abre un servicio para leer su descripción y ver las fotos reales, y reserva por Timely.',
    search: 'Buscar tratamientos: nano strokes, pestañas...',
    quick: 'Acceso rápido',
    explore: 'Explorar tratamientos',
    result: 'servicio', results: 'servicios', clear: 'Limpiar filtros',
    noResults: 'No se encontraron tratamientos',
    noResultsText: 'Prueba otra palabra o elige otra categoría.',
    details: 'Fotos y detalles', book: 'Elegir en Timely', enquire: 'Consultar al estudio',
    from: 'Los precios y horarios pueden cambiar. Confirma en Timely.',
    helpTitle: '¿No sabes qué tratamiento elegir?',
    helpText: 'El estudio puede orientarte sobre la cita adecuada, la preparación y los cuidados.',
    helpCta: 'Consultar citas en Timely',
  },
};

const featuredServiceIds = ['nano-strokes', 'shadow-brows', 'shadow-hybrid', 'brow-sculpt-tint', 'lip-blush', 'brow-lamination', 'lash-lift'];

// All 27 service covers use matching supplied photos or clearly marked same-family editorial photos.
const cardImageFor = (id: string): string | undefined => serviceCoverFor(id)?.src;
const imageAlt = (id: string, title: string) =>
  serviceCoverFor(id)?.specific
    ? `${title} — real photograph provided by Bella Beauty Brazil`
    : `${title} — representative photo from the related beauty category, not this specific treatment result`;
const normalizeSearch = (value: string) => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const ServicesView: React.FC<ServicesViewProps> = ({ initialServiceId, onNavigateToService, language }) => {
  const [category, setCategory] = useState<Category>(() => {
    const initial = SERVICES.find((service) => service.id === initialServiceId)?.category;
    return categories.includes(initial as Category) ? initial as Category : 'All';
  });
  const [search, setSearch] = useState('');
  const labels = copy[language];

  const localizedServices = useMemo(() => SERVICES.map((service) => getLocalizedService(service, language)), [language]);
  const filteredServices = useMemo(() => {
    const query = normalizeSearch(search.trim());
    return localizedServices.filter((service) => {
      if (category !== 'All' && service.category !== category) return false;
      if (!query) return true;
      return normalizeSearch([service.title, service.description, service.subtitle, service.category].filter(Boolean).join(' ')).includes(query);
    });
  }, [localizedServices, category, search]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, serviceId: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigateToService(serviceId);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
  };

  return <div className="bg-site">
    <header className="relative overflow-hidden bg-[#5b3239] text-center text-white px-4 py-12 sm:py-16">
      <img src={siteImages.editorial.skinPortrait} alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-full w-[40%] max-w-[240px] object-cover opacity-20 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="relative z-10">
      <p className="font-montserrat text-[11px] uppercase tracking-[0.22em] text-[#efb7c8] font-bold mb-3">
        Bella Beauty Brazil · Greenslopes, Brisbane
      </p>
      <h1 className="font-raleway text-3xl sm:text-5xl uppercase font-light tracking-wider">{labels.title}</h1>
      <div className="w-16 h-0.5 bg-[#efb7c8] mx-auto mt-4" />
      <p className="font-montserrat text-sm text-neutral-200 max-w-2xl mx-auto mt-5 leading-relaxed">{labels.intro}</p>
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <section aria-label={labels.quick} className="mb-9">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-[#9a5967] mb-3">{labels.quick}</p>
        <div className="flex flex-wrap gap-2">
          {featuredServiceIds.map((serviceId) => {
            const service = localizedServices.find((item) => item.id === serviceId);
            if (!service) return null;
            return <a key={service.id} href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${service.id}`} onClick={(event) => navigate(event, service.id)}
              className="inline-flex gap-1.5 items-center rounded-full border border-[#dfbcc4] bg-white px-3.5 py-2.5 text-xs font-montserrat font-semibold text-[#5b3239] hover:bg-[#f3d9d0] focus-visible:outline-2 focus-visible:outline-[#9a5967] transition-colors">
              {service.title}<ArrowRight className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>;
          })}
        </div>
      </section>

      <section aria-label={labels.explore} className="mb-7 rounded-2xl bg-white border border-[#e8d6d5] p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
          <h2 className="font-raleway text-xl sm:text-2xl uppercase tracking-wider font-semibold text-[#5b3239]">{labels.explore}</h2>
          <div className="relative w-full md:max-w-[430px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a5967]" aria-hidden="true" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)}
              aria-label={labels.search} placeholder={labels.search}
              className="w-full bg-[#faf6f6] border border-[#e8d6d5] rounded-xl pl-10 pr-10 py-3 font-montserrat text-sm text-[#3c3033] placeholder:text-[#846f75] focus-visible:outline-2 focus-visible:outline-[#9a5967]" />
            {search.length > 0 && <button type="button" onClick={() => setSearch('')} aria-label={labels.clear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9a5967] hover:text-[#5b3239] cursor-pointer"><X className="w-4 h-4" /></button>}
          </div>
        </div>
        <div role="group" aria-label={labels.explore} className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const count = item === 'All' ? SERVICES.length : SERVICES.filter((service) => service.category === item).length;
            return <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
              className={'inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 font-montserrat text-xs font-semibold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#9a5967] ' +
                (category === item ? 'border-[#5b3239] bg-[#5b3239] text-white' : 'border-[#e8d6d5] bg-[#faf6f6] text-[#5b3239] hover:bg-[#f3d9d0]')}>
              {categoryLabels[language][item]} <span className={'tabular-nums rounded-full px-1.5 text-[10px] ' + (category === item ? 'bg-white/20' : 'bg-[#f3d9d0]')}>{count}</span>
            </button>;
          })}
        </div>
      </section>

      <p className="font-montserrat text-xs text-[#675960] mb-5" role="note">{labels.from}</p>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p aria-live="polite" className="font-montserrat text-xs sm:text-sm text-[#675960]">
          <strong className="tabular-nums text-[#5b3239]">{filteredServices.length}</strong> {filteredServices.length === 1 ? labels.result : labels.results}
        </p>
        {(category !== 'All' || search.trim()) && <button type="button" onClick={clearFilters}
          className="font-montserrat text-xs font-semibold text-[#9a5967] underline underline-offset-4 hover:text-[#5b3239] cursor-pointer">{labels.clear}</button>}
      </div>

      {filteredServices.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredServices.map((service) => <article key={service.id}
            className="bg-white border border-[#e8d6d5] rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow">
            {cardImageFor(service.id) ? <a href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${service.id}`} onClick={(event) => navigate(event, service.id)}
              className="block sm:w-[165px] sm:shrink-0 overflow-hidden bg-[#eee2df] focus-visible:outline-2 focus-visible:outline-[#9a5967]">
              <img src={cardImageFor(service.id)} alt={imageAlt(service.id, service.title)}
                loading="lazy" className="w-full h-44 sm:h-full max-h-[240px] sm:max-h-none object-contain bg-[#eee2df] transition-transform duration-500" />
            </a> : <a href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${service.id}`} onClick={(event) => navigate(event, service.id)}
              aria-label={`${service.title} — ${labels.details}`}
              className="flex sm:w-[165px] sm:shrink-0 min-h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-[#f4e5e8] via-[#eddae0] to-[#d6bac3] text-[#5b3239] border-b sm:border-b-0 sm:border-r border-[#e8d6d5] focus-visible:outline-2 focus-visible:outline-[#9a5967]">
              <span className="flex flex-col gap-2 items-center justify-center text-center px-4 py-5">
                <span aria-hidden="true" className="w-12 h-12 rounded-full border border-[#9a5967]/40 flex items-center justify-center font-raleway text-2xl font-semibold">{service.title.trim().charAt(0)}</span>
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-wide">{categoryLabels[language][service.category as Category] || service.category}</span>
              </span>
            </a>}
            <div className="min-w-0 p-4 sm:p-5 flex-1 flex flex-col">
              <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a5967]">{categoryLabels[language][service.category as Category] || service.category}</span>
              <h2 className="font-raleway text-lg sm:text-xl font-semibold text-[#5b3239] mt-1 leading-snug">{service.title}</h2>
              <p className="font-montserrat text-xs text-neutral-600 leading-relaxed line-clamp-3 mt-2">{language === 'en' ? (approvedDescriptionFor(service.id) || service.description) : service.description}</p>
              {serviceCoverFor(service.id) && !serviceCoverFor(service.id)?.specific && <p className="font-montserrat text-[10px] leading-snug text-[#846f75] mt-2">{language === 'en' ? 'Representative beauty category photo' : language === 'pt' ? 'Foto representativa da categoria' : 'Foto representativa de la categoría'}</p>}
              {getServicePhotos(service.id).length > 0 && <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a5967] mt-2">{language === 'en' ? `See ${getServicePhotos(service.id).length} real photos` : language === 'pt' ? `Ver ${getServicePhotos(service.id).length} fotos reais` : `Ver ${getServicePhotos(service.id).length} fotos reales`}</span>}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-[#675960] font-montserrat">
                <span className="font-bold text-[#5b3239]">{typeof service.price === 'number' ? 'A$' + service.price : labels.enquire}</span>
                {service.duration && <span className="inline-flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" aria-hidden="true" />{service.duration}</span>}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-auto pt-4">
                <a href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${service.id}`} onClick={(event) => navigate(event, service.id)}
                  className="inline-flex items-center gap-1.5 border border-[#9a5967]/40 rounded-full px-3.5 py-2.5 text-[11px] font-montserrat font-bold text-[#5b3239] hover:bg-[#f3d9d0] focus-visible:outline-2 focus-visible:outline-[#9a5967] transition-colors">
                  {labels.details}<ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a href={getServiceBookingUrl(service.id)} 
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 bg-[#5b3239] text-white text-[11px] font-montserrat font-bold hover:bg-[#7a4753] focus-visible:outline-2 focus-visible:outline-[#9a5967] transition-colors">
                  <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />{typeof service.price === 'number' ? labels.book : labels.enquire}
                </a>
              </div>
            </div>
          </article>)}
        </div>
      : <div className="text-center bg-white border border-[#e8d6d5] rounded-2xl px-5 py-14">
          <Search className="w-7 h-7 text-[#9a5967] mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-raleway text-2xl text-[#5b3239]">{labels.noResults}</h2>
          <p className="font-montserrat text-sm text-neutral-600 mt-2 mb-5">{labels.noResultsText}</p>
          <button type="button" onClick={clearFilters} className="rounded-full bg-[#5b3239] text-white text-xs font-semibold px-5 py-3 cursor-pointer">{labels.clear}</button>
        </div>}

      <ApprovedPriceList language={language} />

      <aside className="mt-11 sm:mt-14 rounded-2xl bg-[#f3d9d0] border border-[#e8c5c8] p-6 sm:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="font-raleway text-2xl sm:text-3xl text-[#5b3239] font-semibold">{labels.helpTitle}</h2>
          <p className="font-montserrat text-sm text-[#675960] leading-relaxed mt-2 max-w-xl">{labels.helpText}</p>
          <p className="font-montserrat text-xs text-[#675960] flex items-center gap-1 mt-3"><MapPin className="w-3.5 h-3.5" aria-hidden="true" />Greenslopes · Brisbane Southside</p>
        </div>
        <a href={BOOKING_URL} 
          className="inline-flex items-center justify-center gap-2 bg-[#5b3239] hover:bg-[#7a4753] text-white uppercase tracking-wide text-xs font-montserrat font-bold rounded-full px-6 py-4 shrink-0 transition-colors">
          {labels.helpCta}<ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </aside>
    </div>
  </div>;
};
