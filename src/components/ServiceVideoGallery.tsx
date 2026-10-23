import React, { useEffect, useRef, useState } from 'react';
import { Film, PlayCircle } from 'lucide-react';
import type { Language } from '../data/siteData';
import { galleryVideos } from '../data/galleryData';

type VideoItem = { src: string; title: string };

// Source: precisely named folders in Site Bella.zip.
// No generic or unrelated clip may appear as proof of a specific treatment.
const approvedVideoClips: Record<string, string[]> = {
  'nano-strokes': ['nano-strokes/01.mp4','nano-strokes/02.mp4','nano-strokes/03.mp4'],
  'shadow-brows': ['shadow-brows/01.mp4','shadow-brows/02.mp4'],
  'lip-blush': ['lip-blush/01.mp4'],
  'brow-sculpt': ['brow-sculpt/01.mp4'],
  // Formerly shown as a generic lip-treatment video; RAR names it Lip Hydration.
  'lip-bliss-hydration': ['lip-treatments-geral/01.mp4'],
};
// Additional, previously uploaded clips from strictly named folders in the RAR.
 // The misleading "dermaplaning-video-01" is intentionally excluded because
 // its Git blob SHA matches the Lip Hydration clip, not Dermaplaning.
const serviceVideoFolderToRoute: Record<string, string> = {
  'brow-sculpt': 'brow-sculpt',
  'dreamy-brows': 'dreamy-brows',
  'shadow-brows': 'shadow-brows',
  'facial-spa': 'facial-spa',
  'lip-blush': 'lip-blush',
  'lip-bliss-hydration': 'lip-bliss-hydration',
  'teeth-whitening': 'teeth-whitening',
};
// The item titled Dermaplaning in the old upload duplicates a lip hydration file;
// exclude it rather than presenting the wrong procedure.
const videoCandidates = (serviceId: string): VideoItem[] => [
  ...(approvedVideoClips[serviceId] ?? []).map((relative,index)=>({
    src: `${import.meta.env.BASE_URL}assets/bella/media-alinhada-2026-10/${relative}`,
    title: `${serviceId} — video ${index+1}`,
  })),
  ...galleryVideos
    .filter(clip => clip.id !== 'gallery-video-dermaplaning-1' &&
      serviceVideoFolderToRoute[clip.id.replace(/^gallery-video-/, '').replace(/-\d+$/, '')] === serviceId)
    .map(clip => ({ src: clip.src, title: clip.serviceName })),
];

const labels = {
  en: {
    heading: 'Watch the treatment',
    description: 'Real videos provided by Bella Beauty Brazil. Select play to watch.',
    video: 'Treatment video',
  },
  pt: {
    heading: 'Veja o tratamento',
    description: 'Vídeos reais enviados pela Bella Beauty Brazil. Toque para reproduzir.',
    video: 'Vídeo do tratamento',
  },
  es: {
    heading: 'Mira el tratamiento',
    description: 'Vídeos reales proporcionados por Bella Beauty Brazil. Pulsa para reproducir.',
    video: 'Vídeo del tratamiento',
  },
} as const;

export const ServiceVideoGallery: React.FC<{ serviceId: string; language: Language }> = ({ serviceId, language }) => {
  const [available, setAvailable] = useState<VideoItem[]>([]);
  const videoGridRef = useRef<HTMLDivElement>(null);

  const handleVideoPlay = (current: HTMLVideoElement) => {
    // Only one treatment clip should produce sound at a time.
    videoGridRef.current?.querySelectorAll('video').forEach((video) => {
      if (video !== current && !video.paused) video.pause();
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    setAvailable([]);
    const candidates = videoCandidates(serviceId);
    if (!candidates.length) return () => controller.abort();

    // This also prevents missing/404 video assets from producing broken players.
    Promise.all(candidates.map(async (video) => {
      try {
        const response = await fetch(video.src, { method: 'HEAD', signal: controller.signal });
        const contentType = response.headers.get('content-type') || '';
        return response.ok && contentType.toLowerCase().includes('video/') ? video : null;
      } catch {
        return null;
      }
    })).then((items) => {
      if (!controller.signal.aborted) setAvailable(items.filter((item): item is VideoItem => item !== null));
    });

    return () => controller.abort();
  }, [serviceId]);

  if (!available.length) return null;
  const copy = labels[language];

  return (
    <section id={`service-videos-${serviceId}`} aria-labelledby={`service-videos-heading-${serviceId}`} className="bg-[#fffaf9] px-4 sm:px-6 lg:px-8 pt-2 pb-12 sm:pb-16 border-b border-[#e8d6d5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-[#9a5967] mb-2">
          <Film className="w-4 h-4" aria-hidden="true"/>
          <span className="font-montserrat text-[11px] font-bold uppercase tracking-widest">Bella Beauty Brazil</span>
        </div>
        <h2 id={`service-videos-heading-${serviceId}`} className="font-raleway text-2xl sm:text-3xl font-semibold text-[#5b3239]">{copy.heading}</h2>
        <p className="font-montserrat text-sm text-[#675960] mt-2 mb-6">{copy.description}</p>
        <div ref={videoGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
          {available.map((item, index) => (
            <div key={item.src} className="rounded-2xl border border-[#ead8db] overflow-hidden bg-white shadow-sm">
              <div className="relative aspect-[9/12] max-h-[470px] bg-[#261d21] flex items-center justify-center">
                <video src={item.src} controls playsInline preload={index === 0 ? 'metadata' : 'none'} onPlay={(event)=>handleVideoPlay(event.currentTarget)} aria-label={`${copy.video} ${index + 1}`} className="w-full h-full object-contain"/>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 text-sm font-montserrat text-[#5b3239]">
                <PlayCircle className="w-4 h-4" aria-hidden="true"/>
                <span>{copy.video} {index + 1} / {available.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
