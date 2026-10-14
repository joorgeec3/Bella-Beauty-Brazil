import React from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../data/siteData';

interface ProductsSectionProps {
  onQuickview: (product: Product) => void;
  language: 'en' | 'es';
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onQuickview,
  language,
}) => {
  return (
    <section className="bg-site py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="font-raleway text-3xl sm:text-4xl font-light text-neutral-800 tracking-wider uppercase mb-1">
            {language === 'en' ? 'PRODUCT' : 'LÍNEA DE'}
          </p>
          <p className="font-raleway text-2xl sm:text-3xl font-bold text-[#9a5967] tracking-widest uppercase mb-4">
            {language === 'en' ? 'LINE' : 'PRODUCTOS'}
          </p>
          <p className="font-montserrat text-neutral-600 text-sm leading-relaxed">
            {language === 'en'
              ? 'Professional beauty products and aftercare options available through Bella Beauty Brazil.'
              : 'Productos profesionales de belleza y opciones de cuidados disponibles en Bella Beauty Brazil.'}
          </p>
          <div className="w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" />
        </div>

        {/* 5-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onQuickview(prod)}
              className="group flex flex-col bg-site-soft border border-neutral-100 rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Product Thumbnail & Overlay Actions */}
              <div className="relative aspect-3/4 bg-site-soft overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Action Zone */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white/95 text-neutral-800 font-montserrat text-xs font-semibold rounded-full shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#9a5967]" />
                    <span>{language === 'en' ? 'View Details' : 'Ver Detalles'}</span>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow text-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1 block">
                    {prod.category}
                  </span>
                  <h4 className="font-raleway text-sm font-semibold text-neutral-800 tracking-wide line-clamp-1 mb-2 group-hover:text-[#9a5967] transition-colors">
                    {prod.name}
                  </h4>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-center space-x-1 text-[11px] text-[#9a5967] font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'en' ? 'Salon Quality' : 'Uso Profesional'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
