import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { COURSES, Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

interface StoreViewProps { language: Language; }
const COURSE_COPY: Record<string, { pt: string; es: string }> = {
  'lash-lift-course': { pt: 'Formação individual de Lash Lift.', es: 'Formación individual de Lash Lift.' },
  'brow-lamination-course': { pt: 'Formação individual de Brow Lamination.', es: 'Formación individual de Brow Lamination.' },
  'classic-eyelashes-course': { pt: 'Formação individual em extensões Classic.', es: 'Formación individual en extensiones Classic.' },
  'nano-strokes-course': { pt: 'Formação em Micro Nano Strokes realistas.', es: 'Formación en Micro Nano Strokes realistas.' },
};
const TRAINING_COPY: Record<Language, { eyebrow: string; heading: string; description: string; caption: string }> = {
  en: {
    eyebrow: 'Behind the scenes',
    heading: 'Training in action',
    description: 'A glimpse inside Bella Beauty Brazil: individual attention, demonstrations and supervised hands-on learning. Explore the professional courses below to find out what each programme covers.',
    caption: 'A real moment from the Bella Beauty Brazil training environment',
  },
  pt: {
    eyebrow: 'Bastidores',
    heading: 'Treinamento na prática',
    description: 'Um registro real da Bella Beauty Brazil: acompanhamento individual, demonstrações e aprendizado prático supervisionado. Conheça abaixo as formações disponíveis.',
    caption: 'Registro real do ambiente de formação da Bella Beauty Brazil',
  },
  es: {
    eyebrow: 'Detrás de cámaras',
    heading: 'Formación en la práctica',
    description: 'Un momento real en Bella Beauty Brazil: atención individual, demostraciones y aprendizaje práctico supervisado. Descubre los cursos disponibles a continuación.',
    caption: 'Momento real del entorno de formación de Bella Beauty Brazil',
  },
};

export const StoreView: React.FC<StoreViewProps> = ({ language }) => {
  const t = TRAINING_COPY[language];
  return (
    <main className="bg-site">
      <header className="relative bg-[#5b3239] text-white py-14 lg:py-20 text-center px-4">
        <p className="font-montserrat text-xs uppercase tracking-widest text-[#efb7c8] mb-2 font-bold">Bella Beauty Brazil</p>
        <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wider">{language === 'en' ? 'Courses' : 'Cursos'}</h1>
        <div className="w-16 h-0.5 bg-[#efb7c8] mx-auto mt-4" />
      </header>

      <section aria-labelledby="training-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] overflow-hidden rounded-3xl bg-[#21181c] border border-[#9a5967]/30 shadow-xl">
          <figure className="relative bg-[#35272c] flex flex-col justify-center p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl bg-[#1b1417] h-[360px] sm:h-[470px] lg:h-[420px]">
              <img src={siteImages.training.practicePhoto} alt={t.caption}
                loading="lazy" className="w-full h-full object-contain object-center" />
            </div>
            <figcaption className="font-montserrat text-[11px] text-[#efced7] leading-relaxed mt-3 text-center">{t.caption}</figcaption>
          </figure>
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 sm:py-12 text-white">
            <p className="font-montserrat uppercase tracking-[0.2em] text-[#e5acbc] text-xs font-bold">{t.eyebrow}</p>
            <h2 id="training-heading" className="font-raleway text-3xl sm:text-4xl lg:text-[42px] font-semibold mt-3">{t.heading}</h2>
            <span aria-hidden="true" className="h-0.5 w-16 bg-[#9a5967] my-6" />
            <p className="font-montserrat text-sm sm:text-base leading-relaxed text-[#f2e4e8]">{t.description}</p>
            <a href="#available-courses" className="mt-8 inline-flex self-start items-center gap-2 rounded-full bg-[#9a5967] hover:bg-[#af7080] px-6 py-3.5 font-montserrat text-xs uppercase tracking-wider font-bold text-white transition-colors">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />{language === 'en' ? 'Explore courses' : language === 'pt' ? 'Ver cursos' : 'Ver cursos'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="available-courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20" aria-label={language === 'en' ? 'Available courses' : 'Cursos disponíveis'}>
        <p className="font-montserrat text-sm text-neutral-600 text-center max-w-3xl mx-auto mb-10">
          {language === 'en'
            ? 'Learn with Livia at Bella Beauty Brazil in Greenslopes, Brisbane. Personalised training combines explanations, demonstrations and guided practice.'
            : language === 'pt'
              ? 'Formações individuais da Bella Beauty Brazil. Consulte os valores e a disponibilidade na plataforma oficial Timely antes de reservar.'
              : 'Formaciones individuales en Bella Beauty Brazil. Consulta precios y disponibilidad en la plataforma oficial Timely antes de reservar.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <article key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e8d6d5] flex flex-col">
              <img src={course.image} alt={course.title} loading="lazy" className="w-full aspect-[4/3] object-contain bg-[#f6eded]" />
              <div className="p-6 flex flex-col grow">
                <span className="font-montserrat text-[11px] font-bold tracking-widest text-[#9a5967] uppercase">{course.duration}</span>
                <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-2">{course.title}</h3>
                <p className="font-montserrat text-sm text-neutral-600 leading-relaxed mt-3 grow">
                  {language === 'en' ? course.description : COURSE_COPY[course.id]?.[language] || course.description}
                </p>
                <p className="font-montserrat text-2xl font-bold text-[#5b3239] mt-5">A${course.price.toFixed(0)}</p>
                <a href={course.bookingUrl} className="inline-flex items-center justify-center gap-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full mt-5 cursor-pointer">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  {language === 'en'
                    ? ({ 'nano-strokes-course': 'ENQUIRE ABOUT NANO STROKES TRAINING', 'lash-lift-course': 'ENQUIRE ABOUT LASH LIFT TRAINING', 'brow-lamination-course': 'ENQUIRE ABOUT BROW LAMINATION TRAINING' } as Record<string,string>)[course.id] || 'ENQUIRE'
                    : language === 'pt' ? 'CONSULTAR CURSO' : 'CONSULTAR CURSO'}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};