import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SERVICES, Language, getLocalizedService } from '../data/siteData';
import { siteAsset, siteImages } from '../data/siteImages';

interface ServicesSectionProps { onOpenAppointment: () => void; onNavigateToServices: (serviceId?: string) => void; language: Language; }

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAppointment, onNavigateToServices, language }) => {
  // Four different photos: no duplicate photos between the homepage service cards.
  const cardPhotos: Record<string, string> = {
    'nano-strokes': siteImages.services.brows,
    'lip-blush': siteImages.services.lipBlush,
    'lash-lift': siteImages.services.lashes,
    dermaplaning: siteImages.services.facialTreatment,
  };
  const topServices = ['nano-strokes', 'lip-blush', 'lash-lift', 'dermaplaning'].flatMap((id) => {
    const service = SERVICES.find((item) => item.id === id);
    return service ? [{ ...getLocalizedService(service, language), image: cardPhotos[id] }] : [];
  });
  return <section className="relative bg-site py-16 lg:py-24 overflow-hidden border-b border-neutral-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-on-scroll">
        <p className="font-raleway text-3xl sm:text-4xl text-neutral-800 font-light uppercase tracking-wider mb-1">{language === 'en' ? <>Brows, Lashes &amp; <span className="font-bold">Skin Care</span></> : language === 'pt' ? <>Sobrancelhas, Cílios &amp; <span className="font-bold">Pele</span></> : <>Cejas, Pestañas y <span className="font-bold">Piel</span></>}</p>
        <p className="font-raleway text-2xl sm:text-3xl text-[#9a5967] font-normal uppercase tracking-widest">{language === 'en' ? 'beauty treatments' : language === 'pt' ? 'tratamentos de beleza' : 'tratamientos de belleza'}</p>
        <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 scroll-stagger">
        {topServices.map((service, index) => <a key={service.id} href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services/${service.id}`} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return; event.preventDefault(); onNavigateToServices(service.id); }} className={`group block relative h-96 rounded-2xl overflow-hidden reveal-scale shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl reveal-on-scroll text-left ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : index === 3 ? 'reveal-delay-3' : ''}`}>
          <div className="absolute inset-0 overflow-hidden scroll-motion-layer" data-scroll-motion><img src={service.image} alt={service.title} className="service-card-image w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" loading="lazy" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-all duration-300" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white"><span className="text-[11px] font-bold tracking-widest text-amber-300 uppercase mb-1">{service.subtitle || 'Bella Beauty Treatment'}</span><h3 className="font-raleway text-xl font-bold uppercase tracking-wider text-white mb-2">{service.title}</h3><div className="w-8 h-0.5 bg-[#9a5967] mb-3 transition-all duration-300 group-hover:w-16" /><p className="font-montserrat text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4">{service.description}</p><span className="flex items-center text-xs font-semibold text-amber-200"><span>{language === 'en' ? 'View service' : language === 'pt' ? 'Ver serviço' : 'Ver servicio'}</span><ArrowRight className="w-3.5 h-3.5 ml-1" /></span></div>
        </a>)}
      </div>
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 reveal-from-right bg-[#181214] border border-[#9a5967]/30 text-white reveal-on-scroll"><div className="grid grid-cols-1 lg:grid-cols-12 items-center"><div className="lg:col-span-5 relative bg-black min-h-[380px] lg:min-h-[520px] overflow-hidden scroll-motion-layer" data-scroll-motion><img src={siteAsset('/assets/bella/dermaplaning-facial-treatment.webp')} alt="Bella Beauty Brazil facial treatment and skin care" className="service-editorial-image w-full h-full max-h-[540px] object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" /><span className="absolute top-4 left-4 z-20 inline-flex items-center bg-black/70 text-amber-200 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-200/30">{language === 'en' ? 'Skin-focused care' : language === 'pt' ? 'Cuidados para a pele' : 'Cuidado de la piel'}</span></div><div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 z-10 space-y-6"><div><span className="text-xs font-bold uppercase tracking-widest text-[#efb7c8] mb-2 block">{language === 'en' ? 'Signature treatments' : language === 'pt' ? 'Tratamentos exclusivos' : 'Tratamientos exclusivos'}</span><h3 className="font-raleway text-3xl sm:text-4xl font-light uppercase tracking-wider text-white">Dermaplaning, <span className="font-bold text-[#9a5967]">Facials &amp; Microneedling</span></h3><div className="w-12 h-0.5 bg-[#9a5967] mt-3" /></div><p className="font-montserrat text-neutral-300 text-sm leading-relaxed max-w-xl">{language === 'en' ? 'Skin-focused treatments published in the official Timely catalogue, with service details, prices and durations available through the booking page.' : language === 'pt' ? 'Tratamentos para a pele publicados no catálogo oficial Timely, com detalhes, preços e durações disponíveis na página de reserva.' : 'Tratamientos para la piel publicados en el catálogo oficial de Timely, con detalles, precios y duración disponibles en la reserva.'}</p><a href="/services/dermaplaning" onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return; event.preventDefault(); onNavigateToServices('dermaplaning'); }} className="inline-flex items-center space-x-2 bg-[#9a5967] hover:bg-[#a96e2e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg cursor-pointer"><span>{language === 'en' ? 'View treatments' : language === 'pt' ? 'Ver tratamentos' : 'Ver tratamientos'}</span><ArrowRight className="w-4 h-4" /></a></div></div></div>
      <div className="text-center"><button type="button" onClick={onOpenAppointment} className="inline-flex items-center space-x-2.5 bg-[#9a5967] hover:bg-[#a96e2e] text-white text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"><Calendar className="w-4 h-4 text-white" /><span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDAR' : 'RESERVAR'}</span></button></div>
    </div>
  </section>;
};
