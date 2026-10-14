import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES, Service, Language, getLocalizedService } from '../data/siteData';
import { siteAsset, siteImages } from '../data/siteImages';

interface ServicesViewProps {
  initialServiceId?: string;
  onOpenAppointment: () => void;
  onNavigateToService: (serviceId: string) => void;
  language: Language;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ initialServiceId, onNavigateToService, language }) => {
  const [selectedId] = useState(initialServiceId || SERVICES[0].id);
  const selectedService: Service = getLocalizedService(SERVICES.find((s) => s.id === selectedId) || SERVICES[0], language);
  const cardImages: Record<string, string> = {
    'nano-strokes': siteImages.services.brows,
    'lip-blush': siteImages.services.lipBlush,
    'lash-lift': siteImages.services.lashes,
    dermaplaning: siteImages.services.facialTreatment,
    'brow-sculpt-tint': siteImages.services.browTreatment,
    'facial-spa': siteImages.aboutMe.treatmentRoom,
    waxing: siteImages.services.waxing,
  };
  const featuredServiceIds = Object.keys(cardImages);
  const localizedServices = featuredServiceIds.flatMap((id) => {
    const service = SERVICES.find((item) => item.id === id);
    return service ? [{ ...getLocalizedService(service, language), image: cardImages[id] }] : [];
  });
  const label = language === 'en' ? 'View service' : language === 'pt' ? 'Ver serviço' : 'Ver servicio';

  return <div className="bg-site">
    <div className="relative bg-[#5b3239] text-white py-16 lg:py-24 text-center">
      <p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-2 font-bold">Bella Beauty Brazil · Greenslopes</p>
      <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wider">{language === 'en' ? 'Our Services' : language === 'pt' ? 'Nossos serviços' : 'Nuestros servicios'}</h1>
      <p className="font-montserrat text-sm text-neutral-200 mt-4 max-w-2xl mx-auto px-4">{language === 'en' ? 'Explore brows, cosmetic tattooing, lashes, facial treatments and waxing at Suite 3, 412 Logan Road, Brisbane Southside.' : language === 'pt' ? 'Explore sobrancelhas, tatuagem cosmética, cílios, tratamentos faciais e waxing na Suite 3, 412 Logan Road, Brisbane Southside.' : 'Explora cejas, tatuaje cosmético, pestañas, tratamientos faciales y waxing en Suite 3, 412 Logan Road, Brisbane Southside.'}</p>
      <div className="w-16 h-0.5 bg-[#efb7c8] mx-auto mt-4" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {localizedServices.map((service) => <button key={service.id} type="button" onClick={() => onNavigateToService(service.id)} className="group bg-white rounded-2xl overflow-hidden text-left border border-[#e8d6d5] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
          <div className="relative aspect-[4/3] overflow-hidden"><img src={service.image} alt={`${service.title} at Bella Beauty Brazil`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /><span className="absolute top-3 left-3 bg-[#5b3239]/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{service.category}</span></div>
          <div className="p-5"><span className="text-[10px] uppercase tracking-widest font-bold text-[#9a5967]">{service.subtitle}</span><h2 className="font-raleway text-xl font-bold text-[#5b3239] mt-2">{service.title}</h2><p className="font-montserrat text-sm text-neutral-600 leading-relaxed mt-2 line-clamp-3">{service.description}</p><span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-[#9a5967] mt-4">{label}<ArrowRight className="w-4 h-4" /></span></div>
        </button>)}
      </div>
      <div className="bg-[#f3d9d0] rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#e8c5c8] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6"><div><span className="text-xs font-bold uppercase tracking-widest text-[#9a5967] block mb-1">{selectedService.subtitle}</span><h2 className="font-raleway text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#5b3239] leading-tight">{selectedService.title}</h2><div className="w-12 h-0.5 bg-[#9a5967] mt-3" /></div><p className="font-montserrat text-neutral-700 text-sm sm:text-base leading-relaxed">{selectedService.description}</p>{selectedService.benefits && <ul className="space-y-2.5">{selectedService.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-2.5 text-sm text-neutral-700 font-montserrat"><CheckCircle2 className="w-4 h-4 text-[#9a5967] shrink-0 mt-0.5" />{benefit}</li>)}</ul>}<button type="button" onClick={() => onNavigateToService(selectedService.id)} className="inline-flex items-center gap-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full cursor-pointer"><Sparkles className="w-4 h-4 text-[#efb7c8]" />{label}</button></div>
          <div className="lg:col-span-6"><div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative bg-white border border-[#c99ea7]"><img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" /><div className="absolute top-4 right-4 bg-[#5b3239]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{selectedService.category}</div></div></div>
        </div>
      </div>
    </div>
  </div>;
};
