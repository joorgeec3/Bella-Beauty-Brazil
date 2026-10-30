import React from 'react';
import { CalendarDays, CheckCircle2, Clock3, MessageCircle } from 'lucide-react';
import type { Language } from '../data/siteData';
import { getServiceBookingUrl } from '../data/siteData';

type NanoText = {
  aboutTitle: string; about: string; suitabilityTitle: string; suitability: string;
  benefitsTitle: string; benefits: readonly string[];
  priceTitle: string; initial: string; touchUp: string;
  beforeTitle: string; before: readonly string[];
  afterTitle: string; after: readonly string[];
  faqTitle: string; faqs: readonly { q: string; a: string }[];
  book: string; contact: string; note: string;
};

// Studio-provided Nano Strokes copy. Keep this single authoritative version
// on the category page and the individual service page; no comparative claims.
const copy: Record<Language, NanoText> = {
  en: {
    aboutTitle: 'About this treatment',
    about: 'Nano Strokes is a manual microblading technique that creates fine, natural-looking hair strokes to enhance your brows. Using a Tebori hand tool, I follow the direction of your natural brow hairs to fill sparse areas and create a shape that complements your features.',
    suitabilityTitle: 'Is this treatment right for me?',
    suitability: 'For those wanting more definition with a natural hair-stroke appearance. I assess your skin, existing brows and any previous tattooing before recommending the most suitable technique.',
    benefitsTitle: 'Benefits',
    benefits: ['Fine, natural-looking hair strokes', 'Personalised brow mapping', 'Definition for sparse areas'],
    priceTitle: 'Price & duration',
    initial: 'Initial appointment: A$630 · Approximately two and a half hours',
    touchUp: 'Touch-up: A$150 · Approximately 1.5 hours.',
    beforeTitle: 'Before your appointment',
    before: [
      'Avoid waxing or plucking.',
      'Avoid retinol and AHA/BHA acids around the brows for 15 days.',
      'Avoid tanning and sunburn.',
      'Tell me about allergies and medications.',
      'Mention previous brow tattoos or recent skin treatments and cosmetic injections.',
      'If you use or recently used isotretinoin, contact me before booking for dermatological advice.',
      'Do not stop prescribed medication for your appointment.',
    ],
    afterTitle: 'Aftercare',
    after: [
      'Gently cleanse one hour after treatment.',
      'Apply a very thin layer of the recommended aftercare cream.',
      'Do not pick or scratch.',
      'Avoid brow makeup for 14 days.',
      'Avoid strenuous exercise and heavy sweating for 2–5 days.',
      'Wait longer if the area remains sensitive.',
      'Avoid swimming, soaking and saunas until healed.',
      'Seek medical advice if redness, swelling or pain worsens, or if you notice discharge or fever.',
    ],
    faqTitle: 'FAQs',
    faqs: [
      { q: 'How long do Nano Strokes last?', a: 'Results typically last around 12 months and gradually fade over time. Longevity varies with skin type, lifestyle and aftercare. I assess your brows before recommending a refresh.' },
      { q: 'Will my brows look darker at first?', a: 'Yes. They may initially look darker and more defined. Colour changes and some flaking can occur during healing, so allow your skin to heal before judging the result.' },
      { q: 'Can I wear makeup or exercise afterwards?', a: 'Avoid brow makeup for 14 days and strenuous exercise or heavy sweating for 2–5 days. Allow longer if the area remains sensitive.' },
      { q: 'Can I book if I have an old brow tattoo?', a: 'Please send clear photos before booking so I can assess the existing pigment and discuss your options.' },
      { q: 'Will I need a touch-up?', a: 'A touch-up may help refine pigment retention and brow definition after healing.' },
    ],
    book: 'Book now', contact: 'Questions? WhatsApp', note: '',
  },
  pt: {
    aboutTitle: 'Sobre este tratamento',
    about: 'Nano Strokes é uma técnica manual de microblading que cria traços delicados com aparência natural. Usando a ferramenta manual Tebori, sigo a direção dos pelos naturais para preencher falhas e criar um formato que valorize seus traços.',
    suitabilityTitle: 'Este tratamento é indicado para mim?',
    suitability: 'Para quem deseja maior definição sem perder o efeito natural de fios. Avalio sua pele, sobrancelhas e qualquer tatuagem anterior antes de recomendar a técnica mais adequada.',
    benefitsTitle: 'Benefícios',
    benefits: ['Traços finos com aparência natural', 'Mapeamento personalizado das sobrancelhas', 'Mais definição em áreas com falhas'],
    priceTitle: 'Preço e duração',
    initial: 'Sessão inicial: A$630 · Aproximadamente duas horas e meia',
    touchUp: 'Retoque: A$150 · Aproximadamente 1,5 hora.',
    beforeTitle: 'Antes do atendimento',
    before: [
      'Evite depilar ou retirar os pelos com pinça.',
      'Evite retinol e ácidos esfoliantes, incluindo AHA/BHA, na região por 15 dias.',
      'Evite bronzeamento e queimaduras solares.',
      'Informe sobre alergias e medicamentos.',
      'Avise sobre tatuagens anteriores, tratamentos de pele e injeções estéticas recentes.',
      'Usa ou usou isotretinoína recentemente? Consulte o estúdio antes de agendar para orientação dermatológica.',
      'Não interrompa medicamentos prescritos para o atendimento.',
    ],
    afterTitle: 'Cuidados após o atendimento',
    after: [
      'Limpe delicadamente uma hora após o procedimento.',
      'Aplique uma camada bem fina do creme de cuidados recomendado.',
      'Não cutuque nem coce.',
      'Evite maquiagem nas sobrancelhas por 14 dias.',
      'Evite exercícios intensos e suor excessivo por 2–5 dias.',
      'Espere mais se a região continuar sensível.',
      'Evite piscinas, imersão em água e saunas até cicatrizar.',
      'Procure orientação médica se a vermelhidão, o inchaço ou a dor piorarem, ou se houver secreção ou febre.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Quanto tempo duram os Nano Strokes?', a: 'O resultado costuma durar cerca de 12 meses e clareia gradualmente. A duração varia conforme a pele, hábitos e cuidados. Avalio suas sobrancelhas antes de indicar uma renovação.' },
      { q: 'As sobrancelhas ficam mais escuras no início?', a: 'Sim. Podem parecer mais escuras e definidas no início. Durante a cicatrização, a cor muda e pode ocorrer descamação; espere a pele cicatrizar antes de avaliar o resultado.' },
      { q: 'Posso usar maquiagem ou me exercitar?', a: 'Evite maquiagem nas sobrancelhas por 14 dias e exercícios intensos ou suor excessivo por 2–5 dias. Espere mais se a região estiver sensível.' },
      { q: 'Posso agendar se já tenho tatuagem na sobrancelha?', a: 'Envie fotos nítidas antes de agendar para que eu avalie o pigmento existente e converse sobre suas opções.' },
      { q: 'Vou precisar de retoque?', a: 'O retoque pode ajudar a aperfeiçoar a retenção do pigmento e a definição após a cicatrização.' },
    ],
    book: 'Agendar agora', contact: 'Dúvidas? WhatsApp', note: '',
  },
  es: {
    aboutTitle: 'Sobre este tratamiento',
    about: 'Nano Strokes es una técnica manual de microblading que crea trazos delicados con aspecto natural. Con una herramienta manual Tebori, sigo la dirección natural del vello para rellenar zonas despobladas y crear una forma que favorezca tus rasgos.',
    suitabilityTitle: '¿Es adecuado para mí?',
    suitability: 'Para quienes desean mayor definición manteniendo el aspecto natural de los trazos. Evalúo tu piel, cejas y cualquier tatuaje anterior antes de recomendar la técnica adecuada.',
    benefitsTitle: 'Beneficios',
    benefits: ['Trazos finos de aspecto natural', 'Diseño personalizado de cejas', 'Mayor definición en zonas despobladas'],
    priceTitle: 'Precio y duración',
    initial: 'Sesión inicial: A$630 · Aproximadamente duas horas e meia',
    touchUp: 'Retoque: A$150 · Aproximadamente 1,5 horas.',
    beforeTitle: 'Antes de la cita',
    before: [
      'Evita la depilación con cera o pinzas.',
      'Evita retinol y ácidos exfoliantes, incluidos AHA/BHA, alrededor de las cejas durante 15 días.',
      'Evita el bronceado y las quemaduras solares.',
      'Informa sobre alergias y medicamentos.',
      'Menciona tatuajes previos, tratamientos de piel e inyecciones estéticas recientes.',
      'Si usas o has usado isotretinoína recientemente, consulta antes de reservar por orientación dermatológica.',
      'No suspendas medicamentos recetados para la cita.',
    ],
    afterTitle: 'Cuidados posteriores',
    after: [
      'Limpia suavemente una hora después del tratamiento.',
      'Aplica una capa muy fina de la crema de cuidado recomendada.',
      'No rasques ni arranques las costras.',
      'Evita maquillaje de cejas durante 14 días.',
      'Evita ejercicio intenso y sudor abundante durante 2–5 días.',
      'Espera más si la zona sigue sensible.',
      'Evita piscinas, inmersión en agua y saunas hasta que sane.',
      'Busca atención médica si empeoran el enrojecimiento, la hinchazón o el dolor, o si hay secreción o fiebre.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuánto duran los Nano Strokes?', a: 'Los resultados suelen durar unos 12 meses y se atenúan gradualmente. La duración varía según la piel, los hábitos y los cuidados. Evalúo tus cejas antes de recomendar un retoque de mantenimiento.' },
      { q: '¿Se verán más oscuras al principio?', a: 'Sí. Al principio pueden verse más oscuras y definidas. El color cambia y puede haber descamación durante la cicatrización; espera a que sane la piel antes de evaluar el resultado.' },
      { q: '¿Puedo maquillarme o hacer ejercicio después?', a: 'Evita maquillaje de cejas durante 14 días y ejercicio intenso o sudor abundante durante 2–5 días. Espera más si la zona sigue sensible.' },
      { q: '¿Puedo reservar si tengo un tatuaje anterior en las cejas?', a: 'Envíame fotos nítidas antes de reservar para evaluar el pigmento existente y comentar tus opciones.' },
      { q: '¿Necesitaré un retoque?', a: 'Un retoque puede ayudar a perfeccionar la retención del pigmento y la definición después de sanar.' },
    ],
    book: 'Reservar ahora', contact: '¿Dudas? WhatsApp', note: '',
  },
};

