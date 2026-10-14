import React, { useMemo } from 'react';
import { Calendar, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { BOOKING_URL, LOCATIONS, Language } from '../data/siteData';

interface LocationsCarouselProps { onOpenAppointment: () => void; language: Language; }
const TIMELY_URL = 'https://bellabrazil.gettimely.com/';
const WEEK = [
  ['Monday', '11:00–17:30'],
  ['Tuesday', '09:15–19:30'],
  ['Wednesday', '13:30–15:30'],
  ['Thursday', '09:15–19:30'],
  ['Friday', '09:15–16:00'],
  ['Saturday', '08:30–15:30'],
] as const;
const toMinutes = (value: string) => { const [hours, minutes] = value.split(':').map(Number); return hours * 60 + minutes; };
const currentStatus = () => {
  const parts = new Intl.DateTimeFormat('en-AU', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Australia/Brisbane' }).formatToParts(new Date());
  const weekday = parts.find(part => part.type === 'weekday')?.value || '';
  const hour = Number(parts.find(part => part.type === 'hour')?.value || 0);
  const minute = Number(parts.find(part => part.type === 'minute')?.value || 0);
  const today = WEEK.find(([day]) => day === weekday);
  if (!today) return { weekday, open: false };
  const [start, end] = today[1].split('–');
  return { weekday, open: toMinutes(`${hour}:${minute}`) >= toMinutes(start) && toMinutes(`${hour}:${minute}`) < toMinutes(end) };
};

export const LocationsCarousel: React.FC<LocationsCarouselProps> = ({ language }) => {
  const location = LOCATIONS[0];
  const status = useMemo(currentStatus, []);
  const sectionRef = React.useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = React.useState(false);
  React.useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') { setSectionVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSectionVisible(true); observer.disconnect(); }
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const isEnglish = language === 'en';
  const isPortuguese = language === 'pt';
  const dayLabels = isPortuguese ? { Monday: 'Segunda-feira', Tuesday: 'Terça-feira', Wednesday: 'Quarta-feira', Thursday: 'Quinta-feira', Friday: 'Sexta-feira', Saturday: 'Sábado' } : language === 'es' ? { Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles', Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado' } : { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday' };
  const labels = isEnglish ? { eyebrow: 'Bella Beauty Brazil', title: 'Find Us & Opening Hours', directions: 'Get Directions', book: 'Book Now', open: 'Open Now', closed: 'Closed', address: 'Address', hours: 'Opening Hours' } : isPortuguese ? { eyebrow: 'Bella Beauty Brazil', title: 'Encontre-nos e horários', directions: 'Como chegar', book: 'Agendar', open: 'Aberto agora', closed: 'Fechado', address: 'Endereço', hours: 'Horários de funcionamento' } : { eyebrow: 'Bella Beauty Brazil', title: 'Encuéntranos y horarios', directions: 'Cómo llegar', book: 'Reservar', open: 'Abierto ahora', closed: 'Cerrado', address: 'Dirección', hours: 'Horarios de apertura' };
  return <section ref={sectionRef} className="relative bg-site text-[#3c3033] py-16 lg:py-24 overflow-hidden"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div className={`text-center mb-10 sm:mb-14 reveal-on-scroll location-heading-reveal ${sectionVisible ? 'is-revealed' : ''}`}><p className="font-raleway text-xs font-bold uppercase tracking-[0.22em] text-[#9a5967] mb-2">{labels.eyebrow}</p><h2 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wider">{labels.title}</h2><div className="location-rule w-16 h-0.5 bg-[#9a5967] mx-auto mt-4" /></div><div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"><div className={`location-map-reveal ${sectionVisible ? 'is-revealed' : ''} lg:col-span-3 min-h-[440px] lg:min-h-[520px] overflow-hidden rounded-3xl border border-[#9a5967]/20 bg-neutral-900 shadow-xl flex flex-col reveal-from-left`}><iframe title="Bella Beauty Brazil Google Maps" src="https://www.google.com/maps?q=Suite%203,%20412%20Logan%20Road,%20Greenslopes%20QLD%204120%20Australia&output=embed" className="w-full flex-1 min-h-[360px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#5b3239] px-5 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#7a4753] cursor-pointer"><Navigation className="w-4 h-4 text-[#efb7c8]" />{labels.directions}</a></div><aside className={`location-hours-reveal ${sectionVisible ? 'is-revealed' : ''} lg:col-span-2 min-h-[440px] lg:min-h-[520px] rounded-3xl bg-[#3c3033] p-7 sm:p-9 text-white shadow-xl flex flex-col justify-between border border-[#9a5967]/40 reveal-from-right`}><div><div className="flex items-start justify-between gap-4 mb-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#efb7c8] mb-2">{location.name}</p><h3 className="font-raleway text-2xl sm:text-3xl font-bold uppercase tracking-wider">{labels.hours}</h3></div><Clock className="w-7 h-7 text-[#efb7c8] shrink-0" /></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-7"><p className="text-xs uppercase tracking-widest text-[#efb7c8] mb-2">{labels.address}</p><p className="font-montserrat text-sm leading-relaxed text-neutral-100">{location.address}<br />{location.city}</p><a href={`tel:${location.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 mt-3 text-sm text-white hover:text-[#efb7c8] cursor-pointer"><Phone className="w-4 h-4" />{location.phone}</a></div><div className="space-y-2.5">{WEEK.map(([day, hours]) => <div key={day} className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 font-montserrat text-sm ${status.weekday === day ? 'bg-[#9a5967]/35 text-white ring-1 ring-[#efb7c8]/40' : 'text-neutral-300'}`}><span className="font-semibold">{dayLabels[day]}</span><span className="tabular-nums">{hours}</span></div>)}<div className="pt-3 text-center"><span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${status.open ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/10 text-[#efb7c8]'}`}>{status.open ? labels.open : labels.closed}</span></div></div></div><a href={TIMELY_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#9a5967] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#a96e2e] cursor-pointer"><Calendar className="w-4 h-4" />{labels.book}</a></aside></div></div></section>;
};
