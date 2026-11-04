import type { Language } from './siteData';

export interface ServiceGuide {
  idealFor: string;
  comparison: string;
  question: string;
  answer: string;
}

/**
 * Descriptive, non-medical editorial information for the most searched treatments.
 * These are general explanations, not guarantees of suitability or studio-specific protocols.
 * Confirm individual suitability, preparation and aftercare directly with Bella Beauty Brazil.
 */
export const SERVICE_GUIDES: Partial<Record<string, Record<Language, ServiceGuide>>> = {
  'cosmetic-tattooing': {
    en: { idealFor: 'For clients researching cosmetic tattoo services for brows or lips who would like a consultation before choosing a particular technique.', comparison: 'Cosmetic tattooing is an umbrella category rather than a single fixed treatment. Nano Strokes focuses on brow hair-stroke effects; Lip Blush is a separate lip-pigment service. Brow Sculpt & Hybrid Brow is a styling service, not a confirmed tattoo appointment.', question: 'Which cosmetic tattoo appointment should I choose?', answer: 'Review Nano Strokes and Lip Blush separately, and ask Bella Beauty Brazil about suitability, colour, preparation and aftercare. Click “Book now” to see available times.' },
    pt: { idealFor: 'Para quem pesquisa tatuagem cosmética de sobrancelhas ou lábios e quer uma avaliação antes de escolher a técnica.', comparison: 'Tatuagem cosmética é uma categoria, não um procedimento único. Nano Strokes cria efeito de fios nas sobrancelhas; Lip Blush é um atendimento distinto para pigmentação labial. Brow Sculpt & Hybrid Brow é styling, não um atendimento de tatuagem confirmado.', question: 'Qual serviço de tatuagem cosmética devo escolher?', answer: 'Consulte Nano Strokes e Lip Blush individualmente e pergunte à Bella Beauty Brazil sobre indicação, cor, preparo e cuidados. Clique em “Agendar agora” para ver os horários.' },
    es: { idealFor: 'Para quienes buscan tatuaje cosmético en cejas o labios y desean una consulta antes de elegir la técnica.', comparison: 'El tatuaje cosmético es una categoría, no un único procedimiento. Nano Strokes crea trazos similares al pelo en las cejas; Lip Blush es un servicio distinto de pigmentación de labios. Brow Sculpt & Hybrid Brow es diseño, no una cita de tatuaje confirmada.', question: '¿Qué servicio de tatuaje cosmético debo elegir?', answer: 'Consulta Nano Strokes y Lip Blush por separado y pregunta a Bella Beauty Brazil sobre idoneidad, color, preparación y cuidados. Haz clic en “Reservar ahora” para ver los horarios.' }
  },
  'brow-sculpt': {
    en: {
      idealFor: 'For anyone wanting tidier, more defined brows while keeping their natural colour and fullness.',
      comparison: '',
      question: 'Does Brow Sculpt include tint or dye?',
      answer: 'No. Brow Sculpt focuses on shaping only. For added colour, please book Brow Sculpt & Tint or Brow Sculpt & Hybrid Dye.'
    },
    pt: {
      idealFor: 'Para quem deseja sobrancelhas mais alinhadas e definidas, mantendo a cor e o volume naturais.',
      comparison: '',
      question: 'Brow Sculpt inclui tintura ou dye?',
      answer: 'Não. Brow Sculpt é apenas para modelagem. Se desejar cor, agende Brow Sculpt & Tint ou Brow Sculpt & Hybrid Dye.'
    },
    es: {
      idealFor: 'Para quienes desean unas cejas más cuidadas y definidas, manteniendo su color y densidad naturales.',
      comparison: '',
      question: '¿Brow Sculpt incluye tinte o dye?',
      answer: 'No. Brow Sculpt se centra únicamente en el diseño. Para añadir color, reserva Brow Sculpt & Tint o Brow Sculpt & Hybrid Dye.'
    }
  },
  'classic-eyelashes': {
    en: { idealFor: "For anyone who wants longer, more defined lashes with a natural, polished look — like wearing mascara every day.", comparison: "Classic is the most natural, Hybrid adds texture and fullness, and Wet Look gives the darkest, most defined finish. A lash lift works with your own lashes instead, with no extensions.", question: "How often do I need an infill?", answer: "Every 2–3 weeks. Classic infills are A$85 at 2 weeks or A$105 at 3 weeks; Hybrid infills are A$120 at 2 weeks or A$150 at 3 weeks." },
    pt: { idealFor: "Para quem quer cílios mais longos e definidos com um efeito natural e elegante — como se estivesse sempre de rímel.", comparison: "O Classic é o mais natural, o Hybrid adiciona textura e volume e o Wet Look tem o acabamento mais escuro e marcado. Já o lash lift trabalha os seus próprios cílios, sem extensões.", question: "De quanto em quanto tempo preciso de manutenção?", answer: "A cada 2–3 semanas. Manutenção Classic: A$85 com 2 semanas ou A$105 com 3 semanas. Hybrid: A$120 com 2 semanas ou A$150 com 3 semanas." },
    es: { idealFor: "Para quien quiere pestañas más largas y definidas con un efecto natural y pulido, como llevar rímel todos los días.", comparison: "Classic es el más natural, Hybrid añade textura y volumen y Wet Look da el acabado más oscuro y definido. El lifting, en cambio, trabaja tus propias pestañas, sin extensiones.", question: "¿Cada cuánto necesito mantenimiento?", answer: "Cada 2–3 semanas. Mantenimiento Classic: A$85 a las 2 semanas o A$105 a las 3. Hybrid: A$120 a las 2 semanas o A$150 a las 3." }
  },
  'hybrid-eyelashes': {
    en: { idealFor: "For anyone who wants more fullness and texture than Classic, while still keeping a soft, wearable look.", comparison: "Classic is the most natural, Hybrid adds texture and fullness, and Wet Look gives the darkest, most defined finish. A lash lift works with your own lashes instead, with no extensions.", question: "How often do I need an infill?", answer: "Every 2–3 weeks. Classic infills are A$85 at 2 weeks or A$105 at 3 weeks; Hybrid infills are A$120 at 2 weeks or A$150 at 3 weeks." },
    pt: { idealFor: "Para quem quer mais volume e textura do que o Classic, mantendo um efeito suave e fácil de usar.", comparison: "O Classic é o mais natural, o Hybrid adiciona textura e volume e o Wet Look tem o acabamento mais escuro e marcado. Já o lash lift trabalha os seus próprios cílios, sem extensões.", question: "De quanto em quanto tempo preciso de manutenção?", answer: "A cada 2–3 semanas. Manutenção Classic: A$85 com 2 semanas ou A$105 com 3 semanas. Hybrid: A$120 com 2 semanas ou A$150 com 3 semanas." },
    es: { idealFor: "Para quien quiere más volumen y textura que Classic, manteniendo un efecto suave y fácil de llevar.", comparison: "Classic es el más natural, Hybrid añade textura y volumen y Wet Look da el acabado más oscuro y definido. El lifting, en cambio, trabaja tus propias pestañas, sin extensiones.", question: "¿Cada cuánto necesito mantenimiento?", answer: "Cada 2–3 semanas. Mantenimiento Classic: A$85 a las 2 semanas o A$105 a las 3. Hybrid: A$120 a las 2 semanas o A$150 a las 3." }
  },
  'microneedling': {
    en: { idealFor: "Best for texture, fine lines, enlarged pores and acne scarring. Usually done as a course of sessions planned for your skin. Not suitable during pregnancy or breastfeeding, with active acne, eczema or broken skin, or if you have taken isotretinoin (Roaccutane) in the last 6 months.", comparison: "Dermaplaning and Facial Spa give an instant glow with no downtime. Microneedling works over a course of sessions for longer-term results on texture and scarring, with some redness for 24–48 hours. The Deluxe Facial combines dermaplaning, microneedling, mask and LED in one visit.", question: "Which skin treatment should I choose?", answer: "For a glow before an event: Dermaplaning or Facial Spa. For long-term results on texture, fine lines or scarring: Microneedling. For everything in one visit: the Deluxe Facial." },
    pt: { idealFor: "Ideal para textura, linhas finas, poros dilatados e cicatrizes de acne. Normalmente feito em um conjunto de sessões planejado para a sua pele. Não é indicado na gravidez ou amamentação, com acne ativa, eczema ou pele lesionada, ou se usou isotretinoína (Roacutan) nos últimos 6 meses.", comparison: "Dermaplaning e Facial Spa dão brilho imediato, sem tempo de recuperação. O Microneedling é feito em sessões para resultados a longo prazo em textura e cicatrizes, com vermelhidão por 24–48 horas. O Deluxe Facial combina dermaplaning, microneedling, máscara e LED em uma só visita.", question: "Qual tratamento de pele devo escolher?", answer: "Para um brilho antes de um evento: Dermaplaning ou Facial Spa. Para resultados a longo prazo em textura, linhas finas ou cicatrizes: Microneedling. Para tudo em uma só visita: Deluxe Facial." },
    es: { idealFor: "Ideal para textura, líneas finas, poros dilatados y cicatrices de acné. Normalmente se realiza en un ciclo de sesiones planificado para tu piel. No es adecuado durante el embarazo o la lactancia, con acné activo, eccema o piel dañada, ni si tomaste isotretinoína (Roaccutane) en los últimos 6 meses.", comparison: "Dermaplaning y Facial Spa dan luminosidad inmediata, sin tiempo de recuperación. Microneedling se realiza en varias sesiones para resultados a largo plazo en textura y cicatrices, con enrojecimiento durante 24–48 horas. Deluxe Facial combina dermaplaning, microneedling, mascarilla y LED en una visita.", question: "¿Qué tratamiento de piel debo elegir?", answer: "Para lucir radiante antes de un evento: Dermaplaning o Facial Spa. Para resultados a largo plazo en textura, líneas finas o cicatrices: Microneedling. Para todo en una visita: Deluxe Facial." }
  },
  'deluxe-facial': {
    en: { idealFor: "Dermaplaning, microneedling, mask and LED in one appointment — the best value when you want visible results. Same suitability as microneedling.", comparison: "Dermaplaning and Facial Spa give an instant glow with no downtime. Microneedling works over a course of sessions for longer-term results on texture and scarring, with some redness for 24–48 hours. The Deluxe Facial combines dermaplaning, microneedling, mask and LED in one visit.", question: "What is included in the Deluxe Facial?", answer: "Cleansing, dermaplaning, microneedling, a facial mask and LED light therapy, with each step selected for your skin. It takes about 2 hours." },
    pt: { idealFor: "Dermaplaning, microneedling, máscara e LED em um só atendimento — o melhor custo-benefício para quem quer resultado visível. Mesmas indicações do microneedling.", comparison: "Dermaplaning e Facial Spa dão brilho imediato, sem tempo de recuperação. O Microneedling é feito em sessões para resultados a longo prazo em textura e cicatrizes, com vermelhidão por 24–48 horas. O Deluxe Facial combina dermaplaning, microneedling, máscara e LED em uma só visita.", question: "O que está incluído no Deluxe Facial?", answer: "Limpeza, dermaplaning, microneedling, máscara facial e LED, com cada etapa escolhida para a sua pele. Dura cerca de 2 horas." },
    es: { idealFor: "Dermaplaning, microneedling, mascarilla y LED en una sola cita: la mejor relación calidad-precio si buscas resultados visibles. Mismas indicaciones que el microneedling.", comparison: "Dermaplaning y Facial Spa dan luminosidad inmediata, sin tiempo de recuperación. Microneedling se realiza en varias sesiones para resultados a largo plazo en textura y cicatrices, con enrojecimiento durante 24–48 horas. Deluxe Facial combina dermaplaning, microneedling, mascarilla y LED en una visita.", question: "¿Qué incluye el Deluxe Facial?", answer: "Limpieza, dermaplaning, microneedling, mascarilla facial y LED, con cada paso elegido para tu piel. Dura unas 2 horas." }
  },
  waxing: {
    en: { idealFor: 'For clients interested in the Brazilian Waxing appointment listed in the studio catalogue, with treatment details and suitability confirmed ahead of time.', comparison: 'Brazilian Waxing is a hair-removal service, not the same as facial treatments, lash extensions or brow shaping. Other waxing areas are listed separately on the waxing menu.', question: 'Is Brazilian Waxing the same as a Full Leg or Bikini Wax?', answer: 'No. Each area is a separate treatment on the waxing menu. Book the exact area you need and confirm preparation and aftercare with the studio.' },
    pt: { idealFor: 'Para quem procura o serviço Brazilian Waxing no catálogo do estúdio e quer confirmar detalhes e indicação antes do atendimento.', comparison: 'Brazilian Waxing é um serviço de depilação, não um tratamento facial, extensão de cílios ou design de sobrancelhas. Outras regiões de depilação aparecem separadamente no menu de depilação.', question: 'Brazilian Waxing é igual a Full Leg ou Bikini Wax?', answer: 'Não. Cada região é um atendimento separado no menu de depilação. Escolha o atendimento correspondente e confirme preparo e cuidados com o estúdio.' },
    es: { idealFor: 'Para quienes buscan el servicio Brazilian Waxing publicado por el estudio y desean consultar los detalles antes de reservar.', comparison: 'Brazilian Waxing es un servicio de depilación, distinto de faciales, extensiones de pestañas y diseño de cejas. Otras zonas aparecen por separado en el menú de depilación.', question: '¿Brazilian Waxing es igual a Full Leg o Bikini Wax?', answer: 'No. Cada zona es un servicio distinto en el menú de depilación. Elige la cita correspondiente y consulta la preparación y los cuidados.' }
  },
  'nano-strokes': {
    en: {
      idealFor: 'For those wanting more definition with a natural hair-stroke appearance. I assess your skin, existing brows and any previous tattooing before recommending the most suitable technique.',
      comparison: '',
      question: 'Is this treatment right for me?',
      answer: 'I assess your skin, natural brow growth and previous cosmetic tattooing during the consultation to discuss the most suitable approach.',
    },
    pt: {
      idealFor: 'Para quem deseja maior definição com aparência natural de fios. Avalio sua pele, sobrancelhas e tatuagens anteriores antes de recomendar a técnica mais adequada.',
      comparison: '',
      question: 'Este tratamento é adequado para mim?',
      answer: 'Avalio sua pele, o crescimento natural dos pelos e qualquer tatuagem anterior durante a consulta.',
    },
    es: {
      idealFor: 'Para quienes desean más definición con trazos de aspecto natural. Evalúo tu piel, cejas y tatuajes anteriores antes de recomendar la técnica adecuada.',
      comparison: '',
      question: '¿Es adecuado para mí?',
      answer: 'Evalúo tu piel, el crecimiento natural del vello y los tatuajes anteriores durante la consulta.',
    },
  },
  'shadow-hybrid': {
    en: {
      idealFor: 'For clients seeking personalised brow shaping with temporary colour on both the brow hairs and skin.',
      comparison: 'Hybrid Dye is a temporary brow colour treatment, not cosmetic tattooing.',
      question: 'How is Hybrid Dye different from Tint?',
      answer: 'Hybrid Dye colours the brow hairs and temporarily stains the skin. Traditional tint focuses on enhancing the hairs.'
    },
    pt: {
      idealFor: 'Para quem deseja design personalizado com coloração temporária nos pelos e na pele.',
      comparison: 'Hybrid Dye é uma coloração temporária de sobrancelhas, não uma tatuagem cosmética.',
      question: 'Qual é a diferença entre Hybrid Dye e Tint?',
      answer: 'Hybrid Dye colore os pelos e pigmenta temporariamente a pele. A tintura tradicional realça principalmente os pelos.'
    },
    es: {
      idealFor: 'Para quienes desean diseño personalizado con color temporal en el vello y la piel.',
      comparison: 'Hybrid Dye es una coloración temporal de cejas, no un tatuaje cosmético.',
      question: '¿Qué diferencia hay entre Hybrid Dye y Tint?',
      answer: 'Hybrid Dye colorea el vello y tiñe temporalmente la piel. El tinte tradicional realza principalmente el vello.'
    }
  },
  'lip-blush': {
    en: {
      idealFor: 'For clients considering a softly enhanced lip tone or more defined-looking lip shape through semi-permanent cosmetic tattooing, subject to a suitability consultation.',
      comparison: 'Lip Blush adds cosmetic pigment to the lip area. Unlike lip gloss or other topical products, it is a cosmetic tattooing appointment and has different preparation and aftercare requirements.',
      question: 'Do I need a consultation before Lip Blush?',
      answer: 'Discuss your preferred colour, personal suitability, preparation and aftercare with Bella Beauty Brazil. Follow the studio’s instructions rather than relying on generic treatment timelines.'
    },
    pt: {
      idealFor: 'Para quem deseja avaliar uma realce suave da cor ou do contorno dos lábios por tatuagem cosmética semipermanente, após orientação de indicação.',
      comparison: 'Lip Blush utiliza pigmento cosmético na região dos lábios. Diferentemente de gloss e produtos tópicos, é um atendimento de tatuagem cosmética que requer preparo e cuidados específicos.',
      question: 'Preciso de avaliação antes do Lip Blush?',
      answer: 'Converse com a Bella Beauty Brazil sobre a cor desejada, indicação, preparação e cuidados posteriores. Siga as orientações do estúdio.'
    },
    es: {
      idealFor: 'Para quienes consideran realzar suavemente el tono o contorno de los labios mediante tatuaje cosmético semipermanente, tras una consulta de idoneidad.',
      comparison: 'Lip Blush deposita pigmento cosmético en los labios. A diferencia del brillo de labios y otros productos tópicos, es una cita de tatuaje cosmético con preparación y cuidados distintos.',
      question: '¿Necesito una consulta antes del Lip Blush?',
      answer: 'Habla con Bella Beauty Brazil sobre el tono deseado, la idoneidad, la preparación y los cuidados posteriores. Sigue las indicaciones del estudio.'
    }
  },
  'brow-sculpt-tint': {
    en: {
      idealFor: 'For clients seeking the same personalised Brow Sculpt shaping, with a soft traditional tint on the natural hairs.',
      comparison: 'Tint enhances brow hairs for soft definition. Hybrid Dye also temporarily stains the skin.',
      question: 'Does Brow Sculpt & Tint include waxing and tweezing?',
      answer: 'Yes. It includes the same personalised brow mapping, waxing and tweezing as Brow Sculpt.'
    },
    pt: {
      idealFor: 'Para quem deseja o mesmo design personalizado do Brow Sculpt, com tintura tradicional nos pelos.',
      comparison: 'Tintura realça os fios com definição suave. Hybrid Dye também pigmenta temporariamente a pele.',
      question: 'Brow Sculpt & Tint inclui cera e pinça?',
      answer: 'Sim. Inclui o mesmo mapeamento, depilação com cera e pinça personalizados do Brow Sculpt.'
    },
    es: {
      idealFor: 'Para quienes quieren el mismo diseño personalizado de Brow Sculpt con tinte tradicional en el vello.',
      comparison: 'El tinte realza el vello con definición suave. Hybrid Dye también tiñe temporalmente la piel.',
      question: '¿Brow Sculpt & Tint incluye cera y pinzas?',
      answer: 'Sí. Incluye el mismo diseño personalizado, cera y pinzas que Brow Sculpt.'
    }
  },
  'brow-lamination': {
    en: {
      idealFor: 'For clients looking for a brushed, more structured appearance using their existing brow hairs, with shape and tint included.',
      comparison: 'Brow Lamination styles the position of brow hairs. Brow Sculpt & Tint focuses on shaping and colour; cosmetic tattooing uses pigment to create a semi-permanent effect.',
      question: 'How long do the results last?',
      answer: 'Results typically last 6–8 weeks, depending on your natural brow growth cycle, hair condition and aftercare. The tint may fade sooner than the lamination effect.'
    },
    pt: {
      idealFor: 'Para quem busca sobrancelhas alinhadas e estruturadas utilizando os fios naturais, com modelagem e coloração incluídas.',
      comparison: 'Brow Lamination alinha os fios. Brow Sculpt & Tint foca na modelagem e na coloração; a tatuagem cosmética utiliza pigmento para efeito semipermanente.',
      question: 'Brow Lamination inclui modelagem e coloração?',
      answer: 'O tratamento combina laminação, modelagem e coloração das sobrancelhas. Confirme a indicação e o preparo com o estúdio antes do atendimento.'
    },
    es: {
      idealFor: 'Para quienes buscan cejas peinadas y estructuradas con el pelo natural, con diseño y tinte incluidos.',
      comparison: 'Brow Lamination peina el pelo de las cejas. Brow Sculpt & Tint se centra en forma y color; el tatuaje cosmético usa pigmento para un efecto semipermanente.',
      question: '¿Brow Lamination incluye diseño y tinte?',
      answer: 'El tratamiento combina laminado, diseño y tinte de cejas. Confirma la idoneidad y la preparación con el estudio antes de la cita.'
    }
  },
  'lash-lift': {
    en: {
      idealFor: 'For clients who prefer to enhance the appearance of their own natural lashes without adding extensions.',
      comparison: 'A Lash Lift works with natural lashes, whereas Classic, Hybrid and Wet Look appointments involve lash extensions. The desired look and individual suitability determine which service is more appropriate.',
      question: 'Should I book Lash Lift & Tint or eyelash extensions?',
      answer: 'Choose Lash Lift & Tint if you want to explore enhancing your own lashes, or discuss extensions if you prefer an added-lash look. Ask the studio about aftercare and eye-area suitability.'
    },
    pt: {
      idealFor: 'Para quem prefere realçar os próprios cílios naturais sem adicionar extensões.',
      comparison: 'Lash Lift trabalha os cílios naturais; Classic, Hybrid e Wet Look envolvem aplicação de extensões. O resultado desejado e a indicação individual orientam a escolha.',
      question: 'Devo agendar Lash Lift & Tint ou extensões?',
      answer: 'Lash Lift & Tint é uma opção para realçar os próprios cílios. Para um efeito com fios adicionados, consulte sobre extensões e cuidados necessários.'
    },
    es: {
      idealFor: 'Para quienes prefieren realzar sus pestañas naturales sin añadir extensiones.',
      comparison: 'Lash Lift trabaja las pestañas naturales, mientras que Classic, Hybrid y Wet Look utilizan extensiones. El resultado buscado y la idoneidad individual orientan la elección.',
      question: '¿Debo reservar Lash Lift & Tint o extensiones?',
      answer: 'Lash Lift & Tint permite explorar el realce de las pestañas naturales. Para un efecto de pestañas añadidas, consulta sobre extensiones y cuidados.'
    }
  },
  'dermaplaning': {
    en: { idealFor: "Best for dull skin, peach fuzz and smoother makeup application. Suitable for most skin types. Not recommended with active acne or breakouts, sunburn, or recent retinoid use.", comparison: "Dermaplaning and Facial Spa give an instant glow with no downtime. Microneedling works over a course of sessions for longer-term results on texture and scarring, with some redness for 24–48 hours. The Deluxe Facial combines dermaplaning, microneedling, mask and LED in one visit.", question: "Will my hair grow back thicker or darker?", answer: "No. Dermaplaning removes fine vellus hair, which grows back the same." },
    pt: { idealFor: "Ideal para pele opaca, penugem e para a maquiagem assentar melhor. Indicado para a maioria dos tipos de pele. Não é recomendado com acne ativa, queimadura de sol ou uso recente de retinoides.", comparison: "Dermaplaning e Facial Spa dão brilho imediato, sem tempo de recuperação. O Microneedling é feito em sessões para resultados a longo prazo em textura e cicatrizes, com vermelhidão por 24–48 horas. O Deluxe Facial combina dermaplaning, microneedling, máscara e LED em uma só visita.", question: "Os pelos voltam mais grossos ou escuros?", answer: "Não. O dermaplaning remove a penugem fina, que volta a crescer igual." },
    es: { idealFor: "Ideal para piel apagada, vello facial fino y para que el maquillaje se asiente mejor. Adecuado para la mayoría de tipos de piel. No se recomienda con acné activo, quemaduras solares o uso reciente de retinoides.", comparison: "Dermaplaning y Facial Spa dan luminosidad inmediata, sin tiempo de recuperación. Microneedling se realiza en varias sesiones para resultados a largo plazo en textura y cicatrices, con enrojecimiento durante 24–48 horas. Deluxe Facial combina dermaplaning, microneedling, mascarilla y LED en una visita.", question: "¿El vello vuelve a crecer más grueso u oscuro?", answer: "No. El dermaplaning retira el vello fino, que vuelve a crecer igual." }
  },
  'teeth-whitening': {
    en: { idealFor: "Cosmetic teeth whitening is a great fit if you have natural teeth with stains from coffee, tea, wine or smoking. It isn’t suitable if you’re pregnant or breastfeeding, under 18, or have untreated cavities, inflamed gums or strong tooth sensitivity.", comparison: "Teeth Whitening is a separate appointment from cosmetic tattooing and facial treatments. Crowns, veneers and fillings won’t change colour.", question: "How much does Teeth Whitening cost and how long does it take?", answer: "A$199 for an appointment of approximately 1 hour." },
    pt: { idealFor: "O clareamento estético é ideal para dentes naturais com manchas de café, chá, vinho ou cigarro. Não é indicado para gestantes ou lactantes, menores de 18 anos, ou para quem tem cáries sem tratamento, gengiva inflamada ou sensibilidade forte.", comparison: "O clareamento é um atendimento separado da tatuagem cosmética e dos tratamentos faciais. Coroas, facetas e restaurações não mudam de cor.", question: "Quanto custa e quanto dura o clareamento dental?", answer: "A$199 por um atendimento de aproximadamente 1 hora." },
    es: { idealFor: "El blanqueamiento estético es ideal si tienes dientes naturales con manchas de café, té, vino o tabaco. No es adecuado durante el embarazo o la lactancia, para menores de 18 años, ni con caries sin tratar, encías inflamadas o sensibilidad fuerte.", comparison: "El blanqueamiento es una cita distinta del tatuaje cosmético y los tratamientos faciales. Coronas, carillas y empastes no cambian de color.", question: "¿Cuánto cuesta y cuánto dura el blanqueamiento?", answer: "A$199 por una cita de aproximadamente 1 hora." }
  },
  'facial-spa': {
    en: { idealFor: "A relaxing cleanse, exfoliation and hydration for all skin types. A great first treatment if you’re not sure where to start.", comparison: "Dermaplaning and Facial Spa give an instant glow with no downtime. Microneedling works over a course of sessions for longer-term results on texture and scarring, with some redness for 24–48 hours. The Deluxe Facial combines dermaplaning, microneedling, mask and LED in one visit.", question: "Which skin treatment should I choose?", answer: "For a glow before an event: Dermaplaning or Facial Spa. For long-term results on texture, fine lines or scarring: Microneedling. For everything in one visit: the Deluxe Facial." },
    pt: { idealFor: "Limpeza, esfoliação e hidratação relaxantes para todos os tipos de pele. Um ótimo primeiro tratamento se você não sabe por onde começar.", comparison: "Dermaplaning e Facial Spa dão brilho imediato, sem tempo de recuperação. O Microneedling é feito em sessões para resultados a longo prazo em textura e cicatrizes, com vermelhidão por 24–48 horas. O Deluxe Facial combina dermaplaning, microneedling, máscara e LED em uma só visita.", question: "Qual tratamento de pele devo escolher?", answer: "Para um brilho antes de um evento: Dermaplaning ou Facial Spa. Para resultados a longo prazo em textura, linhas finas ou cicatrizes: Microneedling. Para tudo em uma só visita: Deluxe Facial." },
    es: { idealFor: "Limpieza, exfoliación e hidratación relajantes para todo tipo de piel. Un excelente primer tratamiento si no sabes por dónde empezar.", comparison: "Dermaplaning y Facial Spa dan luminosidad inmediata, sin tiempo de recuperación. Microneedling se realiza en varias sesiones para resultados a largo plazo en textura y cicatrices, con enrojecimiento durante 24–48 horas. Deluxe Facial combina dermaplaning, microneedling, mascarilla y LED en una visita.", question: "¿Qué tratamiento de piel debo elegir?", answer: "Para lucir radiante antes de un evento: Dermaplaning o Facial Spa. Para resultados a largo plazo en textura, líneas finas o cicatrices: Microneedling. Para todo en una visita: Deluxe Facial." }
  }
};
