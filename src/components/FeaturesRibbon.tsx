import React from 'react';
import { Award, Eye, ShieldCheck, Sparkles, Smile, Heart, Droplets } from 'lucide-react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

interface FeaturesRibbonProps { language: Language; }
interface FeatureCardData { image?: string; icon: React.ReactNode; label: string; title: string; text: string; footer: string; }

export const FeaturesRibbon: React.FC<FeaturesRibbonProps> = ({ language }) => {
  const cards: FeatureCardData[] = [
    {
      image: `${import.meta.env.BASE_URL}assets/bella/gallery/lips-result-01.webp`,
      icon: <Sparkles className="w-3 h-3 text-[#efb7c8]" />,
      label: language === 'en' ? 'Cosmetic · Artistry' : language === 'pt' ? 'Tatuagem · Beleza' : 'Tatuaje · Belleza',
      title: 'Cosmetic Tattooing',
      text: 'Nano Strokes • Powder Brows • Lip Blush • Cosmetic Tattoo Removal.',
      footer: language === 'en' ? 'Cosmetic tattoo treatments' : language === 'pt' ? 'Tatuagem cosmética' : 'Tatuaje cosmético',
    },
    {
      image: `${import.meta.env.BASE_URL}assets/bella/gallery/studio-behind-scenes-01.webp`,
      icon: <Sparkles className="w-3 h-3 text-[#efb7c8]" />,
      label: language === 'en' ? 'Brows · Technique' : language === 'pt' ? 'Sobrancelhas · Técnica' : 'Cejas · Técnica',
      title: 'Brow Artistry',
      text: 'Brow Sculpting • Tinting • Brow Dye • Brow Lamination.',
      footer: language === 'en' ? 'Personalised brow care' : language === 'pt' ? 'Cuidado das sobrancelhas' : 'Cuidado de cejas',
    },
    {
      image: `${import.meta.env.BASE_URL}assets/bella/gallery/lashes-result-05.webp`,
      icon: <Eye className="w-3 h-3 text-[#efb7c8]" />,
      label: language === 'en' ? 'Lashes · Definition' : language === 'pt' ? 'Cílios · Definição' : 'Pestañas · Definición',
      title: 'Lash Treatments',
      text: 'Lash Lift & Tint • Lash Extensions.',
      footer: language === 'en' ? 'Natural lashes & extensions' : language === 'pt' ? 'Cílios naturais e extensões' : 'Pestañas naturales y extensiones',
    },
    {
      image: `${import.meta.env.BASE_URL}assets/bella/dermaplaning-facial-treatment.webp`,
      icon: <Droplets className="w-3 h-3 text-[#efb7c8]" />,
      label: language === 'en' ? 'Skin · Care' : language === 'pt' ? 'Pele · Cuidado' : 'Piel · Cuidado',
      title: 'Skin Treatments',
      text: 'Dermaplaning • Microneedling • Facial Spa.',
      footer: language === 'en' ? 'Facial skin care' : language === 'pt' ? 'Cuidados faciais' : 'Cuidado facial',
    },
    {
      // No verified whitening treatment photo has been supplied. Do not use another service's image.
      icon: <Smile className="w-3 h-3 text-[#efb7c8]" />,
      label: language === 'en' ? 'Smile · Care' : language === 'pt' ? 'Sorriso · Cuidado' : 'Sonrisa · Cuidado',
      title: 'Teeth Whitening',
      text: 'A brighter smile with professional teeth whitening.',
      footer: language === 'en' ? 'Professional teeth whitening' : language === 'pt' ? 'Clareamento dental' : 'Blanqueamiento dental',
    },
    {
      image: `${import.meta.env.BASE_URL}assets/bella/waxing.png`,
      icon: <Heart className="w-3 h-3 text-[#efb7c8]" />,
      label: language === 'en' ? 'Waxing · Care' : language === 'pt' ? 'Depilação · Cuidado' : 'Depilación · Cuidado',
      title: 'Waxing',
      text: 'Face & Body Waxing • Brazilian Waxing.',
      footer: language === 'en' ? 'Face & body' : language === 'pt' ? 'Rosto e corpo' : 'Rostro y cuerpo',
    },
  ];

  return <section className="relative bg-[#181214] text-white pt-14 pb-20 overflow-hidden border-t border-[#9a5967]/25">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <img src={siteImages.aboutMe.liviaFeaturePhoto} alt="Livia Rego - Bella Beauty Brazil" className="meet-livia-image w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-center"><span className="text-xs uppercase tracking-widest text-amber-200 font-bold block mb-0.5">{language === 'pt' ? 'Fundadora · Bella Beauty' : language === 'es' ? 'Fundadora · Bella Beauty' : 'Founder · Bella Beauty'}</span><h4 className="font-raleway text-lg font-bold text-white uppercase tracking-wider">Livia Rego</h4></div>
              </div>
            </div>
            <div className="meet-livia-copy lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3"><span className="w-6 h-0.5 bg-[#9a5967]" /><span className="text-xs font-bold uppercase tracking-widest text-[#efb7c8]">{language === 'pt' ? 'Sobre mim' : language === 'es' ? 'Sobre mí' : 'Meet Livia'}</span></div>
              <h3 className="font-raleway text-2xl sm:text-3xl font-light uppercase tracking-wider text-white mb-4">{language === 'pt' ? <>Cuidado com <span className="font-bold text-[#9a5967]">propósito &amp; precisão</span></> : language === 'es' ? <>Cuidado con <span className="font-bold text-[#9a5967]">propósito y precisión</span></> : <>Care with <span className="font-bold text-[#9a5967]">purpose &amp; precision</span></>}</h3>
              <p className="font-montserrat text-neutral-300 text-sm leading-relaxed mb-4">{language === 'pt' ? 'Bella Beauty Brazil foi criada por Livia Rego para oferecer atendimentos de beleza com cuidado individual, técnica e precisão.' : language === 'es' ? 'Bella Beauty Brazil fue creada por Livia Rego para ofrecer belleza con cuidado individual, técnica y precisión.' : 'Bella Beauty Brazil was created by Livia Rego to offer beauty services with individual care, technique and precision.'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Pillar icon={<Sparkles className="w-4 h-4 text-[#9a5967] mx-auto mb-1.5" />} text={language === 'pt' ? 'Técnica profissional' : language === 'es' ? 'Técnica profesional' : 'Professional technique'} />
                <Pillar icon={<ShieldCheck className="w-4 h-4 text-[#9a5967] mx-auto mb-1.5" />} text={language === 'pt' ? 'Cuidado personalizado' : language === 'es' ? 'Cuidado personalizado' : 'Personalised care'} />
                <Pillar icon={<Award className="w-4 h-4 text-[#9a5967] mx-auto mb-1.5" />} text={language === 'pt' ? 'Ambiente acolhedor' : language === 'es' ? 'Espacio acogedor' : 'Welcoming space'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
};

const FeatureCard: React.FC<FeatureCardData> = ({ image, icon, label, title, text, footer }) => <article className="flex flex-row sm:flex-col min-h-[190px] sm:min-h-0 bg-[#22181b] reveal-scale rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[#9a5967]/30 shadow-xl transition-transform duration-300 hover:-translate-y-1">
  <div className="relative w-[43%] shrink-0 sm:w-full min-h-[160px] sm:min-h-0 sm:aspect-[5/4] rounded-xl sm:rounded-2xl overflow-hidden bg-[#181214] sm:mb-4 shadow-lg border border-[#9a5967]/20 scroll-motion-layer" data-scroll-motion>
    {image
      ? <img src={image} alt={title} className="feature-card-image w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" loading="lazy" />
      : <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#70424f] via-[#4e313d] to-[#21191d] px-3" role="img" aria-label={title}>
          <div className="w-20 h-20 rounded-full border border-[#efb7c8]/50 bg-white/10 flex items-center justify-center shadow-xl">
            <Smile aria-hidden="true" className="w-10 h-10 text-[#f8d1dd]" strokeWidth={1.25} />
          </div>
          <span className="font-raleway text-sm uppercase tracking-widest text-white/85">Bella Beauty</span>
        </div>}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full border border-[#efb7c8]/20 bg-black/75 px-2 py-1 text-[9px] sm:text-[10px] font-semibold text-amber-100">{icon}<span>{label}</span></span>
  </div>
  <div className="min-w-0 flex-1 px-3 py-2 sm:p-1 sm:text-center flex flex-col justify-between">
    <div>
      <h3 className="font-raleway text-base sm:text-xl font-bold tracking-wide uppercase text-white mb-2 leading-snug">{title}</h3>
      <p className="font-montserrat text-[#e8d9dd] text-[12px] sm:text-sm leading-relaxed">{text}</p>
    </div>
    <div className="mt-3 pt-2 border-t border-white/10"><span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-[#e5acbc]">{footer}</span></div>
  </div>
</article>;

const Pillar: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => <div className="bg-[#1c1416] p-3.5 rounded-xl border border-[#9a5967]/20 text-center">{icon}<span className="text-xs font-bold uppercase tracking-wider text-amber-100 block">{text}</span></div>;
