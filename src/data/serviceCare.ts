import type { Language } from './siteData';

/**
 * Treatment-specific preparation, aftercare and FAQs shown on service pages
 * (and in the pre-rendered HTML). Written from the November 2026 site review
 * approved by Livia. Prices quoted here must match approvedServiceCatalog.ts.
 * Only include figures the studio has confirmed; otherwise ask the client to
 * message the studio.
 */
export interface ServiceCare {
  /** Replaces the generic "Who may this treatment suit?" paragraph. */
  suitability?: string;
  /** Replaces the generic "How is it different?" paragraph. */
  comparison?: string;
  before?: string[];
  after?: string[];
  faqs?: [string, string][];
}

type CareByLanguage = Record<Language, ServiceCare>;

const lashLiftCare: CareByLanguage = {
  en: {
    before: [
      'Arrive with clean lashes, with no mascara or eye makeup.',
      'Remove contact lenses before the treatment and bring your case.',
      'Avoid lash curlers and lash serums for a few days beforehand.',
      'Let me know about eye infections, allergies, recent eye surgery or if you are pregnant before booking.',
    ],
    after: [
      'Keep your lashes dry for the first 24–48 hours: no water, steam, sauna or swimming.',
      'Avoid mascara, eye makeup and oil-based products for 24–48 hours.',
      'Avoid rubbing your eyes or sleeping face-down.',
      'After that, brush your lashes daily and avoid waterproof mascara to help your lift last longer.',
    ],
    faqs: [
      ['How long does a lash lift last?', 'Around 6–8 weeks, following your natural lash cycle. Results last longer if you keep your lashes dry for the first 24–48 hours and brush them daily.'],
      ['Can I wear mascara afterwards?', 'Yes, after 24–48 hours. Most clients find they don’t need it. Avoid waterproof mascara, as removing it shortens the lift.'],
      ['Is it suitable if I wear contact lenses or have sensitive eyes?', 'Yes, in most cases. Remove your lenses before the treatment and bring your case. If you have very sensitive eyes, an eye infection or recent eye surgery, message me before booking.'],
      ['How often can I repeat it?', 'Every 6–8 weeks, once the lift has grown out. Repeating sooner can over-process the lashes.'],
      ['What’s the difference between a lash lift and extensions?', 'A lash lift curls your own lashes (with tint if you choose Lash Lift & Tint), with no added lashes and no infills. Extensions add individual lashes for more length and volume and need infills every 2–3 weeks.'],
    ],
  },
  pt: {
    before: [
      'Venha com os cílios limpos, sem rímel ou maquiagem nos olhos.',
      'Retire as lentes de contato antes do procedimento e traga o estojo.',
      'Evite curvex e séruns de cílios nos dias anteriores.',
      'Avise antes de agendar se tiver infecção nos olhos, alergias, cirurgia recente nos olhos ou se estiver grávida.',
    ],
    after: [
      'Mantenha os cílios secos nas primeiras 24–48 horas: sem água, vapor, sauna ou piscina.',
      'Evite rímel, maquiagem nos olhos e produtos oleosos por 24–48 horas.',
      'Evite coçar os olhos ou dormir de bruços.',
      'Depois disso, escove os cílios todos os dias e evite rímel à prova d’água para o lifting durar mais.',
    ],
    faqs: [
      ['Quanto tempo dura o lash lift?', 'Cerca de 6 a 8 semanas, acompanhando o ciclo natural dos cílios. O resultado dura mais se você mantiver os cílios secos nas primeiras 24–48 horas e escová-los todos os dias.'],
      ['Posso usar rímel depois?', 'Sim, depois de 24–48 horas. A maioria das clientes nem sente necessidade. Evite rímel à prova d’água, porque a remoção encurta o efeito.'],
      ['Posso fazer se uso lentes de contato ou tenho olhos sensíveis?', 'Na maioria dos casos, sim. Retire as lentes antes do procedimento e traga o estojo. Se tiver olhos muito sensíveis, infecção ou cirurgia recente nos olhos, me chame antes de agendar.'],
      ['De quanto em quanto tempo posso repetir?', 'A cada 6 a 8 semanas, quando o efeito já tiver crescido. Repetir antes pode ressecar os cílios.'],
      ['Qual a diferença entre lash lift e extensão?', 'O lash lift curva os seus próprios cílios (e tinge, no Lash Lift & Tint), sem fios adicionais e sem manutenção. A extensão adiciona fios para mais comprimento e volume e precisa de manutenção a cada 2–3 semanas.'],
    ],
  },
  es: {
    before: [
      'Ven con las pestañas limpias, sin rímel ni maquillaje de ojos.',
      'Quítate los lentes de contacto antes del tratamiento y trae el estuche.',
      'Evita el rizador y los sérums de pestañas los días anteriores.',
      'Avísame antes de reservar si tienes una infección ocular, alergias, una cirugía ocular reciente o si estás embarazada.',
    ],
    after: [
      'Mantén las pestañas secas las primeras 24–48 horas: sin agua, vapor, sauna ni piscina.',
      'Evita el rímel, el maquillaje de ojos y los productos aceitosos durante 24–48 horas.',
      'Evita frotarte los ojos o dormir boca abajo.',
      'Después, peina tus pestañas a diario y evita el rímel a prueba de agua para que el lifting dure más.',
    ],
    faqs: [
      ['¿Cuánto dura el lifting de pestañas?', 'Unas 6 a 8 semanas, según el ciclo natural de tus pestañas. Dura más si las mantienes secas las primeras 24–48 horas y las peinas a diario.'],
      ['¿Puedo usar rímel después?', 'Sí, después de 24–48 horas. La mayoría de las clientas no lo necesitan. Evita el rímel a prueba de agua, ya que al quitarlo se acorta el efecto.'],
      ['¿Es adecuado si uso lentes de contacto o tengo ojos sensibles?', 'Sí, en la mayoría de los casos. Quítate los lentes antes del tratamiento y trae el estuche. Si tienes ojos muy sensibles, una infección o una cirugía ocular reciente, escríbeme antes de reservar.'],
      ['¿Cada cuánto puedo repetirlo?', 'Cada 6 a 8 semanas, cuando el efecto haya crecido. Repetirlo antes puede dañar las pestañas.'],
      ['¿Qué diferencia hay entre lifting y extensiones?', 'El lifting riza tus propias pestañas (y las tiñe, en Lash Lift & Tint), sin pestañas añadidas ni mantenimiento. Las extensiones añaden pestañas para más largo y volumen y necesitan mantenimiento cada 2–3 semanas.'],
    ],
  },
};

