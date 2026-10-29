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

// Training archive audit (October 2026):
// - Nano Strokes was supplied separately.
// - Lash Lift and Brow Lamination were supplied as ONE joint-course folder.
// - The complete nine-video originals are archived separately. Only videos
//   already available in the published project are linked here.
// - A source video is referenced in at most one location on the page.
const nanoStrokesClips = [1, 2, 3].map(n => ({
  src: siteAsset(`assets/bella/media-alinhada-2026-10/nano-strokes/${String(n).padStart(2, '0')}.mp4`),
  key: `nano-${n}`,
}));
const combinedCourseClips = [1, 2, 3, 4, 5].map(n => ({
  src: siteAsset(`assets/bella/client-2026-10-v2/brow-lamination/brow-lamination-video-${String(n).padStart(2, '0')}.mp4`),
  key: `combined-${n}`,
}));


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
              {course.id === 'nano-strokes-course' && (
                <div className="border-b border-[#e8d6d5] bg-[#fff8f9]">
                  <h4 className="px-6 py-3 font-montserrat text-xs font-bold uppercase tracking-wider text-[#5b3239]">
                    {language === 'en' ? 'Nano Strokes training videos (3)' : language === 'pt' ? 'Vídeos do curso Nano Strokes (3)' : 'Vídeos del curso Nano Strokes (3)'}
                  </h4>
                  <div className="px-4 pb-4 grid gap-4">
                    {nanoStrokesClips.map((clip, index) => (
                      <figure key={clip.key} className="overflow-hidden rounded-xl border border-[#e8d6d5] bg-white">
                        <video src={clip.src} controls playsInline preload="none"
                          aria-label={`Nano Strokes training video ${index + 1}`}
                          className="w-full max-h-[360px] object-contain bg-[#281d23]" />
                        <figcaption className="px-3 py-2 font-montserrat text-xs text-[#665760]">
                          {language === 'en' ? `Nano Strokes — class video ${index + 1}` : language === 'pt' ? `Nano Strokes — aula ${index + 1}` : `Nano Strokes — clase ${index + 1}`}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
              {(course.id === 'lash-lift-course' || course.id === 'brow-lamination-course') && (
                <a href="#combined-lash-brow-course-media" className="block border-b border-[#e8d6d5] bg-[#fff8f9] hover:bg-[#f3e1e6] px-6 py-3 font-montserrat text-xs font-bold uppercase tracking-wider text-[#5b3239]">
                  {language === 'en' ? 'See shared Lash Lift & Brow Lamination class videos ↓' : language === 'pt' ? 'Ver vídeos da formação conjunta ↓' : 'Ver vídeos de la formación conjunta ↓'}
                </a>
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

        <section id="combined-lash-brow-course-media" className="mt-12 sm:mt-16 rounded-[28px] border border-[#e8d6d5] bg-[#fff9fa] p-5 sm:p-8" aria-labelledby="joint-training-heading">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#9a5967]">
              {language === 'en' ? 'One shared collection — no repeated videos' : language === 'pt' ? 'Uma coleção conjunta — sem vídeos repetidos' : 'Una colección conjunta — sin vídeos repetidos'}
            </p>
            <h2 id="joint-training-heading" className="font-raleway text-2xl sm:text-3xl text-[#5b3239] mt-2">
              Lash Lift &amp; Brow Lamination
            </h2>
            <p className="font-montserrat text-sm leading-relaxed text-[#675960] mt-3">
              {language === 'en'
                ? 'These recordings were supplied together in one training folder. They are presented once here, with no duplicate video in the individual course cards.'
                : language === 'pt'
                  ? 'Estes vídeos foram enviados na mesma pasta de formação. São apresentados apenas aqui, sem repetir nos cartões dos cursos.'
                  : 'Estos vídeos llegaron juntos en la misma carpeta y aparecen una sola vez, sin duplicados en los cursos.'}
            </p>
          </div>
          <div className="mt-7">
            <h3 className="rounded-full bg-[#5b3239] text-white text-xs uppercase tracking-wider font-bold py-3 px-6 w-fit mx-auto text-center">
              {language === 'en' ? 'View 5 class videos' : language === 'pt' ? 'Ver 5 vídeos da formação' : 'Ver 5 vídeos de la formación'}
            </h3>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {combinedCourseClips.map((clip, index) => (
                <figure key={clip.key} className="bg-white rounded-2xl overflow-hidden border border-[#e8d6d5]">
                  <video src={clip.src} controls playsInline preload="none" className="aspect-[3/4] w-full object-contain bg-[#281d23]"
                    aria-label={`Lash Lift and Brow Lamination combined class — video ${index + 1}`} />
                  <figcaption className="px-4 py-3 font-montserrat text-xs text-[#5b3239]">
                    {language === 'en' ? `Joint class — video ${index + 1}` : language === 'pt' ? `Aula conjunta — vídeo ${index + 1}` : `Clase conjunta — vídeo ${index + 1}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

      </section>
    </main>
  );
};