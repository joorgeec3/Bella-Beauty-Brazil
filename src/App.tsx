/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { FeaturesRibbon } from './components/FeaturesRibbon';
import { TickerMarquee } from './components/TickerMarquee';
import { ServicesSection } from './components/ServicesSection';
import { LocationsCarousel } from './components/LocationsCarousel';
import { GalleryMarquee } from './components/GalleryMarquee';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { SmoothScrollController } from './components/SmoothScrollController';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { SideHoursDrawer } from './components/SideHoursDrawer';
import { JoinChatButton } from './components/JoinChatButton';
import { BackToTopButton } from './components/BackToTopButton';
import { ProductQuickviewModal } from './components/ProductQuickviewModal';
import { AboutUsView } from './pages/AboutUsView';
import { ServicesView } from './pages/ServicesView';
import { LocationsView } from './pages/LocationsView';
import { ContactView } from './pages/ContactView';
import { WorkWithUsView } from './pages/WorkWithUsView';
import { StoreView } from './pages/StoreView';
import { ServiceDetailView } from './pages/ServiceDetailView';
import { Language, Product, SERVICES } from './data/siteData';

const APP_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

const resolveRoute = () => {
  if (typeof window === 'undefined') return { tab: 'home', serviceId: undefined as string | undefined };
  const rawPath = window.location.pathname;
  const pathWithinApp = APP_BASE_PATH && (rawPath === APP_BASE_PATH || rawPath.startsWith(`${APP_BASE_PATH}/`))
    ? rawPath.slice(APP_BASE_PATH.length)
    : rawPath;
  const path = pathWithinApp.replace(/\/+$/, '') || '/';
  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) return { tab: 'service-detail', serviceId: serviceMatch[1] };
  if (path === '/services') return { tab: 'services', serviceId: undefined };
  if (path === '/about') return { tab: 'about', serviceId: undefined };
  if (path === '/locations') return { tab: 'locations', serviceId: undefined };
  if (path === '/contact') return { tab: 'contact', serviceId: undefined };
  if (path === '/courses' || path === '/store') return { tab: 'store', serviceId: undefined };
  return { tab: 'home', serviceId: undefined };
};

