import React from 'react';
import { Calendar, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

interface AboutUsViewProps {
  onOpenAppointment: () => void;
  language: Language;
}

const founderStory: Record<Language, { tagline: string; paragraphs: string[] }> = {
  "en": {
    "tagline": "Brazilian heart. Personal care. Beauty that feels like you.",
    "paragraphs": [
      "Hi, I’m Livia Rego, founder of Bella Beauty Brazil, brow specialist, cosmetic tattoo artist and beauty educator based in Greenslopes, Brisbane.",
      "Originally from the Amazon region of Brazil, I moved to Australia looking for new challenges. With a background in foreign trade and air cargo sales, I never imagined beauty would become such a meaningful part of my life.",
      "I built Bella Beauty Brazil from a home-based business, growing through personal connections, loyal clients and the care I put into every appointment.",
      "Brows are a special passion of mine. From carefully mapped brow sculpting to realistic Nano Strokes, I love the details that make each face unique. I also offer Lip Blush, lash treatments and facials, and share my knowledge through one-on-one beauty training.",
      "I believe good work takes time. That’s why I choose quality over quantity, giving each client my full attention. I take time to listen, understand your preferences and carefully plan your treatment. My goal is to earn your trust and build a lasting relationship, so you feel confident coming back to me.",
      "As a business owner and a mother, I know how much it means to take a little time for yourself. Whether you visit me for a quick brow appointment or a bigger change, I want you to feel welcome, listened to and cared for.",
      "I’d love to welcome you to Bella Beauty Brazil."
    ]
  },
  "pt": {
    "tagline": "Coração brasileiro. Cuidado pessoal. Beleza que combina com você.",
    "paragraphs": [
      "Oi, sou Livia Rego, fundadora da Bella Beauty Brazil, especialista em sobrancelhas, tatuagem cosmética e educadora na área da beleza em Greenslopes, Brisbane.",
      "Sou da região amazônica do Brasil e me mudei para a Austrália em busca de novos desafios. Com experiência em comércio exterior e vendas de carga aérea, nunca imaginei que a beleza se tornaria uma parte tão importante da minha vida.",
      "Comecei a Bella Beauty Brazil atendendo em casa e cresci por meio de conexões pessoais, clientes fiéis e do cuidado que dedico a cada atendimento.",
      "As sobrancelhas são uma paixão especial. Da modelagem cuidadosa aos fios realistas de Nano Strokes, adoro os detalhes que tornam cada rosto único. Também ofereço Lip Blush, tratamentos de cílios e faciais, além de compartilhar meu conhecimento em cursos de beleza individuais.",
      "Acredito que um bom trabalho exige tempo. Por isso, prefiro qualidade à quantidade e dedico toda a minha atenção a cada cliente. Escuto suas preferências, procuro entender o que você deseja e planejo cada tratamento com cuidado. Meu objetivo é conquistar sua confiança e construir uma relação duradoura, para que você se sinta segura ao voltar.",
      "Como empresária e mãe, sei como é importante reservar um momento para cuidar de si. Seja para um atendimento rápido de sobrancelhas ou uma transformação maior, quero que você se sinta acolhida, ouvida e bem cuidada.",
      "Vou adorar receber você na Bella Beauty Brazil."
    ]
  },
  "es": {
    "tagline": "Corazón brasileño. Atención personal. Belleza que se siente como tú.",
    "paragraphs": [
      "Hola, soy Livia Rego, fundadora de Bella Beauty Brazil, especialista en cejas, artista de tatuaje cosmético y educadora de belleza en Greenslopes, Brisbane.",
      "Soy originaria de la región amazónica de Brasil y me mudé a Australia en busca de nuevos desafíos. Con experiencia en comercio exterior y ventas de carga aérea, nunca imaginé que la belleza llegaría a ser una parte tan importante de mi vida.",
      "Comencé Bella Beauty Brazil desde casa y crecí gracias a las conexiones personales, a clientas fieles y al cuidado que pongo en cada cita.",
      "Las cejas son una pasión especial para mí. Desde el diseño cuidadoso hasta los trazos realistas de Nano Strokes, me encantan los detalles que hacen que cada rostro sea único. También ofrezco Lip Blush, tratamientos de pestañas y faciales, y comparto mis conocimientos en formación de belleza individual.",
      "Creo que un buen trabajo requiere tiempo. Por eso prefiero la calidad a la cantidad y dedico toda mi atención a cada clienta. Escucho tus preferencias, me tomo el tiempo para entender lo que buscas y planifico tu tratamiento cuidadosamente. Mi objetivo es ganar tu confianza y construir una relación duradera para que te sientas segura al volver.",
      "Como empresaria y madre, sé lo importante que es dedicarte un momento a ti misma. Tanto si vienes para una cita rápida de cejas como para un cambio mayor, quiero que te sientas bienvenida, escuchada y cuidada.",
      "Me encantará recibirte en Bella Beauty Brazil."
    ]
  }
};

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onOpenAppointment, language }) => {
  return (
    <div className="bg-site">
      {/* Hero Header */}
      <div className="relative bg-neutral-900 text-white py-20 lg:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={siteImages.aboutMe.clinicSpace}
            alt="About Bella Beauty Brazilian Beauty"
            className="w-full h-full object-cover"
          />
        </div>
        <img src={siteImages.editorial.rosePortrait} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute right-0 bottom-0 h-full w-[42%] max-w-[260px] object-cover opacity-20 sm:opacity-30 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <div className="w-16 h-16 mx-auto mb-4">
            <img src={siteImages.brand.goldEmblemStamp} alt="Emblem" className="w-full h-full object-contain" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-2 font-bold">
            {language === 'en' ? 'Our Story & Philosophy' : language === 'pt' ? 'Nossa história e filosofia' : 'Nuestra historia y filosofía'}
          </p>
          <h1 className="font-raleway text-4xl sm:text-5xl font-light uppercase tracking-wider text-white">
            {language === 'en' ? 'About Bella Beauty' : language === 'pt' ? 'Sobre a Bella Beauty' : 'Sobre Bella Beauty'}
          </h1>
          <div className="w-20 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>
      </div>

      {/* Main Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a5967]">
              {language === 'en' ? 'Beauty with Technique' : language === 'pt' ? 'Beleza com técnica' : 'Belleza con técnica'}
            </span>
            <h2 className="font-raleway text-3xl sm:text-4xl font-light uppercase text-neutral-900 leading-tight">
              {language === 'en' ? <>Care with <span className="font-bold text-[#9a5967]">Purpose &amp; Precision</span></> : language === 'pt' ? <>Cuidado com <span className="font-bold text-[#9a5967]">propósito e precisão</span></> : <>Cuidado con <span className="font-bold text-[#9a5967]">propósito y precisión</span></>}
            </h2>
            <div className="space-y-4 font-montserrat text-neutral-600 text-sm leading-relaxed">
              <p>
                {language === 'en' ? 'Bella Beauty Brazil specialises in brows, lashes, cosmetic tattooing and skin treatments. Founded by Livia Rego, our studio brings expertise, precision and personalised care to Brisbane.' : language === 'pt' ? 'A Bella Beauty Brazil é especializada em sobrancelhas, cílios, tatuagem cosmética e tratamentos para a pele. Fundada por Livia Rego, nosso estúdio une técnica, precisão e cuidado personalizado em Brisbane.' : 'Bella Beauty Brazil se especializa en cejas, pestañas, tatuaje cosmético y tratamientos para la piel. Fundado por Livia Rego, nuestro estudio ofrece técnica, precisión y atención personalizada en Brisbane.'}
              </p>
              <p>
                {language === 'en' ? 'With a serene, welcoming space in Greenslopes, our commitment is to deliver careful treatments that enhance your natural beauty and confidence.' : language === 'pt' ? 'Com um espaço acolhedor em Greenslopes, nosso compromisso é oferecer tratamentos cuidadosos que realçam sua beleza e confiança naturais.' : 'Con un espacio acogedor en Greenslopes, nuestro compromiso es ofrecer tratamientos cuidadosos que realcen tu belleza y confianza naturales.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center space-x-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDA' : 'AGENDAR CITA'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg border border-[#9a5967]/30">
              <img
                src={siteImages.aboutMe.liviaPhoto}
                alt="Livia Rego - Bella Beauty Brazilian Beauty"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* The client's complete approved founder story (October 2026 PDF). */}
        <section aria-labelledby="meet-livia-story" className="mb-16 sm:mb-20 rounded-2xl border border-[#e8d6d5] bg-white p-6 sm:p-10 shadow-sm">
          <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-[#9a5967] font-semibold">Bella Beauty Brazil · Greenslopes</p>
          <h2 id="meet-livia-story" className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239] mt-3">
            {language === 'en' ? 'Meet Livia' : language === 'pt' ? 'Conheça Livia' : 'Conoce a Livia'}
          </h2>
          <p className="font-raleway text-lg text-[#9a5967] mt-3">{founderStory[language].tagline}</p>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 mt-6 font-montserrat text-sm text-[#675960] leading-relaxed">
            <div className="space-y-4">
              {founderStory[language].paragraphs.slice(0, 4).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <div className="space-y-4">
              {founderStory[language].paragraphs.slice(4).map((paragraph, index) => <p key={index + 4}>{paragraph}</p>)}
              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="inline-flex items-center space-x-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-200" />
                  <span>{language === 'en' ? 'BOOK YOUR APPOINTMENT' : language === 'pt' ? 'AGENDE SEU HORÁRIO' : 'RESERVA TU CITA'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional recent portraits provided by Livia, replacing older gallery portraits. */}
        <section aria-labelledby="livia-photos-heading" className="mb-16 sm:mb-20">
          <h2 id="livia-photos-heading" className="font-raleway text-xl sm:text-2xl text-[#5b3239] font-semibold text-center">
            {language === 'en' ? 'More photos of Livia' : language === 'pt' ? 'Mais fotos da Livia' : 'Más fotos de Livia'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto mt-6">
            <a href={siteImages.client.aboutLivia02} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-2xl border border-[#e8d6d5] shadow-md focus-visible:outline-2 focus-visible:outline-[#9a5967]" aria-label={language === 'en' ? 'View full photo of Livia' : 'Ver foto completa de Livia'}>
              <img src={siteImages.client.aboutLivia02} alt="Livia Rego at Bella Beauty Brazil" className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </a>
            <a href={siteImages.client.aboutLivia03} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-2xl border border-[#e8d6d5] shadow-md focus-visible:outline-2 focus-visible:outline-[#9a5967]" aria-label={language === 'en' ? 'View second photo of Livia' : 'Ver outra foto de Livia'}>
              <img src={siteImages.client.aboutLivia03} alt="Livia Rego portrait at Bella Beauty Brazil" className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </a>
          </div>
        </section>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-100 pt-16">
          <div className="text-center p-6 rounded-2xl bg-site-soft/70">
            <div className="w-12 h-12 bg-[#9a5967]/10 text-[#9a5967] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-raleway text-lg font-bold uppercase tracking-wider text-neutral-900 mb-2">
              {language === 'en' ? 'Authentic Technique' : 'Técnica Autêntica'}
            </h3>
            <p className="font-montserrat text-xs text-neutral-600 leading-relaxed">
              {language === 'en'
                ? 'Professional beauty technique focused on precision, comfort and personalised care.'
                : 'Técnica profissional de beleza focada em precisão, conforto e cuidado personalizado.'}
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-site-soft/70">
            <div className="w-12 h-12 bg-[#9a5967]/10 text-[#9a5967] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-raleway text-lg font-bold uppercase tracking-wider text-neutral-900 mb-2">
              {language === 'en' ? 'Personalized Care' : 'Atendimento Personalizado'}
            </h3>
            <p className="font-montserrat text-xs text-neutral-600 leading-relaxed">
              {language === 'en'
                ? 'Each session respects your individual needs and body sensitivity in a tranquil atmosphere.'
                : 'Cada atendimento respeita a sensibilidade e necessidades do seu corpo em uma atmosfera acolhedora.'}
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-site-soft/70">
            <div className="w-12 h-12 bg-[#9a5967]/10 text-[#9a5967] rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-raleway text-lg font-bold uppercase tracking-wider text-neutral-900 mb-2">
              {language === 'en' ? 'Dedicated Experience' : 'Experiência Acolhedora'}
            </h3>
            <p className="font-montserrat text-xs text-neutral-600 leading-relaxed">
              {language === 'en'
                ? 'A serene haven designed for relaxation, relief, and renewed vitality.'
                : 'Ambiente sereno desenhado para desacelerar, relaxar e renovar suas energias.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
