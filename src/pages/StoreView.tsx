import React from 'react';
import { ArrowRight, BookOpen, CalendarDays, Clock, GraduationCap, HandHeart, LifeBuoy, MapPin, MessageCircle, Package, UserRound } from 'lucide-react';
import { COURSES, Language } from '../data/siteData';
import { siteImages, siteAsset } from '../data/siteImages';
import { BrowDesignAcademy } from '../components/BrowDesignAcademy';

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
            <a href="#brow-design-academy" className="mt-4 font-montserrat text-xs font-semibold text-[#f3d9e0] underline underline-offset-4 hover:text-white">
              {language === 'pt' ? 'Design de Sobrancelhas · Módulos 21–27' : language === 'es' ? 'Diseño de Cejas · Módulos 21–27' : 'Professional Eyebrow Design · Modules 21–27'}
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

      <section id="available-courses" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20" aria-labelledby="courses-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <p className="font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#9a5967] font-bold">One-to-one · In person · Greenslopes, Brisbane</p>
          <h2 id="courses-heading" className="font-raleway text-3xl sm:text-4xl text-[#5b3239] mt-3">Professional courses</h2>
          <p className="font-montserrat text-sm sm:text-base text-neutral-600 leading-relaxed mt-4">
            Learn with Livia at Bella Beauty Brazil. Personalised training combines explanations, demonstrations and guided practice.
          </p>
          <nav className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Jump to a course">
            {COURSES.map((course) => (
              <a key={course.id} href={`#${course.id}`} className="rounded-full border border-[#e2c9cc] bg-white px-4 py-2 font-montserrat text-xs font-semibold text-[#5b3239] hover:bg-[#5b3239] hover:text-white transition-colors">
                {course.title.replace(/ Course$/, '')}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-8 lg:space-y-10">
          {COURSES.map((course, courseIndex) => {
            const details = COURSE_DETAILS[course.id];
            const labels = COURSE_LABELS[language];
            const facts = (details?.duration || '').split(' · ').filter(Boolean);
            const blocks = [
              { icon: BookOpen, label: labels.content, value: details?.content },
              { icon: HandHeart, label: labels.practice, value: details?.practice },
              { icon: Package, label: labels.kit, value: details?.kit },
              { icon: LifeBuoy, label: labels.support, value: details?.support },
            ].filter((b) => b.value);
            const imageRight = courseIndex % 2 === 1;
            return (
              <article id={course.id} key={course.id} className="scroll-mt-28 bg-white rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(91,50,57,0.10)] border border-[#ecdcdc] grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
                <figure className={`relative bg-[#f4e8ea] min-h-[300px] sm:min-h-[380px] lg:min-h-full ${imageRight ? 'lg:order-2' : ''}`}>
                  <img
                    src={siteImages.training.coursePhotos[course.id as keyof typeof siteImages.training.coursePhotos] || course.image}
                    alt={`${course.title} — Bella Beauty Brazil`}
                    loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-[#21171c]/80 backdrop-blur px-3 py-1.5 font-montserrat text-[11px] font-bold uppercase tracking-widest text-white">
                    {course.duration}
                  </span>
                </figure>

                <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
                  <p className="font-montserrat text-[11px] font-bold tracking-[0.2em] text-[#9a5967] uppercase">Course {String(courseIndex + 1).padStart(2, '0')}</p>
                  <h3 className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239] mt-2">{course.title}</h3>

                  {facts.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={labels.duration}>
                      {facts.map((fact, i) => {
                        const Icon = i === 0 ? Clock : i === 1 ? UserRound : i === 2 ? MapPin : CalendarDays;
                        return (
                          <li key={fact} className="inline-flex items-center gap-1.5 rounded-full bg-[#f8eef0] px-3 py-1.5 font-montserrat text-xs font-semibold text-[#5b3239]">
                            <Icon className="w-3.5 h-3.5 text-[#9a5967]" aria-hidden="true" />{fact}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {blocks.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-2xl bg-[#fbf6f6] border border-[#f0e3e4] p-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white border border-[#ecdcdc]">
                            <Icon className="w-3.5 h-3.5 text-[#9a5967]" aria-hidden="true" />
                          </span>
                          <h4 className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#9a5967]">{label}</h4>
                        </div>
                        <p className="font-montserrat text-sm text-neutral-700 leading-relaxed mt-2">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#f0e3e4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#9a5967]">{labels.investment}</span>
                      <p className="font-raleway text-3xl font-semibold text-[#5b3239] leading-none mt-1">A${course.price.toLocaleString('en-AU')}</p>
                    </div>
                    <a href={'https://wa.me/61402148437?text=' + encodeURIComponent('Hi, I would like to enquire about the ' + course.title + ' at Bella Beauty Brazil.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full cursor-pointer transition-colors">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      {labels.enquire}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="training-gallery" className="bg-[#f8f1f2] border-y border-[#ecdcdc]" aria-labelledby="training-gallery-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#9a5967] font-bold">Inside the classes</p>
            <h2 id="training-gallery-heading" className="font-raleway text-2xl sm:text-3xl text-[#5b3239] mt-2">Training videos &amp; photos</h2>
            <p className="font-montserrat text-sm text-neutral-600 mt-3">Tap a video to play it.</p>
          </div>

          {[
            { id: 'nano-strokes-course-media', title: 'Nano Strokes', clips: nanoStrokesClips, poster: siteImages.training.coursePhotos['nano-strokes-course'] },
            { id: 'combined-lash-brow-course-media', title: 'Lash Lift & Brow Lamination', clips: combinedCourseClips, poster: siteImages.training.coursePhotos['brow-lamination-course'] },
          ].map((group) => (
            <div key={group.id} id={group.id} className="mt-10">
              <h3 className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#5b3239] flex items-center gap-3">
                {group.title}<span className="h-px flex-1 bg-[#e2c9cc]" aria-hidden="true" />
              </h3>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {group.clips.map((clip, index) => (
                  <figure key={clip.key} className="rounded-xl overflow-hidden bg-[#281d23] border border-[#e8d6d5]">
                    <video
                      src={clip.src}
                      poster={group.poster}
                      controls
                      playsInline
                      preload="none"
                      aria-label={`${group.title} — training video ${index + 1}`}
                      className="block w-full aspect-[3/4] object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))}

          <div id="brow-lamination-course-continuation" className="mt-10">
            <h3 className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#5b3239] flex items-center gap-3">
              Course moments<span className="h-px flex-1 bg-[#e2c9cc]" aria-hidden="true" />
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([
                { name: 'Facetune_23-02-2023-12-58-24.JPEG', label: 'Hands-on beauty training', alt: 'Practical beauty training at Bella Beauty Brazil' },
                { name: 'IMG_2450.JPG', label: 'Professional studio training', alt: 'Practical beauty training with a model in the studio' },
                { name: 'IMG_1986.JPEG', label: 'Lash Lifting course completion', alt: 'Student and instructor holding a Lash Lifting course certificate' },
              ] as const).map((photo) => (
                <figure key={photo.name} className="relative overflow-hidden rounded-2xl bg-white border border-[#e8d6d5]">
                  <img src={siteAsset('assets/bella/training/brow-lamination-continuation-2026-11/' + photo.name)} alt={photo.alt}
                    loading="lazy" decoding="async" className="block w-full aspect-[4/3] object-cover" />
                  <figcaption className="px-4 py-2.5 font-montserrat text-xs text-[#5b3239]">{photo.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrowDesignAcademy language={language} />
    </main>
  );
};