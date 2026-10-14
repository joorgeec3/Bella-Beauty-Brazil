# Bella Beauty Brazil — checklist de requisitos (14 October 2026)

**Referência:** briefing aprovado, identidade visual Sheila preservada. Este checklist distingue o código preparado de testes ainda não realizados.

## Etapa 1 — arquitetura, SEO local e indexação
- [x] Manter Home, About / Meet Livia, Services, Courses, Location & Hours, Contact & Book.
- [x] Manter URLs individuais dos tratamentos em `/services/:id`.
- [x] Criar HTML pré-renderizado, com title/description/canonical únicos, para serviços e páginas principais.
- [x] Abranger o catálogo atual de 17 serviços, incluindo Teeth Whitening confirmado no Timely.
- [x] Gerar sitemap automaticamente conforme o catálogo: 23 URLs (home, 5 páginas principais e 17 tratamentos).
- [x] Alinhar robots, canonical, Open Graph e schema ao host Vercel realmente conectado.
- [x] Incluir ligações HTML reais entre os cards e as páginas de serviço.
- [x] Aplicar SEO local genuíno por níveis: Greenslopes e vizinhança, Brisbane Southside e Greater Brisbane.
- [ ] Verificar as URLs pré-renderizadas diretamente em navegador sem sessão autenticada e conferir indexação.
- [ ] Apontar `www.bellabeautybrazil.com.au` ao projeto atualizado, se essa for a decisão do cliente; **só então** trocar o domínio canonical e reconstruir.
- [ ] Configurar/verificar Google Search Console e enviar sitemap do domínio definitivo.

## Etapa 2 — conteúdo, serviços e conversão
- [x] Preservar o design aprovado da Sheila e a hero (Book Now, Courses, See Our Google Reviews).
- [x] Manter identidade Bella Beauty Brazil, Meet Livia, localização, telefone, horários e contatos.
- [x] Manter Timely como destino oficial de reserva; não simular checkout.
- [x] Manter preços e durações somente quando constam do catálogo Timely registrado.
- [x] Incluir Teeth Whitening (A$199 · 1 hour) com imagem geral do estúdio, sem fingir uma foto do procedimento.
- [x] Disponibilizar conteúdo editorial específico (indicações possíveis, diferenças, FAQ) em EN-AU/PT/ES para Nano Strokes, Hybrid Brows, Lip Blush, Brow Sculpt & Tint, Brow Lamination, Lash Lift, Dermaplaning, Facial Spa e Teeth Whitening.
- [x] Preservar galeria regular, categoria Meet Livia e comparativos Before & After em seção própria.
- [x] Manter cursos confirmados com CTA Enquire/Timely, sem checkout fictício.
- [ ] Adicionar imagens **reais e aprovadas** que faltam para ter fotografia distinta por categoria e serviço; evitar apresentar fotos de outros tratamentos.
- [ ] Conferir novamente as avaliações do Google, números e trechos antes de afirmar que são atuais.
- [ ] Confirmar com Bella os detalhes específicos de instrução/aftercare que dependem do protocolo do estúdio.

## Etapa 3 — qualidade e publicação
- [x] Animações funcionaram após a configuração de movimento reduzido ser alterada no Windows do usuário.
- [x] Preservar `prefers-reduced-motion` para visitantes que escolham reduzir movimento.
- [ ] Validar visualmente preview em desktop e celular (375, 390, 430, 768, 1024 e 1440 px).
- [ ] Confirmar lightbox, filtros, Before & After, menus, traduções e CTAs no navegador.
- [ ] Testar manualmente links para Timely, Maps, telefone, WhatsApp e Instagram.
- [ ] Medir LCP, CLS e INP (metas, não resultados prometidos).
- [ ] Revisar o PR e mesclar à `main` somente após os testes. Conferir nova implantação Production na Vercel.

## Atenção sobre domínio
O domínio atualmente conectado à produção Vercel é `https://bella-beauty-brazil.vercel.app/`. O site institucional em `www.bellabeautybrazil.com.au` ainda não consta nos domínios conectados deste projeto. Canonicals publicados devem apontar para a versão efetivamente servida. Após migração, configurar `PUBLIC_SITE_URL` e `VITE_PUBLIC_SITE_URL` no build e atualizar os metadados estáticos de `index.html` antes de enviar o novo sitemap.

## Catálogo e fontes
- Catálogo Timely e valores: `TIMELY-SOURCE.md` da auditoria original, consultado em 13 October 2026.
- Endereço: Suite 3, 412 Logan Road, Greenslopes, QLD 4120.
- Reserva: https://bellabrazil.gettimely.com/
- Instagram: https://www.instagram.com/bellabeautybrazil/
