import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '../data/siteData';
import { SITE_IMAGES } from '../data/siteImages';

interface NewsletterSectionProps {
  language: Language;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Local mock handling to prevent requests to original WordPress server
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <section className="relative bg-site py-20 lg:py-28 overflow-hidden">
      
      {/* Top Opacity-Tilt SVG Divider */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none transform rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2600 131.1"
          preserveAspectRatio="none"
          className="w-full h-5 sm:h-7 text-white fill-current"
        >
          <path d="M0 0L2600 0 2600 69.1 0 0z" />
          <path style={{ opacity: 0.5 }} d="M0 0L2600 0 2600 69.1 0 69.1z" />
          <path style={{ opacity: 0.25 }} d="M2600 0L0 0 0 130.1 2600 69.1z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Form Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left reveal-on-scroll">
            {/* Flower Brand Emblem */}
            <div className="mb-4 w-16 h-16">
              <img
                src={SITE_IMAGES.brand.goldEmblemStamp}
                alt="Bella Beauty Emblem"
                className="w-full h-full object-contain"
                width={512}
                height={512}
                loading="lazy"
              />
            </div>

            <h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider text-neutral-800 leading-tight">
              {language === 'en' ? 'Subscribe to' : language === 'pt' ? 'Inscreva-se na' : 'Suscríbete a'}
            </h2>
            <h3 className="font-raleway text-2xl sm:text-3xl lg:text-4xl font-normal uppercase tracking-widest text-[#9a5967] mt-1 mb-6">
              {language === 'en' ? 'our newsletter' : language === 'pt' ? 'nossa newsletter' : 'nuestro boletín'}
            </h3>

            <p className="font-montserrat text-neutral-600 text-sm leading-relaxed max-w-lg mb-8">
              {language === 'en'
                ? 'Stay up to date with self-care tips, body contouring advice, and Bella Beauty session availability.'
                : language === 'pt'
                ? 'Fique por dentro de dicas de autocuidado, modelagem corporal e disponibilidade de sessões na Bella Beauty.'
                : 'Mantente al día con consejos de autocuidado, contorno corporal y disponibilidad de sesiones en Bella Beauty.'}
            </p>

            {submitted ? (
              <div className="flex items-center space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Thank you for subscribing! You are now on our VIP beauty list.'
                    : language === 'pt'
                    ? 'Obrigada por se inscrever! Você já está na nossa lista VIP de beleza.'
                    : '¡Gracias por suscribirte! Ya estás en nuestra lista VIP de belleza.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'en' ? 'Email address' : language === 'pt' ? 'Endereço de e-mail' : 'Correo electrónico'}
                  required
                  className="w-full px-5 py-3.5 bg-white border border-neutral-300 rounded-sm text-sm focus:outline-hidden focus:border-[#9a5967] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-neutral-800 text-white font-montserrat font-bold text-xs uppercase tracking-[0.25em] py-4 px-8 rounded-sm shadow-md transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'SUBSCRIBE' : language === 'pt' ? 'INSCREVER-SE' : 'SUSCRIBIRSE'}
                </button>
              </form>
            )}
          </div>

          {/* Right Cosmetic Leaf Bottle Illustration */}
          <div className="lg:col-span-5 hidden lg:flex justify-center reveal-on-scroll reveal-delay-1">
            <div className="relative max-w-sm">
              <img
                src={SITE_IMAGES.brand.goldSignatureBadge}
                alt="Bella Beauty Care Bottle"
                className="w-full h-auto object-contain filter drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Opacity-Tilt SVG Divider */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2600 131.1"
          preserveAspectRatio="none"
          className="w-full h-5 sm:h-7 text-white fill-current"
        >
          <path d="M0 0L2600 0 2600 69.1 0 0z" />
          <path style={{ opacity: 0.5 }} d="M0 0L2600 0 2600 69.1 0 69.1z" />
          <path style={{ opacity: 0.25 }} d="M2600 0L0 0 0 130.1 2600 69.1z" />
        </svg>
      </div>
    </section>
  );
};
