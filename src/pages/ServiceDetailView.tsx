import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Language, SERVICES, getLocalizedService, getServiceBookingUrl, SERVICE_BOOKING_LINKS } from '../data/siteData';
import { siteImages } from '../data/siteImages';
import { SERVICE_GUIDES } from '../data/serviceGuides';
import { approvedDescriptionFor } from '../data/approvedServiceCatalog';
import { ServicePhotoGallery, getServicePhotos } from '../components/ServicePhotoGallery';
import { ServiceVideoGallery } from '../components/ServiceVideoGallery';

interface ServiceDetailViewProps {
  serviceId: string;
  language: Language;
  onNavigate: (tab: string, subParam?: string) => void;
}

const GROUPS: Record<string, { related: string[]; difference: string; care: string; faq: string }> = {
  'nano-strokes': {
    related: ['shadow-brows', 'shadow-hybrid', 'brow-sculpt-tint'],
    difference: 'Nano Strokes and Microblading focus on hair-stroke style brow artistry. Shadow or Hybrid Brows create a more defined shaded finish. The best option depends on your desired look and consultation.',
    care: 'For suitability, preparation and aftercare, follow the instructions provided by Bella Beauty Brazil and confirm details during your Timely booking or consultation.',
    faq: 'Is this the right brow technique for me? Bella Beauty Brazil will assess your goals and suitability during the consultation. The published Timely price and duration are shown below.',
  },
  'shadow-brows': {
    related: ['nano-strokes', 'shadow-hybrid', 'brow-sculpt-tint'],
    difference: 'Shadow Brows is cosmetic tattooing with a soft, powder-like effect (initial treatment A$630 and 45-day touch-up A$120). Brow Sculpt & Hybrid Dye is a separate, temporary hair and skin tint (A$79).',
    care: 'Suitability, preparation and aftercare are discussed with Bella Beauty Brazil before your appointment.',
    faq: 'Is Shadow Brows the same as Hybrid Dye? No. Shadow Brows is cosmetic tattooing, while Hybrid Dye is temporary brow colour and shaping.',
  },
  'shadow-hybrid': {
    related: ['nano-strokes', 'shadow-brows', 'brow-sculpt-tint'],
    difference: 'The approved menu lists Brow Sculpt & Hybrid Dye at A$79 for a tint-and-shape service. Semi-permanent Shadow Brows is a separate cosmetic tattoo procedure, starting at A$630, with a touch-up at A$120.',
    care: 'Follow the official preparation and aftercare guidance supplied by Bella Beauty Brazil. Availability and suitability should be confirmed through the official booking page.',
    faq: 'What is the difference? Hybrid Dye is temporary brow styling at A$79; cosmetic tattoo Shadow Brows starts at A$630. Confirm your preferred treatment with the studio.',
  },
  'lip-blush': {
    related: ['nano-strokes', 'brow-sculpt-tint', 'facial-spa'],
    difference: 'Lip Blush is a cosmetic tattooing service for the natural tone and shape of the lips. It is different from facial treatments, which focus on skin care rather than lip colour.',
    care: 'Preparation, suitability and aftercare must follow the guidance provided by Bella Beauty Brazil for your appointment. Confirm any personal questions before booking.',
    faq: 'Is Lip Blush permanent? It is described by Bella Beauty Brazil as semi-permanent cosmetic tattooing. Confirm suitability and expected care requirements during the official booking process.',
  },
  'brow-sculpt-tint': {
    related: ['brow-sculpt', 'brow-lamination', 'shadow-hybrid'],
    difference: 'Brow Sculpting and Tint shapes and colours the natural brows. Brow Lamination changes the direction and appearance of brow hairs, while cosmetic tattooing creates a semi-permanent brow finish.',
    care: 'Follow the aftercare guidance from Bella Beauty Brazil and use the official Timely page to confirm availability and any preparation requirements.',
    faq: 'Does Brow Sculpt & Tint include tinting? Yes, the published Timely service name includes both sculpting and tinting. The price and duration are shown from the catalogue.',
  },
  'brow-lamination': {
    related: ['brow-sculpt-tint', 'lash-lift', 'shadow-hybrid'],
    difference: 'Brow Lamination, Shape & Tint is a brow styling service. It is not the same as cosmetic tattooing or Nano Strokes, which create semi-permanent pigment effects.',
    care: 'Follow Bella Beauty Brazil’s appointment-specific preparation and aftercare guidance. Confirm suitability and availability through Timely.',
    faq: 'How is Brow Lamination different from tattooing? Lamination styles existing brow hairs, while cosmetic tattooing deposits pigment for a semi-permanent finish.',
  },
  'lash-lift': {
    related: ['classic-eyelashes', 'hybrid-eyelashes', 'brow-lamination'],
    difference: 'Lash Lift & Tint works with the natural lashes. Classic, Hybrid and Russian Volume Extensions add applied extensions and create different levels of density.',
    care: 'Follow the eye-area preparation and aftercare instructions supplied by Bella Beauty Brazil. Confirm suitability and appointment requirements before booking.',
    faq: 'What is the difference between a Lash Lift and extensions? A Lash Lift curls and tints natural lashes; extensions add individual or volume lashes according to the selected set.',
  },
  dermaplaning: {
    related: ['microneedling', 'facial-spa', 'deluxe-facial'],
    difference: 'Dermaplaning, Microneedling and Facial Spa treatments are skin-focused services with different protocols. Bella Beauty Brazil can confirm suitability and the appropriate option through the official booking process.',
    care: 'Skin preparation and aftercare vary by treatment and individual suitability. Follow the instructions given by Bella Beauty Brazil rather than relying on generic advice.',
    faq: 'Which facial treatment should I choose? Review the published service descriptions and use the official Timely booking page to ask Bella Beauty Brazil about suitability and availability.',
  },
};

