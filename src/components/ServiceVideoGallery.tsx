import React, { useEffect, useState } from 'react';
import { Film, PlayCircle } from 'lucide-react';
import type { Language } from '../data/siteData';
import { galleryVideos } from '../data/galleryData';
import { RobustAutoPlayVideo } from './RobustAutoPlayVideo';
import { serviceCoverFor } from '../data/serviceCoverPhotos';

type VideoItem = { src: string; title: string };

// Source: precisely named folders in Site Bella.zip.
// No generic or unrelated clip may appear as proof of a specific treatment.
const approvedVideoClips: Record<string, string[]> = {
  'nano-strokes': ['nano-strokes/01.mp4','nano-strokes/02.mp4','nano-strokes/03.mp4'],
  // Keep only the first original clip; the second existing clip repeats the same session.
  // Client-provided videos 03 and 04 are validated from the 2026-10-29 iCloud ZIP.
  // The gallery checks file existence before showing them, so they require the actual media files.
  'shadow-brows': ['shadow-brows/01.mp4','shadow-brows/03.mp4','shadow-brows/04.mp4'],
  // Lip Blush already uses the newer client-supplied gallery clip below.
  // The older lip-blush/01.mp4 repeats the same treatment visually; keep only the clearer clip.
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
  // Shadow Brows already has two distinct videos in approvedVideoClips.
  // Do not append the later 17-second clip: it repeats material from the same session.
  'facial-spa': 'facial-spa',
  'lip-blush': 'lip-blush',
  'lip-bliss-hydration': 'lip-bliss-hydration',
  'teeth-whitening': 'teeth-whitening',
};
// The item titled Dermaplaning in the old upload duplicates a lip hydration file;
// exclude it rather than presenting the wrong procedure.
// Client-supplied original Wet Look video (H.264 MP4). No transcoding or cropping.
const additionalStudioClips: Record<string, VideoItem[]> = {
  'wet-look-lashes': [{
    src: `${import.meta.env.BASE_URL}assets/bella/wet-eyelash-extensions/IMG_9781.MP4`,
    title: 'Wet Look Lash Extensions — original studio video',
  }],
};
const videoCandidates = (serviceId: string): VideoItem[] => [
  ...(additionalStudioClips[serviceId] ?? []),
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
    description: 'Real treatment videos from Bella Beauty Brazil. Videos play automatically without sound when visible.',
    video: 'Treatment video',
  },
  pt: {
    heading: 'Veja o tratamento',
    description: 'Vídeos reais da Bella Beauty Brazil iniciam automaticamente sem som quando aparecem na tela.',
    video: 'Vídeo do tratamento',
  },
  es: {
    heading: 'Mira el tratamiento',
    description: 'Vídeos reales de Bella Beauty Brazil se reproducen automáticamente sin sonido al estar visibles.',
    video: 'Vídeo del tratamiento',
  },
} as const;

export const ServiceVideoGallery: React.FC<{ serviceId: string; language: Language }> = ({ serviceId, language }) => {
  const [available, setAvailable] = useState<VideoItem[]>([]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
          {available.map((item, index) => (
            <div key={item.src} className="rounded-2xl border border-[#ead8db] overflow-hidden bg-white shadow-sm">
              <div className="relative aspect-[9/12] max-h-[470px] bg-[#261d21] flex items-center justify-center">
                <RobustAutoPlayVideo src={item.src} poster={serviceCoverFor(serviceId)?.src} controls className="w-full h-full object-contain"/>
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
