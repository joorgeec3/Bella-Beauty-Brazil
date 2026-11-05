import React from 'react';
import { ArrowRight, CheckCircle2, GraduationCap, MessageCircle } from 'lucide-react';
import { COURSES, Language } from '../data/siteData';
import { siteImages, siteAsset } from '../data/siteImages';
import { RobustAutoPlayVideo } from '../components/RobustAutoPlayVideo';
// BrowDesignAcademy (Professional Eyebrow Design, Modules 21–27) is hidden
// from the page at Livia's request (Nov 2026) while she rebuilds that course.
// The component is kept in src/components/BrowDesignAcademy.tsx.

interface StoreViewProps { language: Language; }
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


const whatsappFor = (title: string) => 'https://wa.me/61402148437?text=' + encodeURIComponent('Hi Livia, I would like to enquire about the ' + title + ' at Bella Beauty Brazil.');
const NANO_LEARN: [string, string][] = [
  ['Brow mapping & facial analysis', 'Design brows that suit each face: proportions, symmetry and the client’s natural features.'],
  ['Hair-flow patterns', 'Draw strokes that follow the real direction and movement of brow hair, so results look natural.'],
  ['Pigment selection', 'Choose and match pigment colours to skin tone and undertone for a soft, believable finish.'],
  ['Skin assessment', 'Read different skin types and know how each one affects healing and stroke definition.'],
  ['Depth & pressure control', 'The key to crisp, fine strokes that heal well: how deep to work and how much pressure to use.'],
  ['Hygiene & safety', 'Professional standards for set-up, disposables, cross-contamination and a safe workspace.'],
  ['Client consultation', 'How to assess suitability, set expectations and plan the treatment with each client.'],
  ['Aftercare', 'What to tell clients after the treatment so their brows heal beautifully.'],
];
const NANO_INCLUDED = [
  'Practice on synthetic skin until your strokes are confident',
  'A live demonstration by Livia, step by step',
  'Your own supervised treatment on a real model, with individual feedback',
  'Professional starter kit: Tebori tool, disposable blades, pigments, mapping supplies, practice skins and disposables',
  'Training manual to keep',
  'Certificate of completion',
  'Six months of technical support after the course',
];
const NANO_WHY = [
  ['One-to-one, never a group', 'Three full days with Livia’s attention on you, your hand and your questions.'],
  ['Real model, real studio', 'You finish the course having performed a treatment yourself, not only watched one.'],
  ['Support after you leave', 'Six months of technical support while you start working on your own clients.'],
];
const SECONDARY_COURSES: Record<string, { pitch: string; forWho: string; included: string[] }> = {
  'lash-lift-course': {
    pitch: 'A full day of personalised, one-to-one training with Livia. You’ll learn to lift, curl and tint natural lashes, working on two live models: one where Livia demonstrates every step, and one where you do the treatment yourself under her supervision.',
    forWho: 'For beginners and beauty professionals who want to add a popular, low-maintenance lash service.',
    included: [
      'Consultation and lash assessment: who is suitable and what to expect',
      'Choosing the right shield for each eye and lash length',
      'Product application, processing times and how to avoid over-processing',
      'Lash tinting for a finished, mascara-like look',
      'Safety, hygiene and aftercare advice for clients',
      'Two live models: Livia demonstrates, then you practise with her guidance',
      'Take-home professional starter kit, training manual and certificate',
      'All products and disposables used during training',
      'One year of WhatsApp support after the course',
    ],
  },
  'brow-lamination-course': {
    pitch: 'A full day of personalised, one-to-one training with Livia. You’ll learn to reshape, groom and tint natural brows for a full, lifted, brushed-up look, working on two live models: one where Livia demonstrates every step, and one where you do the treatment yourself under her supervision.',
    forWho: 'For beginners and beauty professionals who want to offer one of today’s most requested brow services.',
    included: [
      'Consultation and brow and hair assessment',
      'Brow mapping and shaping to suit each face',
      'Lamination step by step, with correct processing times',
      'Brow tinting and choosing the right colour',
      'Conditioning care to keep brow hair healthy',
      'Safety, hygiene and aftercare advice for clients',
      'Two live models: Livia demonstrates, then you practise with her guidance',
      'Take-home professional starter kit, training manual and certificate',
      'All products and disposables used during training',
      'One year of WhatsApp support after the course',
    ],
  },
};

