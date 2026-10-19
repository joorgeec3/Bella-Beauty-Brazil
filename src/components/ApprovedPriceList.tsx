import React from 'react';
import { ArrowRight, CalendarDays, ChevronDown } from 'lucide-react';
import { APPROVED_SERVICE_CATALOG } from '../data/approvedServiceCatalog';
import { BOOKING_URL, Language } from '../data/siteData';

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
            <summary className="cursor-pointer flex items-center justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 text-[#5b3239] focus-visible:outline-2 focus-visible:outline-[#9a5967] list-none [&::-webkit-details-marker]:hidden">
              <span className="flex flex-col gap-1 text-left">
                <span className="font-raleway text-lg sm:text-2xl font-semibold">{group.title}</span>
                <span className="text-xs text-[#886b74] font-montserrat">{group.items.length} {labels.services}</span>
              </span>
              <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-[#f0e3e4]">
              {group.intro && <p className="text-sm font-montserrat text-[#675960] leading-relaxed mb-5 mt-4 max-w-3xl">{group.intro}</p>}
              <div className="grid md:grid-cols-2 gap-x-8">
                {group.items.map((item) => (
                  <div key={item.name} className="py-4 border-b border-[#f0e6e6]">
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="font-montserrat font-semibold text-sm text-[#5b3239] leading-snug">{item.name}</h3>
                      <span className="font-montserrat text-sm font-bold text-[#8b5462] tabular-nums shrink-0">A${item.aud}</span>
                    </div>
                    {item.description && <p className="font-montserrat text-xs sm:text-sm text-[#675960] leading-relaxed mt-2">{item.description}</p>}
                    {item.note && <p className="font-montserrat text-xs text-[#9a5967] font-semibold mt-2">{item.note}</p>}
                  </div>
                ))}
              </div>
              {group.footer && <p className="bg-[#faf4f4] px-4 py-3 rounded-lg text-xs sm:text-sm text-[#675960] leading-relaxed mt-5">{group.footer}</p>}
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-[#5b3239] text-white rounded-full px-5 py-3.5 text-xs font-bold tracking-wide hover:bg-[#7a4753] transition-colors focus-visible:outline-2 focus-visible:outline-[#9a5967]"><CalendarDays className="w-4 h-4" />{labels.book}<ArrowRight className="w-4 h-4" /></a>
            </div>
          </details>
        ))}
      </div>
      <p className="text-center text-xs font-montserrat text-[#74636a] mt-7">{labels.note}</p>
    </section>
  );
};