const lashTintCare: CareByLanguage = {
  en: {
    before: [
      'Arrive with clean lashes, with no mascara or eye makeup.',
      'Remove contact lenses before the treatment.',
      'First time having a tint with us? A patch test is required at least 48 hours before your appointment. Message us on WhatsApp to arrange it.',
    ],
    after: [
      'Avoid oil-based cleansers and makeup removers around the eyes for 24 hours.',
      'Avoid rubbing your eyes on the day of your appointment.',
    ],
    faqs: [
      ['How long does a lash tint last?', 'Usually around 4–6 weeks, as your natural lashes shed and regrow.'],
      ['Can I combine it with a lash lift?', 'Yes. Lash Lift & Tint includes both in one appointment.'],
    ],
  },
  pt: {
    before: [
      'Venha com os cílios limpos, sem rímel ou maquiagem nos olhos.',
      'Retire as lentes de contato antes do procedimento.',
      'É a primeira vez que faz tintura conosco? É necessário um teste de sensibilidade pelo menos 48 horas antes. Fale conosco pelo WhatsApp para agendar.',
    ],
    after: [
      'Evite demaquilantes e produtos oleosos na região dos olhos por 24 horas.',
      'Evite coçar os olhos no dia do atendimento.',
    ],
    faqs: [
      ['Quanto tempo dura a tintura de cílios?', 'Normalmente de 4 a 6 semanas, conforme os cílios naturais caem e crescem.'],
      ['Posso fazer junto com o lash lift?', 'Sim. O Lash Lift & Tint inclui os dois no mesmo atendimento.'],
    ],
  },
  es: {
    before: [
      'Ven con las pestañas limpias, sin rímel ni maquillaje de ojos.',
      'Quítate los lentes de contacto antes del tratamiento.',
      '¿Es tu primer tinte con nosotras? Se necesita una prueba de sensibilidad al menos 48 horas antes. Escríbenos por WhatsApp para coordinarla.',
    ],
    after: [
      'Evita desmaquillantes y productos aceitosos en la zona de los ojos durante 24 horas.',
      'Evita frotarte los ojos el día de la cita.',
    ],
    faqs: [
      ['¿Cuánto dura el tinte de pestañas?', 'Normalmente de 4 a 6 semanas, a medida que las pestañas naturales se renuevan.'],
      ['¿Puedo combinarlo con un lifting?', 'Sí. Lash Lift & Tint incluye ambos en la misma cita.'],
    ],
  },
};

const extensionsBase = {
  en: {
    before: [
      'Arrive with clean lashes, with no mascara or eye makeup.',
      'Remove contact lenses before the treatment.',
      'Avoid lash curlers and oil-based eye products for 24 hours beforehand.',
      'Let me know about allergies, eye sensitivity or recent eye treatments.',
    ],
    after: [
      'Keep your lashes dry for the first 24 hours: no water, steam or sauna.',
      'Avoid oil-based cleansers and makeup removers around the eyes.',
      'Brush your lashes gently every day and don’t pull or rub them.',
      'Book an infill every 2–3 weeks to keep your set full.',
    ],
  },
  pt: {
    before: [
      'Venha com os cílios limpos, sem rímel ou maquiagem nos olhos.',
      'Retire as lentes de contato antes do procedimento.',
      'Evite curvex e produtos oleosos nos olhos nas 24 horas anteriores.',
      'Avise sobre alergias, sensibilidade nos olhos ou procedimentos recentes na região.',
    ],
    after: [
      'Mantenha os cílios secos nas primeiras 24 horas: sem água, vapor ou sauna.',
      'Evite demaquilantes e produtos oleosos na região dos olhos.',
      'Escove os cílios com delicadeza todos os dias e não puxe nem coce.',
      'Agende a manutenção a cada 2–3 semanas para manter o volume.',
    ],
  },
  es: {
    before: [
      'Ven con las pestañas limpias, sin rímel ni maquillaje de ojos.',
      'Quítate los lentes de contacto antes del tratamiento.',
      'Evita el rizador y los productos aceitosos en los ojos durante las 24 horas previas.',
      'Avísame sobre alergias, sensibilidad ocular o tratamientos recientes en la zona.',
    ],
    after: [
      'Mantén las pestañas secas las primeras 24 horas: sin agua, vapor ni sauna.',
      'Evita desmaquillantes y productos aceitosos en la zona de los ojos.',
      'Peina tus pestañas con suavidad a diario y no las tires ni las frotes.',
      'Reserva un mantenimiento cada 2–3 semanas para mantener el volumen.',
    ],
  },
} as const;

