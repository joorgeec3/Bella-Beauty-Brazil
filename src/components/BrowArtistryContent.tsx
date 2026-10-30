import React from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';
import { getServiceBookingUrl, SERVICES, type Language } from '../data/siteData';

export const BROW_ARTISTRY_IDS = ['brow-sculpt', 'brow-sculpt-tint', 'shadow-hybrid'] as const;
type BrowService = typeof BROW_ARTISTRY_IDS[number];
const isBrowService = (id: string): id is BrowService => BROW_ARTISTRY_IDS.some(key => key === id);

const descriptions: Record<Language, Record<BrowService, string[]>> = {
  en: {
    'brow-sculpt': [
      'Every brow is unique. Our Brow Sculpt combines your personal preferences with Lívia’s professional expertise to create a shape that complements your facial features.',
      'Each appointment begins with a consultation, followed by personalised brow mapping, precise waxing, tweezing and careful trimming where needed. The shape, thickness and finish are tailored to you.',
      'Shaping only. Tint and hybrid dye are not included.',
    ],
    'brow-sculpt-tint': [
      'Just like Brow Sculpt, this treatment includes a personalised consultation, brow mapping, precise waxing, tweezing and careful trimming where needed. Shape, thickness and finish are tailored to you.',
      'Traditional tint enhances the natural brow hairs for a fuller-looking, softly defined finish. The shade is selected to suit your features and preferences.',
    ],
    'shadow-hybrid': [
      'Just like Brow Sculpt, this treatment includes a personalised consultation, brow mapping, precise waxing, tweezing and careful trimming where needed. Shape, thickness and finish are tailored to you.',
      'Hybrid dye colours the brow hairs and temporarily stains the skin, helping soften the appearance of gaps. Colour and intensity are tailored to your preferred finish.',
      'Hybrid Dye is a temporary brow colour treatment, not cosmetic tattooing.',
    ],
  },
  pt: {
    'brow-sculpt': [
      'Cada sobrancelha é única. O Brow Sculpt combina suas preferências pessoais com a experiência profissional de Lívia para criar um formato que valorize seus traços faciais.',
      'Cada atendimento começa com uma consulta, seguida de mapeamento personalizado, depilação precisa com cera e pinça e aparo cuidadoso quando necessário. O formato, a espessura e o acabamento são adaptados a você.',
      'Somente modelagem. Tintura tradicional e coloração híbrida não estão incluídas.',
    ],
    'brow-sculpt-tint': [
      'Assim como o Brow Sculpt, este atendimento inclui consulta personalizada, mapeamento, depilação precisa com cera e pinça e aparo cuidadoso quando necessário. Formato, espessura e acabamento são adaptados a você.',
      'A tintura tradicional realça os pelos naturais, trazendo aparência mais cheia e definição suave. A tonalidade é escolhida conforme seus traços e preferências.',
    ],
    'shadow-hybrid': [
      'Assim como o Brow Sculpt, este atendimento inclui consulta personalizada, mapeamento, depilação precisa com cera e pinça e aparo cuidadoso quando necessário. Formato, espessura e acabamento são adaptados a você.',
      'A coloração híbrida colore os pelos e pigmenta temporariamente a pele, ajudando a suavizar a aparência de falhas. A cor e a intensidade são adaptadas ao acabamento desejado.',
      'Hybrid Dye é uma coloração temporária de sobrancelhas, não uma tatuagem cosmética.',
    ],
  },
  es: {
    'brow-sculpt': [
      'Cada ceja es única. Brow Sculpt combina tus preferencias con la experiencia profesional de Lívia para crear una forma que realce tus rasgos faciales.',
      'Cada cita comienza con una consulta, seguida de un diseño personalizado, depilación precisa con cera y pinzas y recorte cuando sea necesario. La forma, el grosor y el acabado se adaptan a ti.',
      'Solo diseño. No incluye tinte tradicional ni coloración híbrida.',
    ],
    'brow-sculpt-tint': [
      'Al igual que Brow Sculpt, este servicio incluye consulta personalizada, diseño, depilación precisa con cera y pinzas y recorte cuando sea necesario. La forma, el grosor y el acabado se adaptan a ti.',
      'El tinte tradicional realza el vello natural para un aspecto más lleno y suavemente definido. El tono se elige según tus rasgos y preferencias.',
    ],
    'shadow-hybrid': [
      'Al igual que Brow Sculpt, este servicio incluye consulta personalizada, diseño, depilación precisa con cera y pinzas y recorte cuando sea necesario. La forma, el grosor y el acabado se adaptan a ti.',
      'El tinte híbrido colorea el vello y tiñe temporalmente la piel, ayudando a disimular las zonas menos pobladas. El color y la intensidad se adaptan al acabado deseado.',
      'Hybrid Dye es un tratamiento temporal de color para cejas, no un tatuaje cosmético.',
    ],
  },
};

