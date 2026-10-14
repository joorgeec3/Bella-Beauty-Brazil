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
    en: { idealFor: 'For clients who want to refresh their natural brow outline through shaping without automatically adding a tint.', comparison: 'Brow Sculpt Signature is a shaping appointment. Brow Sculpt & Tint explicitly adds tint, while Brow Lamination, Shape & Tint is a separate lamination service.', question: 'Does Brow Sculpt Signature include tint?', answer: 'The published service title does not specify tint. Choose Brow Sculpt & Tint if tint is important, or confirm inclusions with Bella Beauty Brazil.' },
    pt: { idealFor: 'Para quem quer renovar o formato das sobrancelhas naturais por meio de modelagem, sem incluir coloração automaticamente.', comparison: 'Brow Sculpt Signature é uma sessão de modelagem. Brow Sculpt & Tint inclui tintura no nome do serviço; Brow Lamination, Shape & Tint é um atendimento distinto.', question: 'Brow Sculpt Signature inclui tintura?', answer: 'A descrição publicada não especifica tintura. Considere Brow Sculpt & Tint se desejar coloração ou confirme os itens incluídos com o estúdio.' },
    es: { idealFor: 'Para quienes quieren renovar la forma natural de sus cejas sin añadir tinte necesariamente.', comparison: 'Brow Sculpt Signature es una cita de diseño. Brow Sculpt & Tint indica tinte en el nombre; Brow Lamination, Shape & Tint es una cita distinta.', question: '¿Brow Sculpt Signature incluye tinte?', answer: 'El nombre publicado no especifica tinte. Elige Brow Sculpt & Tint si quieres color o consulta con el estudio.' }
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
      idealFor: 'For clients who prefer the look of individual brow hairs rather than a heavily filled-in brow. Livia can assess your existing brows, desired shape and whether cosmetic tattooing is appropriate for you.',
      comparison: 'Nano Strokes and Microblading both aim for a hair-stroke appearance, but the tools and application technique can differ. Brow Sculpt & Tint colours and shapes existing hairs without creating cosmetic tattoo strokes; Hybrid Brows is also a styling service in the published Timely catalogue.',
      question: 'Should I choose Nano Strokes or Brow Sculpt & Tint?',
      answer: 'Choose based on whether you want to explore semi-permanent hair-stroke cosmetic tattooing or a temporary brow styling appointment. Ask Bella Beauty Brazil which service suits your goals before booking.'
    },
    pt: {
      idealFor: 'Para quem prefere um efeito de fios individuais nas sobrancelhas, em vez de um preenchimento marcado. Livia pode avaliar os fios existentes, o formato desejado e a indicação da tatuagem cosmética.',
      comparison: 'Nano Strokes e Microblading buscam um efeito de fios realistas, mas podem utilizar ferramentas e técnicas de aplicação diferentes. Brow Sculpt & Tint modela e colore os fios existentes sem tatuagem cosmética; Hybrid Brows é um serviço de styling no catálogo Timely.',
      question: 'Devo escolher Nano Strokes ou Brow Sculpt & Tint?',
      answer: 'Depende se você deseja avaliar uma tatuagem cosmética semipermanente com efeito de fios ou um serviço temporário de modelagem. Consulte a Bella Beauty Brazil antes de agendar.'
    },
    es: {
      idealFor: 'Para quienes prefieren un efecto de vellos individuales en las cejas, en lugar de un relleno intenso. Livia puede evaluar las cejas existentes, la forma deseada y la idoneidad del tatuaje cosmético.',
      comparison: 'Nano Strokes y Microblading buscan un efecto de trazos realistas, pero las herramientas y técnicas pueden variar. Brow Sculpt & Tint da forma y color al pelo existente sin tatuaje cosmético; Hybrid Brows es un servicio de diseño en el catálogo Timely.',
      question: '¿Debo elegir Nano Strokes o Brow Sculpt & Tint?',
      answer: 'Depende de si quieres explorar un tatuaje cosmético semipermanente o un servicio temporal de diseño. Consulta con Bella Beauty Brazil antes de reservar.'
    }
  },
  'shadow-hybrid': {
    en: {
      idealFor: 'For clients who want a more defined look using shaping and hybrid brow colour. The published Timely service is Brow Sculpt & Hybrid Brow, not a separately confirmed semi-permanent Shadow Brows tattoo.',
      comparison: 'Hybrid brow styling works with the natural brow hairs and skin tinting approach used in the appointment. Shadow or Powder Brows can describe a cosmetic tattoo effect, which must not be confused with the A$79 styling service listed on Timely.',
      question: 'Does the Hybrid Brow booking include semi-permanent Shadow Brows tattooing?',
      answer: 'No such inclusion is confirmed in the published service listing. Contact Bella Beauty Brazil for a separate cosmetic tattooing consultation if that is the result you want.'
    },
    pt: {
      idealFor: 'Para quem busca sobrancelhas mais definidas com modelagem e coloração híbrida. O serviço publicado no Timely é Brow Sculpt & Hybrid Brow, e não uma tatuagem Shadow Brows semipermanente confirmada separadamente.',
      comparison: 'O styling Hybrid trabalha o formato e a coloração das sobrancelhas. Shadow ou Powder Brows também podem designar técnicas de tatuagem cosmética, que não devem ser confundidas com o serviço de styling de A$79 do Timely.',
      question: 'O agendamento Hybrid Brow inclui tatuagem Shadow Brows semipermanente?',
      answer: 'Essa inclusão não está confirmada no serviço publicado. Consulte a Bella Beauty Brazil sobre uma avaliação de tatuagem cosmética, caso seja esse o resultado desejado.'
    },
    es: {
      idealFor: 'Para quienes buscan unas cejas más definidas mediante diseño y color híbrido. El servicio publicado en Timely es Brow Sculpt & Hybrid Brow, no un tatuaje Shadow Brows semipermanente confirmado por separado.',
      comparison: 'El diseño Hybrid trabaja la forma y el color de las cejas. Shadow o Powder Brows también pueden referirse a tatuaje cosmético, que no debe confundirse con el diseño de A$79 publicado en Timely.',
      question: '¿La cita Hybrid Brow incluye tatuaje Shadow Brows semipermanente?',
      answer: 'No hay confirmación de esa inclusión en el servicio publicado. Consulta con Bella Beauty Brazil sobre tatuaje cosmético si buscas ese resultado.'
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
      idealFor: 'For clients who want their existing brow hairs shaped and tinted in one appointment, with the finish tailored to their facial features.',
      comparison: 'Brow Sculpt & Tint shapes and colours natural brow hairs. Brow Lamination also changes the direction and appearance of those hairs, while Nano Strokes is a cosmetic tattooing service.',
      question: 'Is Brow Sculpt & Tint the same as Brow Lamination?',
      answer: 'No. The services are listed separately on Timely. Choose the appointment that matches your styling goals, or ask the studio for guidance.'
    },
    pt: {
      idealFor: 'Para quem quer modelar e colorir os fios naturais das sobrancelhas no mesmo atendimento, com acabamento adaptado aos traços do rosto.',
      comparison: 'Brow Sculpt & Tint modela e colore os fios naturais. Brow Lamination também modifica a direção e o visual dos fios; Nano Strokes é um serviço de tatuagem cosmética.',
      question: 'Brow Sculpt & Tint é igual a Brow Lamination?',
      answer: 'Não. São serviços separados no Timely. Escolha conforme o acabamento desejado ou peça orientação ao estúdio.'
    },
    es: {
      idealFor: 'Para quienes desean dar forma y color a sus cejas naturales en una misma cita, con un acabado adaptado a sus facciones.',
      comparison: 'Brow Sculpt & Tint diseña y tiñe el pelo natural. Brow Lamination también modifica su dirección y apariencia; Nano Strokes es un servicio de tatuaje cosmético.',
      question: '¿Brow Sculpt & Tint es igual a Brow Lamination?',
      answer: 'No. Son servicios distintos en Timely. Elige según el resultado deseado o pide orientación al estudio.'
    }
  },
  'brow-lamination': {
    en: {
      idealFor: 'For clients looking for a brushed, more structured appearance using their existing brow hairs, with shape and tint included in the published appointment.',
      comparison: 'Brow Lamination styles the position of brow hairs. Brow Sculpt & Tint focuses on shaping and colour; cosmetic tattooing uses pigment to create a semi-permanent effect.',
      question: 'Does Brow Lamination include shape and tint?',
      answer: 'The Bella Beauty Brazil Timely listing is called Brow Lamination, Shape & Tint. Confirm suitability and any preparation before booking.'
    },
    pt: {
      idealFor: 'Para quem busca sobrancelhas alinhadas e estruturadas utilizando os fios naturais, com modelagem e coloração incluídas no atendimento publicado.',
      comparison: 'Brow Lamination alinha os fios. Brow Sculpt & Tint foca na modelagem e na coloração; a tatuagem cosmética utiliza pigmento para efeito semipermanente.',
      question: 'Brow Lamination inclui modelagem e coloração?',
      answer: 'O serviço do Timely se chama Brow Lamination, Shape & Tint. Confirme indicação e orientações de preparo antes do agendamento.'
    },
    es: {
      idealFor: 'Para quienes buscan cejas peinadas y estructuradas con el pelo natural, con diseño y tinte incluidos en la cita publicada.',
      comparison: 'Brow Lamination peina el pelo de las cejas. Brow Sculpt & Tint se centra en forma y color; el tatuaje cosmético usa pigmento para un efecto semipermanente.',
      question: '¿Brow Lamination incluye diseño y tinte?',
      answer: 'El servicio en Timely se llama Brow Lamination, Shape & Tint. Confirma idoneidad y preparación antes de reservar.'
    }
  },
  'lash-lift': {
    en: {
      idealFor: 'For clients who prefer to enhance the appearance of their own lashes without booking an extension set. Lash Lift & Tint is a separate service in Timely.',
      comparison: 'A Lash Lift works with natural lashes, whereas Classic, Hybrid and Russian Volume appointments involve lash extensions. The desired look and individual suitability determine which service is more appropriate.',
      question: 'Should I book Lash Lift & Tint or eyelash extensions?',
      answer: 'Choose Lash Lift & Tint if you want to explore enhancing your own lashes, or discuss extensions if you prefer an added-lash look. Ask the studio about aftercare and eye-area suitability.'
    },
    pt: {
      idealFor: 'Para quem prefere realçar os próprios cílios sem agendar uma aplicação de extensões. Lash Lift & Tint é um serviço separado no Timely.',
      comparison: 'Lash Lift trabalha os cílios naturais; Classic, Hybrid e Russian Volume envolvem aplicação de extensões. O resultado desejado e a indicação individual orientam a escolha.',
      question: 'Devo agendar Lash Lift & Tint ou extensões?',
      answer: 'Lash Lift & Tint é uma opção para realçar os próprios cílios. Para um efeito com fios adicionados, consulte sobre extensões e cuidados necessários.'
    },
    es: {
      idealFor: 'Para quienes prefieren realzar sus pestañas naturales sin reservar un conjunto de extensiones. Lash Lift & Tint es un servicio separado en Timely.',
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
