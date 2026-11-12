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
    about: 'Microblading is a cosmetic tattoo for the brows: pigment is placed just under the skin in fine strokes that imitate real hairs. Nano Strokes is my own microblading technique. I work by hand with a Tebori tool, drawing each stroke individually in the direction your natural hairs grow, so the result blends with your own brows instead of looking drawn on. Every appointment starts with brow mapping: we design the shape and choose the colour together before any pigment goes in.',
    suitabilityTitle: 'Is this treatment right for me?',
    suitability: 'Ideal if your brows are sparse, uneven, over-plucked or have gaps, and you want a natural hair-stroke look rather than a makeup finish. It suits most skin types, but very oily skin, large pores or an old brow tattoo can change how the strokes heal. I assess your skin and brows first and, if Shadow Brows will give you a better and longer-lasting result, I will tell you honestly.',
    benefitsTitle: 'Benefits',
    benefits: ['Fine, natural-looking hair strokes', 'Personalised brow mapping before any pigment', 'Fills gaps and sparse areas', 'No more filling in your brows every morning', 'Touch-up at 28–45 days to perfect the result'],
    priceTitle: 'Price & duration',
    initial: 'Initial appointment: A$630 · Approximately two and a half hours',
    touchUp: 'Touch-up (28–45 days later): A$150 · Approximately 1.5 hours.',
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
      { q: 'What is the difference between microblading and Nano Strokes?', a: 'Microblading is the cosmetic tattoo technique that creates hair-like strokes. Nano Strokes is my own way of doing microblading: fine, individual strokes made by hand with a Tebori tool and mapped to your natural hair direction.' },
      { q: 'How long do Nano Strokes last?', a: 'Results typically last around 12 months and fade gradually. Oily skin, sun exposure, skincare acids and how well you follow aftercare all affect longevity. Many clients book a colour refresh every 12–18 months.' },
      { q: 'Does it hurt?', a: 'Most clients describe it as a light scratching sensation and mild discomfort. I work gently, check in with you throughout and pause whenever you need.' },
      { q: 'How long does the appointment take?', a: 'Allow about two and a half hours. This includes consultation, brow mapping, choosing the colour and the treatment itself. The touch-up takes about 1.5 hours.' },
      { q: 'What does healing look like?', a: 'Days 1–3: brows look darker and bolder. Days 4–10: light flaking and itching (do not pick). Weeks 2–4: strokes can look patchy or faded while the skin settles, then the colour comes back softer. The final result is assessed at your touch-up.' },
      { q: 'Will I need a touch-up?', a: 'Yes, it is part of the process. Skin never holds all the pigment the first time, so at 28–45 days we fill any gaps, adjust the shape if needed and strengthen the strokes. The touch-up is A$150.' },
      { q: 'Microblading or Shadow Brows: which suits me?', a: 'Nano Strokes gives a hair-by-hair look and suits most normal to dry skin. Shadow Brows gives a soft powdered finish and usually lasts longer on oily skin. I recommend the best option for your skin at consultation.' },
      { q: 'Does it work on oily skin?', a: 'Fine strokes can soften or blur more quickly on very oily skin or large pores. I assess your skin first and may recommend Shadow Brows instead so you get a result that lasts.' },
      { q: 'Can I book if I have an old brow tattoo?', a: 'Please send clear photos before booking so I can assess the existing pigment and discuss your options.' },
      { q: 'Can I wear makeup or exercise afterwards?', a: 'Avoid brow makeup for 14 days and strenuous exercise or heavy sweating for 2–5 days. Allow longer if the area remains sensitive.' },
      { q: 'Where is the studio?', a: 'Bella Beauty Brazil is in Greenslopes, Brisbane Southside, a short drive from Coorparoo, Annerley, Stones Corner, Holland Park, Camp Hill, Tarragindi, Mount Gravatt, Carina, Moorooka and Woolloongabba.' },
    ],
    book: 'Book now', contact: 'Questions? WhatsApp', note: '',
  },
  pt: {
    aboutTitle: 'Sobre este tratamento',
    about: 'Microblading é uma tatuagem cosmética de sobrancelhas: o pigmento é colocado logo abaixo da pele em traços finos que imitam fios reais. Nano Strokes é a minha técnica própria de microblading. Trabalho à mão com a ferramenta Tebori, desenhando fio a fio na direção em que seus pelos naturais crescem, para que o resultado se misture às suas sobrancelhas em vez de parecer desenhado. Todo atendimento começa com o visagismo: definimos juntas o formato e a cor antes de aplicar qualquer pigmento.',
    suitabilityTitle: 'Este tratamento é indicado para mim?',
    suitability: 'Ideal para sobrancelhas ralas, desiguais, com falhas ou muito tiradas, para quem quer um efeito de fios natural e não um acabamento de maquiagem. Funciona na maioria dos tipos de pele, mas pele muito oleosa, poros dilatados ou tatuagem antiga podem mudar a cicatrização dos fios. Avalio sua pele e sobrancelhas antes e, se o Shadow Brows for durar mais e ficar melhor em você, eu digo com sinceridade.',
    benefitsTitle: 'Benefícios',
    benefits: ['Traços finos com aparência natural', 'Visagismo personalizado antes do pigmento', 'Preenche falhas e áreas ralas', 'Chega de desenhar a sobrancelha todo dia', 'Retoque entre 28 e 45 dias para aperfeiçoar o resultado'],
    priceTitle: 'Preço e duração',
    initial: 'Sessão inicial: A$630 · Aproximadamente duas horas e meia',
    touchUp: 'Retoque (entre 28 e 45 dias depois): A$150 · Aproximadamente 1,5 hora.',
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
      { q: 'Qual a diferença entre microblading e Nano Strokes?', a: 'Microblading é a técnica de tatuagem cosmética que cria traços parecidos com fios. Nano Strokes é a minha forma de fazer microblading: traços finos, um a um, feitos à mão com a ferramenta Tebori e desenhados na direção natural dos seus pelos.' },
      { q: 'Quanto tempo duram os Nano Strokes?', a: 'O resultado costuma durar cerca de 12 meses e clareia aos poucos. Pele oleosa, sol, ácidos no skincare e os cuidados pós influenciam a duração. Muitas clientes fazem uma renovação da cor a cada 12–18 meses.' },
      { q: 'Dói?', a: 'A maioria das clientes descreve como um leve arranhado e um desconforto suave. Trabalho com delicadeza, pergunto como você está durante todo o processo e paro sempre que precisar.' },
      { q: 'Quanto tempo dura o atendimento?', a: 'Reserve cerca de duas horas e meia. Isso inclui conversa, visagismo, escolha da cor e o procedimento. O retoque leva cerca de 1,5 hora.' },
      { q: 'Como é a cicatrização?', a: 'Dias 1–3: a sobrancelha fica mais escura e marcada. Dias 4–10: descamação leve e coceira (não arranque). Semanas 2–4: os fios podem parecer falhados ou claros enquanto a pele se acomoda, depois a cor volta mais suave. O resultado final é avaliado no retoque.' },
      { q: 'Vou precisar de retoque?', a: 'Sim, faz parte do processo. A pele nunca segura todo o pigmento na primeira vez, então entre 28 e 45 dias preenchemos falhas, ajustamos o formato se precisar e reforçamos os fios. O retoque custa A$150.' },
      { q: 'Microblading ou Shadow Brows: qual combina comigo?', a: 'Nano Strokes dá o efeito fio a fio e combina com a maioria das peles normais a secas. Shadow Brows dá um acabamento esfumado e costuma durar mais em pele oleosa. Indico a melhor opção para a sua pele na avaliação.' },
      { q: 'Funciona em pele oleosa?', a: 'Em pele muito oleosa ou com poros dilatados, os fios finos podem abrir ou suavizar mais rápido. Avalio sua pele antes e posso indicar o Shadow Brows para um resultado que dure.' },
      { q: 'Posso agendar se já tenho tatuagem na sobrancelha?', a: 'Envie fotos nítidas antes de agendar para que eu avalie o pigmento existente e converse sobre suas opções.' },
      { q: 'Posso usar maquiagem ou me exercitar?', a: 'Evite maquiagem nas sobrancelhas por 14 dias e exercícios intensos ou suor excessivo por 2–5 dias. Espere mais se a região estiver sensível.' },
      { q: 'Onde fica o estúdio?', a: 'A Bella Beauty Brazil fica em Greenslopes, na região Southside de Brisbane, perto de Coorparoo, Annerley, Stones Corner, Holland Park, Camp Hill, Tarragindi, Mount Gravatt, Carina, Moorooka e Woolloongabba.' },
    ],
    book: 'Agendar agora', contact: 'Dúvidas? WhatsApp', note: '',
  },
  es: {
    aboutTitle: 'Sobre este tratamiento',
    about: 'El microblading es un tatuaje cosmético de cejas: el pigmento se coloca justo debajo de la piel en trazos finos que imitan vellos reales. Nano Strokes es mi propia técnica de microblading. Trabajo a mano con una herramienta Tebori, dibujando cada trazo en la dirección en que crece tu vello natural, para que el resultado se integre con tus cejas en lugar de parecer dibujado. Cada cita empieza con el diseño de cejas: definimos juntas la forma y el color antes de aplicar cualquier pigmento.',
    suitabilityTitle: '¿Es adecuado para mí?',
    suitability: 'Ideal si tus cejas son escasas, desiguales, con huecos o muy depiladas, y buscas un efecto pelo a pelo natural en lugar de un acabado de maquillaje. Funciona en la mayoría de pieles, pero la piel muy grasa, los poros dilatados o un tatuaje antiguo pueden cambiar cómo cicatrizan los trazos. Evalúo tu piel y tus cejas primero y, si Shadow Brows te dará un resultado mejor y más duradero, te lo diré con sinceridad.',
    benefitsTitle: 'Beneficios',
    benefits: ['Trazos finos de aspecto natural', 'Diseño de cejas personalizado antes del pigmento', 'Rellena huecos y zonas despobladas', 'Olvídate de dibujar tus cejas cada mañana', 'Retoque entre 28 y 45 días para perfeccionar el resultado'],
    priceTitle: 'Precio y duración',
    initial: 'Sesión inicial: A$630 · Aproximadamente dos horas y media',
    touchUp: 'Retoque (entre 28 y 45 días después): A$150 · Aproximadamente 1,5 horas.',
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
      { q: '¿Cuál es la diferencia entre microblading y Nano Strokes?', a: 'El microblading es la técnica de tatuaje cosmético que crea trazos similares al vello. Nano Strokes es mi forma de hacer microblading: trazos finos, uno a uno, hechos a mano con una herramienta Tebori y dibujados en la dirección natural de tu vello.' },
      { q: '¿Cuánto duran los Nano Strokes?', a: 'Los resultados suelen durar unos 12 meses y se atenúan gradualmente. La piel grasa, el sol, los ácidos en el cuidado de la piel y los cuidados posteriores influyen en la duración. Muchas clientas hacen un repaso de color cada 12–18 meses.' },
      { q: '¿Duele?', a: 'La mayoría de las clientas lo describe como un leve rasguño y una molestia suave. Trabajo con delicadeza, te pregunto cómo estás durante todo el proceso y hago pausas cuando lo necesites.' },
      { q: '¿Cuánto dura la cita?', a: 'Calcula unas dos horas y media. Incluye la consulta, el diseño, la elección del color y el tratamiento. El retoque dura unas 1,5 horas.' },
      { q: '¿Cómo es la cicatrización?', a: 'Días 1–3: las cejas se ven más oscuras y marcadas. Días 4–10: descamación leve y picor (no arranques). Semanas 2–4: los trazos pueden verse irregulares o claros mientras la piel se asienta, luego el color vuelve más suave. El resultado final se evalúa en el retoque.' },
      { q: '¿Necesitaré un retoque?', a: 'Sí, forma parte del proceso. La piel nunca retiene todo el pigmento la primera vez, así que entre 28 y 45 días rellenamos huecos, ajustamos la forma si hace falta y reforzamos los trazos. El retoque cuesta A$150.' },
      { q: '¿Microblading o Shadow Brows: cuál me conviene?', a: 'Nano Strokes da un efecto pelo a pelo y va bien en la mayoría de pieles normales a secas. Shadow Brows da un acabado empolvado y suele durar más en piel grasa. Te recomiendo la mejor opción para tu piel en la consulta.' },
      { q: '¿Funciona en piel grasa?', a: 'En piel muy grasa o con poros dilatados, los trazos finos pueden difuminarse más rápido. Evalúo tu piel primero y puedo recomendarte Shadow Brows para un resultado duradero.' },
      { q: '¿Puedo reservar si tengo un tatuaje anterior en las cejas?', a: 'Envíame fotos nítidas antes de reservar para evaluar el pigmento existente y comentar tus opciones.' },
      { q: '¿Puedo maquillarme o hacer ejercicio después?', a: 'Evita maquillaje de cejas durante 14 días y ejercicio intenso o sudor abundante durante 2–5 días. Espera más si la zona sigue sensible.' },
      { q: '¿Dónde está el estudio?', a: 'Bella Beauty Brazil está en Greenslopes, en el Southside de Brisbane, cerca de Coorparoo, Annerley, Stones Corner, Holland Park, Camp Hill, Tarragindi, Mount Gravatt, Carina, Moorooka y Woolloongabba.' },
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
      { q: 'What is the difference between Shadow Brows and microblading (Nano Strokes)?', a: 'Shadow Brows creates a soft, shaded effect similar to brow powder. My Nano Strokes technique uses a Tebori hand tool to create individual hair-like strokes.' },
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
