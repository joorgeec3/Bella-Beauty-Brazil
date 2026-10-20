import React from 'react';
import { Award, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

interface FeaturesRibbonProps { language: Language; }
interface FeatureCardData { image?: string; icon: React.ReactNode; label: string; title: string; text: string; footer: string; }

export const FeaturesRibbon: React.FC<FeaturesRibbonProps> = ({ language }) => {
  const cards: FeatureCardData[] = [
    {
      image: `${import.meta.env.BASE_URL}assets/bella/gallery/studio-behind-scenes-01.webp`,
      icon: <Sparkles className="w-3 h-3 text-[#9a5967]" />,
      label: language === 'en' ? 'Brows · Technique' : language === 'pt' ? 'Sobrancelhas · Técnica' : 'Cejas · Técnica',
      title: language === 'en' ? 'Brow Artistry' : language === 'pt' ? 'Arte para sobrancelhas' : 'Arte para cejas',
      text: language === 'en' ? 'Sculpting, tinting, lamination and hybrid brow styling tailored to your features.' : language === 'pt' ? 'Design, tintura, laminação e brow híbrida adaptados às suas características.' : 'Diseño, tinte, laminado y cejas híbridas adaptadas a tus rasgos.',
      footer: language === 'en' ? 'Personalised care' : language === 'pt' ? 'Cuidado personalizado' : 'Cuidado personalizado',
    },
    {
      // A dedicated lash-result photo is used here once, not repeated in the carousel below.
      // Real lash-lift results, not a brow before/after photograph.
      image: `${import.meta.env.BASE_URL}assets/bella/gallery/lashes-result-05.webp`,
      icon: <Eye className="w-3 h-3 text-[#9a5967]" />,
      label: language === 'en' ? 'Lashes · Definition' : language === 'pt' ? 'Cílios · Definição' : 'Pestañas · Definición',
      title: language === 'en' ? 'Lash Treatments' : language === 'pt' ? 'Tratamentos para cílios' : 'Tratamientos de pestañas',
      text: language === 'en' ? 'Lash lift, tinting and extension services to frame the eyes.' : language === 'pt' ? 'Lash lift, tintura e extensões para realçar o olhar.' : 'Lash lift, tinte y extensiones para realzar la mirada.',
      footer: language === 'en' ? 'Care for your eyes' : language === 'pt' ? 'Cuidado para o olhar' : 'Cuidado para la mirada',
    },
    {
      // Keep the one approved real facial-treatment photograph for the larger Skin Treatments section.
      // This editorial visual is deliberately non-photographic so that no image repeats on the home page.
      icon: <ShieldCheck className="w-3 h-3 text-[#9a5967]" />,
      label: language === 'en' ? 'Skin · Care' : language === 'pt' ? 'Pele · Cuidado' : 'Piel · Cuidado',
      title: language === 'en' ? 'Skin Treatments' : language === 'pt' ? 'Tratamentos para a pele' : 'Tratamientos para la piel',
      text: language === 'en' ? 'Dermaplaning, microneedling, Facial Spa and Deluxe Facial services published in Timely.' : language === 'pt' ? 'Dermaplaning, microneedling, Facial Spa e Deluxe Facial publicados no Timely.' : 'Dermaplaning, microneedling, Facial Spa y Deluxe Facial publicados en Timely.',
      footer: language === 'en' ? 'Professional protocols' : language === 'pt' ? 'Protocolos profissionais' : 'Protocolos profesionales',
    },
  ];

  return <section className="relative bg-[#181214] text-white pt-14 pb-20 overflow-hidden border-t border-[#9a5967]/25">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 reveal-on-scroll">
        <span className="text-xs font-bold uppercase tracking-widest text-[#efb7c8] block mb-1">{language === 'en' ? 'Bella Beauty Signature Care' : language === 'pt' ? 'Assinatura Bella Beauty' : 'Cuidado exclusivo Bella Beauty'}</span>
        <h2 className="font-raleway text-[21px] leading-snug sm:text-2xl lg:text-3xl font-light uppercase tracking-[0.04em] text-white max-w-5xl mx-auto">
          {language === 'en'
            ? <>Cosmetic Tattooing, Brows, Lashes,{' '}<span className="block font-semibold text-[#efb7c8] mt-1">Skin Treatments &amp; Waxing</span></>
            : language === 'pt'
              ? <>Tatuagem Cosmética, Sobrancelhas, Cílios,{' '}<span className="block font-semibold text-[#efb7c8] mt-1">Tratamentos de Pele e Depilação</span></>
              : <>Tatuaje Cosmético, Cejas, Pestañas,{' '}<span className="block font-semibold text-[#efb7c8] mt-1">Tratamientos de Piel y Depilación</span></>}
        </h2>
        <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-6 lg:gap-8 items-stretch scroll-stagger">
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

const FeatureCard: React.FC<FeatureCardData> = ({ image, icon, label, title, text, footer }) => <article className="flex flex-col bg-[#22181b] reveal-scale rounded-3xl p-5 border border-[#9a5967]/30 shadow-xl transition-transform duration-300 hover:-translate-y-1">
  <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-[#181214] mb-5 shadow-lg border border-[#9a5967]/20 scroll-motion-layer" data-scroll-motion>
    {image
      ? <img src={image} alt={title} className="feature-card-image w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" loading="lazy" />
      : <div className="w-full h-full flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#70424f] via-[#4e313d] to-[#21191d] px-6" role="img" aria-label={title}>
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#efb7c8]/50 bg-white/10 flex items-center justify-center shadow-xl">
            <ShieldCheck aria-hidden="true" className="w-14 h-14 sm:w-16 sm:h-16 text-[#f8d1dd]" strokeWidth={1.25} />
          </div>
          <span className="font-raleway font-semibold text-center text-xl uppercase tracking-widest text-white/90">{title}</span>
          <span className="h-px w-16 bg-[#efb7c8]/60" aria-hidden="true" />
        </div>}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/75 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/30">{icon}{label}</span>
  </div>
  <div className="text-center flex-grow flex flex-col justify-between"><div><h3 className="font-raleway text-lg sm:text-xl font-bold tracking-wide uppercase text-white mb-2">{title}</h3><p className="font-montserrat text-neutral-300 text-xs sm:text-sm leading-relaxed">{text}</p></div><div className="mt-4 pt-3 border-t border-white/10"><span className="text-[11px] font-bold uppercase tracking-widest text-[#9a5967]">{footer}</span></div></div>
</article>;

const Pillar: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => <div className="bg-[#1c1416] p-3.5 rounded-xl border border-[#9a5967]/20 text-center">{icon}<span className="text-xs font-bold uppercase tracking-wider text-amber-100 block">{text}</span></div>;