const extensionFaqs: Record<Language, [string, string][]> = {
  en: [
    ['What’s the difference between Classic, Hybrid and Wet Look?', 'Classic places one extension on each natural lash for a natural, mascara-like look. Hybrid mixes classic lashes with light fans for more texture and fullness. Wet Look creates a darker, denser, defined finish.'],
    ['How long do lash extensions last?', 'Extensions shed with your natural lashes, which renew every few weeks. With good aftercare, a set looks full for about 2–3 weeks, then an infill keeps it going.'],
    ['How often do I need an infill, and how much does it cost?', 'Every 2–3 weeks. Classic infills are A$85 at 2 weeks or A$105 at 3 weeks; Hybrid infills are A$120 at 2 weeks or A$150 at 3 weeks. Infills need at least 50% of the set at 2 weeks or 40% at 3 weeks; otherwise extra time and charges may apply. For Wet Look infills, message us on WhatsApp.'],
    ['Will extensions damage my natural lashes?', 'Not when they’re applied correctly. Each extension is sized to your natural lash and isolated so lashes grow freely. Pulling them off is what causes damage, so always book a professional removal.'],
    ['Can I wear mascara with extensions?', 'It isn’t needed and it’s best avoided, as it clumps the lashes and is hard to remove without oil. If you must, use a water-based mascara on the tips only.'],
    ['What if I have a reaction?', 'Mild redness for a few hours can happen. If you notice swelling or itching, contact me straight away; I’ll remove the set if needed.'],
  ],
  pt: [
    ['Qual a diferença entre Classic, Hybrid e Wet Look?', 'O Classic aplica uma extensão em cada cílio natural, com efeito natural, parecido com rímel. O Hybrid mistura fios clássicos com leques leves para mais textura e volume. O Wet Look cria um acabamento mais escuro, denso e marcado.'],
    ['Quanto tempo dura a extensão de cílios?', 'As extensões caem junto com os cílios naturais, que se renovam a cada poucas semanas. Com os cuidados certos, o conjunto fica cheio por cerca de 2 a 3 semanas; depois a manutenção mantém o resultado.'],
    ['De quanto em quanto tempo preciso de manutenção, e quanto custa?', 'A cada 2–3 semanas. Manutenção Classic: A$85 com 2 semanas ou A$105 com 3 semanas. Manutenção Hybrid: A$120 com 2 semanas ou A$150 com 3 semanas. É preciso ter pelo menos 50% dos fios com 2 semanas ou 40% com 3 semanas; se houver menos, pode haver tempo e valor adicionais. Para manutenção Wet Look, fale conosco pelo WhatsApp.'],
    ['A extensão estraga os cílios naturais?', 'Não, quando aplicada corretamente. Cada fio é escolhido para o seu cílio natural e isolado, para os cílios crescerem livres. O que estraga é arrancar as extensões; por isso, faça sempre a remoção profissional.'],
    ['Posso usar rímel com extensão?', 'Não é necessário e é melhor evitar, porque embola os fios e é difícil de remover sem óleo. Se precisar, use rímel à base de água só nas pontas.'],
    ['E se eu tiver alguma reação?', 'Uma vermelhidão leve por algumas horas pode acontecer. Se notar inchaço ou coceira, me chame na hora; se for preciso, removo as extensões.'],
  ],
  es: [
    ['¿Qué diferencia hay entre Classic, Hybrid y Wet Look?', 'Classic coloca una extensión en cada pestaña natural, con un efecto natural, como rímel. Hybrid combina pestañas clásicas con abanicos ligeros para más textura y volumen. Wet Look crea un acabado más oscuro, denso y definido.'],
    ['¿Cuánto duran las extensiones de pestañas?', 'Las extensiones caen con tus pestañas naturales, que se renuevan cada pocas semanas. Con buenos cuidados, el set se ve lleno unas 2 a 3 semanas; después, el mantenimiento lo conserva.'],
    ['¿Cada cuánto necesito mantenimiento y cuánto cuesta?', 'Cada 2–3 semanas. Mantenimiento Classic: A$85 a las 2 semanas o A$105 a las 3 semanas. Mantenimiento Hybrid: A$120 a las 2 semanas o A$150 a las 3 semanas. Se necesita al menos el 50% del set a las 2 semanas o el 40% a las 3 semanas; si queda menos, puede haber tiempo y costo adicionales. Para el mantenimiento Wet Look, escríbenos por WhatsApp.'],
    ['¿Las extensiones dañan las pestañas naturales?', 'No, si se aplican correctamente. Cada extensión se elige según tu pestaña natural y se aísla para que crezca libremente. Lo que daña es arrancarlas; por eso, reserva siempre una retirada profesional.'],
    ['¿Puedo usar rímel con extensiones?', 'No hace falta y es mejor evitarlo, porque apelmaza las pestañas y es difícil de quitar sin aceite. Si lo necesitas, usa rímel a base de agua solo en las puntas.'],
    ['¿Y si tengo una reacción?', 'Puede haber un enrojecimiento leve durante unas horas. Si notas hinchazón o picor, escríbeme de inmediato; si hace falta, retiro el set.'],
  ],
};

