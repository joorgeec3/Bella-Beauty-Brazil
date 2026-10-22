import React from 'react';
import { ArrowRight, CalendarDays, ChevronDown } from 'lucide-react';
import { APPROVED_SERVICE_CATALOG } from '../data/approvedServiceCatalog';
import { BOOKING_URL, Language } from '../data/siteData';
import { getServiceGallery } from './ServicePhotoGallery';
import { serviceCoverFor } from '../data/serviceCoverPhotos';
import { categoryPhotosFor } from '../data/bellaApprovedMedia';

/** Matching PDF entries open a full service page with the correct client photos, when available. */
const approvedServiceRoutes: Record<string,string> = {
  "Microblading – Nano Strokes": "nano-strokes",
  "Shadow Brows": "shadow-brows",
  "Lip Blush – Lip Tattooing": "lip-blush",
  "Cosmetic Tattoo Removal": "cosmetic-tattoo-removal",
  "Brow Sculpt Signature": "brow-sculpt",
  "Brow Sculpt & Tint": "brow-sculpt-tint",
  "Brow Sculpt & Hybrid Dye": "shadow-hybrid",
  "Brow Lamination, Shape & Tint": "brow-lamination",
  "Male Brow Sculpt": "male-brow-sculpt",
  "Dreamy Brows – Brow Sculpt & Relaxing Massage": "dreamy-brows",
  "Dermaplaning": "dermaplaning",
  "Microneedling": "microneedling",
  "Lip Bliss Hydration": "lip-bliss-hydration",
  "Facial Spa": "facial-spa",
  "Deluxe Facial": "deluxe-facial",
  "Grow Up Hair – Brows": "grow-up-hair-brows",
  "Grow Up Hair – Scalp": "grow-up-hair-scalp",
  "Lash Lift & Tint": "lash-lift",
  "Lash Lift Only": "lash-lift-only",
  "Classic Lash Extensions": "classic-eyelashes",
  "Hybrid Lash Extensions": "hybrid-eyelashes",
  "Wet Look Lash Extensions": "wet-look-lashes",
  "Lash Tint": "lash-tint",
  "Lash Extension Removal": "lash-extension-removal",
  "Brazilian": "waxing",
  "Teeth Whitening": "teeth-whitening"
};
// A single illustrative cover per category prevents dozens of identical images
// in the waxing price lists, while giving every category a clear visual reference.
const menuGroupCover: Record<string,string> = {
  cosmetic: 'nano-strokes',
  brows: 'brow-sculpt',
  skin: 'dermaplaning',
  lashes: 'lash-lift',
  'women-waxing': 'waxing',
  'men-waxing': 'waxing',
  smile: 'teeth-whitening',
};
// Category header uses another photograph from its category, not its first card.
const groupCoverFor = (groupId: string) => {
  // No extra verified photo for waxing; general skin images already appear below.
  if (groupId === 'skin' || groupId === 'women-waxing' || groupId === 'men-waxing') return undefined;
  const serviceId = menuGroupCover[groupId];
  const gallery = serviceId ? getServiceGallery(serviceId) : undefined;
  const photos = gallery?.photos ?? [];
  return photos.length > 1
    ? { src: photos[photos.length - 1].src, specific: !gallery?.illustrative }
    : undefined;
};
const detailLabels = {
  en: { details: 'See photos & details', photos: 'real photos', related: 'related photos' },
  pt: { details: 'Ver fotos e detalhes', photos: 'fotos reais', related: 'fotos relacionadas' },
  es: { details: 'Ver fotos y detalles', photos: 'fotos reales', related: 'fotos relacionadas' },
};

