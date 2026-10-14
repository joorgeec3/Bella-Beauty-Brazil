# Relatório de testes — Bella Beauty Brazil

## Passou

`npm run lint` passou com TypeScript sem diagnósticos. `npm run build` passou com Vite e produziu `dist/`. O servidor Vite respondeu `200 text/html` em `http://127.0.0.1:3000/`, `200 application/json` em `/manus-routes.json` e `200 image/png` para `/assets/bella/logo.png`.

A auditoria de referências não encontrou mais `Sheila Orofino`, Magic Hands Clinic, Sydney, Bexley/Edgecliff, links `magichandsclinic`, booking antigo ou números de WhatsApp antigos em arquivos de execução. O manifest de rotas, `robots.txt`, `sitemap.xml`, canonical e schema JSON-LD estão presentes.

O catálogo central usa preços e durações publicados no Timely para microblading, lip blush, brow/lash services, treatments, waxing, pacotes/produtos e quatro cursos. CTAs apontam para o booking oficial. O mapa responsivo e `Get Directions` já existem em Locations/Contact flow. O Instagram aponta para o perfil oficial sem feed simulado.

## Observação de ambiente

A URL pública temporária da Sandbox respondeu `403 text/plain` durante o smoke test. Isso não ocorreu no origin local; trata-se de restrição do ambiente temporário, não de erro do bundle.

## Pendências conhecidas

As fotos extras prometidas pelo usuário ainda não foram recebidas. A galeria usa os ativos oficiais identificados, sem inventar fotos de resultados ou avaliações. O conteúdo legado de componentes não centrais ainda pode conter copy de tratamentos corporais do template e deve ser refinado junto com a classificação das novas fotos. O formulário de contato deve ser conectado a um endpoint de e-mail antes de uso em produção; ele não simula reserva ou pagamento.

## Prévia visual desta rodada

A URL temporária foi liberada com `server.allowedHosts` restrito ao host da Sandbox e respondeu `200` em HTML e `/manus-routes.json`. No navegador foram conferidos Home, About/Meet Livia, Services com preço/duração/FAQ/booking, Courses com quatro cards e CTA Enquire, Contact, Location & Hours com mapa/Get Directions, logo e imagens Bella, WhatsApp, Back to Top, floating Book Now, menus sticky/mobile source, e alternância PT/ES. Avaliações não verificadas foram substituídas por um CTA neutro para Google Reviews.

## Correção incremental — outubro de 2026

- Backup criado em `/home/ubuntu/backups/bella-before-after-removal.bundle` e `.tar.gz`.
- Before & After removido da home e do fluxo interno; galeria comum preservada com filtros e lightbox.
- Drenagem/modelagem/metabolic e assets legados removidos do código e do diretório público.
- Serviços e preços/durações alinhados ao `TIMELY-SOURCE.md`; itens sem preço confirmado usam reserva oficial.
- Contact agora inclui Google Maps incorporado real, Get Directions e horários Timely; formulário abre o e-mail oficial em vez de simular envio.

## Ajuste de mapa e horários — outubro de 2026

A seção única `Find Us & Opening Hours` foi validada no navegador público: mapa interativo com marcador em Suite 3, 412 Logan Road, card 40% de horários à direita, mapa 60% à esquerda, botão Get Directions, Book Now para `https://bellabrazil.gettimely.com/`, destaque do dia atual e status Open Now/Closed pelo fuso Australia/Brisbane. O mapa e os horários permanecem responsivos via grid `lg:grid-cols-5`, empilhando no mobile. Lint/build passaram e a prévia/manifest respondem 200.

## Melhorias incrementais — avaliações e Back to Top (13 October 2026)

