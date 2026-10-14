import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Language } from '../data/siteData';

interface JoinChatButtonProps {
  language: Language;
}

export const JoinChatButton: React.FC<JoinChatButtonProps> = ({ language }) => {
  const [chatOpen, setChatOpen] = useState(false);

  const phone = '61402148437';
  const textMsg = encodeURIComponent(language === 'en' ? 'Hello *Bella Beauty Brazil*. I would like more information about treatments and bookings.' : language === 'pt' ? 'Olá *Bella Beauty Brazil*. Gostaria de mais informações sobre tratamentos e agendamentos.' : 'Hola *Bella Beauty Brazil*. Me gustaría recibir más información sobre tratamientos y reservas.');
  const whatsappUrl = `https://wa.me/${phone}?text=${textMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded WhatsApp Chatbox */}
      {chatOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                M
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider">Bella Beauty</h4>
                <p className="text-[10px] text-white/80">
                  {language === 'en' ? 'Message us on WhatsApp' : language === 'pt' ? 'Fale pelo WhatsApp' : 'Escríbenos por WhatsApp'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Message */}
          <div className="p-4 bg-[#ECE5DD] min-h-[120px] flex flex-col justify-end">
            <div className="bg-white rounded-lg p-3 shadow-xs max-w-[85%] text-xs font-montserrat text-neutral-800 leading-relaxed rounded-tl-none">
              <p>
                {language === 'en'
                  ? 'Use the button below to open WhatsApp and send your enquiry.'
                  : language === 'pt'
                  ? 'Use o botão abaixo para abrir o WhatsApp e enviar sua mensagem.'
                  : 'Usa el botón inferior para abrir WhatsApp y enviar tu consulta.'}
              </p>
              <span className="text-[9px] text-neutral-400 block text-right mt-1">{language === 'en' ? 'WhatsApp' : language === 'pt' ? 'WhatsApp' : 'WhatsApp'}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-3 bg-white border-t border-neutral-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-xs transition-colors"
            >
              <span>{language === 'en' ? 'Open WhatsApp' : language === 'pt' ? 'Abrir WhatsApp' : 'Abrir chat'}</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Circle Button */}
      <div className="flex items-center space-x-2">
        {!chatOpen && (
          <div
            onClick={() => setChatOpen(true)}
            className="hidden sm:block bg-white text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-colors"
          >
            {language === 'en' ? 'Need help?' : language === 'pt' ? 'Precisa de ajuda?' : '¿Necesitas ayuda?'}
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer relative"
          aria-label={language === 'en' ? 'WhatsApp Chat' : language === 'pt' ? 'Abrir WhatsApp' : 'Abrir WhatsApp'}
        >
          {chatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          )}
        </button>
      </div>

    </div>
  );
};
