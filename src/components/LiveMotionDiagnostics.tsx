import React from 'react';

/**
 * Read-only diagnostics, shown ONLY with ?bella-debug=1.
 * No changes to the normal website experience or motion preferences.
 */
export function LiveMotionDiagnostics() {
  const [report, setReport] = React.useState<string[]>(['Aguardando medições...']);

  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ticker = document.querySelector<HTMLElement>('.bella-visit-us-track');
    const gallery = document.querySelector<HTMLElement>('.gallery-marquee-viewport');
    const started = performance.now();
    const tickerStart = ticker?.getBoundingClientRect().x;
    const galleryStart = gallery?.scrollLeft;
    const tickerStyle = ticker ? window.getComputedStyle(ticker) : null;
    const animation = tickerStyle?.animationName || 'elemento não encontrado';
    const animationState = tickerStyle?.animationPlayState || 'não disponível';
    const timer = window.setTimeout(() => {
      const tickerDelta = ticker && tickerStart !== undefined
        ? Math.round(ticker.getBoundingClientRect().x - tickerStart) : null;
      const galleryDelta = gallery && galleryStart !== undefined
        ? Math.round(gallery.scrollLeft - galleryStart) : null;
      setReport([
        'Versão do diagnóstico: 14-out-2026 / teste B',
        'Página aberta: ' + window.location.pathname,
        'Movimento reduzido no navegador: ' + (reduced ? 'SIM — animações desativadas pela preferência do sistema' : 'NÃO'),
        'Animação Visit Us: ' + animation,
        'Estado Visit Us: ' + animationState,
        'Visit Us moveu em 2,5 s: ' + (tickerDelta === null ? 'não encontrado' : tickerDelta + ' px'),
        'Galeria moveu em 2,5 s: ' + (galleryDelta === null ? 'não encontrada' : galleryDelta + ' px'),
        'Teste realizado em: ' + Math.round(performance.now() - started) + ' ms',
      ]);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <aside role="status" aria-live="polite" style={{
      position: 'fixed', zIndex: 2147483647, bottom: 8, left: 8, right: 8,
      maxWidth: 460, padding: 15, background: '#181214', color: '#fff',
      border: '2px solid #efb7c8', borderRadius: 12,
      font: '12px/1.55 monospace', boxShadow: '0 8px 30px #0008',
      maxHeight: '55vh', overflowY: 'auto',
    }}>
      <strong style={{display: 'block', color: '#efb7c8', marginBottom: 7}}>
        BELLA BEAUTY — DIAGNÓSTICO TEMPORÁRIO
      </strong>
      {report.map(line => <div key={line}>{line}</div>)}
      <p style={{marginTop: 8, opacity: 0.85}}>Tire um print deste quadro e envie no ChatGPT. Para sair, remova ?bella-debug=1 da URL.</p>
    </aside>
  );
}