- Back to Top reutilizado e reposicionado no canto inferior direito, com aparição após scroll, scroll suave, hover e cursor pointer; espaçamento mantido em relação ao WhatsApp e Book Now.
- Seção `Loved by Our Clients` criada usando o perfil Google confirmado pelo Place ID `ChIJbSI9huFbkWsRzCJ02qxGr_I`.
- Dados públicos confirmados: 5.0 estrelas e 126 avaliações.
- Carrossel usa somente excertos publicamente visíveis de Jéssica Amaral, Graciele Santos e Chandrika Gurung, mantendo nomes e atribuição. Trechos truncados permanecem com reticências.
- Link Read All Google Reviews aponta para o perfil oficial; não foi usada integração em tempo real nem API paga.

## Ajuste de ordem das seções — 13 October 2026

- Alterada somente a ordem no `App.tsx`.
- Sequência validada na prévia: `Our Work / Gallery` → `Find Us & Opening Hours` → avaliações/Instagram → rodapé.
- Galeria, filtros, lightbox e seção de mapa/horários permaneceram intactos.
- `npm run lint` e `npm run build` aprovados.
- Prévia temporária respondeu HTTP 200.

## Correção pontual — botão, idiomas e bugs confirmados (13 October 2026)

### Corrigido e validado

- Back to Top reposicionado exatamente acima do Book Now, alinhado à direita, com gap uniforme, aparição após scroll, scroll suave e aria-label localizado.
- Menu desktop/mobile, footer, CTAs de serviços, localização, contato, cursos, galeria, avaliações, Instagram, WhatsApp e Back to Top revisados para EN/PT/ES.
- Descrições e subtítulos dos serviços agora usam cópia localizada em PT/ES sem alterar nomes próprios, preços AUD, duração ou links Timely.
- Descrições dos cursos e CTA `Enquire` localizados.
- Horários do drawer corrigidos para dados confirmados: Monday 11:00–17:30; Tuesday 09:15–19:30; Wednesday 13:30–15:30; Thursday 09:15–19:30; Friday 09:15–16:00; Saturday 08:30–15:30. Domingo não publicado.
- Telefone incorreto no drawer corrigido para +61 402 148 437.
- Rota do link Courses no footer corrigida de `courses` para `store`.
- Removida copy herdada de drenagem linfática, moldeado corporal e terapia metabólica em About/Work With Us.
- Ticker de Greenslopes, weekdays do mapa/horários, contagem Google e WhatsApp prefill agora acompanham o idioma.
- `npm run lint` e `npm run build` aprovados.
- Prévia temporária HTTP 200; troca dinâmica PT e ES verificada; Back to Top e ausência de overflow horizontal verificadas na prévia.

### Pendências não verificadas

- Não foi feita medição independente em viewport física de celular nesta sessão; o CSS responsivo existente foi preservado e nenhuma alteração estrutural foi feita.
- Textos das avaliações Google continuam no idioma original do autor, conforme solicitado, mesmo quando a interface muda.
- O aviso futuro do Vite sobre `__dirname` é apenas warning de ferramenta, sem falha de build.

## Auditoria completa responsiva — 13 October 2026

### Escopos executados

- Capturas Chromium headless em 1920, 1440, 1280, 1024, 768, 430, 390 e 375 px.
- Verificação visual desktop, tablet e mobile; prévia temporária HTTP 200.
- Auditoria de referências proibidas no runtime, assets locais, metadados, links oficiais e build.
- Verificação no navegador real de menu, overflow horizontal, troca de idioma, botão flutuante após scroll e Back to Top.

### Problemas encontrados e corrigidos

- Em 768 px, a navegação desktop ficava comprimida e `Location & Hours` quebrava linha. O breakpoint foi ajustado para manter o menu tablet/mobile abaixo de 1024 px; o drawer existente foi reutilizado.
- Em mobile, o Book Now flutuante cobria o título da primeira seção. Ele agora fica compacto em telas pequenas e aparece após a rolagem; o CTA do header e o CTA do hero permanecem disponíveis no topo.
- Chaves não utilizadas de localidades legadas foram removidas do catálogo de imagens.
- `prefers-reduced-motion` agora desativa também os marquees animados, além dos reveals.
- Aria-label do CTA flutuante passou a acompanhar EN/PT/ES.