const extensionCare: CareByLanguage = {
  en: { ...extensionsBase.en, before: [...extensionsBase.en.before], after: [...extensionsBase.en.after], faqs: extensionFaqs.en },
  pt: { ...extensionsBase.pt, before: [...extensionsBase.pt.before], after: [...extensionsBase.pt.after], faqs: extensionFaqs.pt },
  es: { ...extensionsBase.es, before: [...extensionsBase.es.before], after: [...extensionsBase.es.after], faqs: extensionFaqs.es },
};

const extensionSuitability = {
  classic: {
    en: 'For anyone who wants longer, more defined lashes with a natural, polished look — like wearing mascara every day.',
    pt: 'Para quem quer cílios mais longos e definidos com um efeito natural e elegante — como se estivesse sempre de rímel.',
    es: 'Para quien quiere pestañas más largas y definidas con un efecto natural y pulido, como llevar rímel todos los días.',
  },
  hybrid: {
    en: 'For anyone who wants more fullness and texture than Classic, while still keeping a soft, wearable look.',
    pt: 'Para quem quer mais volume e textura do que o Classic, mantendo um efeito suave e fácil de usar.',
    es: 'Para quien quiere más volumen y textura que Classic, manteniendo un efecto suave y fácil de llevar.',
  },
  wet: {
    en: 'For anyone who loves a darker, denser and more striking lash line with a defined, textured finish.',
    pt: 'Para quem gosta de uma linha de cílios mais escura, densa e marcante, com acabamento definido e texturizado.',
    es: 'Para quien prefiere una línea de pestañas más oscura, densa y llamativa, con un acabado definido y texturizado.',
  },
};

const extensionComparison: Record<Language, string> = {
  en: 'Classic is the most natural, Hybrid adds texture and fullness, and Wet Look gives the darkest, most defined finish. A lash lift works with your own lashes instead, with no extensions.',
  pt: 'O Classic é o mais natural, o Hybrid adiciona textura e volume e o Wet Look tem o acabamento mais escuro e marcado. Já o lash lift trabalha os seus próprios cílios, sem extensões.',
  es: 'Classic es el más natural, Hybrid añade textura y volumen y Wet Look da el acabado más oscuro y definido. El lifting, en cambio, trabaja tus propias pestañas, sin extensiones.',
};

const withExtension = (key: keyof typeof extensionSuitability): CareByLanguage => ({
  en: { ...extensionCare.en, suitability: extensionSuitability[key].en, comparison: extensionComparison.en },
  pt: { ...extensionCare.pt, suitability: extensionSuitability[key].pt, comparison: extensionComparison.pt },
  es: { ...extensionCare.es, suitability: extensionSuitability[key].es, comparison: extensionComparison.es },
});

const removalCare: CareByLanguage = {
  en: {
    before: ['Arrive with no mascara or eye makeup.', 'Remove contact lenses before the treatment.'],
    after: ['Avoid rubbing your eyes for the rest of the day.', 'Give your natural lashes a gentle daily brush.'],
    faqs: [
      ['Why shouldn’t I remove extensions at home?', 'Pulling or picking extensions off can take your natural lashes with them. A professional remover dissolves the bond gently.'],
      ['Can I get a new set straight after removal?', 'Yes, if your natural lashes and eyes are healthy. Book the new set as a separate appointment.'],
    ],
  },
  pt: {
    before: ['Venha sem rímel ou maquiagem nos olhos.', 'Retire as lentes de contato antes do procedimento.'],
    after: ['Evite coçar os olhos pelo resto do dia.', 'Escove os cílios naturais com delicadeza todos os dias.'],
    faqs: [
      ['Por que não devo remover a extensão em casa?', 'Puxar ou arrancar as extensões pode levar os cílios naturais junto. O removedor profissional dissolve a cola com delicadeza.'],
      ['Posso colocar um conjunto novo logo depois da remoção?', 'Sim, se os cílios naturais e os olhos estiverem saudáveis. Agende o conjunto novo como um atendimento separado.'],
    ],
  },
  es: {
    before: ['Ven sin rímel ni maquillaje de ojos.', 'Quítate los lentes de contacto antes del tratamiento.'],
    after: ['Evita frotarte los ojos el resto del día.', 'Peina tus pestañas naturales con suavidad a diario.'],
    faqs: [
      ['¿Por qué no debo quitarme las extensiones en casa?', 'Tirar o arrancar las extensiones puede llevarse tus pestañas naturales. El removedor profesional disuelve el adhesivo con suavidad.'],
      ['¿Puedo ponerme un set nuevo justo después de la retirada?', 'Sí, si tus pestañas naturales y tus ojos están sanos. Reserva el set nuevo como una cita aparte.'],
    ],
  },
};