const labels: Record<Language, {
  price: string; about: string; before: string; after: string; patch: string; book: string;
  durations: Record<BrowService, string>; beforeItems: string[]; afterItems: string[]; patchDescription: string;
}> = {
  en: {
    price: 'Price & duration', about: 'About this treatment',
    before: 'Before Your Appointment', after: 'Aftercare', patch: 'Sensitivity test', book: 'Book now',
    durations: { 'brow-sculpt': '25 minutes', 'brow-sculpt-tint': 'Approximately 35 minutes', 'shadow-hybrid': 'Approximately 40 minutes' },
    beforeItems: [
      'Tell the studio about allergies, sensitive skin or previous reactions.',
      'Mention any recent skin treatments or prescription products used around your brows.',
      'If you use retinol or exfoliating acids, ask the studio about suitable timing before waxing.',
      'Share your preferred shape, thickness and finish during the consultation.',
    ],
    afterItems: [
      'Follow the personalised aftercare instructions given at your appointment.',
      'Treat recently waxed skin gently and avoid products that cause irritation.',
      'For coloured brows, follow the product-specific care guidance to help maintain the finish.',
      'Contact the studio if unexpected irritation develops.',
    ],
    patchDescription: 'A patch test may be necessary according to the tint or dye product instructions and your history. Contact the studio before your appointment to check whether a test is required and when it should be performed.',
  },
  pt: {
    price: 'Preço e duração', about: 'Sobre este tratamento',
    before: 'Antes do atendimento', after: 'Cuidados após o atendimento', patch: 'Teste de sensibilidade', book: 'Agendar agora',
    durations: { 'brow-sculpt': '25 minutos', 'brow-sculpt-tint': 'Aproximadamente 35 minutos', 'shadow-hybrid': 'Aproximadamente 40 minutos' },
    beforeItems: [
      'Informe ao estúdio sobre alergias, pele sensível ou reações anteriores.',
      'Avise sobre tratamentos recentes de pele ou produtos prescritos usados perto das sobrancelhas.',
      'Se utiliza retinol ou ácidos esfoliantes, consulte o estúdio sobre o intervalo antes da depilação.',
      'Converse sobre o formato, a espessura e o acabamento desejados.',
    ],
    afterItems: [
      'Siga os cuidados personalizados informados durante o atendimento.',
      'Trate delicadamente a pele recém-depilada e evite produtos que provoquem irritação.',
      'Se houver coloração, siga as orientações específicas do produto para preservar o acabamento.',
      'Entre em contato com o estúdio se ocorrer irritação inesperada.',
    ],
    patchDescription: 'Um teste de sensibilidade pode ser necessário conforme as instruções do produto de coloração e seu histórico. Consulte o estúdio antes do atendimento para saber se o teste é exigido e quando deverá ser realizado.',
  },
  es: {
    price: 'Precio y duración', about: 'Sobre este tratamiento',
    before: 'Antes de tu cita', after: 'Cuidados posteriores', patch: 'Prueba de sensibilidad', book: 'Reservar ahora',
    durations: { 'brow-sculpt': '25 minutos', 'brow-sculpt-tint': 'Aproximadamente 35 minutos', 'shadow-hybrid': 'Aproximadamente 40 minutos' },
    beforeItems: [
      'Informa al estudio sobre alergias, piel sensible o reacciones anteriores.',
      'Menciona tratamientos recientes de la piel o productos recetados utilizados cerca de las cejas.',
      'Si utilizas retinol o ácidos exfoliantes, consulta al estudio sobre los plazos antes de la depilación.',
      'Comenta la forma, el grosor y el acabado que prefieres.',
    ],
    afterItems: [
      'Sigue las recomendaciones personalizadas recibidas durante la cita.',
      'Cuida con delicadeza la piel recién depilada y evita productos que causen irritación.',
      'Si se aplica color, sigue las indicaciones específicas del producto para mantener el acabado.',
      'Contacta con el estudio si aparece una irritación inesperada.',
    ],
    patchDescription: 'Puede ser necesaria una prueba de sensibilidad según las instrucciones del producto de color y tus antecedentes. Consulta con el estudio antes de la cita si se requiere una prueba y cuándo debe realizarse.',
  },
};