### Resultado

- `npm run lint`: aprovado.
- `npm run build`: aprovado.
- Referências runtime proibidas: nenhuma encontrada em `src`.
- Assets referenciados: todos encontrados.
- Overflow horizontal: não detectado no navegador real.
- Preview: HTTP 200.
- Warning restante: aviso futuro do Vite sobre `__dirname`, sem impacto no build.

### Pendências

- Não foi realizado teste de pagamento/agendamento real, pois o fluxo oficial Timely deve permanecer externo e não pode ser simulado.
- Textos das avaliações permanecem no idioma original dos autores.
- As capturas validam a renderização inicial; interações de cada link externo não foram submetidas para não abrir/publicar fluxos externos.

## Plano de melhoria SEO, IA e conversão — 13 October 2026

- Checkpoint criado antes das alterações: `/home/ubuntu/backups/bella-before-seo-plan-20261013.bundle`.
- Adicionado `IMPROVEMENT-PLAN.md` com o plano solicitado, diagnóstico da SPA atual e recomendação de fase estrutural futura.
- O diagnóstico confirmou que a aplicação atual usa abas internas React/Vite e não possui roteamento de navegador/SSR individual por serviço. Não foram fabricadas URLs ou páginas repetitivas por bairro.
- Metadados de título, descrição, `lang` e Open Graph agora acompanham a seção ativa, sem trocar a arquitetura.
- JSON-LD dinâmico adicionado para BeautySalon, Person, Service e BreadcrumbList, usando somente dados confirmados. Nenhum FAQPage foi inventado.
- Regiões prioritárias foram acrescentadas de forma natural na página existente Location & Hours, sem criar unidades fictícias.
- O destino central dos CTAs de reserva foi alinhado ao Timely solicitado: `https://bellabrazil.gettimely.com/`.
- O sitemap/manifest continuam documentando as páginas institucionais aprovadas; a indexação profunda de serviços individuais depende da fase futura de rotas reais e SSR/prerender.

### Validação desta rodada

- `npm run lint`: aprovado.
- `npm run build`: aprovado.
- Prévia temporária: HTTP 200.
- Referências proibidas no runtime: nenhuma encontrada.
- Reserva Timely: referências confirmadas no código.

### Pendências estruturais

- Não medir volume ou concorrência de palavras-chave sem ferramenta autorizada; nenhum volume foi inventado.
- LCP, INP e CLS permanecem metas de engenharia, não resultados medidos nesta rodada.
- SSR/prerender, URLs individuais de serviço, sitemap profundo e 301 devem ser tratados em uma fase própria após aprovação, pois alteram a arquitetura SPA.

## Implementação efetiva de páginas individuais — 13 October 2026

### Alterações aplicadas no código

- Criada `src/pages/ServiceDetailView.tsx`, uma view reutilizável com conteúdo não vazio para Nano Strokes/Microblading, Shadow/Hybrid Brows, Lip Blush, Brow Sculpting & Tint, Brow Lamination, Lash Lift e Facial Treatments.
- Cada página individual agora tem URL funcional: `/services/nano-strokes`, `/services/shadow-hybrid`, `/services/lip-blush`, `/services/brow-sculpt-tint`, `/services/brow-lamination`, `/services/lash-lift` e `/services/dermaplaning`.
- A página individual exibe foto do catálogo Bella, H1, descrição, preço/duração quando confirmados, benefícios, diferenças entre técnicas, preparação/cuidados sem inventar protocolo, FAQ, serviços relacionados, localização e CTA Timely.
- `App.tsx` agora resolve caminhos, usa `history.pushState`, suporta voltar/avançar e atualiza títulos/metadescrições individuais.
- `ServicesView.tsx` foi conectado para que todos os cards e botões View Service abram a página própria correta.
- `sitemap.xml` e `manus-routes.json` foram atualizados com as novas URLs.
- `BOOKING_URL` foi alinhado a `https://bellabrazil.gettimely.com/`.

