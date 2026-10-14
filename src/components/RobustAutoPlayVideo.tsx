import React, { useEffect, useRef, useState } from 'react';

interface RobustAutoPlayVideoProps {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
}

export const RobustAutoPlayVideo: React.FC<RobustAutoPlayVideoProps> = ({
  src,
  poster,
  className = 'w-full h-full object-cover',
  controls = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryTimerRef = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasFatalError, setHasFatalError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '420px 0px', threshold: 0.01 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || hasFatalError) return;

    const video = videoRef.current;
    if (!video) return;

    let errorCount = 0;
    let disposed = false;

    const clearRetry = () => {
      if (retryTimerRef.current !== null) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };

    const schedulePlay = (delay = 120) => {
      clearRetry();
      retryTimerRef.current = window.setTimeout(() => {
        if (!disposed) attemptPlay();
      }, delay);
    };

    const attemptPlay = () => {
      if (disposed || document.visibilityState === 'hidden') return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const promise = video.play();
      promise?.catch(() => schedulePlay(900));
    };

    const handleReady = () => {
      errorCount = 0;
      attemptPlay();
    };

    const handlePause = () => {
      if (!video.ended && document.visibilityState === 'visible') schedulePlay(250);
    };

    const handleError = () => {
      errorCount += 1;
      if (errorCount >= 4) {
        setHasFatalError(true);
        return;
      }
      schedulePlay(1200);
      window.setTimeout(() => {
        if (!disposed) {
          video.load();
          attemptPlay();
        }
      }, 1000);
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') attemptPlay();
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    video.addEventListener('loadedmetadata', handleReady);
    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('playing', clearRetry);
    video.addEventListener('pause', handlePause);
    video.addEventListener('stalled', () => schedulePlay(700));
    video.addEventListener('waiting', () => schedulePlay(700));
    video.addEventListener('error', handleError);
    document.addEventListener('visibilitychange', handleVisibility);

    attemptPlay();

    return () => {
      disposed = true;
      clearRetry();
      video.removeEventListener('loadedmetadata', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('playing', clearRetry);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [shouldLoad, hasFatalError, src]);

  if (hasFatalError && poster) {
    return <img src={poster} alt="Bella Beauty treatment" className={className} />;
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay={shouldLoad}
        loop
        muted
        playsInline
        preload={shouldLoad ? 'auto' : 'none'}
        controls={controls}
        className={className}
      />
    </div>
  );
};
