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
- [x] Trocar a página inicial Timely (`bellabrazil.gettimely.com/`) pelo formulário de seleção de reservas (`book.gettimely.com/bellabrazil/book/embed?client-login=true`) em CTAs gerais, cards e SEO pré-renderizado.
- [x] Remover o modal adicional de Greenslopes nos CTAs gerais: Book Now abre diretamente o seletor Timely em nova guia, mantendo aparência da hero.
- [x] Aplicar o link **individual comprovado** no curso de Classic Eyelash Extensions (Timely `product=3230447:SV`).
- [ ] Completar a seleção automática dos outros **16 tratamentos**, quando a proprietária disponibilizar os respectivos links ou IDs oficiais em Timely → Setup → Booking buttons. Sem isso, usar apenas o seletor de serviços, sem inventar IDs.

- [x] Organizar a página Services para uso prático: busca por nome/técnica, sete categorias com contagem, acesso rápido aos tratamentos prioritários e cartões compactos com dois CTAs (detalhes e reserva Timely).
- [x] Simplificar o dropdown do cabeçalho: seis atalhos e link Todos os serviços, em vez de 17 opções numa lista extensa.
- [x] Preservar URLs individuais e navegação normal quando o visitante usa os filtros.
- [x] Preservar o design aprovado da Sheila e a hero (Book Now, Courses, See Our Google Reviews).
- [x] Manter identidade Bella Beauty Brazil, Meet Livia, localização, telefone, horários e contatos.
- [x] Manter Timely como destino oficial de reserva; não simular checkout.
- [x] Manter preços e durações somente quando constam do catálogo Timely registrado.
- [x] Incluir Teeth Whitening (A$199 · 1 hour) com imagem geral do estúdio, sem fingir uma foto do procedimento.
- [x] Disponibilizar conteúdo editorial específico (indicações possíveis, diferenças, FAQ) em EN-AU/PT/ES **para os 17 serviços**, tanto nas páginas React quanto no HTML pré-renderizado para buscadores.
- [x] Preservar galeria regular, categoria Meet Livia e comparativos Before & After em seção própria.
- [x] Manter cursos confirmados com CTA Enquire/Timely, sem checkout fictício.
- [x] Corrigir a fotografia de pele: substituir a imagem de materiais/pigmentos por uma foto real de atendimento facial presente no projeto, sem alterar a hero.
- [x] Corrigir as descrições alternativas (ALT) para indicar quando se trata de fotografia editorial, e não de registro do tratamento exato.
- [ ] Receber fotos **reais e aprovadas** específicas de outros tratamentos para eliminar todas as imagens repetidas. O acervo atual não contém 17 fotos individuais apropriadas; não inventar tratamentos ou fotos.
- [x] Conferir nota/reviews por fonte pública independente: RightForMe registrou 5,0 de 126 avaliações do Google em 25 setembro de 2026. O site deixa claro que não é feed em tempo real.
- [ ] Confirmar com acesso direto ao perfil Google o conteúdo integral, a autoria e a contagem atual das avaliações individuais; manter botão para o perfil oficial.
- [x] Evitar publicar protocolos de preparação e cuidados não verificados; os 17 textos orientam a consultar diretamente Bella Beauty Brazil.
- [ ] Confirmar com Bella os detalhes específicos de instrução/aftercare antes de ampliar o conteúdo com etapas ou garantias clínicas.

## Etapa 3 — qualidade e publicação
- [x] Animações funcionaram após a configuração de movimento reduzido ser alterada no Windows do usuário.
- [x] Preservar `prefers-reduced-motion` para visitantes que escolham reduzir movimento.
- [ ] Validar visualmente preview em desktop e celular (375, 390, 430, 768, 1024 e 1440 px).
- [ ] Confirmar lightbox, filtros, Before & After, menus, traduções e CTAs no navegador.
- [x] Revisar no código os links de Timely, Maps, telefone, WhatsApp e Instagram; remover um ícone duplicado do Instagram.
- [x] Corrigir formulários e chats: a página de contato abre rascunho no e-mail sem simular mensagem enviada; o WhatsApp abre uma conversa real e o modal direciona a unidade Greenslopes.
- [ ] Testar os links em navegador real, inclusive abrir o Timely e seu fluxo no celular.
- [x] Precarregar imagem hero em alta prioridade sem alterar o layout.
- [ ] Medir LCP, CLS e INP em navegador/usuários reais (metas, não resultados prometidos).
- [x] Configurar `npm run build` para fazer checagem TypeScript, gerar 23 URLs e validar a existência dos arquivos de SEO e robots, antes de aceitar o deploy.
- [x] Validar presença dos 17 slugs no código, no prerender e no sitemap, e confirmar existência das imagens no repositório.
- [ ] Revisar o PR e mesclar à `main` somente após os testes. Conferir nova implantação Production na Vercel.

## Atenção sobre domínio
O domínio atualmente conectado à produção Vercel é `https://bella-beauty-brazil.vercel.app/`. O site institucional em `www.bellabeautybrazil.com.au` ainda não consta nos domínios conectados deste projeto. Canonicals publicados devem apontar para a versão efetivamente servida. Após migração, configurar `PUBLIC_SITE_URL` e `VITE_PUBLIC_SITE_URL` no build e atualizar os metadados estáticos de `index.html` antes de enviar o novo sitemap.

## Catálogo e fontes
- Catálogo Timely e valores: `TIMELY-SOURCE.md` da auditoria original, consultado em 13 October 2026.
- Endereço: Suite 3, 412 Logan Road, Greenslopes, QLD 4120.
- Reserva: https://bellabrazil.gettimely.com/
- Instagram: https://www.instagram.com/bellabeautybrazil/