const GROUP_TRANSLATIONS: Record<string, Record<'pt' | 'es', { difference: string; care: string; faq: string }>> = {
  'nano-strokes': {
    pt: { difference: 'Nano Strokes e Microblading trabalham um efeito de fios realistas nas sobrancelhas. Shadow ou Hybrid criam um acabamento mais sombreado e definido. A melhor opção depende do resultado desejado e da consulta.', care: 'Para indicação, preparação e cuidados, siga as instruções da Bella Beauty Brazil e confirme os detalhes na reserva ou consulta pelo Timely.', faq: 'Esta é a técnica certa para mim? A Bella Beauty Brazil avaliará seus objetivos e sua indicação durante a consulta. O preço e a duração publicados no Timely aparecem abaixo.' },
    es: { difference: 'Nano Strokes y Microblading crean un efecto de trazos realistas en las cejas. Shadow o Hybrid ofrecen un acabado más sombreado y definido. La opción adecuada depende del resultado deseado y de la consulta.', care: 'Para indicaciones, preparación y cuidados, sigue las instrucciones de Bella Beauty Brazil y confirma los detalles durante tu reserva o consulta en Timely.', faq: '¿Es esta la técnica adecuada para mí? Bella Beauty Brazil evaluará tus objetivos y tu idoneidad durante la consulta. El precio y la duración publicados en Timely aparecen abajo.' },
  },
  'shadow-hybrid': {
    pt: { difference: 'O menu aprovado informa Brow Sculpt & Hybrid Dye por A$79, uma modelagem com coloração temporária. Shadow Brows é uma tatuagem cosmética separada por A$630, com retoque de A$120.', care: 'Siga os cuidados e orientações fornecidos pela Bella Beauty Brazil. Confirme indicação, disponibilidade e qualquer preparação na página oficial de reserva.', faq: 'Qual a diferença? Hybrid Dye é design e coloração temporária de A$79; Shadow Brows é tatuagem cosmética a partir de A$630.' },
    es: { difference: 'El menú aprobado indica Brow Sculpt & Hybrid Dye por A$79, un tratamiento temporal de diseño y color. Shadow Brows es un tatuaje cosmético aparte por A$630, más retoque de A$120.', care: 'Sigue los cuidados y las indicaciones de Bella Beauty Brazil. Confirma idoneidad, disponibilidad y preparación en la página oficial de reserva.', faq: '¿En qué se diferencian? Hybrid Dye es estilismo temporal por A$79; Shadow Brows es tatuaje cosmético desde A$630.' },
  },
  'lip-blush': {
    pt: { difference: 'Lip Blush é um serviço de tatuagem cosmética para realçar o tom e o formato natural dos lábios. É diferente dos tratamentos faciais, que se concentram no cuidado da pele.', care: 'A preparação, a indicação e os cuidados devem seguir as orientações da Bella Beauty Brazil para seu atendimento. Confirme dúvidas pessoais antes da reserva.', faq: 'Lip Blush é permanente? A Bella Beauty Brazil descreve o serviço como tatuagem cosmética semipermanente. Confirme indicação e cuidados esperados no processo oficial de reserva.' },
    es: { difference: 'Lip Blush es un servicio de tatuaje cosmético para realzar el tono y la forma natural de los labios. Es diferente de los tratamientos faciales, enfocados en el cuidado de la piel.', care: 'La preparación, la idoneidad y los cuidados deben seguir las indicaciones de Bella Beauty Brazil para tu cita. Confirma tus dudas antes de reservar.', faq: '¿Lip Blush es permanente? Bella Beauty Brazil describe el servicio como tatuaje cosmético semipermanente. Confirma la idoneidad y los cuidados durante la reserva oficial.' },
  },
  'brow-sculpt-tint': {
    pt: { difference: 'Brow Sculpting & Tint modela e coloreia as sobrancelhas naturais. A Brow Lamination muda a direção e a aparência dos fios, enquanto a tatuagem cosmética cria um acabamento semipermanente.', care: 'Siga os cuidados da Bella Beauty Brazil e use o Timely oficial para confirmar disponibilidade e qualquer preparação necessária.', faq: 'Brow Sculpt & Tint inclui coloração? Sim, o nome publicado no Timely inclui escultura e tintura. O preço e a duração vêm do catálogo.' },
    es: { difference: 'Brow Sculpting & Tint da forma y color a las cejas naturales. Brow Lamination cambia la dirección y apariencia del pelo, mientras el tatuaje cosmético crea un acabado semipermanente.', care: 'Sigue los cuidados de Bella Beauty Brazil y usa el Timely oficial para confirmar disponibilidad y preparación.', faq: '¿Brow Sculpt & Tint incluye tinte? Sí, el nombre publicado en Timely incluye diseño y tinte. El precio y la duración provienen del catálogo.' },
  },
  'brow-lamination': {
    pt: { difference: 'Brow Lamination, Shape & Tint é styling de sobrancelhas. Não é igual à tatuagem cosmética ou Nano Strokes, que criam efeitos de pigmento semipermanente.', care: 'Siga as orientações de preparação e cuidados fornecidas pela Bella Beauty Brazil para seu atendimento. Confirme indicação e disponibilidade no Timely.', faq: 'Como a Brow Lamination difere da tatuagem? A laminação modela os fios existentes, enquanto a tatuagem cosmética deposita pigmento para um acabamento semipermanente.' },
    es: { difference: 'Brow Lamination, Shape & Tint es styling de cejas. No es igual al tatuaje cosmético o Nano Strokes, que crean efectos de pigmento semipermanente.', care: 'Sigue las indicaciones de preparación y cuidados de Bella Beauty Brazil para tu cita. Confirma idoneidad y disponibilidad en Timely.', faq: '¿Cómo se diferencia Brow Lamination del tatuaje? La laminación peina el pelo existente, mientras el tatuaje cosmético deposita pigmento para un acabado semipermanente.' },
  },
  'lash-lift': {
    pt: { difference: 'Lash Lift & Tint trabalha com os cílios naturais. Extensões Classic, Hybrid e Russian Volume adicionam extensões aplicadas e criam níveis diferentes de densidade.', care: 'Siga as instruções de preparação e cuidados para a área dos olhos fornecidas pela Bella Beauty Brazil. Confirme indicação e requisitos antes de reservar.', faq: 'Qual a diferença entre Lash Lift e extensões? Lash Lift curva e colore os cílios naturais; extensões adicionam cílios individuais ou volume conforme o conjunto escolhido.' },
    es: { difference: 'Lash Lift & Tint trabaja con las pestañas naturales. Las extensiones Classic, Hybrid y Russian Volume añaden extensiones y crean distintos niveles de densidad.', care: 'Sigue las instrucciones de preparación y cuidados para el área de los ojos de Bella Beauty Brazil. Confirma idoneidad y requisitos antes de reservar.', faq: '¿Cuál es la diferencia entre Lash Lift y extensiones? Lash Lift curva y tiñe las pestañas naturales; las extensiones añaden pestañas individuales o volumen según el set.' },
  },
  dermaplaning: {
    pt: { difference: 'Dermaplaning, Microneedling e Facial Spa são tratamentos para a pele com protocolos diferentes. A Bella Beauty Brazil pode confirmar a indicação pelo processo oficial de reserva.', care: 'A preparação e os cuidados variam conforme o tratamento e a indicação individual. Siga as instruções dadas pela Bella Beauty Brazil, não orientações genéricas.', faq: 'Qual tratamento facial devo escolher? Consulte as descrições publicadas e use o Timely oficial para perguntar à Bella Beauty Brazil sobre indicação e disponibilidade.' },
    es: { difference: 'Dermaplaning, Microneedling y Facial Spa son tratamientos de piel con protocolos diferentes. Bella Beauty Brazil puede confirmar la idoneidad durante el proceso oficial de reserva.', care: 'La preparación y los cuidados varían según el tratamiento y la idoneidad individual. Sigue las instrucciones de Bella Beauty Brazil, no consejos genéricos.', faq: '¿Qué tratamiento facial debo elegir? Revisa las descripciones publicadas y usa el Timely oficial para preguntar sobre idoneidad y disponibilidad.' },
  },
};

