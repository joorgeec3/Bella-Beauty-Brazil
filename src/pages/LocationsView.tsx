import React from 'react';
import { MapPin, Clock, Phone, Calendar, Navigation } from 'lucide-react';
import { LOCATIONS, Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

interface LocationsViewProps {
  onOpenAppointment: () => void;
  language: Language;
}

export const LocationsView: React.FC<LocationsViewProps> = ({
  onOpenAppointment: _onOpenAppointment,
  language,
}) => {
  return (
    <div className="bg-site">
      {/* Header */}
      <div className="relative bg-neutral-900 text-white py-16 lg:py-24 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-2 font-bold">
            Greenslopes, Brisbane · Australia
          </p>
          <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wider text-white">
            {language === 'en' ? 'Location & Hours' : language === 'pt' ? 'Local e horários' : 'Ubicación y horarios'}
          </h1>
          <p className="font-montserrat text-sm text-neutral-300 mt-3 max-w-md mx-auto">
            {language === 'en'
              ? 'Visit our Greenslopes studio and enjoy signature Bella Beauty Brazil care.'
              : language === 'pt' ? 'Visite nosso estúdio em Greenslopes e desfrute do cuidado exclusivo Bella Beauty Brazil.'
              : 'Visita nuestro estudio en Greenslopes y disfruta del cuidado exclusivo de Bella Beauty Brazil.'}
          </p>
          <p className="font-montserrat text-xs text-neutral-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Convenient for clients across Brisbane Southside, including Stones Corner, Coorparoo, Holland Park, Annerley, Tarragindi and Woolloongabba, welcoming visitors from Mount Gravatt, Upper Mount Gravatt, Carina, Carindale, Camp Hill, Sunnybank, Eight Mile Plains and Greater Brisbane.'
              : language === 'pt'
              ? 'Prático para clientes do sul de Brisbane, incluindo Stones Corner, Coorparoo, Holland Park, Annerley, Tarragindi e Woolloongabba, recebendo clientes de Mount Gravatt, Upper Mount Gravatt, Carina, Carindale, Camp Hill, Sunnybank, Eight Mile Plains e de outras regiões de Greater Brisbane.'
              : 'Práctico para clientas del sur de Brisbane, incluidos Stones Corner, Coorparoo, Holland Park, Annerley, Tarragindi y Woolloongabba, atendiendo a clientas de Mount Gravatt, Upper Mount Gravatt, Carina, Carindale, Camp Hill, Sunnybank, Eight Mile Plains y otras zonas de Greater Brisbane.'}
          </p>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>
      </div>

      {/* Grid of EXACTLY 2 Location & Hours */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc) => {
            const locPhoto = siteImages.locations.greenslopes;
            return (
              <div
                key={loc.id}
                className="bg-site-soft border border-neutral-200/70 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#9a5967]"
              >
                {/* Clinic Photo */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={locPhoto}
                    alt={loc.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-black/60 px-2.5 py-1 rounded-full border border-amber-300/30">
                      {loc.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-raleway text-2xl font-bold uppercase tracking-wide text-neutral-900 mb-3">
                      {loc.name}
                    </h3>

                    <p className="font-montserrat text-xs text-neutral-600 mb-6 leading-relaxed">
                      {loc.description}
                    </p>

                    <div className="space-y-3 text-xs font-montserrat text-neutral-700 border-t border-neutral-200/60 pt-4 mb-6">
                      <div className="flex items-start space-x-2.5">
                        <MapPin className="w-4 h-4 text-[#9a5967] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-neutral-900">{loc.address}</p>
                          <p className="text-neutral-500">{loc.city}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <Clock className="w-4 h-4 text-[#9a5967] flex-shrink-0" />
                        <span>{loc.hours}</span>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <Phone className="w-4 h-4 text-[#9a5967] flex-shrink-0" />
                        <a href={`tel:${loc.phone}`} className="hover:text-[#9a5967] font-medium transition-colors">
                          {loc.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mb-6 overflow-hidden rounded-xl border border-[#9a5967]/20 bg-[#f3efee]">
                      <iframe
                        title={`${loc.name} map`}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${loc.address}, ${loc.city}`)}&output=embed`}
                        className="h-44 w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={loc.appointmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-[#5b3239] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-full shadow-sm transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-200" />
                      <span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDA' : 'AGENDAR CITA'}</span>
                    </a>

                    <a
                      href={loc.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-full border border-neutral-300 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#9a5967]" />
                      <span>{language === 'en' ? 'Get Directions' : language === 'pt' ? 'Como chegar' : 'Cómo llegar'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
