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
import { SalonGallery } from './components/SalonGallery';
import { GalleryMarquee } from './components/GalleryMarquee';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { SmoothScrollController } from './components/SmoothScrollController';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { SideHoursDrawer } from './components/SideHoursDrawer';
import { JoinChatButton } from './components/JoinChatButton';
import { ProductQuickviewModal } from './components/ProductQuickviewModal';
import { AboutUsView } from './pages/AboutUsView';
import { ServicesView } from './pages/ServicesView';
import { LocationsView } from './pages/LocationsView';
import { ContactView } from './pages/ContactView';
import { WorkWithUsView } from './pages/WorkWithUsView';
import { StoreView } from './pages/StoreView';
import { ServiceDetailView } from './pages/ServiceDetailView';
import { BOOKING_URL, Language, Product, SERVICES } from './data/siteData';

const APP_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
// Change VITE_PUBLIC_SITE_URL to the official domain only after the domain points at this Vercel project.
const PUBLIC_SITE_ORIGIN = (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://bella-beauty-brazil.vercel.app').replace(/\/+$/, '');

const resolveRoute = () => {
  if (typeof window === 'undefined') return { tab: 'home', serviceId: undefined as string | undefined };
  const rawPath = window.location.pathname;
  const pathWithinApp = APP_BASE_PATH && (rawPath === APP_BASE_PATH || rawPath.startsWith(`${APP_BASE_PATH}/`))
    ? rawPath.slice(APP_BASE_PATH.length)
    : rawPath;
  const path = pathWithinApp.replace(/\/+$/, '') || '/';
  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const exists = SERVICES.some((service) => service.id === serviceMatch[1]);
    return exists ? { tab: 'service-detail', serviceId: serviceMatch[1] } : { tab: 'not-found', serviceId: undefined };
  }
  if (path === '/services') return { tab: 'services', serviceId: undefined };
  if (path === '/about') return { tab: 'about', serviceId: undefined };
  if (path === '/locations') return { tab: 'locations', serviceId: undefined };
  if (path === '/contact') return { tab: 'contact', serviceId: undefined };
  if (path === '/courses' || path === '/store') return { tab: 'store', serviceId: undefined };
  if (path === '/') return { tab: 'home', serviceId: undefined };
  return { tab: 'not-found', serviceId: undefined };
};

