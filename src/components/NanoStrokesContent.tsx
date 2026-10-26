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
    initial: 'Initial appointment: A$630 · Approximately 2.5 hours',
    touchUp: 'Touch-up from 28 to 45 days: A$150 · Approximately 1 hour, 30 minutes, charged separately.',
    beforeTitle: 'Before',
    before: [
      'Avoid waxing or plucking.',
      'Avoid retinol and exfoliating acids, including AHA/BHA, around the brows for 15 days.',
      'Avoid tanning and sunburn.',
      'Tell me about allergies, medications, previous brow tattooing and recent skin treatments or cosmetic injections.',
      'Taking or recently taken isotretinoin (Roaccutane/Accutane)? Contact me before booking; treatment may need to be postponed pending dermatological advice.',
      'Do not stop prescribed medication for your appointment.',
    ],
    afterTitle: 'After',
    after: [
      'Gently cleanse one hour after treatment.',
      'Apply a very thin layer of the recommended aftercare cream.',
      'Do not pick or scratch.',
      'Avoid brow makeup for 14 days.',
      'Avoid strenuous exercise and heavy sweating for 2–5 days; allow longer if still sensitive.',
      'No swimming, soaking or saunas until healed.',
      'Seek medical advice for worsening redness, swelling, pain, discharge or fever.',
    ],
    faqTitle: 'FAQs',
    faqs: [
      { q: 'How long do Nano Strokes last?', a: 'Results typically last around 12 months and gradually fade over time. Longevity varies with skin type, lifestyle and aftercare. I assess your brows before recommending a refresh.' },
      { q: 'Will my brows look darker at first?', a: 'Yes. They may initially look darker and more defined. Colour changes and some flaking can occur during healing, so allow your skin to heal before judging the result.' },
      { q: 'Can I wear makeup or exercise afterwards?', a: 'Avoid brow makeup for 14 days and strenuous exercise or heavy sweating for 2–5 days. Allow longer if the area remains sensitive.' },
      { q: 'Can I book if I have an old brow tattoo?', a: 'Please send clear photos before booking so I can assess the existing pigment and discuss your options.' },
      { q: 'Will I need a touch-up?', a: 'The touch-up is part of the cosmetic tattooing process. Between 28 and 45 days, I assess how your skin has retained the pigment and refine areas that need more colour or definition. The appointment takes approximately 1 hour, 30 minutes and costs A$150, charged separately.' },
    ],
    book: 'Book now', contact: 'Questions? WhatsApp', note: 'Prices and appointment availability are confirmed on Timely.',
  },
  pt: {
    aboutTitle: 'Sobre este tratamento',
    about: 'Nano Strokes é uma técnica manual de microblading que cria traços delicados com aparência natural. Usando a ferramenta manual Tebori, sigo a direção dos pelos naturais para preencher falhas e criar um formato que valorize seus traços.',
    suitabilityTitle: 'Este tratamento é indicado para mim?',
    suitability: 'Para quem deseja maior definição sem perder o efeito natural de fios. Avalio sua pele, sobrancelhas e qualquer tatuagem anterior antes de recomendar a técnica mais adequada.',
    benefitsTitle: 'Benefícios',
    benefits: ['Traços finos com aparência natural', 'Mapeamento personalizado das sobrancelhas', 'Mais definição em áreas com falhas'],
    priceTitle: 'Preço e duração',
    initial: 'Sessão inicial: A$630 · Aproximadamente 2,5 horas',
    touchUp: 'Retoque entre 28 e 45 dias: A$150 · Aproximadamente 1h30, cobrado separadamente.',
    beforeTitle: 'Antes',
    before: [
      'Evite depilar ou retirar os pelos com pinça.',
      'Evite retinol e ácidos esfoliantes, incluindo AHA/BHA, na região por 15 dias.',
      'Evite bronzeamento e queimaduras solares.',
      'Informe sobre alergias, medicamentos, tatuagens anteriores e tratamentos de pele ou injeções estéticas recentes.',
      'Usa ou usou recentemente isotretinoína (Roaccutane/Accutane)? Entre em contato antes de agendar; o tratamento poderá precisar ser adiado após orientação dermatológica.',
      'Não interrompa medicamentos prescritos para o atendimento.',
    ],
    afterTitle: 'Depois',
    after: [
      'Limpe delicadamente uma hora após o procedimento.',
      'Aplique uma camada bem fina do creme de cuidados recomendado.',
      'Não cutuque nem coce.',
      'Evite maquiagem nas sobrancelhas por 14 dias.',
      'Evite exercícios intensos e suor excessivo por 2–5 dias; espere mais se a região continuar sensível.',
      'Não nade, não deixe a área de molho e evite saunas até cicatrizar.',
      'Procure orientação médica se houver piora da vermelhidão, inchaço, dor, secreção ou febre.',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Quanto tempo duram os Nano Strokes?', a: 'O resultado costuma durar cerca de 12 meses e clareia gradualmente. A duração varia conforme a pele, hábitos e cuidados. Avalio suas sobrancelhas antes de indicar uma renovação.' },
      { q: 'As sobrancelhas ficam mais escuras no início?', a: 'Sim. Podem parecer mais escuras e definidas no início. Durante a cicatrização, a cor muda e pode ocorrer descamação; espere a pele cicatrizar antes de avaliar o resultado.' },
      { q: 'Posso usar maquiagem ou me exercitar?', a: 'Evite maquiagem nas sobrancelhas por 14 dias e exercícios intensos ou suor excessivo por 2–5 dias. Espere mais se a região estiver sensível.' },
      { q: 'Posso agendar se já tenho tatuagem na sobrancelha?', a: 'Envie fotos nítidas antes de agendar para que eu avalie o pigmento existente e converse sobre suas opções.' },
      { q: 'Vou precisar de retoque?', a: 'O retoque faz parte do processo. Entre 28 e 45 dias, avalio a retenção do pigmento e refino as áreas que precisam de cor ou definição. A sessão dura aproximadamente 1h30 e custa A$150, cobrado separadamente.' },
    ],
    book: 'Agendar agora', contact: 'Dúvidas? WhatsApp', note: 'Os preços e horários devem ser confirmados no Timely.',
  },
  es: {
    aboutTitle: 'Sobre este tratamiento',
    about: 'Nano Strokes es una técnica manual de microblading que crea trazos delicados con aspecto natural. Con una herramienta manual Tebori, sigo la dirección natural del vello para rellenar zonas despobladas y crear una forma que favorezca tus rasgos.',
    suitabilityTitle: '¿Es adecuado para mí?',
    suitability: 'Para quienes desean mayor definición manteniendo el aspecto natural de los trazos. Evalúo tu piel, cejas y cualquier tatuaje anterior antes de recomendar la técnica adecuada.',
    benefitsTitle: 'Beneficios',
    benefits: ['Trazos finos de aspecto natural', 'Diseño personalizado de cejas', 'Mayor definición en zonas despobladas'],
    priceTitle: 'Precio y duración',
    initial: 'Sesión inicial: A$630 · Aproximadamente 2,5 horas',
    touchUp: 'Retoque entre 28 y 45 días: A$150 · Aproximadamente 1 hora y 30 minutos, cobrado por separado.',
    beforeTitle: 'Antes',
    before: [
      'Evita la depilación con cera o pinzas.',
      'Evita retinol y ácidos exfoliantes, incluidos AHA/BHA, alrededor de las cejas durante 15 días.',
      'Evita el bronceado y las quemaduras solares.',
      'Infórmame sobre alergias, medicamentos, tatuajes previos y tratamientos de piel o inyecciones estéticas recientes.',
      '¿Tomas o has tomado recientemente isotretinoína (Roaccutane/Accutane)? Contáctame antes de reservar; puede ser necesario posponer el tratamiento tras consultar a dermatología.',
      'No suspendas medicamentos recetados para la cita.',
    ],
    afterTitle: 'Después',
    after: [
      'Limpia suavemente una hora después del tratamiento.',
      'Aplica una capa muy fina de la crema de cuidado recomendada.',
      'No rasques ni arranques las costras.',
      'Evita maquillaje de cejas durante 14 días.',
      'Evita ejercicio intenso y sudor excesivo durante 2–5 días; espera más si la zona está sensible.',
      'No nades, no sumerjas la zona y evita saunas hasta sanar.',
      'Busca atención médica si empeoran el enrojecimiento, la hinchazón, el dolor, las secreciones o si aparece fiebre.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuánto duran los Nano Strokes?', a: 'Los resultados suelen durar unos 12 meses y se atenúan gradualmente. La duración varía según la piel, los hábitos y los cuidados. Evalúo tus cejas antes de recomendar un retoque de mantenimiento.' },
      { q: '¿Se verán más oscuras al principio?', a: 'Sí. Al principio pueden verse más oscuras y definidas. El color cambia y puede haber descamación durante la cicatrización; espera a que sane la piel antes de evaluar el resultado.' },
      { q: '¿Puedo maquillarme o hacer ejercicio después?', a: 'Evita maquillaje de cejas durante 14 días y ejercicio intenso o sudor abundante durante 2–5 días. Espera más si la zona sigue sensible.' },
      { q: '¿Puedo reservar si tengo un tatuaje anterior en las cejas?', a: 'Envíame fotos nítidas antes de reservar para evaluar el pigmento existente y comentar tus opciones.' },
      { q: '¿Necesitaré un retoque?', a: 'El retoque forma parte del proceso. Entre 28 y 45 días después, evalúo la retención del pigmento y perfecciono las zonas que necesitan más color o definición. La sesión dura aproximadamente 1 hora y 30 minutos y cuesta A$150, por separado.' },
    ],
    book: 'Reservar ahora', contact: '¿Dudas? WhatsApp', note: 'Los precios y la disponibilidad se confirman en Timely.',
  },
};

