import React from 'react';
import { ArrowRight, GraduationCap, MessageCircle } from 'lucide-react';
import { COURSES, Language } from '../data/siteData';
import { siteImages, siteAsset } from '../data/siteImages';

interface StoreViewProps { language: Language; }
const COURSE_DETAILS: Record<string, { content: string; practice: string; kit: string; support: string; duration: string }> = {
  'lash-lift-course': { content: 'Consultation, lash assessment, shield selection, product application, processing times and aftercare.', practice: 'Two live models: one Livia demonstration and one supervised student practice.', kit: 'Professional take-home starter kit, training manual, certificate, products and disposables used during training.', support: 'One year of WhatsApp support.', duration: '8 hours · One-to-one · In person · Dates by arrangement' },
  'brow-lamination-course': { content: 'Consultation, brow and hair assessment, mapping and shaping, lamination, tinting, processing times, conditioning care, safety and aftercare.', practice: 'Two live models: one Livia demonstration and one supervised student practice.', kit: 'Professional take-home starter kit, training manual, certificate, products and disposables used during training.', support: 'One year of WhatsApp support.', duration: '8 hours · One-to-one · In person · Dates by arrangement' },
  'nano-strokes-course': { content: 'Manual cosmetic tattooing with Tebori. Brow mapping, facial analysis, hair-flow patterns, pigment selection, skin assessment, depth and pressure control, hygiene, consultation and aftercare.', practice: 'Synthetic-skin practice, live demonstration by Livia and a supervised treatment on a model, with individual feedback.', kit: 'Professional starter kit with Tebori tool, disposable blades, pigments, mapping supplies, practice skins and disposables; plus training manual and certificate.', support: 'Six months of technical support.', duration: '3 days · One-to-one · In person · Dates arranged individually' },
};
const COURSE_LABELS: Record<Language, { content: string; practice: string; kit: string; support: string; duration: string; investment: string; enquire: string }> = {
  en: { content: 'Content', practice: 'Practical training', kit: 'Kit & materials', support: 'Support', duration: 'Duration & format', investment: 'Investment', enquire: 'Enquire on WhatsApp' },
  pt: { content: 'Conteúdo', practice: 'Prática', kit: 'Kit e materiais', support: 'Suporte', duration: 'Duração e formato', investment: 'Investimento', enquire: 'Consultar pelo WhatsApp' },
  es: { content: 'Contenido', practice: 'Práctica', kit: 'Kit y materiales', support: 'Soporte', duration: 'Duración y formato', investment: 'Inversión', enquire: 'Consultar por WhatsApp' },
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
              <div className="p-6 flex flex-col grow">
                <span className="font-montserrat text-[11px] font-bold tracking-widest text-[#9a5967] uppercase">{course.duration}</span>
                <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-2">{course.title}</h3>
                <div className="mt-4 space-y-3 grow">
                  {([
                    [COURSE_LABELS[language].content, COURSE_DETAILS[course.id]?.content],
                    [COURSE_LABELS[language].practice, COURSE_DETAILS[course.id]?.practice],
                    [COURSE_LABELS[language].kit, COURSE_DETAILS[course.id]?.kit],
                    [COURSE_LABELS[language].support, COURSE_DETAILS[course.id]?.support],
                    [COURSE_LABELS[language].duration, COURSE_DETAILS[course.id]?.duration],
                  ] as [string, string | undefined][]).map(([label, value]) => value ? (
                    <div key={label}>
                      <h4 className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#9a5967]">{label}</h4>
                      <p className="font-montserrat text-sm text-neutral-600 leading-relaxed mt-1">{value}</p>
                    </div>
                  ) : null)}
                </div>
                <div className="mt-5">
                  <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#9a5967]">{COURSE_LABELS[language].investment}</span>
                  <p className="font-montserrat text-2xl font-bold text-[#5b3239] mt-1">A${course.price.toLocaleString('en-AU')}</p>
                </div>
                <a href={'https://wa.me/61402148437?text=' + encodeURIComponent('Hi, I would like to enquire about the ' + course.title + ' at Bella Beauty Brazil.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full mt-5 cursor-pointer">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {COURSE_LABELS[language].enquire}
                </a>
              </div>
            </article>
          ))}
        </div>

        <section id="combined-lash-brow-course-media" className="mt-12 sm:mt-16 rounded-[28px] border border-[#e8d6d5] bg-[#fff9fa] p-5 sm:p-8" aria-labelledby="joint-training-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="joint-training-heading" className="font-raleway text-2xl sm:text-3xl text-[#5b3239] mt-2">
              Lash Lift &amp; Brow Lamination
            </h2>
          </div>
          <div className="mt-7">
            <h3 className="font-raleway text-lg font-semibold text-[#5b3239] text-center">
              {language === 'en' ? 'Lash Lift & Brow Lamination — Training videos' : language === 'pt' ? 'Lash Lift & Brow Lamination — Vídeos da formação' : 'Lash Lift & Brow Lamination — Vídeos de formación'}
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