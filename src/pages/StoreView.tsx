import React from 'react';
import { ArrowRight, CheckCircle2, GraduationCap, MessageCircle } from 'lucide-react';
import { COURSES, Language } from '../data/siteData';
import { siteImages, siteAsset } from '../data/siteImages';
import { RobustAutoPlayVideo } from '../components/RobustAutoPlayVideo';
import { BrowDesignAcademy } from '../components/BrowDesignAcademy';

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
const NANO_LEARN = ['Brow mapping & facial analysis', 'Hair-flow patterns', 'Pigment selection', 'Skin assessment', 'Depth & pressure control', 'Hygiene & safety', 'Client consultation', 'Aftercare'];
const NANO_INCLUDED = ['Synthetic-skin practice', 'Live demonstration by Livia', 'Supervised treatment on a model, with individual feedback', 'Starter kit: Tebori tool, blades, pigments, mapping supplies and practice skins', 'Training manual & certificate', 'Six months of technical support'];
const SECONDARY_COURSES: Record<string, { pitch: string; included: string[] }> = {
  'lash-lift-course': {
    pitch: 'Learn to lift, curl and tint natural lashes in one personalised day.',
    included: ['Consultation, lash assessment & shield selection', 'Product application & processing times', 'Two live models: Livia demonstrates, you practise', 'Take-home starter kit, manual & certificate', 'One year of WhatsApp support'],
  },
  'brow-lamination-course': {
    pitch: 'Learn to reshape, groom and tint natural brows in one personalised day.',
    included: ['Brow & hair assessment, mapping and shaping', 'Lamination, tinting & processing times', 'Two live models: Livia demonstrates, you practise', 'Take-home starter kit, manual & certificate', 'One year of WhatsApp support'],
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
export const StoreView: React.FC<StoreViewProps> = ({ language }) => {
  const nano = COURSES.find(c => c.id === 'nano-strokes-course')!;
  const others = COURSES.filter(c => c.id !== 'nano-strokes-course');
  return (
    <main className="bg-site">
      {/* Hero: one clear message and a direct path to the signature course */}
      <header className="relative isolate overflow-hidden bg-[#21171c] text-white border-b border-[#9a5967]/30">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 w-72 h-72 bg-[#9a5967]/20 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <p className="font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#efb7c8] font-bold">Bella Beauty Brazil Academy · Greenslopes, Brisbane</p>
          <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-[0.06em] leading-tight mt-4">Beauty Courses with Livia Rego</h1>
          <p className="font-montserrat text-sm sm:text-base leading-relaxed text-[#f2e4e8] max-w-2xl mx-auto mt-5">One-to-one, hands-on training in the studio. Learn at your own pace with demonstrations, supervised practice on real models and ongoing support after the course.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#nano-strokes-course" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#efb7c8] hover:bg-white px-7 py-4 font-montserrat text-xs uppercase tracking-wider font-bold text-[#5b3239] transition-colors">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />Nano Strokes Course<ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#more-courses" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#efb7c8]/70 hover:bg-white/10 px-7 py-4 font-montserrat text-xs uppercase tracking-wider font-bold text-white transition-colors">
              Lash Lift &amp; Brow Lamination courses
            </a>
          </div>
        </div>
      </header>

      {/* Signature course: Nano Strokes */}
      <section id="nano-strokes-course" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20" aria-labelledby="nano-course-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <figure className="rounded-[28px] overflow-hidden border border-[#e8d6d5] bg-[#f4e8ea] shadow-xl">
            <img src={siteImages.training.coursePhotos['nano-strokes-course']} alt="Bella Nano Strokes Course with Livia Rego" loading="eager" decoding="async" className="w-full aspect-[4/5] object-cover" />
          </figure>
          <div>
            <span className="inline-flex rounded-full bg-[#5b3239] px-3 py-1 font-montserrat text-[11px] font-bold uppercase tracking-widest text-[#efb7c8]">Signature course</span>
            <h2 id="nano-course-heading" className="font-raleway text-3xl sm:text-4xl font-semibold text-[#5b3239] mt-4">Bella Nano Strokes Course</h2>
            <p className="font-montserrat text-base leading-relaxed text-[#4c3b42] mt-4">Manual cosmetic tattooing with the Tebori tool. Learn to create realistic, hair-like brow strokes in three days of one-to-one training with Livia.</p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Fact>3 days</Fact><Fact>One-to-one</Fact><Fact>In person · Greenslopes</Fact><Fact>Dates arranged individually</Fact>
            </div>
            <h3 className="font-raleway text-lg font-semibold text-[#5b3239] mt-7">What you’ll learn</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
              {NANO_LEARN.map(item => <li key={item} className="flex items-start gap-2 font-montserrat text-sm text-[#4c3b42]"><CheckCircle2 className="w-4 h-4 text-[#9a5967] shrink-0 mt-0.5" aria-hidden="true" />{item}</li>)}
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
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
                  {course.id === 'brow-lamination-course' ? (
                    <div className="grid grid-cols-3 gap-0.5 bg-[#f4e8ea]">
                      {BROW_COURSE_PHOTOS.map(photo => (
                        <img key={photo.name} src={siteAsset('assets/bella/training/brow-lamination-continuation-2026-11/' + photo.name)} alt={photo.alt} loading="lazy" decoding="async" className="block w-full aspect-[8/15] object-cover" />
                      ))}
                    </div>
                  ) : (
                    <img src={siteImages.training.coursePhotos[course.id as keyof typeof siteImages.training.coursePhotos] || course.image} alt={`${course.title} — Bella Beauty Brazil`} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover bg-[#f4e8ea]" />
                  )}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="font-raleway text-xl font-bold text-[#5b3239]">{course.title}</h3>
                    <p className="font-montserrat text-sm text-[#4c3b42] mt-2">{info?.pitch}</p>
                    <div className="flex flex-wrap gap-2 mt-4"><Fact>8 hours</Fact><Fact>One-to-one</Fact><Fact>Dates by arrangement</Fact></div>
                    <ul className="mt-5 space-y-2 grow">
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

          <h3 className="font-raleway text-xl font-semibold text-[#5b3239] text-center mt-14">Brow Lamination Course — class videos</h3>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
            ['Send a message', 'Tell Livia which course you’re interested in on WhatsApp.'],
            ['Choose your dates', 'Courses are one-to-one, so dates are arranged around you.'],
            ['Train & get certified', 'Learn hands-on in the studio and receive your certificate and ongoing support.'],
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

      <BrowDesignAcademy language={language} />
    </main>
  );
};