/** October 2026 copy and AUD prices supplied and approved by Bella Beauty Brazil. */
export const ApprovedPriceList: React.FC<{language: Language}> = ({ language }) => {
  const labels = {
    en: { eyebrow: 'Bella Beauty Brazil · Approved Service Menu', heading: 'All Treatments & Prices', intro: 'Explore every service and price from our updated studio menu. All amounts are in Australian dollars (AUD).', services: 'options', book: 'Select appointment on Timely', note: 'The booking system confirms availability and final service selection.' },
    pt: { eyebrow: 'Bella Beauty Brazil · Menu atualizado', heading: 'Todos os tratamentos e valores', intro: 'Confira todos os serviços e preços do menu atualizado do estúdio. Todos os valores estão em dólares australianos (AUD).', services: 'opções', book: 'Agendar pelo Timely', note: 'Consulte disponibilidade e escolha o procedimento no Timely.' },
    es: { eyebrow: 'Bella Beauty Brazil · Servicios actualizados', heading: 'Todos los tratamientos y precios', intro: 'Consulta los servicios y precios actualizados del estudio. Importes en dólares australianos (AUD).', services: 'opciones', book: 'Reservar en Timely', note: 'Confirma disponibilidad y selección del servicio en Timely.' },
  }[language];

  return (
    <section aria-labelledby="approved-menu-heading" id="full-price-list" className="mt-12 sm:mt-16 pt-10 border-t border-[#d6bac1]">
      <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <p className="uppercase tracking-[0.2em] text-[#9a5967] text-[11px] font-bold mb-3">{labels.eyebrow}</p>
        <h2 id="approved-menu-heading" className="font-raleway text-2xl sm:text-4xl tracking-wider uppercase text-[#5b3239]">{labels.heading}</h2>
        <p className="font-montserrat text-sm text-[#675960] mt-4 leading-relaxed">{labels.intro}</p>
      </header>
      <div className="grid gap-3 sm:gap-4">
        {APPROVED_SERVICE_CATALOG.map((group) => (
          <details key={group.id} id={`prices-${group.id}`} open={group.id === 'skin'} className="group overflow-hidden rounded-2xl border border-[#e8d6d5] bg-white shadow-sm" >
            <summary className="cursor-pointer flex items-center justify-between gap-3 sm:gap-4 px-5 sm:px-7 py-5 sm:py-6 text-[#5b3239] focus-visible:outline-2 focus-visible:outline-[#9a5967] list-none [&::-webkit-details-marker]:hidden">
              {groupCoverFor(group.id) && <img src={groupCoverFor(group.id)?.src} loading="lazy" alt="" aria-hidden="true" className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl border border-[#ead8db] bg-[#f7eef0] object-contain" />}
              <span className="flex flex-col gap-1 text-left min-w-0 flex-1">
                <span className="font-raleway text-lg sm:text-2xl font-semibold">{group.title}</span>
                <span className="text-xs text-[#886b74] font-montserrat">{group.items.length} {labels.services}</span>
              </span>
              <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-[#f0e3e4]">
              {group.intro && <p className="text-sm font-montserrat text-[#675960] leading-relaxed mb-5 mt-4 max-w-3xl">{group.intro}</p>}
              <div className="grid md:grid-cols-2 gap-x-8">
                {group.items.map((item) => (
                  <div key={item.name} className="flex gap-3 sm:gap-4 items-start py-4 border-b border-[#f0e6e6]">
                    {approvedServiceRoutes[item.name] && serviceCoverFor(approvedServiceRoutes[item.name]) && <a
                      href={import.meta.env.BASE_URL + 'services/' + approvedServiceRoutes[item.name]}
                      aria-label={`${item.name} — ${detailLabels[language].details}`}
                      className="block w-[76px] h-[88px] sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-xl border border-[#ead8db] bg-[#f7eef0] focus-visible:outline-2 focus-visible:outline-[#9a5967]">
                      <img src={serviceCoverFor(approvedServiceRoutes[item.name])?.src} alt={serviceCoverFor(approvedServiceRoutes[item.name])?.specific ? `${item.name} at Bella Beauty Brazil` : `${item.name} — representative beauty category photo`}
                        loading="lazy" className="h-full w-full object-contain" />
                    </a>}
                    <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="font-montserrat font-semibold text-sm text-[#5b3239] leading-snug">{item.name}</h3>
                      <span className="font-montserrat text-sm font-bold text-[#8b5462] tabular-nums shrink-0">A${item.aud}</span>
                    </div>
                    {item.description && <p className="font-montserrat text-xs sm:text-sm text-[#675960] leading-relaxed mt-2">{item.description}</p>}
                    {item.note && <p className="font-montserrat text-xs text-[#9a5967] font-semibold mt-2">{item.note}</p>}
                    {approvedServiceRoutes[item.name] && <a
                      href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${approvedServiceRoutes[item.name]}`}
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#8b5462] underline underline-offset-4 hover:text-[#5b3239] focus-visible:outline-2 focus-visible:outline-[#9a5967]">
                      {detailLabels[language].details}
                      {getServiceGallery(approvedServiceRoutes[item.name]).photos.length > 0 && ` · ${getServiceGallery(approvedServiceRoutes[item.name]).photos.length} ${getServiceGallery(approvedServiceRoutes[item.name]).illustrative ? detailLabels[language].related : detailLabels[language].photos}`}
                      <ArrowRight aria-hidden="true" className="w-3.5 h-3.5"/>
                    </a>}
                    </div>
                  </div>
                ))}
              </div>
              {group.footer && <p className="bg-[#faf4f4] px-4 py-3 rounded-lg text-xs sm:text-sm text-[#675960] leading-relaxed mt-5">{group.footer}</p>}
              {group.id === 'cosmetic' && <div className="mt-5 space-y-2 bg-[#fff8f9] border border-[#ead9df] rounded-xl px-4 py-4 text-sm text-[#675960] leading-relaxed">
                <h3 className="font-raleway text-base font-semibold text-[#5b3239]">{language === 'en' ? 'Touch-up Appointments' : language === 'pt' ? 'Retoques' : 'Retoques'}</h3>
                <p>{language === 'en' ? 'Your touch-up appointment allows me to assess the healed result and refine the colour, shape or definition where needed.' : language === 'pt' ? 'No retoque, avalio o resultado cicatrizado e ajusto a cor, o formato ou a definição quando necessário.' : 'En el retoque, evalúo el resultado cicatrizado y ajusto el color, la forma o la definición según sea necesario.'}</p>
                <h3 className="font-raleway text-base font-semibold text-[#5b3239] mt-2">{language === 'en' ? 'Not Sure Which Treatment to Choose?' : language === 'pt' ? 'Não sabe qual tratamento escolher?' : '¿No sabes qué tratamiento elegir?'}</h3>
                <p>{language === 'en' ? 'Book a consultation with me to discuss your goals and find the most suitable option for you.' : language === 'pt' ? 'Agende uma consulta para conversarmos sobre seus objetivos e encontrarmos a opção mais adequada.' : 'Reserva una consulta para hablar sobre tus objetivos y elegir la opción más adecuada.'}</p>
              </div>}
              <a href={BOOKING_URL} className="inline-flex items-center gap-2 mt-6 bg-[#5b3239] text-white rounded-full px-5 py-3.5 text-xs font-bold tracking-wide hover:bg-[#7a4753] transition-colors focus-visible:outline-2 focus-visible:outline-[#9a5967]"><CalendarDays className="w-4 h-4" />{labels.book}<ArrowRight className="w-4 h-4" /></a>
            </div>
          </details>
        ))}
      </div>
      <p className="text-center text-xs font-montserrat text-[#74636a] mt-7">{labels.note}</p>
    </section>
  );
};