const browLaminationFaqs: CareByLanguage = {
  en: {
    faqs: [
      ['How long do the results last?', 'Results typically last 6–8 weeks, depending on your natural brow growth cycle, hair condition and aftercare. The tint may fade sooner than the lamination effect.'],
      ['Do I need a patch test?', 'Yes, if it’s your first time having lamination or tint with us. It’s done at least 48 hours before your appointment. Message us on WhatsApp to arrange it.'],
      ['Can I have it with a lash lift?', 'Yes. Many clients book Brow Lamination and Lash Lift & Tint together for a fresh, low-maintenance look.'],
      ['Will it work on very sparse brows?', 'Lamination repositions the hairs you already have, so it works best when there is enough hair to work with. For very sparse brows, ask about Exos Hair Brows or Nano Strokes.'],
    ],
  },
  pt: {
    faqs: [
      ['Quanto tempo dura o resultado?', 'Em geral de 6 a 8 semanas, dependendo do ciclo de crescimento, da condição dos fios e dos cuidados. A tintura pode desbotar antes do efeito da laminação.'],
      ['Preciso fazer teste de sensibilidade?', 'Sim, se for a primeira vez que faz laminação ou tintura conosco. O teste é feito pelo menos 48 horas antes. Fale conosco pelo WhatsApp para agendar.'],
      ['Posso fazer junto com o lash lift?', 'Sim. Muitas clientes agendam Brow Lamination e Lash Lift & Tint juntos para um visual descansado e prático.'],
      ['Funciona em sobrancelhas muito falhadas?', 'A laminação reposiciona os fios que você já tem, então funciona melhor quando há fios suficientes. Para sobrancelhas muito falhadas, pergunte sobre Exos Hair Brows ou Nano Strokes.'],
    ],
  },
  es: {
    faqs: [
      ['¿Cuánto dura el resultado?', 'Normalmente de 6 a 8 semanas, según el ciclo de crecimiento, el estado del vello y los cuidados. El tinte puede desvanecerse antes que el laminado.'],
      ['¿Necesito una prueba de sensibilidad?', 'Sí, si es tu primer laminado o tinte con nosotras. Se hace al menos 48 horas antes. Escríbenos por WhatsApp para coordinarla.'],
      ['¿Puedo hacerlo junto con un lifting de pestañas?', 'Sí. Muchas clientas reservan Brow Lamination y Lash Lift & Tint juntos para un look fresco y práctico.'],
      ['¿Funciona en cejas muy despobladas?', 'El laminado reposiciona el vello que ya tienes, así que funciona mejor cuando hay suficiente vello. Para cejas muy despobladas, pregunta por Exos Hair Brows o Nano Strokes.'],
    ],
  },
};

const skinChoiceFaq: Record<Language, [string, string]> = {
  en: ['Which skin treatment should I choose?', 'For a glow before an event: Dermaplaning or Facial Spa. For long-term results on texture, fine lines or scarring: Microneedling. For everything in one visit: the Deluxe Facial. Not sure? Message us on WhatsApp.'],
  pt: ['Qual tratamento de pele devo escolher?', 'Para um brilho antes de um evento: Dermaplaning ou Facial Spa. Para resultados a longo prazo em textura, linhas finas ou cicatrizes: Microneedling. Para tudo em uma só visita: Deluxe Facial. Na dúvida, fale conosco pelo WhatsApp.'],
  es: ['¿Qué tratamiento de piel debo elegir?', 'Para lucir radiante antes de un evento: Dermaplaning o Facial Spa. Para resultados a largo plazo en textura, líneas finas o cicatrices: Microneedling. Para todo en una visita: Deluxe Facial. ¿Dudas? Escríbenos por WhatsApp.'],
};

const skinComparison: Record<Language, string> = {
  en: 'Dermaplaning and Facial Spa give an instant glow with no downtime. Microneedling works over a course of sessions for longer-term results on texture and scarring, with some redness for 24–48 hours. The Deluxe Facial combines dermaplaning, microneedling, mask and LED in one visit.',
  pt: 'Dermaplaning e Facial Spa dão brilho imediato, sem tempo de recuperação. O Microneedling é feito em sessões para resultados a longo prazo em textura e cicatrizes, com vermelhidão por 24–48 horas. O Deluxe Facial combina dermaplaning, microneedling, máscara e LED em uma só visita.',
  es: 'Dermaplaning y Facial Spa dan luminosidad inmediata, sin tiempo de recuperación. Microneedling se realiza en varias sesiones para resultados a largo plazo en textura y cicatrices, con enrojecimiento durante 24–48 horas. Deluxe Facial combina dermaplaning, microneedling, mascarilla y LED en una visita.',
};

