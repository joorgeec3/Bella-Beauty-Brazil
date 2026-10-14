import React from 'react';

/** Light-weight desktop wheel smoothing, without intercepting touch, trackpads, forms or nested scrollers. */
export function SmoothScrollController() {
  React.useEffect(() => {
    if (typeof window === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(pointer: fine)').matches) return;
    let targetY = window.scrollY;
    let currentY = targetY;
    let raf = 0;
    let motionRaf = 0;
    const updateViewportMotion = () => {
      motionRaf = 0;
      const viewport = window.innerHeight || 1;
      document.querySelectorAll<HTMLElement>('[data-scroll-motion]').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewport + 120) return;
        const centre = rect.top + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, (viewport / 2 - centre) / (viewport + rect.height)));
        element.style.setProperty('--motion-y', `${(progress * 22).toFixed(2)}px`);
        element.style.setProperty('--motion-scale', `${(1 + Math.abs(progress) * 0.012).toFixed(4)}`);
      });
    };
    const requestViewportMotion = () => {
      if (!motionRaf) motionRaf = requestAnimationFrame(updateViewportMotion);
    };
    requestViewportMotion();
    const tick = () => {
      currentY += (targetY - currentY) * 0.16;
      if (Math.abs(targetY - currentY) < 0.6) {
        currentY = targetY;
        window.scrollTo({ top: currentY, behavior: 'instant' });
        raf = 0;
        return;
      }
      window.scrollTo({ top: currentY, behavior: 'instant' });
      raf = requestAnimationFrame(tick);
    };
    const wheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey ||
          event.deltaMode !== 0 || Math.abs(event.deltaY) < 45 ||
          document.body.style.overflow === 'hidden' || document.querySelector('[aria-modal="true"]')) return;
      const node = event.target;
      if (!(node instanceof Element) || node.closest('iframe, select, textarea, input, [data-native-scroll]')) return;
      let parent: Element | null = node;
      while (parent && parent !== document.documentElement) {
        if (parent.scrollHeight > parent.clientHeight + 2) {
          const { overflowY } = getComputedStyle(parent);
          if (overflowY === 'auto' || overflowY === 'scroll') return;
        }
        parent = parent.parentElement;
      }
      event.preventDefault();
      if (!raf) { currentY = window.scrollY; targetY = currentY; }
      targetY = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, targetY + event.deltaY * 0.85));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!raf) { currentY = targetY = window.scrollY; }
      requestViewportMotion();
    };
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(motionRaf);
    };
  }, []);
  return null;
}
