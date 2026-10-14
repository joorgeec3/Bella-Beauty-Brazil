import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../data/siteData';

export const BackToTopButton: React.FC<{ language: Language }> = ({ language }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 520);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={language === 'en' ? 'Back to top' : language === 'pt' ? 'Voltar ao topo' : 'Volver arriba'}
      title={language === 'en' ? 'Back to top' : language === 'pt' ? 'Voltar ao topo' : 'Volver arriba'}
      className={`fixed right-0 bottom-[150px] sm:bottom-[161px] z-[100] flex h-11 w-11 items-center justify-center rounded-l-full border border-r-0 border-[#9a5967]/40 bg-[#f3efee]/95 text-[#6f4d31] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:bg-[#9a5967] hover:text-white focus:outline-hidden focus:ring-2 focus:ring-[#9a5967]/50 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};