const dermaplaningCare: CareByLanguage = {
  en: {
    suitability: 'Best for dull skin, peach fuzz and smoother makeup application. Suitable for most skin types. Not recommended with active acne or breakouts, sunburn, or if you have recently used retinoids — message us first.',
    comparison: skinComparison.en,
    faqs: [
      ['Will my hair grow back thicker or darker?', 'No. Dermaplaning removes fine vellus hair, which grows back the same.'],
      ['How often can I have it?', 'Every 4–6 weeks, in line with your skin’s natural renewal.'],
      skinChoiceFaq.en,
    ],
  },
  pt: {
    suitability: 'Ideal para pele opaca, penugem e para a maquiagem assentar melhor. Indicado para a maioria dos tipos de pele. Não é recomendado com acne ativa, queimadura de sol ou uso recente de retinoides — fale conosco antes.',
    comparison: skinComparison.pt,
    faqs: [
      ['Os pelos voltam mais grossos ou escuros?', 'Não. O dermaplaning remove a penugem fina, que volta a crescer igual.'],
      ['De quanto em quanto tempo posso fazer?', 'A cada 4 a 6 semanas, acompanhando a renovação natural da pele.'],
      skinChoiceFaq.pt,
    ],
  },
  es: {
    suitability: 'Ideal para piel apagada, vello facial fino y para que el maquillaje se asiente mejor. Adecuado para la mayoría de tipos de piel. No se recomienda con acné activo, quemaduras solares o uso reciente de retinoides; escríbenos antes.',
    comparison: skinComparison.es,
    faqs: [
      ['¿El vello vuelve a crecer más grueso u oscuro?', 'No. El dermaplaning retira el vello fino, que vuelve a crecer igual.'],
      ['¿Cada cuánto puedo hacerlo?', 'Cada 4 a 6 semanas, según la renovación natural de la piel.'],
      skinChoiceFaq.es,
    ],
  },
};

const microneedlingCare: CareByLanguage = {
  en: {
    suitability: 'Best for texture, fine lines, enlarged pores and acne scarring. Usually done as a course of sessions planned for your skin. Not suitable during pregnancy or breastfeeding, with active acne, eczema or broken skin, or if you have taken isotretinoin (Roaccutane) in the last 6 months. Expect redness for 24–48 hours.',
    comparison: skinComparison.en,
    faqs: [
      ['Does it hurt?', 'Most clients feel only mild discomfort. The treatment is adjusted to your skin and comfort.'],
      ['How many sessions will I need?', 'It depends on your skin and goals. I’ll recommend a course and spacing at your first appointment.'],
      ['Is there downtime?', 'Expect redness and warmth for 24–48 hours. Avoid makeup for 24 hours and follow the aftercare below.'],
      skinChoiceFaq.en,
    ],
  },
  pt: {
    suitability: 'Ideal para textura, linhas finas, poros dilatados e cicatrizes de acne. Normalmente feito em um conjunto de sessões planejado para a sua pele. Não é indicado na gravidez ou amamentação, com acne ativa, eczema ou pele lesionada, ou se usou isotretinoína (Roacutan) nos últimos 6 meses. Espere vermelhidão por 24–48 horas.',
    comparison: skinComparison.pt,
    faqs: [
      ['Dói?', 'A maioria das clientes sente apenas um leve desconforto. O procedimento é ajustado à sua pele e ao seu conforto.'],
      ['Quantas sessões vou precisar?', 'Depende da sua pele e do seu objetivo. Indico o número de sessões e o intervalo na primeira consulta.'],
      ['Tem tempo de recuperação?', 'Espere vermelhidão e calor por 24–48 horas. Evite maquiagem por 24 horas e siga os cuidados abaixo.'],
      skinChoiceFaq.pt,
    ],
  },
  es: {
    suitability: 'Ideal para textura, líneas finas, poros dilatados y cicatrices de acné. Normalmente se realiza en un ciclo de sesiones planificado para tu piel. No es adecuado durante el embarazo o la lactancia, con acné activo, eccema o piel dañada, ni si tomaste isotretinoína (Roaccutane) en los últimos 6 meses. Habrá enrojecimiento durante 24–48 horas.',
    comparison: skinComparison.es,
    faqs: [
      ['¿Duele?', 'La mayoría de las clientas solo sienten una leve molestia. El tratamiento se adapta a tu piel y comodidad.'],
      ['¿Cuántas sesiones necesitaré?', 'Depende de tu piel y tus objetivos. Te recomiendo el número de sesiones y el intervalo en la primera cita.'],
      ['¿Hay tiempo de recuperación?', 'Habrá enrojecimiento y calor durante 24–48 horas. Evita el maquillaje 24 horas y sigue los cuidados de abajo.'],
      skinChoiceFaq.es,
    ],
  },
};