export const nanoStrokesCopy = copy;
const shadowCopy: Record<Language, NanoText> = {
  en: {
    ...copy.en,
    about: 'Shadow Brows gives your brows a soft, powder-like finish. I personalise the shape and colour to complement your features and preferences.',
    suitability: 'I recommend this treatment for clients who prefer softly shaded brows with added definition. Before treatment, I assess your skin, any existing brow pigment and your brow shape.',
    benefits: ['Soft, powder-style finish', 'Personalised brow shape and colour', 'Defined brows'],
    initial: copy.en.initial,
    // Nano Strokes and Shadow Brows share the same approved touch-up price and duration.
    // The exact interval still requires confirmation from the studio.
    touchUp: copy.en.touchUp,
    note: '',
    faqs: [
      { q: 'Will the colour look darker at first?', a: 'Yes. Colour can look stronger initially and soften as the brows heal.' },
      { q: 'What if I have previous brow tattooing?', a: 'Please send photos for assessment before booking.' },
      { q: 'What is the difference between Shadow Brows and Nano Strokes?', a: 'Shadow Brows creates a soft, shaded effect similar to brow powder. My Nano Strokes technique uses a Tebori hand tool to create individual hair-like strokes.' },
      { q: 'Will my brows look too bold?', a: 'Shadow Brows can be soft and subtle. I personalise the shape, colour and shading intensity to suit your features and preferred look.' },
      { q: 'How do you choose the shape and colour?', a: 'I assess your natural brows and facial features, then discuss the shape and colour with you before treatment.' },
    ],
  },
  pt: {
    ...copy.pt,
    about: 'Shadow Brows proporciona às sobrancelhas um acabamento suave, semelhante ao de um pó. Personalizo o formato e a cor para valorizar seus traços e preferências.',
    suitability: 'Recomendo este tratamento para quem prefere sobrancelhas suavemente sombreadas e mais definidas. Antes do procedimento, avalio sua pele, qualquer pigmento existente e o formato das suas sobrancelhas.',
    benefits: ['Acabamento sombreado suave', 'Formato e cor personalizados', 'Sobrancelhas definidas'],
    initial: copy.pt.initial,
    touchUp: copy.pt.touchUp,
    note: '',
    faqs: [
      { q: 'A cor fica mais escura no início?', a: 'Sim. A cor pode ficar mais intensa inicialmente e suavizar durante a cicatrização.' },
      { q: 'E se já tenho tatuagem nas sobrancelhas?', a: 'Envie fotos para avaliação antes de agendar.' },
      { q: 'Qual é a diferença entre Shadow Brows e Nano Strokes?', a: 'Shadow Brows cria um efeito sombreado suave, semelhante ao de um pó para sobrancelhas. A técnica Nano Strokes utiliza uma ferramenta manual Tebori para criar traços individuais que imitam fios.' },
      { q: 'Minhas sobrancelhas ficarão muito marcadas?', a: 'O resultado pode ser suave e discreto. Personalizo o formato, a cor e a intensidade do sombreado conforme seus traços e preferências.' },
      { q: 'Como você escolhe o formato e a cor?', a: 'Avalio suas sobrancelhas naturais e seus traços faciais e converso com você sobre o formato e a cor antes do procedimento.' },
    ],
  },
  es: {
    ...copy.es,
    about: 'Shadow Brows da a las cejas un acabado suave, similar al maquillaje en polvo. Personalizo la forma y el color para complementar tus rasgos y preferencias.',
    suitability: 'Recomiendo este tratamiento a quienes prefieren cejas suavemente sombreadas con mayor definición. Antes del tratamiento, evalúo tu piel, cualquier pigmento existente y la forma de tus cejas.',
    benefits: ['Acabado sombreado suave', 'Forma y color personalizados', 'Cejas definidas'],
    initial: copy.es.initial,
    touchUp: copy.es.touchUp,
    note: '',
    faqs: [
      { q: '¿El color se ve más oscuro al principio?', a: 'Sí. El color puede verse más intenso al principio y suavizarse durante la cicatrización.' },
      { q: '¿Y si ya tengo un tatuaje en las cejas?', a: 'Envíame fotos para una evaluación antes de reservar.' },
      { q: '¿Cuál es la diferencia entre Shadow Brows y Nano Strokes?', a: 'Shadow Brows crea un efecto sombreado suave, similar al maquillaje en polvo para cejas. Mi técnica Nano Strokes utiliza una herramienta manual Tebori para crear trazos individuales que parecen vellos.' },
      { q: '¿Mis cejas quedarán demasiado marcadas?', a: 'Shadow Brows puede ser suave y sutil. Personalizo la forma, el color y la intensidad del sombreado según tus rasgos y preferencias.' },
      { q: '¿Cómo eliges la forma y el color?', a: 'Evalúo tus cejas naturales y rasgos faciales, y hablamos sobre la forma y el color antes del tratamiento.' },
    ],
  },
};
const section = 'rounded-2xl bg-white border border-[#e8d6d5] p-5 sm:p-7 shadow-sm';
const heading = 'font-raleway text-xl sm:text-2xl font-semibold text-[#5b3239]';
export const NanoStrokesContent: React.FC<{language: Language; media?: React.ReactNode; showPrice?: boolean; showBooking?: boolean; variant?: 'nano-strokes' | 'shadow-brows'}> = ({
  language, media, showPrice = true, showBooking = true, variant = 'nano-strokes',
}) => {
  const t = variant === 'shadow-brows' ? shadowCopy[language] : copy[language];
  return <div data-floating-clearance className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-4 sm:space-y-6">
    {showPrice && <section className="rounded-2xl bg-[#f3d9d0] border border-[#e8c5c8] p-5 sm:p-7">
      <h2 className={heading}>{t.priceTitle}</h2>
      <p className="flex gap-2 items-start font-montserrat text-base text-[#402d35] font-semibold mt-3"><Clock3 className="w-4 h-4 mt-0.5 shrink-0"/>{t.initial}</p>
      <p className="font-montserrat text-base text-[#402d35] mt-2">{t.touchUp}</p>
    </section>}
    <section className={section}>
      <h2 className={heading}>{t.aboutTitle}</h2>
      <p className="font-montserrat text-base text-[#34252c] leading-relaxed mt-3">{t.about}</p>
    </section>
    <section className={section}>
      <h2 className={heading}>{t.suitabilityTitle}</h2>
      <p className="font-montserrat text-base text-[#34252c] leading-relaxed mt-3">{t.suitability}</p>
    </section>
    <section className={section}>
      <h2 className={heading}>{t.benefitsTitle}</h2>
      <ul className="grid gap-2 sm:grid-cols-3 mt-4">
        {t.benefits.map(text => <li key={text} className="flex items-start gap-2 text-base text-[#34252c] font-montserrat"><CheckCircle2 className="w-4 h-4 shrink-0 text-[#9a5967] mt-0.5"/>{text}</li>)}
      </ul>
    </section>

    {media}
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
      <section className={section}>
        <h2 className={heading}>{t.beforeTitle}</h2>
        <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-[#803f55]">{t.before.map(item => <li key={item} className="font-montserrat text-base text-[#34252c] leading-relaxed">{item}</li>)}</ul>
      </section>
      <section className={section}>
        <h2 className={heading}>{t.afterTitle}</h2>
        <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-[#803f55]">{t.after.map(item => <li key={item} className="font-montserrat text-base text-[#34252c] leading-relaxed">{item}</li>)}</ul>
      </section>
    </div>
    <section className={section}>
      <h2 className={heading}>{t.faqTitle}</h2>
      <div className="space-y-2 mt-4">{t.faqs.map((f,i)=><details key={f.q} className="rounded-xl border border-[#e8d6d5] px-4 py-3 bg-[#fffaf9]" open={i===0}>
        <summary className="font-montserrat text-base font-bold text-[#402d35] cursor-pointer">{f.q}</summary>
        <p className="font-montserrat text-base text-[#34252c] leading-relaxed mt-3">{f.a}</p>
      </details>)}</div>
    </section>
    {showBooking && <div className="flex flex-wrap gap-3 items-center">
      <a href={getServiceBookingUrl(variant)} className="inline-flex gap-2 items-center justify-center bg-[#5b3239] text-white rounded-full px-6 py-3 text-xs font-bold hover:bg-[#7a4753]"><CalendarDays className="w-4 h-4"/>{t.book}</a>
      <a href="https://wa.me/61402148437" target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center rounded-full border border-[#9a5967]/50 text-[#5b3239] px-5 py-3 text-xs font-semibold"><MessageCircle className="w-4 h-4"/>{t.contact}</a>
      {t.note && <span className="font-montserrat text-xs text-[#58414a]">{t.note}</span>}
    </div>}
  </div>;
};
