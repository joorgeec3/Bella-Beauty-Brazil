import React from 'react';
import { Language } from '../data/siteData';
import { siteImages } from '../data/siteImages';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Brand Logo */}
        <div className="mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
          <img
            src={siteImages.brand.logoHorizontalDark}
            alt="Bella Beauty Brazil"
            className="h-16 w-auto object-contain mx-auto filter drop-shadow-md"
            width={135}
            height={80}
            loading="lazy"
          />
        </div>

        {/* Tagline */}
        <p className="font-raleway text-lg sm:text-xl font-light text-neutral-300 tracking-wider mb-8 max-w-md">
          {language === 'en' ? (
            <>
              Brows · Lashes · Cosmetic Tattooing<br />Beauty Courses &amp; Treatments
            </>
          ) : language === 'pt' ? (
            <>
              Sobrancelhas · Cílios · Tatuagem Cosmética<br />Cursos &amp; Tratamentos
            </>
          ) : (
            <>
              Cejas · Pestañas · Tatuaje Cosmético<br />Cursos y tratamientos
            </>
          )}
        </p>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          <button onClick={() => onNavigate('home')} className="hover:text-[#9a5967] transition-colors cursor-pointer">
            {language === 'en' ? 'Home' : language === 'pt' ? 'Início' : 'Inicio'}
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-[#9a5967] transition-colors cursor-pointer">
            {language === 'en' ? 'About' : language === 'pt' ? 'Sobre Nós' : 'Nosotros'}
          </button>
          <button onClick={() => onNavigate('services')} className="hover:text-[#9a5967] transition-colors cursor-pointer">
            {language === 'en' ? 'Services' : language === 'pt' ? 'Serviços' : 'Servicios'}
          </button>
          <button onClick={() => onNavigate('locations')} className="hover:text-[#9a5967] transition-colors cursor-pointer">
            {language === 'en' ? 'Location & Hours' : language === 'pt' ? 'Local e horários' : 'Ubicación y horarios'}
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#9a5967] transition-colors cursor-pointer">
            {language === 'en' ? 'Contact' : language === 'pt' ? 'Contato' : 'Contacto'}
          </button>
          <button onClick={() => onNavigate('store')} className="hover:text-[#9a5967] transition-colors cursor-pointer">
            {language === 'en' ? 'Courses' : language === 'pt' ? 'Cursos' : 'Cursos'}
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mb-8">
          <a
            href="https://www.instagram.com/bellabeautybrazil/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white hover:bg-[#9a5967] hover:border-[#9a5967] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 172 300">
              <path d="M160.5 2.1v44.1h-26.1q-14.4 0-19.5 6t-5.1 18V102H159l-6.6 49.5h-42.6v127.2H58.5V151.5H15.9V102h42.6V65.4q0-31.2 17.4-48.3T122.4 0q24.6 0 38.1 2.1z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/bellabeautybrazil/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white hover:bg-[#9a5967] hover:border-[#9a5967] transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 258 300">
              <path d="M171.3 150q0-17.7-12.3-30.3t-30.3-12.6-30.3 12.6T85.8 150t12.6 30.3 30.3 12.6 30.3-12.6 12.3-30.3zm23.1 0q0 27.3-19.2 46.8T128.7 216t-46.8-19.2T62.7 150t19.2-46.8T128.7 84t46.5 19.2 19.2 46.8zm18.3-68.7q0 6.3-4.5 10.8t-11.1 4.5-10.8-4.5-4.5-10.8 4.5-10.8 10.8-4.5 11.1 4.5 4.5 10.8zm-84-36.9H98.1q-6 0-16.2.6t-17.1 1.5-12 3.3q-8.4 3.3-14.7 9.6t-9.9 14.7q-1.8 4.8-3 12t-1.8 17.4-.3 15.9 0 17.7 0 12.9 0 12.9 0 17.7.3 15.9 1.8 17.4 3 12q3.6 8.4 9.9 14.7t14.7 9.6q4.8 1.8 12 3.3t17.1 1.5 16.2.6 17.7 0 12.9 0 12.6 0 17.7 0 16.2-.6 17.4-1.5 11.7-3.3q8.4-3.3 15-9.6t9.6-14.7q1.8-4.8 3-12t1.8-17.4.3-15.9 0-17.7 0-12.9 0-12.9 0-17.7-.3-15.9-1.8-17.4-3-12q-3.3-8.4-9.6-14.7t-15-9.6q-4.8-1.8-11.7-3.3T175.2 45t-16.2-.6-17.7 0-12.6 0zM257.1 150q0 38.4-.9 53.1-1.5 34.8-20.7 54t-53.7 20.7q-15 .9-53.1.9t-53.1-.9q-34.8-1.8-54-20.7t-20.7-54Q0 188.4 0 150t.9-53.1q1.5-34.8 20.7-54t54-20.7q14.7-.9 53.1-.9t53.1.9q34.8 1.8 53.7 20.7t20.7 54q.9 14.7.9 53.1z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-neutral-500 font-montserrat">
          <p>{language === 'en' ? '© Copyright Bella Beauty Brazil / All rights reserved' : language === 'pt' ? '© Bella Beauty Brazil / Todos os direitos reservados' : '© Bella Beauty Brazil / Todos los derechos reservados'}</p>
          <p className="mt-2">
            {language === 'en' ? 'Created by ' : language === 'pt' ? 'Criado por ' : 'Creado por '}
            <a href="https://nexcodesystems.site" target="_blank" rel="noopener noreferrer" className="text-[#9a5967] hover:text-[#e0bd86] transition-colors">
              nexcodesystems.site
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
