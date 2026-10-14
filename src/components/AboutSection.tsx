import React from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import { Language } from '../data/siteData';
import { SITE_IMAGES } from '../data/siteImages';

interface AboutSectionProps {
  onOpenAppointment: () => void;
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAppointment, language }) => {

  return (
    <section className="relative bg-site py-16 lg:py-24 overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9a5967] bg-[#9a5967]/10 px-4 py-1.5 rounded-full mb-3">
            <Users className="w-4 h-4 text-[#9a5967]" />
            {language === 'en' ? 'Specialist Team' : language === 'pt' ? 'Equipe Especialista' : 'Equipo Especialista'}
          </span>
          <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 leading-tight uppercase">
            {language === 'en' ? (
              <>Hands that <span className="font-bold text-[#9a5967]">Sculpt &amp; Transform</span></>
            ) : language === 'pt' ? (
              <>Mãos que <span className="font-bold text-[#9a5967]">Modelam &amp; Transformam</span></>
            ) : (
              <>Manos que <span className="font-bold text-[#9a5967]">Moldean &amp; Transforman</span></>
            )}
          </h2>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left / Center: Equipe Especialista (Imagem 2) */}
          <div className="lg:col-span-7 flex flex-col items-center reveal-on-scroll">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl group border-2 border-[#9a5967]/20 bg-neutral-900">
              <img
                src={SITE_IMAGES.about.founderAndTeam}
                alt="Bella Beauty Brazil Equipe Especialista"
                className="about-editorial-image w-full h-auto object-cover object-top max-h-[620px] transition-transform duration-700 group-hover:scale-102"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/assets/')) {
                    target.src = SITE_IMAGES.about.founderAndTeam;
                  }
                }}
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Specialist Team Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-amber-300 uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full mb-1 border border-amber-300/30">
                    <Award className="w-3.5 h-3.5 text-[#9a5967]" />
                    {language === 'en' ? 'Certified Specialists' : language === 'pt' ? 'Terapeutas Certificadas' : 'Terapeutas Certificadas'}
                  </span>
                  <h3 className="font-raleway text-xl sm:text-2xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                    {language === 'en' ? 'Livia Rego & Team' : language === 'pt' ? 'Livia Rego & Equipe' : 'Livia Rego & Equipo'}
                  </h3>
                  <p className="text-xs text-neutral-300 font-montserrat">
                    Suite 3 · 412 Logan Road
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right: Message & Brand philosophy */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 reveal-on-scroll reveal-delay-1">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                src={SITE_IMAGES.brand.goldEmblemStamp}
                alt="Bella Beauty Brazil Emblem"
                className="w-full h-full object-contain filter drop-shadow-xs"
                width={512}
                height={512}
                loading="lazy"
              />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#9a5967] font-bold block mb-1">
                {language === 'en' ? 'Precision & Care' : language === 'pt' ? 'Precisão & Cuidado' : 'Precisión & Cuidado'}
              </span>
              <h3 className="font-raleway text-2xl sm:text-3xl font-light text-neutral-900 leading-tight uppercase">
                {language === 'en' ? (
                  <>Personalized Care by <span className="font-bold text-[#9a5967]">Trained Specialists</span></>
                ) : language === 'pt' ? (
                  <>Atendimento por <span className="font-bold text-[#9a5967]">Especialistas Treinadas</span></>
                ) : (
                  <>Atención por <span className="font-bold text-[#9a5967]">Especialistas Capacitadas</span></>
                )}
              </h3>
            </div>

            <div className="space-y-4 text-neutral-600 font-montserrat text-sm leading-relaxed">
              <p>
                {language === 'en'
                  ? 'Bella Beauty Brazil is specialized in the renowned brows, lashes, cosmetic tattooing and skin treatments. Founded by Livia Rego, our clinic brings expertise, precision, and proven results.'
                  : language === 'pt'
                  ? 'A Bella Beauty Brazil é especializada em sobrancelhas, cílios, tatuagem cosmética e tratamentos para a pele. Fundada por Livia Rego, nossa clínica une técnica, precisão e resultados cuidadosos.'
                  : 'Bella Beauty Brazil se especializa en cejas, pestañas, tatuaje cosmético y tratamientos para la piel. Fundada por Livia Rego, nuestra clínica ofrece técnica, precisión y atención personalizada.'}
              </p>
              <p>
                {language === 'en'
                  ? 'Our team of trained specialists is dedicated to providing personalized care, helping your body reduce bloating and enhance your natural contours in a welcoming space.'
                  : language === 'pt'
                  ? 'Nossa equipe de especialistas oferece cuidados personalizados para realçar sua beleza natural em um ambiente acolhedor e seguro.'
                  : 'Nuestro equipo de especialistas ofrece atención personalizada para realzar tu belleza natural en un espacio acogedor y seguro.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center space-x-2 bg-[#9a5967] hover:bg-[#a96e2e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>
                  {language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'Agendar Horário' : 'Agendar Cita'}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
