import React, { useState } from 'react';
import { Briefcase, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Language } from '../data/siteData';

interface WorkWithUsViewProps {
  language: Language;
}

export const WorkWithUsView: React.FC<WorkWithUsViewProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Beauty Trainer',
    experience: '1-3 years',
    location: 'Greenslopes',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Beauty Trainer',
        experience: '1-3 years',
        location: 'Greenslopes',
        notes: '',
      });
    }, 4000);
  };

  return (
    <div className="bg-site">
      {/* Header */}
      <div className="relative bg-neutral-900 text-white py-16 lg:py-24 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-2 font-bold">
            {language === 'en' ? 'Careers at Bella Beauty' : 'Carreras en Bella Beauty'}
          </p>
          <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wider text-white">
            {language === 'en' ? 'Work With Us' : 'Trabaja con Nosotros'}
          </h1>
          <p className="font-montserrat text-sm text-neutral-300 mt-3 max-w-md mx-auto">
            {language === 'en'
              ? 'Join our specialist team of beauty professionals and trainers in Brisbane.'
              : language === 'pt' ? 'Junte-se à nossa equipe de profissionais e instrutoras de beleza em Brisbane.' : 'Únete a nuestro equipo de profesionales e instructoras de belleza en Brisbane.'}
          </p>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a5967]">
              {language === 'en' ? 'Grow With Bella Beauty' : 'Crece con Bella Beauty'}
            </span>
            <h2 className="font-raleway text-3xl font-bold uppercase text-neutral-900 leading-tight">
              {language === 'en' ? (
                <>Become Part of <span className="text-[#9a5967]">Our Team</span></>
              ) : (
                <>Forma Parte de <span className="text-[#9a5967]">Nuestro Equipo</span></>
              )}
            </h2>
            <div className="space-y-4 font-montserrat text-sm text-neutral-600 leading-relaxed">
              <p>
                {language === 'en'
                  ? 'At Bella Beauty Brazil, we value precision, technique, and genuine client care. We provide continuous mentorship in brows, lashes, cosmetic tattooing and skin treatments.'
                  : language === 'pt' ? 'Na Bella Beauty Brazil, valorizamos precisão, técnica e cuidado genuíno. Oferecemos mentoria contínua em sobrancelhas, cílios, tatuagem cosmética e tratamentos para a pele.' : 'En Bella Beauty Brazil valoramos la precisión, la técnica y la atención genuina. Ofrecemos mentoría continua en cejas, pestañas, tatuaje cosmético y tratamientos para la piel.'}
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-neutral-800">
                  <Sparkles className="w-4 h-4 text-[#9a5967]" />
                  <span className="font-semibold text-xs">{language === 'en' ? 'Proprietary Bella Beauty technique training' : language === 'pt' ? 'Formação em técnicas exclusivas Bella Beauty' : 'Formación en técnicas exclusivas Bella Beauty'}</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-800">
                  <Sparkles className="w-4 h-4 text-[#9a5967]" />
                  <span className="font-semibold text-xs">{language === 'en' ? 'Competitive compensation & supportive team' : language === 'pt' ? 'Remuneração competitiva e equipe acolhedora' : 'Compensación competitiva y equipo acogedor'}</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-800">
                  <Sparkles className="w-4 h-4 text-[#9a5967]" />
                  <span className="font-semibold text-xs">{language === 'en' ? 'Welcoming studio in Brisbane (Greenslopes)' : language === 'pt' ? 'Estúdio acolhedor em Brisbane (Greenslopes)' : 'Estudio acogedor en Brisbane (Greenslopes)'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-site-soft border border-neutral-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h3 className="font-raleway text-2xl font-bold uppercase tracking-wider text-neutral-900 mb-2">
              {language === 'en' ? 'Application Form' : 'Formulario de Postulación'}
            </h3>
            <p className="font-montserrat text-xs text-neutral-600 mb-6">
              {language === 'en'
                ? 'Send us your details and our recruitment team will reach out to you.'
                : 'Envíanos tus datos y nuestro equipo de selección se pondrá en contacto.'}
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-raleway text-lg font-bold">
                  {language === 'en' ? 'Application Submitted!' : '¡Postulación Enviada!'}
                </h4>
                <p className="font-montserrat text-xs text-emerald-700">
                  {language === 'en'
                    ? 'Thank you for your interest in joining Bella Beauty Brazil.'
                    : 'Gracias por tu interés en unirte a Bella Beauty Brazil.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-montserrat text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Full Name *' : 'Nombre Completo *'}
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
                      {language === 'en' ? 'Email Address *' : 'Correo Electrónico *'}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Phone Number *' : 'Teléfono *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Position of Interest' : 'Puesto de Interés'}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                    >
                      <option value="Beauty Trainer">Beauty Trainer</option>
                      <option value="Brow & Lash Trainer">Brow & Lash Trainer</option>
                      <option value="Skin Treatment Trainer">Skin Treatment Trainer</option>
                      <option value="Clinic Reception & Administration">Clinic Reception &amp; Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    {language === 'en' ? 'Brief Intro or Resume Summary' : 'Breve Resumen o Experiencia'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-site border border-neutral-200 rounded-lg focus:outline-hidden focus:border-[#9a5967]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#5b3239] hover:bg-[#7a4753] text-white font-montserrat font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-md transition-colors cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-200" />
                  <span>{language === 'en' ? 'Submit Application' : 'Enviar Postulación'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