const panel = 'rounded-2xl border border-[#e8d6d5] bg-white p-5 sm:p-7 shadow-sm';
const sectionHeading = 'font-raleway text-xl sm:text-2xl font-semibold text-[#5b3239]';

export const BrowArtistryContent: React.FC<{
  serviceId: string; language: Language; showBooking?: boolean;
}> = ({ serviceId, language, showBooking = true }) => {
  if (!isBrowService(serviceId)) return null;
  const info = SERVICES.find(service => service.id === serviceId);
  if (!info) return null;
  const t = labels[language];
  const hasColour = serviceId !== 'brow-sculpt';

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-4 sm:space-y-6">
    <section className="rounded-2xl border border-[#e8c5c8] bg-[#f3d9d0] p-5 sm:p-7">
      <h2 className={sectionHeading}>{t.price}</h2>
      <p className="flex flex-wrap items-center gap-2 mt-3 font-montserrat text-base font-semibold text-[#39292f]">
        <Clock3 className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{typeof info.price === 'number' ? `A$${info.price}` : '—'}</span>
        <span aria-hidden="true">·</span>
        <span>{t.durations[serviceId]}</span>
      </p>
    </section>
    <section className={panel}>
      <h2 className={sectionHeading}>{t.about}</h2>
      {descriptions[language][serviceId].map((paragraph, i) =>
        <p key={i} className="font-montserrat text-base text-[#34252c] leading-relaxed mt-3">{paragraph}</p>
      )}
    </section>
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
      <section className={panel}>
        <h2 className={sectionHeading}>{t.before}</h2>
        <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-[#803f55]">
          {t.beforeItems.map(item => <li key={item} className="font-montserrat text-base leading-relaxed text-[#34252c]">{item}</li>)}
        </ul>
      </section>
      <section className={panel}>
        <h2 className={sectionHeading}>{t.after}</h2>
        <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-[#803f55]">
          {t.afterItems.map(item => <li key={item} className="font-montserrat text-base leading-relaxed text-[#34252c]">{item}</li>)}
        </ul>
      </section>
    </div>
    {hasColour && <section className="rounded-2xl border border-[#e8d6d5] bg-[#faf0f2] p-5 sm:p-7">
      <h2 className={sectionHeading}>{t.patch}</h2>
      <p className="font-montserrat text-base text-[#34252c] leading-relaxed mt-3">{t.patchDescription}</p>
    </section>}
    {showBooking && <div className="flex flex-wrap items-center gap-3">
      <a href={getServiceBookingUrl(serviceId)}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5b3239] px-6 py-3 text-xs font-bold text-white hover:bg-[#7a4753]">
        <CalendarDays className="w-4 h-4" aria-hidden="true" />{t.book}
      </a>
    </div>}
  </div>;
};
