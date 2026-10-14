import React from 'react';
import { X, Calendar, Star, Sparkles, MapPin } from 'lucide-react';
import { Product, Language } from '../data/siteData';

interface ProductQuickviewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenAppointment: () => void;
  language: Language;
}

export const ProductQuickviewModal: React.FC<ProductQuickviewModalProps> = ({
  product,
  onClose,
  onOpenAppointment,
  language,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="aspect-3/4 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-1">
                {product.category}
              </span>
              <h3 className="font-raleway text-2xl font-bold uppercase text-neutral-900 leading-tight">
                {product.name}
              </h3>
              <div className="flex items-center space-x-1 text-amber-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs text-neutral-400 ml-2">
                  {language === 'en' ? '(Salon Professional)' : '(Uso Profesional)'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-[#9a5967]">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'en' ? 'Exclusive In-Salon Formula' : 'Fórmula Exclusiva en Cabina'}</span>
            </div>

            <p className="font-montserrat text-xs text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-start space-x-2.5 mb-4">
                <MapPin className="w-4 h-4 text-[#9a5967] flex-shrink-0 mt-0.5" />
                <p className="font-montserrat text-xs text-neutral-600">
                  {language === 'en'
                    ? 'Available and applied exclusively across Bella Beauty Brazilian Beauty clinics in Brisbane (Greenslopes).'
                    : language === 'pt'
                    ? 'Disponível e aplicado exclusivamente nas clínicas oficiais da Bella Beauty Brazilian Beauty em Brisbane (Greenslopes).'
                    : 'Disponible y aplicado exclusivamente en las clínicas oficiales de Bella Beauty Brazilian Beauty in Brisbane (Greenslopes).'}
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenAppointment();
                }}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#5b3239] hover:bg-[#7a4753] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg shadow-md transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>{language === 'en' ? 'BOOK TREATMENT WITH THIS PRODUCT' : language === 'pt' ? 'AGENDA UM TRATAMENTO COM ESTE PRODUTO' : 'AGENDAR TRATAMIENTO CON ESTE PRODUCTO'}</span>
              </button>
            </div>

            <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
              <p>✔ Professional quality and care guidance</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
