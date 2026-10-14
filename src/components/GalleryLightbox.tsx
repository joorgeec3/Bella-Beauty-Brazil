import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Props = {
  images: { image: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  language: 'en' | 'pt' | 'es';
};

export const GalleryLightbox: React.FC<Props> = ({ images, index, onClose, onIndexChange, language }) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);
  const isOpen = index !== null && images.length > 0;
  const safeIndex = index === null || images.length === 0 ? 0 : Math.min(Math.max(index, 0), images.length - 1);

  // Lock background scroll, focus the close control and restore focus when leaving the gallery.
  React.useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft' && images.length > 1) {
        event.preventDefault();
        onIndexChange((safeIndex - 1 + images.length) % images.length);
      } else if (event.key === 'ArrowRight' && images.length > 1) {
        event.preventDefault();
        onIndexChange((safeIndex + 1) % images.length);
      } else if (event.key === 'Tab') {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') || []);
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, images.length, safeIndex, onClose, onIndexChange]);

  if (!isOpen) return null;
  const item = images[safeIndex];
  const closeText = language === 'pt' ? 'Fechar imagem' : language === 'es' ? 'Cerrar imagen' : 'Close image';
  const prevText = language === 'pt' ? 'Imagem anterior' : language === 'es' ? 'Imagen anterior' : 'Previous image';
  const nextText = language === 'pt' ? 'Próxima imagem' : language === 'es' ? 'Imagen siguiente' : 'Next image';

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={language === 'pt' ? 'Galeria de imagens' : language === 'es' ? 'Galería de imágenes' : 'Image gallery'}
      className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-3 sm:p-10"
      onClick={onClose}>
      <button ref={closeRef} type="button" aria-label={closeText} onClick={(event) => { event.stopPropagation(); onClose(); }}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 text-white bg-black/75 rounded-full p-3 hover:bg-[#5b3239] focus-visible:outline-2 focus-visible:outline-white cursor-pointer">
        <X size={23} />
      </button>
      {images.length > 1 && <button type="button" aria-label={prevText}
        onClick={(event) => { event.stopPropagation(); onIndexChange((safeIndex - 1 + images.length) % images.length); }}
        className="absolute left-1 sm:left-5 z-20 text-white bg-black/75 rounded-full p-3 hover:bg-[#5b3239] focus-visible:outline-2 focus-visible:outline-white cursor-pointer">
        <ChevronLeft size={24} />
      </button>}
      <img src={item.image} alt={item.alt} onClick={(event) => event.stopPropagation()}
        className="max-h-[calc(100dvh-7rem)] max-w-[calc(100vw-5.75rem)] sm:max-w-[90vw] w-auto h-auto object-contain rounded-md" />
      {images.length > 1 && <button type="button" aria-label={nextText}
        onClick={(event) => { event.stopPropagation(); onIndexChange((safeIndex + 1) % images.length); }}
        className="absolute right-1 sm:right-5 z-20 text-white bg-black/75 rounded-full p-3 hover:bg-[#5b3239] focus-visible:outline-2 focus-visible:outline-white cursor-pointer">
        <ChevronRight size={24} />
      </button>}
      <span className="absolute bottom-3 sm:bottom-5 text-white/80 text-xs" aria-live="polite">{safeIndex + 1} / {images.length}</span>
    </div>
  );
};
