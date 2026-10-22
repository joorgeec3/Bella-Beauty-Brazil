import React from 'react';
import { Award, ShieldCheck, Sparkles, Smile } from 'lucide-react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';
import { getServicePhotos } from './ServicePhotoGallery';

interface FeaturesRibbonProps { language: Language; }
interface FeatureCardData { image?: string; video?: string; title: string; text: string; footer: string; }

export const FeaturesRibbon: React.FC<FeaturesRibbonProps> = ({ language }) => {
  const cards: FeatureCardData[] = [
    {
      image: getServicePhotos('shadow-brows')[0]?.src,
      title: 'Cosmetic Tattooing',
      text: language === 'en' ? 'Nano Strokes • Shadow Brows • Lip Blush • Cosmetic Tattoo Removal.' : language === 'pt' ? 'Nano Strokes • Shadow Brows • Lip Blush • Remoção de Tatuagem Cosmética.' : 'Nano Strokes • Shadow Brows • Lip Blush • Eliminación de Tatuaje Cosmético.',
      footer: language === 'en' ? 'Cosmetic tattoo treatments' : language === 'pt' ? 'Tatuagem cosmética' : 'Tatuaje cosmético',
    },
    {
      image: getServicePhotos('brow-sculpt')[0]?.src,
      title: 'Brow Artistry',
      text: language === 'en' ? 'Brow Sculpting • Tinting • Brow Dye • Brow Lamination.' : language === 'pt' ? 'Design de sobrancelhas • Tintura • Brow Dye • Laminação.' : 'Diseño de cejas • Tinte • Brow Dye • Laminado.',
      footer: language === 'en' ? 'Personalised brow care' : language === 'pt' ? 'Cuidado das sobrancelhas' : 'Cuidado de cejas',
    },
    {
      image: getServicePhotos('lash-lift')[0]?.src,
      title: 'Lash Treatments',
      text: language === 'en' ? 'Lash Lift & Tint • Lash Extensions.' : language === 'pt' ? 'Lash Lift & Tint • Extensões de cílios.' : 'Lash Lift & Tint • Extensiones de pestañas.',
      footer: language === 'en' ? 'Natural lashes & extensions' : language === 'pt' ? 'Cílios naturais e extensões' : 'Pestañas naturales y extensiones',
    },
    {
      image: getServicePhotos('dermaplaning')[0]?.src,
      title: 'Skin Treatments',
      text: language === 'en' ? 'Dermaplaning • Microneedling • Facial Spa.' : language === 'pt' ? 'Dermaplaning • Microagulhamento • Facial Spa.' : 'Dermaplaning • Microneedling • Facial Spa.',
      footer: language === 'en' ? 'Facial skin care' : language === 'pt' ? 'Cuidados faciais' : 'Cuidado facial',
    },
    {
      image: getServicePhotos('teeth-whitening')[0]?.src,
      title: 'Teeth Whitening',
      text: language === 'en' ? 'A brighter smile with professional teeth whitening.' : language === 'pt' ? 'Um sorriso mais iluminado com clareamento dental profissional.' : 'Una sonrisa más luminosa con blanqueamiento dental profesional.',
      footer: language === 'en' ? 'Professional teeth whitening' : language === 'pt' ? 'Clareamento dental' : 'Blanqueamiento dental',
    },
    {
      image: siteImages.client.waxingTreatment,
      title: 'Waxing',
      text: language === 'en' ? 'Face & Body Waxing • Brazilian Waxing.' : language === 'pt' ? 'Depilação facial e corporal • Depilação brasileira.' : 'Depilación facial y corporal • Depilación brasileña.',
      footer: language === 'en' ? 'Face & body' : language === 'pt' ? 'Rosto e corpo' : 'Rostro y cuerpo',
    },
  ];

  return <section data-floating-clearance className="relative bg-[#181214] text-white pt-14 pb-20 overflow-hidden border-t border-[#9a5967]/25">
    {/* Decorative brand pair only; not client treatment result photographs. */}
    <img src={siteImages.editorial.skinPortrait} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute left-0 top-10 h-64 w-44 sm:h-[340px] sm:w-[240px] object-cover object-center opacity-[0.11] sm:opacity-[0.14] [mask-image:linear-gradient(to_right,black,transparent)]" />
    <img src={siteImages.editorial.rosePortrait} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute right-0 top-10 h-64 w-44 sm:h-[340px] sm:w-[240px] object-cover object-center opacity-[0.11] sm:opacity-[0.14] [mask-image:linear-gradient(to_left,black,transparent)]" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 reveal-on-scroll">
        <span className="text-xs font-bold uppercase tracking-widest text-[#efb7c8] block mb-1">{language === 'en' ? 'Bella Beauty Signature Care' : language === 'pt' ? 'Assinatura Bella Beauty' : 'Cuidado exclusivo Bella Beauty'}</span>
        <h2 className="font-raleway text-[21px] leading-snug sm:text-2xl lg:text-3xl font-light uppercase tracking-[0.04em] text-white max-w-5xl mx-auto">
          {language === 'en' ? <>Cosmetic Tattooing, Brows, Lashes,<span className="block font-semibold text-[#efb7c8] mt-1">Skin Treatments, Teeth Whitening &amp; Waxing</span></> : language === 'pt' ? <>Tatuagem Cosmética, Sobrancelhas, Cílios,<span className="block font-semibold text-[#efb7c8] mt-1">Tratamentos de Pele, Clareamento Dental e Depilação</span></> : <>Tatuaje Cosmético, Cejas, Pestañas,<span className="block font-semibold text-[#efb7c8] mt-1">Tratamientos de Piel, Blanqueamiento Dental y Depilación</span></>}
        </h2>
        <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-3" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-4 sm:gap-6 lg:gap-7 items-stretch scroll-stagger">
        {cards.map((card) => <FeatureCard key={card.title} {...card} />)}
      </div>
      <div className="mt-14 pt-10 border-t border-[#9a5967]/25 reveal-from-left">
        <div className="bg-[#22181b] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#9a5967]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border border-[#9a5967]/30 bg-[#181214] scroll-motion-layer" data-scroll-motion>
                <img src={siteImages.aboutMe.liviaFeaturePhoto} alt="Livia Rego - Bella Beauty Brazil" className="meet-livia-image w-full h-full object-contain object-center transition-transform duration-700 hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-center"><span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] text-[#f3c9d4] font-bold block mb-0.5">{'FOUNDER · BELLA BEAUTY BRAZIL'}</span><h4 className="font-raleway text-lg font-bold text-white uppercase tracking-wider">Livia Rego</h4></div>
              </div>
            </div>
            <div className="meet-livia-copy lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3" aria-hidden="true"><span className="w-9 h-0.5 bg-[#9a5967]" /></div>
              <h2 className="font-raleway text-4xl sm:text-5xl lg:text-[52px] leading-tight font-semibold tracking-wide text-white mb-5">
                {language === 'pt' ? 'Conheça Livia' : language === 'es' ? 'Conoce a Livia' : 'Meet Livia'}
              </h2>
              <div className="font-montserrat text-[#eee1e4] text-sm sm:text-[15px] leading-relaxed space-y-3 mb-5 max-w-2xl">
                <p>{language === 'pt'
                  ? 'Oi, sou Livia, fundadora da Bella Beauty Brazil, designer de sobrancelhas, especialista em tatuagem cosmética e educadora na área da beleza.'
                  : language === 'es'
                    ? 'Hola, soy Livia, fundadora de Bella Beauty Brazil, especialista en cejas, artista de tatuaje cosmético y educadora de belleza.'
                    : 'Hi, I’m Livia, founder of Bella Beauty Brazil, brow artist, cosmetic tattoo artist and beauty educator.'}</p>
                <p>{language === 'pt'
                  ? 'Sou da região amazônica do Brasil e construí meu negócio aqui em Brisbane em torno do que mais importa para mim: qualidade, cuidado e os relacionamentos que crio com minhas clientes.'
                  : language === 'es'
                    ? 'Soy originaria de la región amazónica de Brasil y construí mi negocio aquí en Brisbane alrededor de lo que más me importa: la calidad, el cuidado y las relaciones que creo con mis clientas.'
                    : 'Originally from the Amazon region of Brazil, I’ve built my business here in Brisbane around what matters most to me: quality, care and the relationships I create with my clients.'}</p>
                <p>{language === 'pt'
                  ? 'Dedico tempo a cada atendimento, escutando o que você deseja e valorizando seus traços naturais. Seja para um simples design de sobrancelhas ou uma tatuagem cosmética, quero que você se sinta à vontade, ouvida e bem cuidada.'
                  : language === 'es'
                    ? 'Dedico tiempo a cada cita, escuchando lo que deseas y trabajando con tus rasgos naturales. Ya sea para un sencillo arreglo de cejas o un tatuaje cosmético, quiero que te sientas cómoda, escuchada y bien cuidada.'
                    : 'I take my time with every appointment, listening to what you want and working with your natural features. Whether you’re visiting for a simple brow tidy or cosmetic tattooing, I want you to feel comfortable, heard and well looked after.'}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2" aria-label="Bella Beauty Brazil values">
                <Pillar icon={<ShieldCheck className="w-4 h-4 text-[#e5acbc] mx-auto mb-1.5" />} text={language === 'pt' ? 'Cuidado personalizado' : language === 'es' ? 'Atención personalizada' : 'Personalised Care'} />
                <Pillar icon={<Sparkles className="w-4 h-4 text-[#e5acbc] mx-auto mb-1.5" />} text={language === 'pt' ? 'Atenção aos detalhes' : language === 'es' ? 'Atención al detalle' : 'Attention to Detail'} />
                <Pillar icon={<Award className="w-4 h-4 text-[#e5acbc] mx-auto mb-1.5" />} text={language === 'pt' ? 'Resultados naturais' : language === 'es' ? 'Resultados naturales' : 'Natural Results'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
};

const FeatureCard: React.FC<FeatureCardData> = ({ image, video, title, text, footer }) => <article className="flex flex-row sm:flex-col min-h-0 bg-[#22181b] reveal-scale rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[#9a5967]/30 shadow-xl transition-transform duration-300 hover:-translate-y-1">
  <div className="relative w-[40%] shrink-0 sm:w-full aspect-[4/5] sm:aspect-[5/4] rounded-xl sm:rounded-2xl overflow-hidden bg-[#181214] sm:mb-4 shadow-lg border border-[#9a5967]/20 scroll-motion-layer" data-scroll-motion>
    {video
      ? <video src={video} muted autoPlay loop playsInline preload="auto" data-whitening-treatment-media aria-label="Real Teeth Whitening treatment at Bella Beauty Brazil" className="w-full h-full object-contain object-center" />
      : image
        ? <img src={image} alt={title} className="feature-card-image w-full h-full object-contain object-center transition-transform duration-700 hover:scale-105" loading="lazy" />
        : <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#70424f] via-[#4e313d] to-[#21191d] px-3" role="img" aria-label={title}>
          <div className="w-20 h-20 rounded-full border border-[#efb7c8]/50 bg-white/10 flex items-center justify-center shadow-xl">
            <Smile aria-hidden="true" className="w-10 h-10 text-[#f8d1dd]" strokeWidth={1.25} />
          </div>
          <span className="font-raleway text-sm uppercase tracking-widest text-white/85">Bella Beauty</span>
        </div>}
  </div>
  <div className="min-w-0 flex-1 px-3 py-1.5 sm:p-1 sm:text-center flex flex-col justify-start">
    <div>
      <h3 className="font-raleway text-base sm:text-xl font-bold tracking-wide uppercase text-white mb-1.5 leading-snug">{title}</h3>
      <p className="font-montserrat text-[#e8d9dd] text-[12px] sm:text-sm leading-relaxed">{text}</p>
    </div>
    <div className="mt-2 pt-1.5 border-t border-white/10"><span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-[#e5acbc]">{footer}</span></div>
  </div>
</article>;

const Pillar: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => <div className="min-w-0 bg-[#1c1416] px-1 py-3 sm:p-3.5 rounded-xl border border-[#9a5967]/20 text-center">{icon}<span className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider leading-tight text-[#f4e0e4] block break-words">{text}</span></div>;
