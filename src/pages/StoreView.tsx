import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { COURSES, Language } from '../data/siteData';
import { siteImages, siteAsset } from '../data/siteImages';

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

// Use only existing approved assets. Keep videos with their respective course,
// and do not label general class footage as footage of an unverified technique.
const courseClips: Record<string, {src: string; poster: string; en: string; pt: string; es: string }[]> = {
  'nano-strokes-course': [
    {
      src: siteAsset('assets/bella/media-alinhada-2026-10/nano-strokes/01.mp4'),
      poster: siteImages.training.coursePhotos['nano-strokes-course'],
      en: 'Nano Strokes technique demonstration',
      pt: 'Demonstração da técnica Nano Strokes',
      es: 'Demostración de la técnica Nano Strokes',
    },
  ],
  'lash-lift-course': [
    {
      src: siteImages.training.videos[1].src,
      poster: siteImages.training.coursePhotos['lash-lift-course'],
      en: 'Lash treatment training in practice',
      pt: 'Treino prático de tratamento de cílios',
      es: 'Formación práctica de pestañas',
    },
  ],
  'brow-lamination-course': [
    {
      src: siteImages.training.videos[0].src,
      poster: siteImages.training.coursePhotos['brow-lamination-course'],
      en: 'Inside a hands-on beauty training class',
      pt: 'Bastidores de uma formação prática de beleza',
      es: 'Dentro de una clase práctica de belleza',
    },
  ],
};

export const StoreView: React.FC<StoreViewProps> = ({ language }) => {
  const t = TRAINING_COPY[language];
  return (
    <main className="bg-site">
      <header className="relative isolate overflow-hidden bg-[#21171c] text-white border-b border-[#9a5967]/30">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 w-72 h-72 bg-[#9a5967]/20 rounded-full blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-4 w-80 h-80 bg-[#7a4753]/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-8 lg:gap-16 items-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#efb7c8] font-bold mb-4">Bella Beauty Brazil · Livia Rego</p>
            <h1 className="font-raleway text-4xl sm:text-5xl lg:text-6xl font-light uppercase tracking-[0.08em] leading-tight">{language === 'en' ? 'Courses' : 'Cursos'}</h1>
            <div className="w-16 h-0.5 bg-[#efb7c8] my-6" aria-hidden="true" />
            <p className="font-montserrat uppercase tracking-[0.16em] text-[#e5acbc] text-xs sm:text-sm font-bold">{t.eyebrow}</p>
            <h2 className="font-raleway text-2xl sm:text-3xl lg:text-4xl leading-tight font-semibold mt-3 mb-5">{t.heading}</h2>
            <p className="font-montserrat text-sm sm:text-base leading-relaxed text-[#f2e4e8] max-w-lg">{t.description}</p>
            <a href="#available-courses" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#9a5967] hover:bg-[#af7080] px-6 py-3.5 font-montserrat text-xs uppercase tracking-wider font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />{language === 'en' ? 'Explore courses' : 'Ver cursos'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <figure className="w-full max-w-[330px] sm:max-w-[370px] lg:max-w-[420px] justify-self-center">
            <div className="relative rounded-[28px] overflow-hidden p-1.5 bg-gradient-to-br from-[#e6b3c3] via-[#8f5968] to-[#442a34] shadow-[0_25px_65px_rgba(0,0,0,0.45)]">
              <div className="rounded-[23px] overflow-hidden bg-[#281d23] aspect-[9/16]">
                <img src={siteImages.training.heroPhoto}
                  alt={language === 'en' ? 'Livia guiding a student during practical beauty training' : language === 'pt' ? 'Livia orientando uma aluna durante a formação prática' : 'Livia guiando a una alumna durante la formación'}
                  loading="eager" decoding="async" className="block h-full w-full object-cover object-center" />
              </div>
            </div>
            <figcaption className="font-montserrat text-xs text-center leading-relaxed text-[#eeced8] mt-3">{t.caption}</figcaption>
          </figure>
        </div>
      </header>

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
              <figure className="relative h-72 sm:h-80 bg-[#f4e8ea] border-b border-[#e8d6d5] overflow-hidden">
                <img
                  src={siteImages.training.coursePhotos[course.id as keyof typeof siteImages.training.coursePhotos] || course.image}
                  alt={`${course.title} — Bella Beauty Brazil`}
                  loading="lazy" decoding="async" className="w-full h-full object-contain object-center"
                />
              </figure>
              {courseClips[course.id] && (
                <details className="border-b border-[#e8d6d5] bg-[#fff8f9]">
                  <summary className="cursor-pointer px-6 py-3 font-montserrat text-xs font-bold uppercase tracking-wider text-[#5b3239] hover:bg-[#f3e1e6]">
                    {language === 'en' ? 'Watch course footage' : language === 'pt' ? 'Ver vídeo da formação' : 'Ver vídeo de la formación'}
                  </summary>
                  <div className="px-4 pb-4 space-y-3">
                    {courseClips[course.id].map(clip => (
                      <figure key={clip.src} className="overflow-hidden rounded-xl border border-[#e8d6d5] bg-white">
                        <video src={clip.src} poster={clip.poster} controls playsInline preload="none"
                          aria-label={clip[language]} className="w-full max-h-[350px] object-contain bg-[#281d23]" />
                        <figcaption className="px-3 py-2 font-montserrat text-xs text-[#665760]">{clip[language]}</figcaption>
                      </figure>
                    ))}
                  </div>
                </details>
              )}
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