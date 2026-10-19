import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { LOCATIONS, Language } from '../data/siteData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-black text-white w-full max-w-lg rounded-none border border-neutral-800 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-6 pt-2">
          <h2 className="font-raleway text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
            {language === 'en'
              ? 'BOOK AN APPOINTMENT IN GREENSLOPES'
              : language === 'pt'
              ? 'AGENDE SEU HORÁRIO EM GREENSLOPES'
              : 'RESERVA TU CITA EN GREENSLOPES'}
          </h2>
          <p className="font-montserrat text-xs text-[#9a5967] uppercase tracking-widest mt-1">
            Bella Beauty Brazil · Brisbane, Australia
          </p>
        </div>

        {/* Location & Hours List */}
        <div className="space-y-3">
          {LOCATIONS.map((loc) => {
            const isSoon = loc.isComingSoon;

            if (isSoon) {
              return (
                <div
                  key={loc.id}
                  className="w-full text-center py-3.5 px-4 border border-neutral-700 text-neutral-500 font-montserrat text-base uppercase tracking-wider cursor-not-allowed select-none bg-neutral-900/50"
                >
                  {loc.name}{' '}
                  {language === 'en'
                    ? '(Coming Soon)'
                    : language === 'pt'
                    ? '(Em Breve)'
                    : '(Próximamente)'}
                </div>
              );
            }

            return (
              <a
                key={loc.id}
                href={loc.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 w-full text-center py-3.5 px-4 border border-white hover:border-[#9a5967] hover:bg-[#9a5967] text-white font-montserrat font-medium text-base uppercase tracking-wider transition-all duration-200"
              >
                <span>{loc.name}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-neutral-500 font-montserrat">
          <p>
            {language === 'en'
              ? 'Select our Greenslopes studio to continue to the official Timely booking page.'
              : language === 'pt'
              ? 'Selecione nosso estúdio em Greenslopes para abrir o agendamento oficial pelo Timely.'
              : 'Selecciona nuestro estudio en Greenslopes para continuar con la reserva oficial en Timely.'}
          </p>
        </div>

      </div>
    </div>
  );
};