export default function App() {
  const initialRoute = resolveRoute();
  const [currentTab, setCurrentTab] = useState<string>(initialRoute.tab);
  const [activeServiceId, setActiveServiceId] = useState<string | undefined>(initialRoute.serviceId);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [sideHoursOpen, setSideHoursOpen] = useState(false);
  const [quickviewProduct, setQuickviewProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showFloatingAppointment, setShowFloatingAppointment] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowFloatingAppointment(window.scrollY > 520);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const metadata: Record<string, { title: string; description: string }> = {
      home: {
        title: 'Bella Beauty Brazil | Brows, Lashes & Beauty in Greenslopes',
        description: 'Bella Beauty Brazil by Livia Rego offers Nano Strokes, Microblading, Lip Blush, brows, lashes, skin treatments and professional courses in Greenslopes, Brisbane.',
      },
      about: {
        title: 'Meet Livia | Bella Beauty Brazil in Greenslopes',
        description: 'Meet Livia Rego and learn about Bella Beauty Brazil, a beauty studio at Suite 3, 412 Logan Road, Greenslopes, Brisbane.',
      },
      services: {
        title: 'Beauty Services | Nano Strokes, Brows, Lashes & Skin',
        description: 'Explore confirmed Bella Beauty Brazil services, prices and durations for brows, cosmetic tattooing, lashes, skin treatments and waxing.',
      },
      locations: {
        title: 'Location & Opening Hours | Bella Beauty Brazil Greenslopes',
        description: 'Find Bella Beauty Brazil at Suite 3, 412 Logan Road, Greenslopes, with confirmed opening hours, Google Maps and directions.',
      },
      contact: {
        title: 'Contact & Book | Bella Beauty Brazil Brisbane',
        description: 'Contact Bella Beauty Brazil and book through the official Timely booking page. Located in Greenslopes, Brisbane Southside.',
      },
      store: {
        title: 'Beauty Courses | Bella Beauty Brazil Professional Training',
        description: 'View Bella Beauty Brazil one-to-one professional beauty courses, confirmed durations and prices in AUD.',
      },
      courses: {
        title: 'Beauty Courses | Bella Beauty Brazil Professional Training',
        description: 'View Bella Beauty Brazil one-to-one professional beauty courses, confirmed durations and prices in AUD.',
      },
      'service-detail': {
        title: 'Beauty Treatment | Bella Beauty Brazil Greenslopes',
        description: 'Explore a Bella Beauty Brazil treatment with confirmed Timely details, preparation guidance, FAQs and official booking in Greenslopes, Brisbane.',
      },
    };
    const current = currentTab === 'service-detail' && activeServiceId
      ? { title: `${SERVICES.find((service) => service.id === activeServiceId)?.title || 'Beauty Treatment'} | Bella Beauty Brazil`, description: `Learn about ${SERVICES.find((service) => service.id === activeServiceId)?.title || 'this Bella Beauty Brazil treatment'}, with confirmed Timely details, FAQs and booking in Greenslopes, Brisbane.` }
      : metadata[currentTab] || metadata.home;
    document.title = current.title;
    document.documentElement.lang = language === 'en' ? 'en-AU' : language;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', current.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute('content', current.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute('content', current.description);

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BeautySalon',
          '@id': 'https://www.bellabeautybrazil.com.au/#business',
          name: 'Bella Beauty Brazil',
          url: 'https://www.bellabeautybrazil.com.au/',
          telephone: '+61 402 148 437',
          email: 'livia.anjos14@gmail.com',
          address: { '@type': 'PostalAddress', streetAddress: 'Suite 3, 412 Logan Road', addressLocality: 'Greenslopes', addressRegion: 'QLD', postalCode: '4120', addressCountry: 'AU' },
          sameAs: ['https://www.instagram.com/bellabeautybrazil/', 'https://bellabrazil.gettimely.com/'],
        },
        { '@type': 'Person', '@id': 'https://www.bellabeautybrazil.com.au/#livia-rego', name: 'Livia Rego', worksFor: { '@id': 'https://www.bellabeautybrazil.com.au/#business' } },
        ...SERVICES.slice(0, 8).map((service) => ({ '@type': 'Service', name: service.title, provider: { '@id': 'https://www.bellabeautybrazil.com.au/#business' }, areaServed: ['Greenslopes', 'Brisbane Southside', 'Greater Brisbane'], offers: service.price ? { '@type': 'Offer', priceCurrency: 'AUD', price: service.price } : undefined })),
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bellabeautybrazil.com.au/' }, { '@type': 'ListItem', position: 2, name: current.title.replace(' | Bella Beauty Brazil', '') }] },
      ],
    };
    let script = document.getElementById('bella-dynamic-schema') as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.id = 'bella-dynamic-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(structuredData);
  }, [currentTab, activeServiceId, language]);

  React.useEffect(() => {
    const onPopState = () => {
      const route = resolveRoute();
      setCurrentTab(route.tab);
      setActiveServiceId(route.serviceId);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll reveal animation observer (Intersection Observer)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-fade, .reveal-scale, .reveal-from-left, .reveal-from-right').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed), .reveal-fade:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-from-left:not(.is-revealed), .reveal-from-right:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timer = setTimeout(observeElements, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentTab]);

  const handleNavigate = (tab: string, subParam?: string) => {
    const isServiceDetail = tab === 'services' && Boolean(subParam);
    const resolvedTab = isServiceDetail ? 'service-detail' : tab === 'courses' || tab === 'store' ? 'store' : tab;
    setCurrentTab(resolvedTab);
    setActiveServiceId(isServiceDetail ? subParam : undefined);
    const routePath = isServiceDetail ? `/services/${subParam}` : resolvedTab === 'home' ? '/' : resolvedTab === 'store' ? '/courses' : `/${resolvedTab}`;
    const path = `${APP_BASE_PATH}${routePath}`;
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-site text-neutral-800 font-sans selection:bg-[#9a5967] selection:text-white">
      <SmoothScrollController />
      
      {/* Primary Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAppointment={() => setAppointmentModalOpen(true)}
        onOpenHours={() => setSideHoursOpen(true)}
        language={language}
        onSelectLanguage={(lang) => setLanguage(lang)}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'es' : l === 'es' ? 'pt' : 'en'))}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <>
            <HeroSlider
              onOpenAppointment={() => setAppointmentModalOpen(true)}
              onOpenCourses={() => handleNavigate('store')}
              language={language}
            />
            <FeaturesRibbon language={language} />
            <TickerMarquee language={language} />
            <ServicesSection
              onOpenAppointment={() => setAppointmentModalOpen(true)}
              onNavigateToServices={(serviceId) => handleNavigate('services', serviceId)}
              language={language}
            />
            <GalleryMarquee language={language} />
            <BeforeAfterSection language={language} />
            <LocationsCarousel
              onOpenAppointment={() => setAppointmentModalOpen(true)}
              language={language}
            />
            <TestimonialsSection language={language} />
            <InstagramSection language={language} />
          </>
        )}

        {currentTab === 'about' && (
          <AboutUsView
            onOpenAppointment={() => setAppointmentModalOpen(true)}
            language={language}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            initialServiceId={activeServiceId}
            onOpenAppointment={() => setAppointmentModalOpen(true)}
            language={language}
            onNavigateToService={(serviceId) => handleNavigate('services', serviceId)}
          />
        )}

        {currentTab === 'service-detail' && activeServiceId && (
          <ServiceDetailView
            serviceId={activeServiceId}
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'locations' && (
          <LocationsView
            onOpenAppointment={() => setAppointmentModalOpen(true)}
            language={language}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView language={language} />
        )}

        {currentTab === 'store' && (
          <StoreView
            language={language}
          />
        )}

        {currentTab === 'courses' && (
          <WorkWithUsView language={language} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
      />

      {/* Floating Appointment Button (Matching #boton in original site) */}
      <button
        id="boton-flotante"
        onClick={() => setAppointmentModalOpen(true)}
        className={`flex items-center space-x-2 py-3 px-5 sm:px-6 cursor-pointer transition-opacity duration-300 ${showFloatingAppointment ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto'}`}
        aria-label={language === 'en' ? 'Book now' : language === 'pt' ? 'Agendar agora' : 'Reservar ahora'}
      >
        <Calendar className="w-4 h-4 text-white" />
          <span className="floating-appointment-label font-montserrat font-extrabold text-xs tracking-wider text-white uppercase">
          {language === 'en' ? 'BOOK NOW' : language === 'pt' ? 'AGENDA' : 'AGENDAR CITA'}
        </span>
      </button>

      {/* WhatsApp JoinChat Bubble */}
      <JoinChatButton language={language} />
      <BackToTopButton language={language} />

      {/* Modals & Drawers */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        language={language}
      />

      <ProductQuickviewModal
        product={quickviewProduct}
        onClose={() => setQuickviewProduct(null)}
        onOpenAppointment={() => {
          setQuickviewProduct(null);
          setAppointmentModalOpen(true);
        }}
        language={language}
      />

      <SideHoursDrawer
        isOpen={sideHoursOpen}
        onClose={() => setSideHoursOpen(false)}
        language={language}
      />

    </div>
  );
}