### Verificação visível

- Prévia atualizada responde HTTP 200 em todas as rotas individuais e em `/courses`.
- Navegador real abriu Nano Strokes, mostrou H1, imagem, preço A$615, duração, FAQ, relacionados e dois links Timely.
- Navegador real clicou em `Shadow / Hybrid Brows` e mudou para `/services/shadow-hybrid`.
- Verificado: H1 presente, dois links Timely, overflow horizontal ausente.
- Cursos verificados com quatro cards, preços AUD, durações e CTA Enquire para Timely.
- Capturas desktop/mobile das sete rotas foram incluídas em `audit-captures/services/`.

### Pendências honestas

- O grupo `Training & Courses` permanece como página dedicada `/courses`, reutilizando a página de cursos aprovada; compra e pagamento continuam externos no Timely.
- Não foi inventado um preço de grupo para Facial Treatments: cada tratamento confirmado continua disponível no catálogo individual.
- Testes de pagamento/agendamento não foram submetidos para não criar reserva real.

## Correções finais pós-auditoria do ZIP — 13 October 2026

### Correções aplicadas

- Implementado prerender pós-build em `scripts/prerender.mjs`. `npm run build` gera HTML estático por URL para as sete páginas de serviço com `lang=en-AU`, title, meta description, canonical, H1, imagem, preço/duração confirmados e JSON-LD `Service`.
- Completa a localização PT/ES na `ServiceDetailView` para comparação entre técnicas, preparação/cuidados, FAQ e benefícios.
- Corrigido `Shadow / Hybrid Brows` para `Brow Sculpt & Hybrid Brow`, com A$79 e 40 minutos conforme Timely. O conteúdo explica que esse valor não representa Shadow Brows semipermanente sem confirmação separada.
- Galeria reorganizada sem adicionar, inventar ou duplicar fotos: Brows = `brows.png`; Lips = `cosmetic-tattooing.png`; Lashes = `lashes.jpg`; Skin = `treatments.png`; Studio = `livia.jpeg`. Todos os cinco filtros possuem imagem.
- Aplicadas as fontes Instrument Serif e Plus Jakarta Sans, mantendo fallbacks e proporções do layout.
- Adicionado scroll suave nativo e animação scroll-linked progressiva com `animation-timeline: view()` quando suportada; `prefers-reduced-motion` desativa movimento.
- Instagram continua apontando somente para o perfil oficial, sem feed simulado e sem posts não autorizados.
- Avaliações mantidas como comentários verificados do perfil oficial; a seção informa que nota/contagem são um instantâneo conferido em 13 October 2026 e não um feed em tempo real.
- Liberado somente o host temporário do preview de produção na porta 4173.

### Testes reais

- `npm run lint`: aprovado.
- `npm run build`: aprovado; prerender gerou 7 rotas.
- Preview de produção `https://4173-iiitna1g1pkuwrx84415d-81c2e769.us1.manus.computer`: sete rotas responderam HTTP 200 sem barra final.
- Em cada rota foram verificados HTML estático com H1, canonical e JSON-LD.
- Navegador real validou a página Hybrid em EN, PT e ES. Benefícios, comparação, cuidados e FAQ foram conferidos nas três línguas.
- Navegador real validou homepage, galeria e os cinco filtros. Cada filtro exibiu pelo menos uma imagem específica.
- Navegador real confirmou links Timely, imagem do procedimento e ausência de overflow na página individual.
- Busca de resíduos proibidos em `src`: nenhuma referência a Sheila, drenagem linfática, Before & After ou localidades antigas.

### Pendências honestas

- A prévia temporária não é publicação no domínio oficial.
- A integração Instagram continua deliberadamente sem feed automático, pois não há recurso autorizado fornecido.
- A animação scroll-linked usa API CSS nativa como alternativa eficiente ao GSAP; navegadores sem suporte mantêm os reveals e transições existentes.


