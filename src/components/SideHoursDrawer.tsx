import React from 'react';
import { X, Clock } from 'lucide-react';
import { Language } from '../data/siteData';
import { SITE_IMAGES } from '../data/siteImages';

interface SideHoursDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SideHoursDrawer: React.FC<SideHoursDrawerProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto p-6 sm:p-8 animate-slideLeft">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
            <div className="flex items-center space-x-2 text-neutral-800">
              <Clock className="w-5 h-5 text-[#9a5967]" />
              <h3 className="font-raleway text-lg font-bold uppercase tracking-wider">
                {language === 'en' ? 'Operating Hours' : language === 'pt' ? 'HORÁRIOS' : 'HORARIOS'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Horários confirmados no Timely; domingo permanece não publicado. */}
          <div className="mb-8">
            <table className="w-full text-sm font-montserrat border-collapse">
              <tbody>
                {[['Monday', '11:00–17:30'], ['Tuesday', '09:15–19:30'], ['Wednesday', '13:30–15:30'], ['Thursday', '09:15–19:30'], ['Friday', '09:15–16:00'], ['Saturday', '08:30–15:30']].map(([day, hours]) => <tr key={day} className="border-b border-neutral-100"><td className="py-2.5 font-semibold text-neutral-800">{language === 'pt' ? ({ Monday: 'Segunda-feira', Tuesday: 'Terça-feira', Wednesday: 'Quarta-feira', Thursday: 'Quinta-feira', Friday: 'Sexta-feira', Saturday: 'Sábado' } as Record<string, string>)[day] : language === 'es' ? ({ Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles', Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado' } as Record<string, string>)[day] : day}</td><td className="py-2.5 text-right text-neutral-500 text-xs">{hours}</td></tr>)}
              </tbody>
            </table>
            <p className="text-[11px] text-neutral-400 font-montserrat mt-2 text-center">
              {language === 'en' ? 'Sunday hours are not published. Contact WhatsApp +61 402 148 437.' : language === 'pt' ? 'O horário de domingo não foi publicado. WhatsApp: +61 402 148 437.' : 'El horario del domingo no está publicado. WhatsApp: +61 402 148 437.'}
            </p>
          </div>

          {/* Aesthetician Salon Photo */}
          <div className="rounded-xl overflow-hidden shadow-md mb-6">
            <img
              src={SITE_IMAGES.drawers.clinicHoursPhoto}
              alt="Bella Beauty Brazil"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-400 font-montserrat">
          <p>© Bella Beauty Brazil</p>
        </div>

      </div>
    </div>
  );
};
