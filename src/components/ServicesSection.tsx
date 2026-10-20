import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SERVICES, Language, getLocalizedService } from '../data/siteData';
import { HomeTreatmentCard } from './HomeTreatmentCard';
import { siteImages } from '../data/siteImages';

interface ServicesSectionProps { onOpenAppointment: () => void; onNavigateToServices: (serviceId?: string) => void; language: Language; }

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAppointment, onNavigateToServices, language }) => {
  // Each featured service uses its own approved gallery; never substitute images from another category.
  const topServices = ['nano-strokes', 'lip-blush', 'lash-lift', 'waxing']
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
      {/* Skin Treatments — approved real procedure photo, with the lighter Bella Beauty palette. */}
      <section id="skin-treatments-feature" aria-labelledby="skin-treatments-feature-heading" className="relative overflow-hidden rounded-[28px] border border-[#e6cdd3] bg-[#fbf3f3] shadow-xl mb-16 reveal-from-right">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="relative lg:col-span-6 min-h-[310px] sm:min-h-[410px] lg:min-h-[480px] overflow-hidden bg-[#e9d7d7]">
            <img
              src={siteImages.services.facialTreatment}
              alt="Real dermaplaning facial skin-care treatment in progress at Bella Beauty Brazil"
              className="service-editorial-image absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#291c23]/45 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#5b3239] shadow-sm">
              {language === 'en' ? 'Real facial care' : language === 'pt' ? 'Cuidado facial real' : 'Cuidado facial real'}
            </span>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
            <span className="font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-[#a15c70]">
              {language === 'en' ? 'Feel cared for, from start to finish' : language === 'pt' ? 'Cuidado em cada detalhe' : 'Cuidado en cada detalle'}
            </span>
            <h3 id="skin-treatments-feature-heading" className="font-raleway text-3xl sm:text-4xl xl:text-5xl font-semibold tracking-tight text-[#5b3239] mt-3 leading-tight">
              {language === 'en' ? 'Skin Treatments' : language === 'pt' ? 'Tratamentos de Pele' : 'Tratamientos de Piel'}
            </h3>
            <div className="w-14 h-0.5 bg-[#b77286] mt-5 mb-5" />
            <p className="font-montserrat text-sm sm:text-base leading-relaxed text-[#66535b] max-w-lg">
              {language === 'en'
                ? 'Skin care tailored to you. Explore gentle exfoliation, targeted skin treatments and relaxing facials, with individual attention at every appointment.'
                : language === 'pt'
                  ? 'Cuidados para a pele feitos para você. Conheça esfoliação delicada, tratamentos personalizados e faciais relaxantes, sempre com atenção individual.'
                  : 'Cuidados para tu piel. Descubre exfoliación suave, tratamientos personalizados y faciales relajantes, siempre con atención individual.'}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6" aria-label={language === 'en' ? 'Available skin treatments' : language === 'pt' ? 'Tratamentos disponíveis' : 'Tratamientos disponibles'}>
              {['Dermaplaning', 'Microneedling', 'Facial Spa', 'Deluxe Facial'].map(name => (
                <span key={name} className="flex items-center gap-2 rounded-lg border border-[#ead5da] bg-white/80 px-3 py-3 text-xs sm:text-sm font-medium text-[#694752]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#b77286] shrink-0" />
                  {name}
                </span>
              ))}
            </div>
            <a
              href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/services`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                onNavigateToServices('dermaplaning');
              }}
              className="inline-flex w-fit items-center justify-center gap-3 mt-7 rounded-full bg-[#9a5967] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-[#7a4753] transition-colors focus-visible:outline-2 focus-visible:outline-[#9a5967] cursor-pointer"
            >
              {language === 'en' ? 'Explore skin treatments' : language === 'pt' ? 'Ver tratamentos de pele' : 'Ver tratamientos de piel'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <div className="text-center"><button type="button" onClick={onOpenAppointment} className="inline-flex items-center space-x-2.5 bg-[#9a5967] hover:bg-[#a96e2e] text-white text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"><Calendar className="w-4 h-4 text-white" /><span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDAR' : 'RESERVAR'}</span></button></div>
    </div>
  </section>;
};