## Importação do pacote de fotos do cliente — 13 October 2026

O ZIP `Bella_Beauty_Pacote_Seguro_Para_Manus.zip` foi extraído em diretório temporário e integrado seletivamente, sem sobrescrever o projeto inteiro. Foi criado checkpoint em `/home/ubuntu/backups/bella-before-photo-import-20261013.bundle` antes da alteração.

Foram adicionados 19 arquivos WebP reais: 13 comparativos de resultados para Before & After, 2 fotos de bastidores para Studio e 4 retratos de Livia para Meet Livia. Os comparativos permanecem como uma única imagem composta, preservando a ordem original antes/depois.

A galeria existente foi mantida no mesmo componente visual, mas passou a usar o catálogo `bellaGallery`, com filtros All, Brows, Lips, Lashes, Skin, Studio e Meet Livia, lightbox com teclado, setas, Escape e zoom visual. A nova seção `BeforeAfterSection` foi inserida imediatamente depois de GalleryMarquee e antes de Find Us & Opening Hours. Ela possui filtros All, Brows, Lips e Lashes, botão View All Results e o mesmo lightbox reutilizável.

Validações realizadas: `npm run lint` aprovado; `npm run build` aprovado; homepage respondeu HTTP 200; navegador real confirmou as duas seções, imagens, filtros, lightbox e contador 1 / 13 depois de View All Results; contagens dos filtros da galeria foram Brows 5, Lips 2, Lashes 6, Skin 1, Studio 2 e Meet Livia 4; contagens Before & After foram Brows 5, Lips 2, Lashes 6 e All 13; captura desktop e captura mobile longa foram geradas. Nenhuma outra seção foi removida ou redesenhada.

A autorização das pessoas retratadas e a sequência temporal dos comparativos devem ser confirmadas pelo responsável antes da publicação, conforme instruções incluídas no pacote. O site não foi publicado.


## Patch de galeria e animações — 13 October 2026

Foi criado o checkpoint `/home/ubuntu/backups/bella-before-gallery-patch-20261013.bundle` antes da integração. O patch foi mesclado seletivamente; nenhum arquivo não relacionado foi substituído.

A galeria comum agora exclui todos os itens `kind: result` e exibe somente bastidores, retratos de Livia, fotos reais do interior do Studio e a imagem editorial de pele. Os dois novos ambientes recebidos foram adicionados como `studio-interior-01` e `studio-interior-02`. A seção Before & After mantém exclusivamente os 13 comparativos e agora usa uma esteira horizontal duplicada para loop contínuo, com velocidade proporcional ao filtro, pausa ao passar o mouse ou focar, filtros, lightbox e navegação por teclado.

Os cards de Brows, Lashes & Skin Care e Bella Beauty Signature Care foram mantidos com a fotografia de brows para brows e a sala de tratamento real para skin/facial care. A seção de tratamentos em destaque também usa `studio-treatment-room.webp`, com alt text específico para cuidados de pele.

Foi adicionado o `SmoothScrollController`, que suaviza apenas a roda do mouse em ponteiros finos, sem interceptar touch, trackpad, iframes, formulários ou rolagens internas. Smooth scroll nativo, scroll-padding, reveals novos e `prefers-reduced-motion` foram preservados/mesclados no CSS existente.

Validações: `npm run lint` aprovado; `npm run build` aprovado; preview HTTP 200; navegador real confirmou que a galeria comum não contém comparativos (`commonContainsComparison: false`), que Before & After contém 13 comparativos e que a animação computada é `before-after-flow` com duração de 78s no filtro All. A galeria comum contém 9 imagens não-comparativas, incluindo 4 imagens de Studio e a foto editorial de pele. Capturas desktop e mobile foram geradas; a viewport mobile normal mostrou hero e início da Signature Care sem cortes ou sobreposição.

Pendência: confirmar autorização de publicação das pessoas retratadas e o sentido temporal dos comparativos antes de publicar. O site não foi publicado.
