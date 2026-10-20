import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SERVICES, Language, getLocalizedService } from '../data/siteData';
import { HomeTreatmentCard } from './HomeTreatmentCard';
import { siteImages } from '../data/siteImages';

interface ServicesSectionProps { onOpenAppointment: () => void; onNavigateToServices: (serviceId?: string) => void; language: Language; }

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAppointment, onNavigateToServices, language }) => {
  // Each featured service uses its own approved gallery; never substitute images from another category.
  const topServices = ['nano-strokes', 'lip-blush', 'lash-lift', 'brow-sculpt']
    .map((id) => SERVICES.find((item) => item.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service) => getLocalizedService(service, language));
  return <section className="relative bg-site py-16 lg:py-24 overflow-hidden border-b border-neutral-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-on-scroll">
        <p className="font-raleway text-xl sm:text-2xl lg:text-3xl text-neutral-800 font-light uppercase tracking-[0.04em] leading-snug mb-2">
          {language === 'en'
            ? <>Cosmetic Tattooing, Brows, Lashes,{' '}<span className="block font-semibold text-[#9a5967] mt-1">Skin Treatments &amp; Waxing</span></>
            : language === 'pt'
              ? <>Tatuagem Cosmética, Sobrancelhas, Cílios,{' '}<span className="block font-semibold text-[#9a5967] mt-1">Tratamentos de Pele e Depilação</span></>
              : <>Tatuaje Cosmético, Cejas, Pestañas,{' '}<span className="block font-semibold text-[#9a5967] mt-1">Tratamientos de Piel y Depilación</span></>}
        </p>
        <p className="font-raleway text-2xl sm:text-3xl text-[#9a5967] font-normal uppercase tracking-widest">{language === 'en' ? 'beauty treatments' : language === 'pt' ? 'tratamentos de beleza' : 'tratamientos de belleza'}</p>
        <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 scroll-stagger">
        {topServices.map((service, index) => (
          <HomeTreatmentCard key={service.id} service={service} language={language} position={index} onNavigate={onNavigateToServices} />
        ))}
      </div>
      {/* Skin and Waxing now have their own topical photo cards in Signature Care above; the large duplicate banner is intentionally omitted. */}
      <div className="text-center"><button type="button" onClick={onOpenAppointment} className="inline-flex items-center space-x-2.5 bg-[#9a5967] hover:bg-[#a96e2e] text-white text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"><Calendar className="w-4 h-4 text-white" /><span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDAR' : 'RESERVAR'}</span></button></div>
    </div>
  </section>;
};