const deluxeCare: CareByLanguage = {
  en: {
    suitability: 'Dermaplaning, microneedling, mask and LED in one appointment — the best value when you want visible results. Same suitability as microneedling.',
    comparison: skinComparison.en,
    faqs: [
      ['What is included in the Deluxe Facial?', 'Cleansing, dermaplaning, microneedling, a facial mask and LED light therapy, with each step selected for your skin. It takes about 2 hours.'],
      ['Is it better value than booking treatments separately?', 'Yes. You get dermaplaning and microneedling plus a mask and LED in one visit.'],
      skinChoiceFaq.en,
    ],
  },
  pt: {
    suitability: 'Dermaplaning, microneedling, máscara e LED em um só atendimento — o melhor custo-benefício para quem quer resultado visível. Mesmas indicações do microneedling.',
    comparison: skinComparison.pt,
    faqs: [
      ['O que está incluído no Deluxe Facial?', 'Limpeza, dermaplaning, microneedling, máscara facial e LED, com cada etapa escolhida para a sua pele. Dura cerca de 2 horas.'],
      ['Vale mais a pena do que fazer separado?', 'Sim. Você faz dermaplaning e microneedling, além de máscara e LED, em uma só visita.'],
      skinChoiceFaq.pt,
    ],
  },
  es: {
    suitability: 'Dermaplaning, microneedling, mascarilla y LED en una sola cita: la mejor relación calidad-precio si buscas resultados visibles. Mismas indicaciones que el microneedling.',
    comparison: skinComparison.es,
    faqs: [
      ['¿Qué incluye el Deluxe Facial?', 'Limpieza, dermaplaning, microneedling, mascarilla facial y LED, con cada paso elegido para tu piel. Dura unas 2 horas.'],
      ['¿Sale mejor que reservar los tratamientos por separado?', 'Sí. Recibes dermaplaning y microneedling, además de mascarilla y LED, en una visita.'],
      skinChoiceFaq.es,
    ],
  },
};

const facialSpaCare: CareByLanguage = {
  en: {
    suitability: 'A relaxing cleanse, exfoliation and hydration for all skin types. A great first treatment if you’re not sure where to start.',
    comparison: skinComparison.en,
    after: ['Avoid makeup for 12–24 hours.', 'Use SPF every day.', 'Skip exfoliants for 3 days.', 'Repeat every 4–6 weeks to keep your skin glowing.'],
    faqs: [
      ['Is there any downtime?', 'No. You can go straight back to your day.'],
      skinChoiceFaq.en,
    ],
  },
  pt: {
    suitability: 'Limpeza, esfoliação e hidratação relaxantes para todos os tipos de pele. Um ótimo primeiro tratamento se você não sabe por onde começar.',
    comparison: skinComparison.pt,
    after: ['Evite maquiagem por 12–24 horas.', 'Use protetor solar todos os dias.', 'Evite esfoliantes por 3 dias.', 'Repita a cada 4 a 6 semanas para manter a pele bonita.'],
    faqs: [
      ['Tem tempo de recuperação?', 'Não. Você pode voltar à sua rotina na hora.'],
      skinChoiceFaq.pt,
    ],
  },
  es: {
    suitability: 'Limpieza, exfoliación e hidratación relajantes para todo tipo de piel. Un excelente primer tratamiento si no sabes por dónde empezar.',
    comparison: skinComparison.es,
    after: ['Evita el maquillaje durante 12–24 horas.', 'Usa protector solar todos los días.', 'Evita exfoliantes durante 3 días.', 'Repite cada 4 a 6 semanas para mantener la piel radiante.'],
    faqs: [
      ['¿Hay tiempo de recuperación?', 'No. Puedes volver a tu día de inmediato.'],
      skinChoiceFaq.es,
    ],
  },
};

const lipBlissCare: CareByLanguage = {
  en: {
    suitability: 'Gentle exfoliation and deep hydration for dry or flaky lips. Perfect before an event, or to keep healed Lip Blush looking fresh.',
    after: ['Apply lip balm regularly.', 'Avoid lipstick for a few hours.'],
    faqs: [
      ['Does it add colour or volume?', 'No. It hydrates and softens your natural lips, with no tattoo pigment or injectable volume.'],
      ['Can I have it after Lip Blush?', 'Yes, once your Lip Blush has fully healed. It helps keep the lips soft and the colour looking fresh.'],
    ],
  },
  pt: {
    suitability: 'Esfoliação suave e hidratação profunda para lábios secos ou descamando. Perfeito antes de um evento ou para manter o Lip Blush cicatrizado com aspecto renovado.',
    after: ['Aplique hidratante labial com frequência.', 'Evite batom por algumas horas.'],
    faqs: [
      ['Adiciona cor ou volume?', 'Não. Hidrata e suaviza os lábios naturais, sem pigmento de tatuagem nem preenchimento.'],
      ['Posso fazer depois do Lip Blush?', 'Sim, depois que o Lip Blush estiver totalmente cicatrizado. Ajuda a manter os lábios macios e a cor bonita.'],
    ],
  },
  es: {
    suitability: 'Exfoliación suave e hidratación profunda para labios secos o descamados. Perfecto antes de un evento o para mantener el Lip Blush cicatrizado con buen aspecto.',
    after: ['Aplica bálsamo labial con frecuencia.', 'Evita el labial durante unas horas.'],
    faqs: [
      ['¿Añade color o volumen?', 'No. Hidrata y suaviza tus labios naturales, sin pigmento de tatuaje ni relleno.'],
      ['¿Puedo hacerlo después del Lip Blush?', 'Sí, cuando el Lip Blush haya cicatrizado por completo. Ayuda a mantener los labios suaves y el color fresco.'],
    ],
  },
};

