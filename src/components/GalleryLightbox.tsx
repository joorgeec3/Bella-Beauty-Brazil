import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Props = { images: { image: string; alt: string }[]; index: number | null; onClose: () => void; onIndexChange: (next: number) => void; language: 'en' | 'pt' | 'es' };
export const GalleryLightbox: React.FC<Props> = ({ images, index, onClose, onIndexChange, language }) => {
  React.useEffect(() => {
    if (index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % images.length);
    };
    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = originalOverflow; };
  }, [index, images.length, onClose, onIndexChange]);
  if (index === null || images.length === 0) return null;
  const item = images[index];
  const closeText = language === 'pt' ? 'Fechar imagem' : language === 'es' ? 'Cerrar imagen' : 'Close image';
  const prevText = language === 'pt' ? 'Imagem anterior' : language === 'es' ? 'Imagen anterior' : 'Previous image';
  const nextText = language === 'pt' ? 'Próxima imagem' : language === 'es' ? 'Imagen siguiente' : 'Next image';
  return <div role="dialog" aria-modal="true" aria-label="Bella Beauty image viewer" className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-3 sm:p-10" onClick={onClose}>
    <button type="button" aria-label={closeText} onClick={onClose} className="absolute top-4 right-4 z-10 text-white bg-black/60 rounded-full p-3 hover:bg-[#5b3239] cursor-pointer"><X size={23}/></button>
    {images.length > 1 && <button type="button" aria-label={prevText} onClick={(e) => {e.stopPropagation();onIndexChange((index - 1 + images.length) % images.length);}} className="absolute left-2 sm:left-5 z-10 text-white bg-black/65 rounded-full p-3 hover:bg-[#5b3239] cursor-pointer"><ChevronLeft size={24}/></button>}
    <img src={item.image} alt={item.alt} onClick={(e)=>e.stopPropagation()} className="max-h-[85vh] max-w-[85vw] sm:max-w-[90vw] w-auto h-auto object-contain rounded-md"/>
    {images.length > 1 && <button type="button" aria-label={nextText} onClick={(e) => {e.stopPropagation();onIndexChange((index + 1) % images.length);}} className="absolute right-2 sm:right-5 z-10 text-white bg-black/65 rounded-full p-3 hover:bg-[#5b3239] cursor-pointer"><ChevronRight size={24}/></button>}
    <span className="absolute bottom-3 sm:bottom-5 text-white/80 text-xs" aria-live="polite">{index+1} / {images.length}</span>
  </div>;
};
