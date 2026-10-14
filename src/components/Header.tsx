import React, { useState } from 'react';
import { Calendar, Menu, X, ChevronDown, Globe, GraduationCap } from 'lucide-react';
import { SERVICES, LOCATIONS, Language } from '../data/siteData';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, subParam?: string) => void;
  onOpenAppointment: () => void;
  onOpenHours: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onToggleLanguage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenAppointment,
  onOpenHours,
  language,
  onSelectLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = React.useRef(0);
  const mobileMenuOpenRef = React.useRef(mobileMenuOpen);
  const labels = language === 'en'
    ? { home: 'Home', about: 'About', services: 'Services', location: 'Location & Hours', courses: 'Courses', contact: 'Contact', soon: 'Soon' }
    : language === 'pt'
    ? { home: 'Início', about: 'Sobre', services: 'Serviços', location: 'Local e horários', courses: 'Cursos', contact: 'Contato', soon: 'Em breve' }
    : { home: 'Inicio', about: 'Nosotros', services: 'Servicios', location: 'Ubicación y horarios', courses: 'Cursos', contact: 'Contacto', soon: 'Próximamente' };

  React.useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Smooth Hide on Scroll Down / Show on Scroll Up
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Se o menu mobile estiver aberto, NUNCA esconder o header
          if (mobileMenuOpenRef.current) {
            setShowHeader(true);
            ticking = false;
            return;
          }

          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollYRef.current;

          // Se estiver bem no topo, sempre mostrar
          if (currentScrollY <= 40) {
            setShowHeader(true);
          } else if (diff > 8 && currentScrollY > 70) {
            // Rolando para BAIXO suavemente -> ocultar
            setShowHeader(false);
          } else if (diff < -8) {
            // Rolando para CIMA suavemente -> reaparecer
            setShowHeader(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileSelect = (tab: string, param?: string) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-site shadow-xs border-b border-[#d8be9b]/40 backdrop-blur-md transition-transform duration-500 ease-in-out ${
        showHeader || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Small Top Bar: Language Selector & Clinic Contact (emcima delicado) */}
      <div className="bg-[#ede6df] text-[#5c4943] text-[11px] font-montserrat border-b border-[#e3d8ce] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Quick Clinic Info (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3 text-[11px] text-[#5c4943]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#7d5830]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9a5967] animate-pulse"></span>
              Greenslopes, Brisbane
            </span>
            <span className="text-[#cbb8a9]">|</span>
            <span className="text-[#6e594f]">Suite 3 · 412 Logan Road</span>
            <span className="text-[#cbb8a9]">|</span>
            <a href="tel:+61402148437" className="text-[#5c4943] hover:text-[#9a5967] font-medium transition-colors">
              +61 402 148 437
            </a>
          </div>

          {/* Language Selection Section */}
          <div className="flex items-center space-x-2 text-[11px] font-montserrat ml-auto">
            <span className="text-[#6e594f] flex items-center gap-1 uppercase tracking-wider text-[10px] font-medium">
              <Globe className="w-3 h-3 text-[#9a5967]" />
              <span>{language === 'en' ? 'Language:' : 'Idioma:'}</span>
            </span>

            <div className="inline-flex items-center bg-[#e2d8cf] rounded-full p-0.5 border border-[#d3c2b2] shadow-inner">
              <button
                type="button"
                onClick={() => onSelectLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#9a5967] text-white shadow-xs'
                    : 'text-[#6e594f] hover:text-[#2d2426]'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('es')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                  language === 'es'
                    ? 'bg-[#9a5967] text-white shadow-xs'
                    : 'text-[#6e594f] hover:text-[#2d2426]'
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('pt')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                  language === 'pt'
                    ? 'bg-[#9a5967] text-white shadow-xs'
                    : 'text-[#6e594f] hover:text-[#2d2426]'
                }`}
                title="Português"
              >
                PT
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-22">
          
          {/* Brand Logo oficial fixa */}
          <div className="flex-shrink-0 py-1.5 flex items-center">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-hidden"
              aria-label="Bella Beauty Brazil Home"
            >
              <BrandLogo className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto aspect-square filter drop-shadow-[0_2px_8px_rgba(156,114,68,0.18)] transition-all" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-3 xl:space-x-4 text-xs font-semibold uppercase tracking-wider text-[#3c3033]">
            <button
              onClick={() => onNavigate('home')}
              className={`px-2.5 py-1.5 transition-colors cursor-pointer rounded-sm ${
                currentTab === 'home' ? 'text-[#9a5967] font-bold border-b-2 border-[#9a5967]' : 'hover:text-[#9a5967]'
              }`}
            >
              {labels.home}
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-2.5 py-1.5 transition-colors cursor-pointer rounded-sm ${
                currentTab === 'about' ? 'text-[#9a5967] font-bold border-b-2 border-[#9a5967]' : 'hover:text-[#9a5967]'
              }`}
            >
              {labels.about}
            </button>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => onNavigate('services')}
                className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors cursor-pointer rounded-sm ${
                  currentTab === 'services' ? 'text-[#9a5967] font-bold border-b-2 border-[#9a5967]' : 'hover:text-[#9a5967]'
                }`}
              >
                <span>{language === 'en' ? 'Services' : language === 'pt' ? 'Serviços' : 'Servicios'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#806859] transition-transform group-hover:rotate-180 group-hover:text-[#9a5967]" />
              </button>
              <div className="absolute left-0 mt-0 w-72 bg-[#fbf8f5] shadow-xl rounded-b-md border border-[#d8be9b]/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 py-2">
                <button type="button" onClick={() => onNavigate('services')}
                  className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#5b3239] hover:bg-[#f3d9d0] cursor-pointer">
                  {language === 'en' ? 'Browse all services · Search & filters' : language === 'pt' ? 'Todos os serviços · Busca e filtros' : 'Todos los servicios · Búsqueda y filtros'}
                </button>
                <div className="mx-4 my-1 border-t border-[#d8be9b]/50" />
                {SERVICES.filter((service) => ['nano-strokes', 'shadow-hybrid', 'lip-blush', 'brow-lamination', 'lash-lift', 'teeth-whitening'].includes(service.id)).map((service) => (
                  <button key={service.id} type="button" onClick={() => onNavigate('services', service.id)}
                    className="w-full text-left px-4 py-2.5 text-xs text-[#3c3033] hover:bg-[#ede5dc] hover:text-[#9a5967] transition-colors cursor-pointer">
                    {service.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Location & Hours Dropdown */}
            <div className="relative group">
              <button
                onClick={() => onNavigate('locations')}
                className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors cursor-pointer rounded-sm ${
                  currentTab === 'locations' ? 'text-[#9a5967] font-bold border-b-2 border-[#9a5967]' : 'hover:text-[#9a5967]'
                }`}
              >
                <span>{language === 'en' ? 'Location & Hours' : language === 'pt' ? 'Local e horários' : 'Ubicación y horarios'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#806859] transition-transform group-hover:rotate-180 group-hover:text-[#9a5967]" />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-[#fbf8f5] shadow-xl rounded-b-md border border-[#d8be9b]/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => onNavigate('locations', loc.id)}
                    className="w-full text-left px-4 py-2.5 text-xs text-[#3c3033] hover:bg-[#ede5dc] hover:text-[#9a5967] transition-colors uppercase tracking-wider cursor-pointer flex items-center justify-between"
                  >
                    <span>{loc.name}</span>
                    {loc.isComingSoon && (
                      <span className="text-[9px] bg-[#9a5967]/15 text-[#8b6031] border border-[#9a5967]/30 px-1.5 py-0.5 rounded-sm font-semibold">{labels.soon}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses */}
            <button
              onClick={() => onNavigate('store')}
              className={`px-2.5 py-1.5 transition-colors cursor-pointer rounded-sm ${
                currentTab === 'store' ? 'text-[#9a5967] font-bold border-b-2 border-[#9a5967]' : 'hover:text-[#9a5967]'
              }`}
            >
              {labels.courses}
            </button>

            {/* Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className={`px-2.5 py-1.5 transition-colors cursor-pointer rounded-sm ${
                currentTab === 'contact' ? 'text-[#9a5967] font-bold border-b-2 border-[#9a5967]' : 'hover:text-[#9a5967]'
              }`}
            >
              {labels.contact}
            </button>
          </nav>

          {/* Action Icons & Appointment Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Appointment Button + Courses shortcut */}
            <div className="hidden sm:flex flex-col items-center gap-0.5">
              <button
                onClick={onOpenAppointment}
                className="flex items-center space-x-1.5 bg-[#9a5967] hover:bg-[#7a4753] text-white text-[11px] lg:text-xs font-bold uppercase tracking-wider px-3.5 lg:px-4 py-2 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(156,114,68,0.28)] cursor-pointer transform hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDA' : 'AGENDAR CITA'}</span>
              </button>
              <button type="button" onClick={() => onNavigate('store')} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#9a5967] hover:text-[#5b3239] cursor-pointer">
                <GraduationCap className="w-3 h-3" />{labels.courses}
              </button>
            </div>

            {/* Social Link */}
            <a
              href="https://www.instagram.com/bellabeautybrazil/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex text-[#5c4943] hover:text-[#9a5967] transition-colors p-1.5"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>

            {/* Hours Side Panel Trigger */}
            <button
              onClick={onOpenHours}
              className="hidden lg:flex p-1.5 text-[#5c4943] hover:text-[#9a5967] transition-colors cursor-pointer"
              aria-label="Operating Hours"
              title={language === 'en' ? 'Operating hours' : language === 'pt' ? 'Horários' : 'Horarios'}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile/tablet menu trigger (visible below lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#5c4943] hover:text-[#9a5967] transition-colors cursor-pointer relative z-50 flex items-center justify-center rounded-lg hover:bg-[#ede6df]/50"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu
                  className={`w-6 h-6 transition-all duration-300 absolute ${
                    mobileMenuOpen ? 'opacity-0 rotate-90 scale-75 pointer-events-none' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 transition-all duration-300 absolute ${
                    mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75 pointer-events-none'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/tablet drawer navigation (único menu abaixo de lg) */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-site border-b border-[#d8be9b]/40 shadow-2xl ${
          mobileMenuOpen ? 'max-h-[85vh] opacity-100 py-3 px-4 overflow-y-auto' : 'max-h-0 opacity-0 py-0 px-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => handleMobileSelect('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'home'
                ? 'text-[#9a5967] bg-[#ede6df] font-bold'
                : 'text-[#3c3033] hover:bg-[#ede6df]/60 hover:text-[#9a5967]'
            }`}
          >
              {labels.home}
          </button>

          <button
            onClick={() => handleMobileSelect('about')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'about'
                ? 'text-[#9a5967] bg-[#ede6df] font-bold'
                : 'text-[#3c3033] hover:bg-[#ede6df]/60 hover:text-[#9a5967]'
            }`}
          >
              {labels.about}
          </button>

          <button
            onClick={() => handleMobileSelect('services')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'services'
                ? 'text-[#9a5967] bg-[#ede6df] font-bold'
                : 'text-[#3c3033] hover:bg-[#ede6df]/60 hover:text-[#9a5967]'
            }`}
          >
              {labels.services}
          </button>

          <button
            onClick={() => handleMobileSelect('locations')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'locations'
                ? 'text-[#9a5967] bg-[#ede6df] font-bold'
                : 'text-[#3c3033] hover:bg-[#ede6df]/60 hover:text-[#9a5967]'
            }`}
          >
              {labels.location}
          </button>



          <button
            onClick={() => handleMobileSelect('contact')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'contact'
                ? 'text-[#9a5967] bg-[#ede6df] font-bold'
                : 'text-[#3c3033] hover:bg-[#ede6df]/60 hover:text-[#9a5967]'
            }`}
          >
              {labels.contact}
          </button>
        </div>

        {/* Idioma & Agendamento no mobile */}
        <div className="pt-3 mt-2 border-t border-[#d8be9b]/30 flex items-center justify-between">
          <div className="flex items-center space-x-1 bg-[#e2d8cf] p-0.5 rounded-full border border-[#d3c2b2]">
            <button
              type="button"
              onClick={() => onSelectLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'en' ? 'bg-[#9a5967] text-white shadow-xs' : 'text-[#6e594f] hover:text-[#2d2426]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onSelectLanguage('es')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'es' ? 'bg-[#9a5967] text-white shadow-xs' : 'text-[#6e594f] hover:text-[#2d2426]'
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onSelectLanguage('pt')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'pt' ? 'bg-[#9a5967] text-white shadow-xs' : 'text-[#6e594f] hover:text-[#2d2426]'
              }`}
            >
              PT
            </button>
          </div>

          <button
            onClick={() => {
              onOpenHours();
              setMobileMenuOpen(false);
            }}
            className="text-xs font-semibold text-[#5c4943] hover:text-[#9a5967] cursor-pointer"
          >
            {language === 'en' ? 'Hours' : language === 'pt' ? 'Horários' : 'Horarios'}
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              onOpenAppointment();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-[#9a5967] hover:bg-[#7a4753] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-md cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>{language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDA' : 'AGENDAR CITA'}</span>
          </button>
          <button
            onClick={() => handleMobileSelect('store')}
            className={`w-full mt-2 flex items-center justify-center space-x-2 border border-[#9a5967] text-[#5b3239] hover:bg-[#f3d9d0] text-xs font-bold uppercase tracking-wider py-2.5 rounded-md cursor-pointer ${currentTab === 'store' ? 'bg-[#f3d9d0]' : 'bg-transparent'}`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{labels.courses}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