const translated = (language: Language, en: string, pt: string, es: string) => language === 'en' ? en : language === 'pt' ? pt : es;

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceId, language, onNavigate }) => {
  const base = SERVICES.find((service) => service.id === serviceId) || SERVICES[0];
  const service = getLocalizedService(base, language);
  // A dedicated service photo is used only when it depicts the correct treatment family.
  // Never show dermaplaning as Microneedling, or an empty room as Teeth Whitening.
  const verifiedServicePhotos = getServicePhotos(base.id);
  const noMatchingTreatmentPhoto = !verifiedServicePhotos.length && [
    'teeth-whitening', 'cosmetic-tattoo-removal', 'lip-bliss-hydration',
    'grow-up-hair-brows', 'grow-up-hair-scalp',
    'microneedling', 'facial-spa', 'deluxe-facial',
  ].includes(base.id);
  // A service without a dedicated comparison must never inherit the Nano Strokes FAQ.
  const categoryRelated = SERVICES.filter((item) => item.category === base.category && item.id !== base.id).slice(0, 3);
  const group = GROUPS[base.id] || {
    related: categoryRelated.map((item) => item.id),
    difference: `${base.title} is a ${base.category || 'beauty'} service offered at Bella Beauty Brazil. Other treatments in this category may use different techniques. Confirm the appropriate option with the studio before booking.`,
    care: 'Preparation, suitability and aftercare vary by treatment. Follow the instructions provided by Bella Beauty Brazil during your appointment.',
    faq: `How can I book ${base.title}? Check the official Timely booking page for service availability, current prices and appointment details.`,
  };
  const fallbackTranslation = language === 'pt'
    ? { difference: `${base.title} é um serviço da categoria ${base.category || 'beleza'} da Bella Beauty Brazil. Confirme a técnica mais adequada diretamente com o estúdio.`, care: 'O preparo, a indicação e os cuidados dependem do tratamento. Siga as orientações da Bella Beauty Brazil.', faq: `Como agendar ${base.title}? Consulte a disponibilidade, os preços e as informações no Timely oficial.` }
    : { difference: `${base.title} es un servicio de ${base.category || 'belleza'} de Bella Beauty Brazil. Consulta con el estudio qué técnica es la adecuada.`, care: 'La preparación, la idoneidad y los cuidados varían según el tratamiento. Sigue las instrucciones de Bella Beauty Brazil.', faq: `¿Cómo reservar ${base.title}? Consulta disponibilidad, precios y detalles en el Timely oficial.` };
  const groupCopy = language === 'en' ? group : GROUP_TRANSLATIONS[base.id]?.[language] || { ...group, ...fallbackTranslation };
  const related = group.related.map((id) => SERVICES.find((item) => item.id === id)).filter(Boolean) as typeof SERVICES;
  const isPriceConfirmed = typeof service.price === 'number';
  const guide = SERVICE_GUIDES[base.id]?.[language];
  const hasClientPhotos = getServicePhotos(base.id).length > 0;


  return (
    <div className="bg-site">
      <section className="relative bg-[#5b3239] text-white py-14 sm:py-20 overflow-hidden scroll-rise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button type="button" onClick={() => onNavigate('services')} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#efb7c8] hover:text-white cursor-pointer mb-8">
            <ArrowLeft className="w-4 h-4" /> {translated(language, 'All services', 'Todos os serviços', 'Todos los servicios')}
          </button>
          <p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-3 font-bold">Bella Beauty Brazil · Greenslopes, Brisbane</p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wider leading-tight">{service.title}</h1>
              <p className="font-montserrat text-sm sm:text-base text-neutral-200 mt-5 max-w-xl leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-4 mt-7">
                <a href={getServiceBookingUrl(base.id)}  className="inline-flex items-center gap-2 bg-[#efb7c8] hover:bg-white text-[#5b3239] text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full cursor-pointer transition-colors">
                  <Calendar className="w-4 h-4" /> {translated(language, 'Book now', 'Agendar agora', 'Reservar ahora')}
                </a>
                {hasClientPhotos && <a href="#service-photos" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-5 py-4 rounded-full transition-colors">{translated(language, 'See real photos', 'Ver fotos reais', 'Ver fotos reales')}<ArrowRight className="w-4 h-4" /></a>}
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-200"><MapPin className="w-4 h-4 text-[#efb7c8]" /> Greenslopes, QLD 4120</span>
              </div>
            </div>
            <div className="lg:col-span-6">
              {noMatchingTreatmentPhoto
                ? <div className="w-full aspect-[4/3] rounded-2xl border border-[#efb7c8]/30 bg-gradient-to-br from-[#70404e] via-[#5b3239] to-[#2f1f29] shadow-2xl flex flex-col items-center justify-center text-center p-8">
                    <CheckCircle2 className="w-10 h-10 text-[#efb7c8] mb-5" aria-hidden="true" />
                    <span className="text-xs uppercase tracking-[0.22em] text-[#efb7c8] font-bold mb-3">Bella Beauty Brazil</span>
                    <p className="font-raleway text-2xl sm:text-3xl font-semibold text-white">{service.title}</p>
                    <p className="font-montserrat text-sm text-white/75 mt-4 max-w-xs">
                      {translated(language, 'Personalised treatment and consultation', 'Tratamento e consulta personalizados', 'Tratamiento y consulta personalizados')}
                    </p>
                  </div>
                : <img src={verifiedServicePhotos[0]?.src || service.image}
                    alt={verifiedServicePhotos.length ? `${service.title} — real client photo from Bella Beauty Brazil` : `${service.title} at Bella Beauty Brazil in Greenslopes`}
                    className="w-full aspect-[4/3] object-contain bg-[#261d21] rounded-2xl shadow-2xl border border-white/20" />}
            </div>
          </div>
        </div>
      </section>

      <ServicePhotoGallery serviceId={base.id} language={language} />
      <ServiceVideoGallery serviceId={base.id} language={language} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-2xl border border-[#e8d6d5] p-6 sm:p-10 shadow-sm scroll-rise">
              <h2 className="font-raleway text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#5b3239]">{translated(language, 'About this treatment', 'Sobre este tratamento', 'Sobre este tratamiento')}</h2>
              <p className="font-montserrat text-neutral-700 leading-relaxed mt-4">{language === 'en' ? (approvedDescriptionFor(base.id) || service.description) : service.description}</p>
              {!['nano-strokes', 'lip-blush', 'shadow-brows', 'brow-sculpt'].includes(base.id) && language === 'en' && approvedDescriptionFor(base.id) && <p className="font-montserrat text-xs text-[#846f75] mt-3">Treatment description provided by Bella Beauty Brazil.</p>}
              {guide && <>
                <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-8">{translated(language, 'Who may this treatment suit?', 'Para quem este tratamento pode ser indicado?', '¿Para quién puede ser adecuado este tratamiento?')}</h3>
                <p className="font-montserrat text-neutral-700 leading-relaxed mt-3">{guide.idealFor}</p>
                {base.id === 'nano-strokes' ? (
                  <>
                    <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-8">{translated(language, 'How does it work?', 'Como funciona?', '¿Cómo funciona?')}</h3>
                    <p className="font-montserrat text-neutral-700 leading-relaxed mt-3">
                      {translated(language,
                        'Using a manual Tebori tool, I create fine, hair-like strokes that blend with your natural brow hairs. Each brow pattern is individually designed to complement your features, add definition and fill sparse areas.',
                        'Usando uma ferramenta manual Tebori, crio traços finos semelhantes a fios que se misturam aos pelos naturais das sobrancelhas. Cada desenho é criado individualmente para valorizar seus traços, trazer definição e preencher áreas com poucos fios.',
                        'Con una herramienta manual Tebori, creo trazos finos similares al vello que se integran con tus cejas naturales. Cada diseño se crea individualmente para complementar tus rasgos, aportar definición y rellenar zonas poco pobladas.'
                      )}
                    </p>
                  </>
                ) : base.id === 'lip-blush' ? (
                  <>
                    <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-8">{translated(language, 'A soft, natural finish', 'Um acabamento suave e natural', 'Un acabado suave y natural')}</h3>
                    <p className="font-montserrat text-neutral-700 leading-relaxed mt-3">
                      {translated(language,
                        'Lip Blush enhances your natural lip colour and gently defines the lip border. The shade is selected with you to suit your preferences. The healed result is a soft wash of colour rather than a full lipstick look.',
                        'Lip Blush realça a cor natural dos lábios e define suavemente seu contorno. O tom é escolhido com você, de acordo com suas preferências. Depois de cicatrizado, o resultado é uma cor suave, e não um efeito de batom intenso.',
                        'Lip Blush realza el color natural de tus labios y define suavemente su contorno. El tono se elige contigo según tus preferencias. Una vez cicatrizado, el resultado es un toque suave de color, no un efecto de pintalabios intenso.'
                      )}
                    </p>
                  </>
                ) : base.id === 'brow-sculpt' ? null : (
                  <>
                    <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-8">{translated(language, 'How is it different?', 'Quais são as diferenças?', '¿En qué se diferencia?')}</h3>
                    <p className="font-montserrat text-neutral-700 leading-relaxed mt-3">{guide.comparison}</p>
                  </>
                )}
              </>}
              <h3 className="font-raleway text-xl font-bold text-[#5b3239] mt-8">{translated(language, 'Benefits and what to expect', 'Benefícios e o que esperar', 'Beneficios y qué esperar')}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {(base.id === 'shadow-brows' && language !== 'en'
                  ? (language === 'pt'
                    ? ['Acabamento suave e sombreado', 'Formato e cor das sobrancelhas personalizados', 'A cor fica mais intensa no início e suaviza durante a cicatrização']
                    : ['Acabado suave y sombreado', 'Forma y color de cejas personalizados', 'El color se ve más intenso al principio y se suaviza mientras las cejas cicatrizan'])
                  : base.id === 'lip-blush' && language !== 'en'
                    ? (language === 'pt'
                      ? ['Cor suave e natural para os lábios', 'Contorno dos lábios mais definido', 'Escolha personalizada do tom', 'A cor fica mais intensa no início e suaviza durante a cicatrização']
                      : ['Color de labios suave y natural', 'Contorno de labios más definido', 'Elección personalizada del tono', 'El color se ve más intenso al principio y se suaviza durante la cicatrización'])
                    : (service.benefits || [])).map((benefit) => <li key={benefit} className="flex items-start gap-2 text-sm font-montserrat text-neutral-700"><CheckCircle2 className="w-4 h-4 text-[#9a5967] shrink-0 mt-0.5" />{benefit}</li>)}
              </ul>
            </section>
            <section className="bg-[#f3d9d0] rounded-2xl border border-[#e8c5c8] p-6 sm:p-10 scroll-rise">
              <h2 className="font-raleway text-2xl font-bold uppercase tracking-wider text-[#5b3239]">{translated(language, 'Preparation and aftercare', 'Preparação e cuidados', 'Preparación y cuidados')}</h2>
              <p className="font-montserrat text-neutral-700 leading-relaxed mt-4">{groupCopy.care}</p>
            </section>
            <section className="space-y-3">
              <h2 className="font-raleway text-2xl font-bold uppercase tracking-wider text-[#5b3239]">FAQ</h2>
              <details className="bg-white border border-[#e8d6d5] rounded-xl p-5" open><summary className="font-montserrat font-bold text-[#5b3239] cursor-pointer">
                {base.id === 'brow-sculpt'
                  ? translated(language, 'What should I avoid before my appointment?', 'O que devo evitar antes do meu agendamento?', '¿Qué debo evitar antes de mi cita?')
                  : base.id === 'shadow-brows'
                    ? translated(language, 'Is Shadow Brows the same as brow dye?', 'Shadow Brows é o mesmo que tintura para sobrancelhas?', '¿Shadow Brows es lo mismo que un tinte de cejas?')
                    : translated(language, 'What should I know before booking?', 'O que devo saber antes de agendar?', '¿Qué debo saber antes de reservar?')}
              </summary><p className="font-montserrat text-sm text-neutral-700 leading-relaxed mt-3">
                {base.id === 'brow-sculpt'
                  ? translated(language,
                      'Avoid applying retinol, AHAs, BHAs or other exfoliating acids around your brows before your appointment, as these can make the skin more sensitive to waxing. Please let me know if you use these products or any prescription skin treatments so I can advise on suitable timing.',
                      'Evite aplicar retinol, AHAs, BHAs ou outros ácidos esfoliantes na região das sobrancelhas antes do atendimento, pois eles podem deixar a pele mais sensível à depilação com cera. Informe se usa esses produtos ou tratamentos dermatológicos prescritos para que eu possa orientar sobre o melhor momento para agendar.',
                      'Evita aplicar retinol, AHA, BHA u otros ácidos exfoliantes alrededor de las cejas antes de la cita, ya que pueden sensibilizar la piel a la depilación con cera. Avísame si utilizas estos productos o tratamientos dermatológicos recetados para que pueda orientarte sobre el momento adecuado.')
                  : base.id === 'shadow-brows'
                    ? translated(language,
                        'No. Shadow Brows is a cosmetic tattooing treatment that creates a soft, shaded brow effect. Brow dye temporarily colours the existing hairs and can also stain the skin.',
                        'Não. Shadow Brows é um tratamento de tatuagem cosmética que cria um efeito suave e sombreado nas sobrancelhas. A tintura colore temporariamente os fios existentes e também pode pigmentar a pele.',
                        'No. Shadow Brows es un tratamiento de tatuaje cosmético que crea un efecto suave y sombreado en las cejas. El tinte colorea temporalmente los vellos existentes y también puede teñir la piel.')
                    : groupCopy.faq}
              </p></details>
              {guide && base.id !== 'nano-strokes' && <details className="bg-white border border-[#e8d6d5] rounded-xl p-5"><summary className="font-montserrat font-bold text-[#5b3239] cursor-pointer">{guide.question}</summary><p className="font-montserrat text-sm text-neutral-700 leading-relaxed mt-3">{guide.answer}</p></details>}
              {!['shadow-brows', 'brow-sculpt'].includes(base.id) && <details className="bg-white border border-[#e8d6d5] rounded-xl p-5"><summary className="font-montserrat font-bold text-[#5b3239] cursor-pointer">{translated(language, 'Where can I confirm the latest price?', 'Onde confirmar o preço atual?', '¿Dónde puedo confirmar el precio actual?')}</summary><p className="font-montserrat text-sm text-neutral-700 leading-relaxed mt-3">{isPriceConfirmed ? translated(language, 'The price and duration shown reflect the service catalogue recorded for this website. Prices and availability may change; the official Timely page is the final reference when booking.', 'O preço e a duração apresentados refletem o catálogo registrado para este site. Eles podem mudar; consulte o Timely oficial para o valor e a disponibilidade atualizados.', 'El precio y la duración corresponden al catálogo registrado para este sitio. Pueden cambiar; consulta el Timely oficial para conocer el precio y la disponibilidad actual.') : translated(language, 'No price is displayed here because it was not confirmed in the available catalogue. Please enquire through Timely.', 'Nenhum preço é exibido porque não foi confirmado no catálogo disponível. Consulte pelo Timely.', 'No se muestra precio porque no fue confirmado en el catálogo disponible. Consulta por Timely.')}</p></details>}
            </section>
          </div>
          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-[#5b3239] text-white rounded-2xl p-6 sm:p-8 shadow-lg sticky top-28">
              <h2 className="font-raleway text-2xl font-bold uppercase tracking-wider">{translated(language, 'Book this service', 'Agende este serviço', 'Reserva este servicio')}</h2>
              <div className="flex items-center gap-3 mt-5 text-[#efb7c8]"><Calendar className="w-5 h-5" /><strong className="font-montserrat text-xl">{isPriceConfirmed ? `A$${service.price}` : translated(language, 'Enquire', 'Consultar', 'Consultar')}</strong></div>
              {['nano-strokes', 'lip-blush', 'shadow-brows'].includes(base.id) && <p className="mt-3 font-montserrat text-sm font-medium leading-relaxed text-white/95">{translated(language, 'Touch-up after 45–60 days: $120.', 'Retoque após 45–60 dias: $120.', 'Retoque después de 45–60 días: $120.')}</p>}
              {service.duration && <div className="flex items-center gap-3 mt-3 text-neutral-200"><Clock className="w-5 h-5" /><span className="font-montserrat text-sm">{service.duration}</span></div>}
              <a href={getServiceBookingUrl(base.id)}  className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#efb7c8] hover:bg-white text-[#5b3239] text-xs font-bold uppercase tracking-widest px-5 py-4 rounded-full cursor-pointer transition-colors"><Calendar className="w-4 h-4" />{['nano-strokes', 'lip-blush', 'shadow-brows', 'brow-sculpt'].includes(base.id)
                ? translated(language, 'Book Your Appointment', 'Agende seu horário', 'Reserva tu cita')
                : SERVICE_BOOKING_LINKS[base.id]
                  ? translated(language, 'Book this treatment', 'Agendar este tratamento', 'Reservar este tratamiento')
                  : translated(language, 'Choose treatment on Timely', 'Selecionar tratamento no Timely', 'Elegir tratamiento en Timely')}</a>
              <p className="font-montserrat text-xs text-neutral-300 mt-5 leading-relaxed">{translated(language, 'Bella Beauty Brazil · Suite 3, 412 Logan Road, Greenslopes, QLD 4120.', 'Bella Beauty Brazil · Suite 3, 412 Logan Road, Greenslopes, QLD 4120.', 'Bella Beauty Brazil · Suite 3, 412 Logan Road, Greenslopes, QLD 4120.')}</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8d6d5] p-6">
              <h2 className="font-raleway text-xl font-bold uppercase tracking-wider text-[#5b3239]">{translated(language, 'Related services', 'Serviços relacionados', 'Servicios relacionados')}</h2>
              <div className="space-y-2 mt-4">{related.map((item) => <button key={item.id} type="button" onClick={() => onNavigate('services', item.id)} className="w-full flex items-center justify-between gap-3 text-left text-sm font-montserrat text-[#5b3239] hover:text-[#9a5967] cursor-pointer py-2 border-b border-neutral-100">{getLocalizedService(item, language).title}<ArrowRight className="w-4 h-4 shrink-0" /></button>)}</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
