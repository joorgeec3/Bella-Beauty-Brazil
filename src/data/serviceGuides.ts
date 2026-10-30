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
    en: { idealFor: 'For clients researching cosmetic tattoo services for brows or lips who would like a consultation before choosing a particular technique.', comparison: 'Cosmetic tattooing is an umbrella category rather than a single fixed treatment. Nano Strokes focuses on brow hair-stroke effects; Lip Blush is a separate lip-pigment service. Brow Sculpt & Hybrid Brow is a styling service, not a confirmed tattoo appointment.', question: 'Which cosmetic tattoo appointment should I choose?', answer: 'Review Nano Strokes and Lip Blush separately, and ask Bella Beauty Brazil about suitability, colour, preparation and aftercare. Current availability is on Timely.' },
    pt: { idealFor: 'Para quem pesquisa tatuagem cosmética de sobrancelhas ou lábios e quer uma avaliação antes de escolher a técnica.', comparison: 'Tatuagem cosmética é uma categoria, não um procedimento único. Nano Strokes cria efeito de fios nas sobrancelhas; Lip Blush é um atendimento distinto para pigmentação labial. Brow Sculpt & Hybrid Brow é styling, não um atendimento de tatuagem confirmado.', question: 'Qual serviço de tatuagem cosmética devo escolher?', answer: 'Consulte Nano Strokes e Lip Blush individualmente e pergunte à Bella Beauty Brazil sobre indicação, cor, preparo e cuidados. A disponibilidade está no Timely.' },
    es: { idealFor: 'Para quienes buscan tatuaje cosmético en cejas o labios y desean una consulta antes de elegir la técnica.', comparison: 'El tatuaje cosmético es una categoría, no un único procedimiento. Nano Strokes crea trazos similares al pelo en las cejas; Lip Blush es un servicio distinto de pigmentación de labios. Brow Sculpt & Hybrid Brow es diseño, no una cita de tatuaje confirmada.', question: '¿Qué servicio de tatuaje cosmético debo elegir?', answer: 'Consulta Nano Strokes y Lip Blush por separado y pregunta a Bella Beauty Brazil sobre idoneidad, color, preparación y cuidados. La disponibilidad aparece en Timely.' }
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
    en: { idealFor: 'For clients considering a more understated eyelash-extension appearance, subject to consultation about desired fullness and eye-area suitability.', comparison: 'Classic extensions apply a more subtle extension style than the denser Hybrid or Russian Volume options. Lash Lift & Tint instead works with natural lashes.', question: 'What is different about Classic eyelash extensions?', answer: 'Classic, Hybrid and Russian Volume are separately listed on Timely. Discuss the look you want, maintenance appointments and appropriate aftercare with the studio.' },
    pt: { idealFor: 'Para quem deseja avaliar um resultado de extensão de cílios mais discreto, conforme volume desejado e indicação para a região dos olhos.', comparison: 'Extensões Classic tendem a um efeito mais discreto que as opções Hybrid ou Russian Volume. Lash Lift & Tint, por sua vez, trabalha os fios naturais.', question: 'Qual é a diferença das extensões Classic?', answer: 'Classic, Hybrid e Russian Volume são serviços separados no Timely. Converse sobre o efeito, manutenção e cuidados com o estúdio.' },
    es: { idealFor: 'Para quienes consideran extensiones con efecto más discreto, según el volumen deseado y la idoneidad de la zona ocular.', comparison: 'Classic suele ofrecer un efecto de extensión más sutil que Hybrid o Russian Volume. Lash Lift & Tint trabaja las pestañas naturales.', question: '¿Cuál es la diferencia de las extensiones Classic?', answer: 'Classic, Hybrid y Russian Volume aparecen por separado en Timely. Habla con el estudio sobre el acabado, mantenimiento y cuidados.' }
  },
  'hybrid-eyelashes': {
    en: { idealFor: 'For clients exploring a textured eyelash-extension look between the Classic and Russian Volume styles.', comparison: 'Hybrid extensions combine styling approaches for a different density from Classic. Russian Volume is a separate volume-focused appointment, and Lash Lift uses natural lashes without an extension set.', question: 'Are Hybrid lashes the same as Russian Volume?', answer: 'No. Timely lists them as different bookings with different appointment lengths and prices. The studio can advise which finish suits your preferences.' },
    pt: { idealFor: 'Para quem busca um efeito de extensão de cílios com mais textura, entre os estilos Classic e Russian Volume.', comparison: 'Extensões Hybrid combinam estilos para uma densidade diferente das Classic. Russian Volume tem agendamento próprio, enquanto Lash Lift realça os cílios naturais sem um conjunto de extensões.', question: 'Cílios Hybrid são iguais a Russian Volume?', answer: 'Não. O Timely apresenta agendamentos, durações e valores separados. O estúdio pode orientar sobre o acabamento mais adequado.' },
    es: { idealFor: 'Para quienes buscan un efecto de extensiones con textura entre Classic y Russian Volume.', comparison: 'Hybrid combina estilos para una densidad distinta de Classic. Russian Volume tiene una reserva independiente y Lash Lift realza las pestañas naturales sin extensiones.', question: '¿Hybrid es lo mismo que Russian Volume?', answer: 'No. Timely los publica con duración y precios diferentes. El estudio puede orientarte sobre el acabado.' }
  },
  'russian-volume': {
    en: { idealFor: 'For clients interested in a more pronounced eyelash-extension look and prepared to discuss maintenance and eye-area suitability.', comparison: 'Russian Volume is a volume-focused lash extension service. Classic is usually subtler, Hybrid offers a mixed effect and Lash Lift works with natural lashes.', question: 'What should I ask before a Russian Volume appointment?', answer: 'Ask Bella Beauty Brazil about desired fullness, suitability, available refill options and the aftercare recommended for your appointment.' },
    pt: { idealFor: 'Para quem deseja avaliar um resultado de extensão com maior volume e conversar sobre manutenção e indicação para a área dos olhos.', comparison: 'Russian Volume é um serviço de extensão com foco em volume. Classic tende a ser mais discreto, Hybrid tem efeito misto e Lash Lift trabalha cílios naturais.', question: 'O que perguntar antes de agendar Russian Volume?', answer: 'Converse sobre a densidade desejada, indicação, opções de manutenção e os cuidados recomendados pelo estúdio.' },
    es: { idealFor: 'Para quienes quieren un efecto de extensiones con más volumen y desean consultar mantenimiento e idoneidad ocular.', comparison: 'Russian Volume es un servicio de extensiones centrado en el volumen. Classic suele ser más discreto, Hybrid combina estilos y Lash Lift trabaja las pestañas naturales.', question: '¿Qué debo consultar antes de Russian Volume?', answer: 'Pregunta por la densidad deseada, la idoneidad, las citas de mantenimiento y los cuidados del estudio.' }
  },
  microneedling: {
    en: { idealFor: 'For clients interested in discussing a professional microneedling skin appointment and their personal skincare goals with the studio.', comparison: 'Microneedling is different from Dermaplaning and Facial Spa. It involves a different procedure and should not be described as equivalent to a relaxing facial.', question: 'Can I book Microneedling without discussing my skin?', answer: 'Contact Bella Beauty Brazil about suitability, contraindications, preparation and aftercare before proceeding. Individual skin conditions require professional assessment.' },
    pt: { idealFor: 'Para quem deseja consultar o estúdio sobre microneedling profissional e seus objetivos de cuidado com a pele.', comparison: 'Microneedling difere de Dermaplaning e Facial Spa. É outro procedimento e não deve ser apresentado como equivalente a um facial relaxante.', question: 'Posso agendar Microneedling sem avaliação da pele?', answer: 'Consulte a Bella Beauty Brazil sobre indicação, contraindicações, preparo e cuidados antes do procedimento. Condições individuais exigem avaliação profissional.' },
    es: { idealFor: 'Para quienes desean consultar al estudio sobre microneedling profesional y sus objetivos de cuidado de la piel.', comparison: 'Microneedling es distinto de Dermaplaning y Facial Spa. El procedimiento es diferente y no equivale a un facial relajante.', question: '¿Puedo reservar Microneedling sin consultar sobre mi piel?', answer: 'Habla con Bella Beauty Brazil sobre idoneidad, contraindicaciones, preparación y cuidados. Cada piel necesita una valoración profesional.' }
  },
  'deluxe-facial': {
    en: { idealFor: 'For clients exploring a longer, deluxe facial-care appointment at Bella Beauty Brazil and wanting to understand the treatment before booking.', comparison: 'Deluxe Facial and Facial Spa are published as separate services with different durations and prices. Dermaplaning and Microneedling are further distinct skin procedures.', question: 'What is included in the Deluxe Facial?', answer: 'The published Timely catalogue confirms its name, duration and price, but not a full step-by-step protocol. Confirm treatment steps and suitability directly with Bella Beauty Brazil.' },
    pt: { idealFor: 'Para quem deseja conhecer um atendimento facial mais longo e completo e saber o que será feito antes de agendar.', comparison: 'Deluxe Facial e Facial Spa são serviços separados no Timely, com durações e valores diferentes. Dermaplaning e Microneedling são outros procedimentos.', question: 'O que está incluído no Deluxe Facial?', answer: 'O catálogo Timely confirma nome, duração e valor, mas não todas as etapas do protocolo. Peça a descrição detalhada e verifique a indicação com a Bella Beauty Brazil.' },
    es: { idealFor: 'Para quienes quieren conocer una cita facial más larga y saber en qué consiste antes de reservar.', comparison: 'Deluxe Facial y Facial Spa son servicios independientes en Timely con duraciones y precios distintos. Dermaplaning y Microneedling son otros procedimientos.', question: '¿Qué incluye el Deluxe Facial?', answer: 'El catálogo Timely confirma nombre, duración y precio, pero no detalla todos los pasos. Consulta el protocolo y la idoneidad con Bella Beauty Brazil.' }
  },
  waxing: {
    en: { idealFor: 'For clients interested in the Brazilian Waxing appointment listed in the studio catalogue, with treatment details and suitability confirmed ahead of time.', comparison: 'Brazilian Waxing is a hair-removal service, not the same as facial treatments, lash extensions or brow shaping. Other waxing areas are listed separately on Timely.', question: 'Is Brazilian Waxing the same as a Full Leg or Bikini Wax?', answer: 'No. Timely lists separate waxing treatments for different areas. Book the exact area you need and confirm preparation and aftercare with the studio.' },
    pt: { idealFor: 'Para quem procura o serviço Brazilian Waxing no catálogo do estúdio e quer confirmar detalhes e indicação antes do atendimento.', comparison: 'Brazilian Waxing é um serviço de depilação, não um tratamento facial, extensão de cílios ou design de sobrancelhas. Outras regiões de depilação são listadas separadamente no Timely.', question: 'Brazilian Waxing é igual a Full Leg ou Bikini Wax?', answer: 'Não. O Timely lista opções para diferentes regiões. Escolha o atendimento correspondente e confirme preparo e cuidados com o estúdio.' },
    es: { idealFor: 'Para quienes buscan el servicio Brazilian Waxing publicado por el estudio y desean consultar los detalles antes de reservar.', comparison: 'Brazilian Waxing es un servicio de depilación, distinto de faciales, extensiones de pestañas y diseño de cejas. Otras zonas se publican por separado en Timely.', question: '¿Brazilian Waxing es igual a Full Leg o Bikini Wax?', answer: 'No. Timely tiene opciones distintas según la zona. Elige la cita correspondiente y consulta la preparación y los cuidados.' }
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
      comparison: 'A Lash Lift works with natural lashes, whereas Classic, Hybrid and Russian Volume appointments involve lash extensions. The desired look and individual suitability determine which service is more appropriate.',
      question: 'Should I book Lash Lift & Tint or eyelash extensions?',
      answer: 'Choose Lash Lift & Tint if you want to explore enhancing your own lashes, or discuss extensions if you prefer an added-lash look. Ask the studio about aftercare and eye-area suitability.'
    },
    pt: {
      idealFor: 'Para quem prefere realçar os próprios cílios naturais sem adicionar extensões.',
      comparison: 'Lash Lift trabalha os cílios naturais; Classic, Hybrid e Russian Volume envolvem aplicação de extensões. O resultado desejado e a indicação individual orientam a escolha.',
      question: 'Devo agendar Lash Lift & Tint ou extensões?',
      answer: 'Lash Lift & Tint é uma opção para realçar os próprios cílios. Para um efeito com fios adicionados, consulte sobre extensões e cuidados necessários.'
    },
    es: {
      idealFor: 'Para quienes prefieren realzar sus pestañas naturales sin añadir extensiones.',
      comparison: 'Lash Lift trabaja las pestañas naturales, mientras que Classic, Hybrid y Russian Volume utilizan extensiones. El resultado buscado y la idoneidad individual orientan la elección.',
      question: '¿Debo reservar Lash Lift & Tint o extensiones?',
      answer: 'Lash Lift & Tint permite explorar el realce de las pestañas naturales. Para un efecto de pestañas añadidas, consulta sobre extensiones y cuidados.'
    }
  },
  'dermaplaning': {
    en: {
      idealFor: 'For clients exploring a professional skin treatment and wanting to discuss whether dermaplaning is suitable for their current skin needs.',
      comparison: 'Dermaplaning, Microneedling and Facial Spa are different skin treatments; they should not be described as interchangeable. The studio can guide you towards an appropriate appointment.',
      question: 'Is Dermaplaning the same as Microneedling?',
      answer: 'No. They are distinct treatments with different procedures and aftercare. Discuss your skin goals and any sensitivities with Bella Beauty Brazil before booking.'
    },
    pt: {
      idealFor: 'Para quem busca um tratamento profissional de pele e deseja avaliar se o dermaplaning é indicado para suas necessidades atuais.',
      comparison: 'Dermaplaning, Microneedling e Facial Spa são tratamentos diferentes; não devem ser tratados como equivalentes. O estúdio pode orientar qual atendimento considerar.',
      question: 'Dermaplaning é igual a Microneedling?',
      answer: 'Não. São tratamentos distintos, com procedimentos e cuidados diferentes. Converse sobre seus objetivos e sensibilidades com a Bella Beauty Brazil antes de agendar.'
    },
    es: {
      idealFor: 'Para quienes buscan un tratamiento profesional de la piel y desean saber si dermaplaning se adapta a sus necesidades.',
      comparison: 'Dermaplaning, Microneedling y Facial Spa son tratamientos diferentes y no son intercambiables. El estudio puede orientarte sobre la cita apropiada.',
      question: '¿Dermaplaning es igual a Microneedling?',
      answer: 'No. Son tratamientos distintos, con procedimientos y cuidados diferentes. Consulta tus objetivos y sensibilidades con Bella Beauty Brazil antes de reservar.'
    }
  },
  'teeth-whitening': {
    en: {
      idealFor: 'For clients interested in asking the studio about its professional teeth whitening appointment. Personal suitability and expected results should be discussed before booking.',
      comparison: 'Teeth Whitening is listed separately from cosmetic tattooing and facial skin treatments. It is a distinct appointment rather than part of a facial or brow service.',
      question: 'How much is Teeth Whitening and how long does it take?',
      answer: 'The Bella Beauty Brazil Timely catalogue lists Teeth Whitening at A$199 for 1 hour. Confirm availability, preparation and aftercare on the official booking page.'
    },
    pt: {
      idealFor: 'Para quem deseja consultar o estúdio sobre seu serviço profissional de clareamento dental. A indicação e o resultado esperado devem ser discutidos antes de agendar.',
      comparison: 'Teeth Whitening é um atendimento separado de tatuagem cosmética e tratamentos faciais. Não faz parte automaticamente de serviços de pele ou sobrancelhas.',
      question: 'Quanto custa e quanto dura o clareamento dental?',
      answer: 'O catálogo Timely da Bella Beauty Brazil publica Teeth Whitening por A$199, com duração de 1 hora. Confirme disponibilidade, preparo e cuidados pelo agendamento oficial.'
    },
    es: {
      idealFor: 'Para quienes desean consultar con el estudio sobre el blanqueamiento dental profesional. La idoneidad y los resultados esperados deben hablarse antes de reservar.',
      comparison: 'Teeth Whitening se publica por separado del tatuaje cosmético y los tratamientos faciales. No forma parte automáticamente de un servicio facial o de cejas.',
      question: '¿Cuánto cuesta y cuánto dura Teeth Whitening?',
      answer: 'El catálogo Timely de Bella Beauty Brazil indica A$199 y 1 hora. Confirma disponibilidad, preparación y cuidados a través de la reserva oficial.'
    }
  },
  'facial-spa': {
    en: {
      idealFor: 'For clients wanting to enquire about a dedicated facial appointment and the approach offered by Bella Beauty Brazil.',
      comparison: 'Facial Spa is a separately listed appointment from Dermaplaning, Microneedling and Deluxe Facial. Treatment selection depends on your concerns and the studio’s consultation.',
      question: 'Which facial should I choose?',
      answer: 'Review the separately published options and contact Bella Beauty Brazil to discuss your skin concerns, suitability and appointment details.'
    },
    pt: {
      idealFor: 'Para quem deseja saber mais sobre os cuidados oferecidos em um atendimento facial da Bella Beauty Brazil.',
      comparison: 'Facial Spa é separado de Dermaplaning, Microneedling e Deluxe Facial no Timely. A escolha depende das necessidades e da orientação do estúdio.',
      question: 'Qual tratamento facial escolher?',
      answer: 'Veja as opções publicadas separadamente e converse com a Bella Beauty Brazil sobre seus objetivos, indicação e detalhes do atendimento.'
    },
    es: {
      idealFor: 'Para quienes desean informarse sobre una cita de cuidado facial de Bella Beauty Brazil.',
      comparison: 'Facial Spa se publica por separado de Dermaplaning, Microneedling y Deluxe Facial. La elección depende de tus necesidades y de la consulta con el estudio.',
      question: '¿Qué tratamiento facial debo elegir?',
      answer: 'Revisa las opciones publicadas y consulta con Bella Beauty Brazil tus objetivos, idoneidad y detalles de la cita.'
    }
  }
};