const BROW_COURSE_PHOTOS = [
  { name: 'Facetune_23-02-2023-12-58-24.JPEG', alt: 'Brow lamination hands-on training at Bella Beauty Brazil' },
  { name: 'IMG_2450.JPG', alt: 'Livia Rego practising brow lamination on a model in the studio' },
  { name: 'IMG_1986.JPEG', alt: 'Student and Livia Rego holding a course completion certificate' },
] as const;

const Fact: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[#e8c5c8] bg-white px-3 py-1.5 font-montserrat text-xs font-semibold text-[#5b3239]">{children}</span>
);

/**
 * Courses page (redesigned Nov 2026 at Livia's request):
 * Nano Strokes is the signature course and leads the page; the two one-day
 * courses sit side by side with equal-height cards (no empty space); videos
 * and photos follow in their own sections.
 */
export const StoreView: React.FC<StoreViewProps> = () => {
  const nano = COURSES.find(c => c.id === 'nano-strokes-course')!;
  const others = COURSES.filter(c => c.id !== 'nano-strokes-course');
  return (
    <main className="bg-site">
      {/* Hero: one clear message and a direct path to the signature course */}
      <header className="relative isolate overflow-hidden bg-[#21171c] text-white border-b border-[#9a5967]/30">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 w-72 h-72 bg-[#9a5967]/20 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#efb7c8] font-bold">Bella Beauty Brazil Academy</p>
          <h1 className="font-raleway text-4xl leading-tight sm:text-5xl font-normal mt-3">Beauty Courses<span className="block text-[#efb7c8] italic text-2xl sm:text-4xl mt-1">with Livia Rego</span></h1>
          <p className="font-montserrat text-sm sm:text-base leading-relaxed text-[#f2e4e8] max-w-xl mx-auto mt-4">One-to-one, hands-on training in Greenslopes, Brisbane.<br className="hidden sm:block" /> Real models, step-by-step guidance and support after the course.</p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
            <a href="#nano-strokes-course" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#efb7c8] hover:bg-white px-6 py-3.5 font-montserrat text-xs uppercase tracking-wider font-bold text-[#5b3239] transition-colors">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />Nano Strokes Course<ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#more-courses" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#efb7c8]/70 hover:bg-white/10 px-6 py-3.5 font-montserrat text-xs uppercase tracking-wider font-bold text-white transition-colors">
              One-day courses
            </a>
          </div>
        </div>
      </header>

      {/* Signature course: Nano Strokes */}
      <section id="nano-strokes-course" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20" aria-labelledby="nano-course-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <figure className="rounded-[28px] overflow-hidden border border-[#e8d6d5] bg-[#f4e8ea] shadow-xl">
              <video src={siteAsset('assets/bella/training/courses-2026-11/nano-cover.mp4')} poster={siteAsset('assets/bella/training/courses-2026-11/nano-cover.webp')} autoPlay muted loop playsInline preload="metadata" aria-label="A student arriving for her Bella Nano Strokes Course with Livia Rego" className="block w-full aspect-[4/5] object-cover" />
            </figure>
            {NANO_WHY.map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-[#e8d6d5] bg-white p-5">
                <p className="font-raleway text-lg font-semibold text-[#5b3239]">{title}</p>
                <p className="font-montserrat text-sm text-[#4c3b42] mt-1">{detail}</p>
              </div>
            ))}
          </div>
          <div>
            <span className="inline-flex rounded-full bg-[#5b3239] px-3 py-1 font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#efb7c8]">Signature course</span>
            <h2 id="nano-course-heading" className="font-raleway text-3xl sm:text-4xl font-semibold text-[#5b3239] mt-4">Bella Nano Strokes Course</h2>
            <p className="font-montserrat text-base leading-relaxed text-[#4c3b42] mt-4">Manual cosmetic tattooing with the Tebori tool. In three days of one-to-one training with Livia, you’ll learn to create fine, realistic, hair-like brow strokes that follow the natural movement of each client’s brows.</p>
            <p className="font-montserrat text-sm leading-relaxed text-[#4c3b42] mt-3">You start on synthetic skin, watch Livia perform a full treatment, and finish by doing your own supervised treatment on a real model. You leave with a professional kit, a manual, a certificate and six months of support.</p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Fact>3 days</Fact><Fact>One-to-one</Fact><Fact>In person · Greenslopes</Fact><Fact>Limited dates · check availability</Fact>
            </div>
            <h3 className="font-raleway text-lg font-semibold text-[#5b3239] mt-7">What you’ll learn</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
              {NANO_LEARN.map(([title, detail]) => <li key={title} className="flex items-start gap-2 font-montserrat text-sm text-[#4c3b42]"><CheckCircle2 className="w-4 h-4 text-[#9a5967] shrink-0 mt-0.5" aria-hidden="true" /><span><strong className="font-semibold text-[#5b3239]">{title}.</strong> {detail}</span></li>)}
            </ul>
            <h3 className="font-raleway text-lg font-semibold text-[#5b3239] mt-6">What’s included</h3>
            <ul className="mt-3 space-y-2">
              {NANO_INCLUDED.map(item => <li key={item} className="flex items-start gap-2 font-montserrat text-sm text-[#4c3b42]"><CheckCircle2 className="w-4 h-4 text-[#9a5967] shrink-0 mt-0.5" aria-hidden="true" />{item}</li>)}
            </ul>
            <div className="mt-7 rounded-2xl bg-[#5b3239] text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#efb7c8]">Investment</p>
                <p className="font-raleway text-3xl font-semibold mt-1">A${nano.price.toLocaleString('en-AU')}</p>
              </div>
              <a href={whatsappFor(nano.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#efb7c8] hover:bg-white px-6 py-4 font-montserrat text-xs uppercase tracking-wider font-bold text-[#5b3239] transition-colors">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="font-raleway text-xl font-semibold text-[#5b3239] text-center">Inside the Nano Strokes course</h3>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <figure className="overflow-hidden rounded-2xl border border-[#e8d6d5] bg-white">
              <div className="w-full aspect-[3/4] bg-[#281d23]"><video src={siteAsset('assets/bella/training/courses-2026-11/nano-pigments-class.mp4')} poster={siteAsset('assets/bella/training/courses-2026-11/nano-pigments-class.webp')} controls playsInline preload="none" className="w-full h-full object-cover" /></div>
              <figcaption className="px-3 py-2 font-montserrat text-xs text-[#665760]">Livia explains pigments &amp; technique</figcaption>
            </figure>
            {nanoStrokesClips.map((clip, index) => (
              <figure key={clip.key} className="overflow-hidden rounded-2xl border border-[#e8d6d5] bg-white">
                <div className="w-full aspect-[3/4] bg-[#281d23]"><RobustAutoPlayVideo src={clip.src} poster={siteImages.training.coursePhotos['nano-strokes-course']} controls className="w-full h-full object-contain" /></div>
                <figcaption className="px-3 py-2 font-montserrat text-xs text-[#665760]">Class video {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* One-day courses side by side, equal height */}
      <section id="more-courses" className="scroll-mt-24 bg-[#fff9fa] border-y border-[#ebd9dd]" aria-labelledby="more-courses-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <h2 id="more-courses-heading" className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239] text-center">One-day courses</h2>
          <p className="font-montserrat text-sm text-[#65515b] text-center mt-3 max-w-2xl mx-auto">Perfect if you’re starting out or adding a new service. 8 hours, one-to-one, with two live models.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {others.map(course => {
              const info = SECONDARY_COURSES[course.id];
              return (
                <article key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e8d6d5] flex flex-col">
                  <img src={course.id === 'brow-lamination-course' ? siteAsset('assets/bella/training/brow-lamination-continuation-2026-11/' + BROW_COURSE_PHOTOS[0].name) : (siteImages.training.coursePhotos[course.id as keyof typeof siteImages.training.coursePhotos] || course.image)} alt={course.id === 'brow-lamination-course' ? BROW_COURSE_PHOTOS[0].alt : `${course.title} — Bella Beauty Brazil`} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover bg-[#f4e8ea]" />
                  <div className="p-6 flex flex-col grow">
                    <h3 className="font-raleway text-xl font-bold text-[#5b3239]">{course.title}</h3>
                    <p className="font-montserrat text-sm leading-relaxed text-[#4c3b42] mt-2">{info?.pitch}</p>
                    <p className="font-montserrat text-sm italic text-[#7a4753] mt-3">{info?.forWho}</p>
                    <div className="flex flex-wrap gap-2 mt-4"><Fact>8 hours</Fact><Fact>One-to-one</Fact><Fact>Limited dates · check availability</Fact></div>
                    <p className="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#9a5967] mt-5">What you’ll learn &amp; what’s included</p>
                    <ul className="mt-3 space-y-2 grow">
                      {info?.included.map(item => <li key={item} className="flex items-start gap-2 font-montserrat text-sm text-[#4c3b42]"><CheckCircle2 className="w-4 h-4 text-[#9a5967] shrink-0 mt-0.5" aria-hidden="true" />{item}</li>)}
                    </ul>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#f0e3e5] pt-5">
                      <p className="font-raleway text-2xl font-semibold text-[#5b3239]">A${course.price.toLocaleString('en-AU')}</p>
                      <a href={whatsappFor(course.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-colors">
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />Enquire
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div id="lash-lift-course-video" className="mt-14 grid grid-cols-1 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] gap-6 md:gap-10 items-center max-w-4xl mx-auto">
            <figure className="overflow-hidden rounded-2xl border border-[#e8d6d5] bg-white w-full max-w-[300px] mx-auto">
              <div className="w-full aspect-[9/16] bg-[#281d23]"><video src={siteAsset('assets/bella/training/courses-2026-11/lash-lift-class.mp4')} poster={siteAsset('assets/bella/training/courses-2026-11/lash-lift-class.webp')} controls playsInline preload="none" className="w-full h-full object-cover" /></div>
            </figure>
            <div className="text-center md:text-left">
              <h3 className="font-raleway text-xl sm:text-2xl font-semibold text-[#5b3239]">A day in class with Livia</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[#4c3b42] mt-3">From Livia’s explanation and mapping to the hands-on treatment on a live model and the certificate at the end of the day.</p>
            </div>
          </div>

          <div id="brow-lamination-course-photos" className="mt-14 text-center">
            <p className="font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#9a5967]">Bella Beauty Brazil Academy</p>
            <h3 className="font-raleway text-xl sm:text-2xl font-semibold text-[#5b3239] mt-2">Inside our classes</h3>
            <p className="font-montserrat text-sm text-[#4c3b42] mt-2">Real photos and videos from Livia’s one-to-one training in the studio.</p>
          </div>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ...BROW_COURSE_PHOTOS.slice(1).map(photo => ({ src: siteAsset('assets/bella/training/brow-lamination-continuation-2026-11/' + photo.name), alt: photo.alt })),
              { src: siteAsset('assets/bella/classic-eyelash-extensions/IMG_3667.PNG'), alt: 'Brow lamination training in the studio at Bella Beauty Brazil' },
              { src: siteAsset('assets/bella/classic-eyelash-extensions/IMG_3668.PNG'), alt: 'Brow lamination class with Livia Rego at Bella Beauty Brazil' },
            ].map(photo => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl border border-[#e8d6d5] bg-white">
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="block w-full aspect-[4/5] object-cover" />
              </figure>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {combinedCourseClips.map((clip, index) => (
              <figure key={clip.key} className="bg-white rounded-2xl overflow-hidden border border-[#e8d6d5]">
                <div className="aspect-[3/4] w-full bg-[#281d23]"><RobustAutoPlayVideo src={clip.src} poster={siteAsset('assets/bella/training/brow-lamination-continuation-2026-11/Facetune_23-02-2023-12-58-24.JPEG')} controls className="w-full h-full object-contain" /></div>
                <figcaption className="px-3 py-2 font-montserrat text-xs text-[#5b3239]">Class video {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How it works: short, clear next step */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" aria-labelledby="how-courses-work">
        <h2 id="how-courses-work" className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239] text-center">How it works</h2>
        <ol className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            ['Send a message', 'Tell Livia on WhatsApp which course you’re interested in.'],
            ['Check available dates', 'Livia will send you her available course dates and times. Places are limited because every course is one-to-one.'],
            ['Confirm your place & train', 'Learn hands-on in the studio and receive your certificate and ongoing support.'],
          ].map(([title, text], i) => (
            <li key={title} className="rounded-2xl border border-[#e8d6d5] bg-white p-6">
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-[#5b3239] text-[#efb7c8] font-raleway font-bold">{i + 1}</span>
              <h3 className="font-raleway text-lg font-semibold text-[#5b3239] mt-3">{title}</h3>
              <p className="font-montserrat text-sm text-[#4c3b42] mt-2 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
        <div className="text-center mt-8">
          <a href={'https://wa.me/61402148437?text=' + encodeURIComponent('Hi Livia, I would like to know more about your courses.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5b3239] hover:bg-[#7a4753] px-7 py-4 font-montserrat text-xs uppercase tracking-wider font-bold text-white transition-colors">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />Ask about courses on WhatsApp
          </a>
        </div>
      </section>

    </main>
  );
};
