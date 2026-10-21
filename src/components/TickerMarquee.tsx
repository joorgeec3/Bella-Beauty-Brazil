import React from 'react';
import type { Language } from '../data/siteData';

/** Faixa com movimento automático independente de hover ou scroll. */
export const TickerMarquee: React.FC<{ language: Language }> = ({ language }) => {
  const prefix = language === 'pt' ? 'VISITE-NOS EM' : language === 'es' ? 'VISÍTANOS EN' : 'VISIT US IN';

  return (
    <div className="relative bg-black text-white py-6 overflow-hidden select-none">
      <style>{`
        @keyframes bellaVisitUsMove {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        .bella-visit-us-track {
          display: flex;
          width: max-content;
          flex-wrap: nowrap;
          animation: bellaVisitUsMove 15s linear infinite !important;
          animation-play-state: running !important;
          will-change: transform;
        }
        .bella-visit-us-group {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          min-width: 100vw;
          white-space: nowrap;
        }
        .bella-visit-us-item {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 22px;
          margin: 0 16px;
          font-size: clamp(24px,3vw,42px);
          font-weight: 400;
          letter-spacing: .12em;
          line-height: 1.25;
          text-transform: uppercase;
        }
        @media (prefers-reduced-motion: reduce) {
          .bella-visit-us-track {
            animation: none !important;
            transform: none !important;
            will-change: auto;
          }
        }
      `}</style>

      {/* Top Opacity-Tilt SVG Divider */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none transform rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2600 131.1"
          preserveAspectRatio="none"
          className="w-full h-4 sm:h-6 text-white fill-current"
        >
          <path d="M0 0L2600 0 2600 69.1 0 0z" />
          <path style={{ opacity: 0.5 }} d="M0 0L2600 0 2600 69.1 0 69.1z" />
          <path style={{ opacity: 0.25 }} d="M2600 0L0 0 0 130.1 2600 69.1z" />
        </svg>
      </div>

      {/* On phones show the complete phrase in two readable centered lines.
          Continuous marquee lettering looked permanently cut off at mobile widths. */}
      <div className="sm:hidden relative z-10 flex flex-col items-center justify-center gap-1 px-5 py-4 text-center" data-testid="bella-visit-us-mobile">
        <span className="font-montserrat text-[clamp(17px,5vw,22px)] uppercase tracking-[0.12em] leading-snug text-[#efb7c8]">{prefix}</span>
        <span className="font-montserrat text-[clamp(24px,7.2vw,32px)] uppercase font-semibold tracking-[0.07em] leading-tight text-white">GREENSLOPES</span>
        <span className="font-montserrat text-xs uppercase tracking-[0.24em] text-[#efb7c8]">Brisbane · QLD</span>
      </div>

      {/* Desktop marquee keeps the original aesthetic and continuous animation. */}
      <div className="hidden sm:flex overflow-hidden py-3" aria-label={`${prefix} — GREENSLOPES`}>
        <div className="bella-visit-us-track" data-testid="bella-visit-us-track">
          {[0, 1].map((copy) => (
            <div className="bella-visit-us-group" key={copy} aria-hidden={copy === 1}>
              {Array.from({ length: 4 }, (_, idx) => (
                <div className="bella-visit-us-item font-montserrat" key={idx}>
                  <span className="text-[#efb7c8]">{prefix}</span>
                  <span className="text-white">— GREENSLOPES —</span>
                  <span className="text-[#efb7c8]" aria-hidden="true">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Opacity-Tilt SVG Divider */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2600 131.1"
          preserveAspectRatio="none"
          className="w-full h-4 sm:h-6 text-white fill-current"
        >
          <path d="M0 0L2600 0 2600 69.1 0 0z" />
          <path style={{ opacity: 0.5 }} d="M0 0L2600 0 2600 69.1 0 69.1z" />
          <path style={{ opacity: 0.25 }} d="M2600 0L0 0 0 130.1 2600 69.1z" />
        </svg>
      </div>
    </div>
  );
};