export default function App() {
  const initialRoute = resolveRoute();
  const [currentTab, setCurrentTab] = useState<string>(initialRoute.tab);
  const [activeServiceId, setActiveServiceId] = useState<string | undefined>(initialRoute.serviceId);
  const [sideHoursOpen, setSideHoursOpen] = useState(false);
  const [quickviewProduct, setQuickviewProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showFloatingAppointment, setShowFloatingAppointment] = useState(false);
  // Open Timely's own service-selection screen directly in the same tab.
  // This avoids blocked popup windows and the extra location modal on mobile/tablet.
  const openBooking = () => { window.location.assign(BOOKING_URL); };

  React.useEffect(() => {
    const handleScroll = () => setShowFloatingAppointment(window.scrollY > 520);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On narrow screens, the floating CTAs withdraw when service cards are visible.
  // This prevents WhatsApp and booking controls from covering photos and copy.
  React.useEffect(() => {
    const targets = document.querySelectorAll('[data-floating-clearance]');
    const visibleSections = new Set<Element>();
    const narrowScreen = window.matchMedia('(max-width: 640px)');
    const refresh = () => {
      if (narrowScreen.matches && visibleSections.size > 0) {
        document.body.dataset.floatingClearance = 'true';
      } else {
        delete document.body.dataset.floatingClearance;
      }
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      });
      refresh();
    });
    targets.forEach((section) => observer.observe(section));
    window.addEventListener('resize', refresh, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', refresh);
      delete document.body.dataset.floatingClearance;
    };
  }, [currentTab]);

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
      'not-found': { title: 'Page Not Found | Bella Beauty Brazil', description: 'The requested page could not be found. Browse Bella Beauty Brazil treatments and courses in Greenslopes.' },
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
    const currentPath = currentTab === 'service-detail' && activeServiceId
      ? `/services/${encodeURIComponent(activeServiceId)}`
      : currentTab === 'home' ? '/'
      : currentTab === 'store' || currentTab === 'courses' ? '/courses'
      : currentTab === 'not-found' ? window.location.pathname
      : `/${currentTab}`;
    const canonicalUrl = PUBLIC_SITE_ORIGIN + currentPath;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = currentTab === 'not-found' ? 'noindex,follow' : 'index,follow';

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BeautySalon',
          '@id': `${PUBLIC_SITE_ORIGIN}/#business`,
          name: 'Bella Beauty Brazil',
          url: `${PUBLIC_SITE_ORIGIN}/`,
          telephone: '+61 402 148 437',
          email: 'livia.anjos14@gmail.com',
          address: { '@type': 'PostalAddress', streetAddress: 'Suite 3, 412 Logan Road', addressLocality: 'Greenslopes', addressRegion: 'QLD', postalCode: '4120', addressCountry: 'AU' },
          sameAs: ['https://www.instagram.com/bellabeautybrazil/', 'https://bellabrazil.gettimely.com/'],
        },
        { '@type': 'Person', '@id': `${PUBLIC_SITE_ORIGIN}/#livia-rego`, name: 'Livia Rego', worksFor: { '@id': `${PUBLIC_SITE_ORIGIN}/#business` } },
        ...SERVICES.map((service) => ({ '@type': 'Service', '@id': `${PUBLIC_SITE_ORIGIN}/services/${service.id}#service`, name: service.title, url: `${PUBLIC_SITE_ORIGIN}/services/${service.id}`, provider: { '@id': `${PUBLIC_SITE_ORIGIN}/#business` }, areaServed: ['Greenslopes', 'Brisbane Southside', 'Greater Brisbane'], offers: service.price ? { '@type': 'Offer', priceCurrency: 'AUD', price: service.price, url: 'https://bellabrazil.gettimely.com/' } : undefined })),
        { '@type': 'BreadcrumbList', itemListElement: currentTab === 'home' ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${PUBLIC_SITE_ORIGIN}/` }] : [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${PUBLIC_SITE_ORIGIN}/` }, { '@type': 'ListItem', position: 2, name: current.title.replace(' | Bella Beauty Brazil', ''), item: canonicalUrl }] },
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
        onOpenAppointment={openBooking}
        onOpenHours={() => setSideHoursOpen(true)}
        language={language}
        onSelectLanguage={(lang) => setLanguage(lang)}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'es' : l === 'es' ? 'pt' : 'en'))}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentTab === 'not-found' && (
          <section className="bg-site py-24 min-h-[60vh] flex items-center justify-center px-4 text-center">
            <div className="max-w-xl">
              <p className="font-montserrat text-xs font-semibold uppercase tracking-widest text-[#9a5967]">Bella Beauty Brazil · 404</p>
              <h1 className="font-raleway text-3xl sm:text-5xl font-light uppercase tracking-wide text-[#5b3239] mt-3">
                {language === 'en' ? 'Page not found' : language === 'pt' ? 'Página não encontrada' : 'Página no encontrada'}
              </h1>
              <p className="font-montserrat text-sm text-[#675960] mt-5 leading-relaxed">
                {language === 'en' ? 'The requested treatment page does not exist. Explore our current services or contact the studio.' : language === 'pt' ? 'Esta página de tratamento não existe. Conheça os serviços atuais ou fale com o estúdio.' : 'Esta página de tratamiento no existe. Consulta nuestros servicios actuales o contacta al estudio.'}
              </p>
              <button type="button" onClick={() => handleNavigate('services')} className="mt-8 rounded-full px-8 py-4 bg-[#5b3239] text-white text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-[#7a4753]">
                {language === 'en' ? 'Browse services' : language === 'pt' ? 'Ver serviços' : 'Ver servicios'}
              </button>
            </div>
          </section>
        )}
        {currentTab === 'home' && (
          <>
            <HeroSlider
              onOpenAppointment={openBooking}
              onOpenCourses={() => handleNavigate('store')}
              onOpenServices={() => handleNavigate('services')}
              language={language}
            />
            <FeaturesRibbon language={language} />
            <TickerMarquee language={language} />
            <ServicesSection
              onOpenAppointment={openBooking}
              onNavigateToServices={(serviceId) => handleNavigate('services', serviceId)}
              language={language}
            />
            <GalleryMarquee language={language} />
            <BeforeAfterSection language={language} />
            <LocationsCarousel
              onOpenAppointment={openBooking}
              language={language}
            />
            <SalonGallery language={language} />
            <TestimonialsSection language={language} />
            <InstagramSection language={language} />
          </>
        )}

        {currentTab === 'about' && (
          <AboutUsView
            onOpenAppointment={openBooking}
            language={language}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            initialServiceId={activeServiceId}
            onOpenAppointment={openBooking}
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
            onOpenAppointment={openBooking}
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
        onClick={openBooking}
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

      {/* Modals & Drawers */}
      <ProductQuickviewModal
        product={quickviewProduct}
        onClose={() => setQuickviewProduct(null)}
        onOpenAppointment={() => {
          setQuickviewProduct(null);
          openBooking();
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
