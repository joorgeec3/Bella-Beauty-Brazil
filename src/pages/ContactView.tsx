import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { LOCATIONS } from '../data/siteData';
import { Language } from '../data/siteData';

interface ContactViewProps {
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const location = LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Bella Beauty enquiry — ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`);
    window.location.href = `mailto:livia.anjos14@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-site">
      {/* Header */}
      <div className="relative bg-neutral-900 text-white py-16 lg:py-24 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-2 font-bold">
            {language === 'en' ? 'Get in Touch' : language === 'pt' ? 'Entre em contato' : 'Contáctanos'}
          </p>
          <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wider text-white">
            {language === 'en' ? 'Contact Bella Beauty' : language === 'pt' ? 'Contato Bella Beauty' : 'Contacto Bella Beauty'}
          </h1>
          <p className="font-montserrat text-sm text-neutral-300 mt-3 max-w-md mx-auto">
            {language === 'en'
              ? 'Have questions about our beauty treatments or need guidance? We are here to help!'
              : language === 'pt'
              ? 'Tem dúvidas sobre nossos tratamentos de beleza ou precisa de orientação? Estamos aqui para ajudar!'
              : '¿Tienes dudas sobre nuestros tratamientos de belleza o necesitas asesoría? ¡Estamos para ayudarte!'}
          </p>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9a5967] block mb-1">
                {language === 'en' ? 'Customer Care' : language === 'pt' ? 'Atendimento ao cliente' : 'Atención al cliente'}
              </span>
              <h2 className="font-raleway text-3xl font-bold uppercase text-neutral-900">
                {language === 'en' ? 'We are here for you' : language === 'pt' ? 'Estamos aqui para você' : 'Estamos para atenderte'}
              </h2>
              <div className="w-12 h-0.5 bg-[#9a5967] mt-3" />
            </div>

            <div className="space-y-6 font-montserrat text-sm text-neutral-700">
              <div className="flex items-start space-x-4 p-4 bg-site-soft rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#9a5967]/15 text-[#9a5967] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Location & Hours (Greenslopes, Brisbane)</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    <strong>Greenslopes:</strong> Suite 3, 412 Logan Road, Greenslopes QLD 4120, Australia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-site-soft rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#9a5967]/15 text-[#9a5967] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Telephone &amp; WhatsApp</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    <a href="tel:+61402148437" className="hover:text-[#9a5967] transition-colors">
                      +61 402 148 437
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-site-soft rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#9a5967]/15 text-[#9a5967] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">{language === 'en' ? 'Operating Hours' : language === 'pt' ? 'Horários de atendimento' : 'Horarios de atención'}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {language === 'en'
                      ? <>{location.hours}<br />Bookings via Timely &amp; WhatsApp</>
                      : language === 'pt'
                      ? <>{location.hours}<br />Agende pelo Timely e WhatsApp</>
                      : <>{location.hours}<br />Reserva por Timely y WhatsApp</>}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-[#e8d6d5] bg-white p-6 sm:p-7">
              <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a5967]">
                {language === 'en' ? 'A thoughtful gift' : language === 'pt' ? 'Um presente especial' : 'Un regalo especial'}
              </p>
              <h3 className="font-raleway text-2xl font-semibold text-[#5b3239] mt-2">
                {language === 'en' ? 'Gift Vouchers' : language === 'pt' ? 'Gift Vouchers' : 'Gift Vouchers'}
              </h3>
              <p className="font-montserrat text-sm leading-relaxed text-neutral-600 mt-2">
                {language === 'en'
                  ? 'Give someone a Bella Beauty experience. Visit our Timely page to explore gift voucher options, or contact the studio for assistance with your purchase.'
                  : language === 'pt'
                  ? 'Presenteie alguém com uma experiência Bella Beauty. Acesse nossa página Timely para consultar os vouchers ou fale com o estúdio para receber ajuda na compra.'
                  : 'Regala una experiencia Bella Beauty. Visita nuestra página de Timely para consultar los vouchers o contacta con el estudio para recibir ayuda.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <a href="https://bellabrazil.gettimely.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#5b3239] hover:bg-[#7a4753] text-white font-montserrat font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors">
                  {language === 'en' ? 'View Timely' : language === 'pt' ? 'Acessar Timely' : 'Ver Timely'}
                </a>
                <a href="https://wa.me/61402148437?text=Hi%2C%20I%27d%20like%20help%20purchasing%20a%20Bella%20Beauty%20gift%20voucher." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#9a5967] text-[#5b3239] hover:bg-[#f8eef1] font-montserrat font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors">
                  {language === 'en' ? 'Ask on WhatsApp' : language === 'pt' ? 'Consultar pelo WhatsApp' : 'Consultar por WhatsApp'}
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm">
              <iframe title="Bella Beauty Brazil map" src="https://www.google.com/maps?q=Suite%203,%20412%20Logan%20Road,%20Greenslopes%20QLD%204120%20Australia&output=embed" className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a href="https://www.google.com/maps/dir/?api=1&destination=Suite+3%2C+412+Logan+Road%2C+Greenslopes+QLD+4120+Australia" target="_blank" rel="noopener noreferrer" className="block bg-[#5b3239] px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white cursor-pointer">{language === 'en' ? 'Get Directions' : language === 'pt' ? 'Como chegar' : 'Cómo llegar'}</a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-site-soft border border-neutral-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h3 className="font-raleway text-2xl font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  {language === 'en' ? 'Send a Message' : language === 'pt' ? 'Envie uma mensagem' : 'Envíanos un mensaje'}
            </h3>
            <p className="font-montserrat text-xs text-neutral-600 mb-6">
              {language === 'en'
                ? 'Complete the fields below to open a draft in your email app. Please press Send there to deliver it to our studio.'
                : language === 'pt'
                ? 'Preencha os dados para abrir um rascunho no seu aplicativo de e-mail. Depois, pressione Enviar no e-mail para que a mensagem seja entregue.'
                : 'Completa los datos para abrir un borrador en tu aplicación de correo. Después, pulsa Enviar en el correo para entregarlo.'}
            </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-montserrat text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Full Name *' : language === 'pt' ? 'Nome completo *' : 'Nombre completo *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Email Address *' : language === 'pt' ? 'E-mail *' : 'Correo electrónico *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    {language === 'en' ? 'Phone Number' : language === 'pt' ? 'Telefone' : 'Teléfono'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Message *' : language === 'pt' ? 'Mensagem *' : 'Mensaje *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#5b3239] hover:bg-[#7a4753] text-white font-montserrat font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-200" />
                  <span>{language === 'en' ? 'Open email app' : language === 'pt' ? 'Abrir aplicativo de e-mail' : 'Abrir correo electrónico'}</span>
                </button>
              </form>
          </div>

        </div>
      </div>
    </div>
  );
};