export const nanoStrokesCopy = copy;
const shadowCopy: Record<Language, NanoText> = {
 en: {...copy.en, about: 'Shadow Brows creates a soft, powder-style shaded brow effect. The shape and colour are tailored to your features and preferences.', suitability: 'For clients seeking softly shaded definition rather than individual hair strokes. I assess your skin, existing pigment and brow shape before treatment.', benefits: ['Soft, powder-style finish','Personalised brow shape and colour','Defined brows'], initial: 'Initial appointment: A$630 · Approximately 2.5 hours', touchUp: 'Please confirm Shadow Brows touch-up timing and price with the studio.', faqs: [{q:'Will the colour look darker at first?',a:'Yes. Colour can look stronger initially and soften as the brows heal.'},{q:'What if I have previous brow tattooing?',a:'Please send photos for assessment before booking.'}]},
 pt: {...copy.pt, about: 'Shadow Brows cria um efeito sombreado suave nas sobrancelhas, semelhante ao de maquiagem. O formato e a cor são personalizados.', suitability: 'Para quem prefere definição com efeito sombreado em vez de fios individuais. Avalio a pele e pigmentações anteriores antes do tratamento.', benefits: ['Acabamento sombreado suave','Formato e cor personalizados','Sobrancelhas definidas'], initial: 'Atendimento inicial: A$630 · Aproximadamente 2h30', touchUp: 'Confirme com o estúdio o prazo e o preço do retoque de Shadow Brows.', faqs: [{q:'A cor fica mais escura no início?',a:'Sim. A cor pode ficar mais intensa inicialmente e suavizar durante a cicatrização.'},{q:'E se já tenho tatuagem nas sobrancelhas?',a:'Envie fotos para avaliação antes de agendar.'}]},
 es: {...copy.es, about: 'Shadow Brows crea un efecto sombreado suave en las cejas, similar al maquillaje. La forma y el color se personalizan.', suitability: 'Para quienes prefieren definición sombreada en lugar de trazos individuales. Evalúo la piel y pigmentaciones previas antes del tratamiento.', benefits: ['Acabado sombreado suave','Forma y color personalizados','Cejas definidas'], initial: 'Cita inicial: A$630 · Aproximadamente 2 horas y 30 minutos', touchUp: 'Confirma con el estudio el plazo y el precio del retoque de Shadow Brows.', faqs: [{q:'¿El color se ve más oscuro al principio?',a:'Sí. El color puede verse más intenso al principio y suavizarse durante la cicatrización.'},{q:'¿Y si ya tengo tatuaje en las cejas?',a:'Envía fotos para una evaluación antes de reservar.'}]}
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
      <p className="flex gap-2 items-start font-montserrat text-sm text-[#5b3239] font-semibold mt-3"><Clock3 className="w-4 h-4 mt-0.5 shrink-0"/>{t.initial}</p>
      <p className="font-montserrat text-sm text-[#5b3239] mt-2">{t.touchUp}</p>
    </section>}
    <section className={section}>
      <h2 className={heading}>{t.aboutTitle}</h2>
      <p className="font-montserrat text-sm sm:text-base text-[#54464b] leading-relaxed mt-3">{t.about}</p>
    </section>
    <section className={section}>
      <h2 className={heading}>{t.suitabilityTitle}</h2>
      <p className="font-montserrat text-sm sm:text-base text-[#54464b] leading-relaxed mt-3">{t.suitability}</p>
    </section>
    <section className={section}>
      <h2 className={heading}>{t.benefitsTitle}</h2>
      <ul className="grid gap-2 sm:grid-cols-3 mt-4">
        {t.benefits.map(text => <li key={text} className="flex items-start gap-2 text-sm text-[#54464b] font-montserrat"><CheckCircle2 className="w-4 h-4 shrink-0 text-[#9a5967] mt-0.5"/>{text}</li>)}
      </ul>
    </section>

    {media}
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
      <section className={section}>
        <h2 className={heading}>{t.beforeTitle}</h2>
        <ul className="list-disc pl-5 mt-4 space-y-2">{t.before.map(item => <li key={item} className="font-montserrat text-sm text-[#54464b] leading-relaxed">{item}</li>)}</ul>
      </section>
      <section className={section}>
        <h2 className={heading}>{t.afterTitle}</h2>
        <ul className="list-disc pl-5 mt-4 space-y-2">{t.after.map(item => <li key={item} className="font-montserrat text-sm text-[#54464b] leading-relaxed">{item}</li>)}</ul>
      </section>
    </div>
    <section className={section}>
      <h2 className={heading}>{t.faqTitle}</h2>
      <div className="space-y-2 mt-4">{t.faqs.map((f,i)=><details key={f.q} className="rounded-xl border border-[#e8d6d5] px-4 py-3 bg-[#fffaf9]" open={i===0}>
        <summary className="font-montserrat text-sm font-semibold text-[#5b3239] cursor-pointer">{f.q}</summary>
        <p className="font-montserrat text-sm text-[#55464c] leading-relaxed mt-3">{f.a}</p>
      </details>)}</div>
    </section>
    {showBooking && <div className="flex flex-wrap gap-3 items-center">
      <a href={getServiceBookingUrl(variant)} className="inline-flex gap-2 items-center justify-center bg-[#5b3239] text-white rounded-full px-6 py-3 text-xs font-bold hover:bg-[#7a4753]"><CalendarDays className="w-4 h-4"/>{t.book}</a>
      <a href="https://wa.me/61402148437" target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center rounded-full border border-[#9a5967]/50 text-[#5b3239] px-5 py-3 text-xs font-semibold"><MessageCircle className="w-4 h-4"/>{t.contact}</a>
      <span className="font-montserrat text-xs text-[#846f75]">{t.note}</span>
    </div>}
  </div>;
};