const teethWhiteningCare: CareByLanguage = {
  en: {
    suitability: 'Cosmetic teeth whitening is a great fit if you have natural teeth with stains from coffee, tea, wine or smoking. It isn’t suitable if you’re pregnant or breastfeeding, under 18, or have untreated cavities, inflamed gums or strong tooth sensitivity. Crowns, veneers and fillings won’t change colour. If you haven’t had a dental check-up in the last 6 months, we recommend one before your session.',
    faqs: [
      ['How much does it cost and how long does it take?', 'A$199 for an appointment of approximately 1 hour.'],
      ['Will it whiten crowns, veneers or fillings?', 'No. Whitening does not change the colour of these restorations.'],
      ['How white will my teeth get?', 'Results vary with your starting shade and the type of staining. One session gives a visible difference for most clients.'],
      ['Does it hurt?', 'No. Some people feel mild, temporary sensitivity for up to 24 hours. Let me know beforehand if your teeth are already sensitive.'],
      ['How long do results last?', 'It depends on coffee, tea, wine and smoking. Touch-up sessions keep your smile bright.'],
    ],
  },
  pt: {
    suitability: 'O clareamento estético é ideal para dentes naturais com manchas de café, chá, vinho ou cigarro. Não é indicado para gestantes ou lactantes, menores de 18 anos, ou para quem tem cáries sem tratamento, gengiva inflamada ou sensibilidade forte. Coroas, facetas e restaurações não mudam de cor. Se não faz check-up com o dentista há mais de 6 meses, recomendamos fazer antes da sessão.',
    faqs: [
      ['Quanto custa e quanto tempo demora?', 'A$199 por um atendimento de aproximadamente 1 hora.'],
      ['Clareia coroas, facetas ou restaurações?', 'Não. O clareamento não altera a cor dessas restaurações.'],
      ['Quanto meus dentes vão clarear?', 'Depende da cor inicial e do tipo de mancha. Para a maioria das clientes, uma sessão já traz diferença visível.'],
      ['Dói?', 'Não. Algumas pessoas sentem uma sensibilidade leve e passageira por até 24 horas. Avise antes se os seus dentes já forem sensíveis.'],
      ['Quanto tempo dura o resultado?', 'Depende do consumo de café, chá, vinho e cigarro. Sessões de retoque mantêm o sorriso claro.'],
    ],
  },
  es: {
    suitability: 'El blanqueamiento estético es ideal si tienes dientes naturales con manchas de café, té, vino o tabaco. No es adecuado durante el embarazo o la lactancia, para menores de 18 años, ni con caries sin tratar, encías inflamadas o sensibilidad fuerte. Coronas, carillas y empastes no cambian de color. Si no te has hecho una revisión dental en los últimos 6 meses, te recomendamos hacerla antes.',
    faqs: [
      ['¿Cuánto cuesta y cuánto dura?', 'A$199 por una cita de aproximadamente 1 hora.'],
      ['¿Blanquea coronas, carillas o empastes?', 'No. El blanqueamiento no cambia el color de estas restauraciones.'],
      ['¿Cuánto se blanquearán mis dientes?', 'Depende del tono inicial y del tipo de mancha. Para la mayoría de las clientas, una sesión ya da una diferencia visible.'],
      ['¿Duele?', 'No. Algunas personas sienten una sensibilidad leve y pasajera hasta 24 horas. Avísame antes si tus dientes ya son sensibles.'],
      ['¿Cuánto duran los resultados?', 'Depende del café, el té, el vino y el tabaco. Las sesiones de retoque mantienen tu sonrisa luminosa.'],
    ],
  },
};

export const SERVICE_CARE: Partial<Record<string, CareByLanguage>> = {
  'lash-lift': lashLiftCare,
  'lash-lift-only': lashLiftCare,
  'lash-tint': lashTintCare,
  'classic-eyelashes': withExtension('classic'),
  'hybrid-eyelashes': withExtension('hybrid'),
  'wet-look-lashes': withExtension('wet'),
  'lash-extension-removal': removalCare,
  'brow-lamination': browLaminationFaqs,
  dermaplaning: dermaplaningCare,
  microneedling: microneedlingCare,
  'deluxe-facial': deluxeCare,
  'facial-spa': facialSpaCare,
  'lip-bliss-hydration': lipBlissCare,
  'teeth-whitening': teethWhiteningCare,
};

export const serviceCareFor = (serviceId: string, language: Language): ServiceCare | undefined =>
  SERVICE_CARE[serviceId]?.[language];
