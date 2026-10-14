# Bella Beauty Brazil — adaptação do site Sheila

Este projeto adapta o código React/Vite original da Sheila/Magic Hands para a Bella Beauty Brazil, preservando a estrutura de componentes, seções, animações, navegação sticky, comportamento mobile e responsividade. A identidade foi retematizada para Bella Beauty Brazil e o conteúdo foi baseado nas fontes oficiais institucionais e Timely.

## Desenvolvimento

```bash
npm install
npm run dev
npm run lint
npm run build
```

O projeto usa React 19, Vite, TypeScript, Tailwind CSS v4 e `lucide-react`. A prévia temporária usa `server.allowedHosts` restrito ao host da Sandbox; isso não publica o domínio oficial. O diretório `node_modules` não faz parte da entrega ZIP.

## Conteúdo e reservas

O booking oficial é `https://bookings.gettimely.com/bellabrazil/bb/book`. Preços e durações visíveis no catálogo foram confirmados no Timely e são exibidos em AUD. O site não simula checkout nem agendamento. Serviços apontam para o booking oficial; cursos usam `Enquire` para manter compra e pagamento em ambiente seguro.

Contato: Livia Rego · Suite 3, 412 Logan Road, Greenslopes, QLD 4120, Australia · +61 402 148 437 · livia.anjos14@gmail.com. Instagram: [@bellabeautybrazil](https://www.instagram.com/bellabeautybrazil/).

## Arquivos de auditoria

- `AUDIT.md`: fontes, decisões, backup e pendências.
- `TIMELY-SOURCE.md`: extração integral dos serviços, preços, durações, produtos, pacotes e cursos confirmados.
- `plan.md`: plano de preservação do template e direção visual.
- `public/manus-routes.json`: rotas declaradas.
- `public/robots.txt` e `public/sitemap.xml`: SEO técnico inicial.

## Fotos extras

A galeria atual usa somente ativos identificados nas fontes oficiais. As fotos extras prometidas pelo usuário devem ser adicionadas em `public/assets/bella/` e classificadas em `src/data/siteImages.ts` quando forem recebidas; não foram inventadas imagens de resultados, avaliações ou feed Instagram.


## Correção incremental — outubro de 2026

A home e as páginas internas não exibem mais a seção Before & After, comparadores ou fotos de resultados. O catálogo foi restringido aos tratamentos publicados no Timely: cosmetic tattooing/Nano Strokes, Lip Blush, brows, lashes, skin treatments, waxing e cursos. Drenagem linfática, modelagem corporal e resíduos da Sheila foram removidos. A galeria comum usa filtros e lightbox com os ativos Bella disponíveis.


## Find Us & Opening Hours

A seção única da home reutiliza `LocationsCarousel` com mapa Google Maps interativo à esquerda e card de horários Timely à direita no desktop; no mobile o layout empilha mapa e horários. Os horários exibidos são Monday 11:00–17:30, Tuesday 09:15–19:30, Wednesday 13:30–15:30, Thursday 09:15–19:30, Friday 09:15–16:00 e Saturday 08:30–15:30. Sunday não é exibido sem confirmação.

## Loved by Our Clients

A seção usa o perfil Google Maps oficial identificado pelo Place ID `ChIJbSI9huFbkWsRzCJ02qxGr_I`. Na verificação pública de 13 October 2026, o perfil exibiu 5.0 estrelas e 126 avaliações. O carrossel contém apenas excertos visíveis de avaliações públicas, mantendo nomes e atribuição; não há integração em tempo real nem API paga.

## Ordem da home — outubro de 2026

A ordem da home foi ajustada somente no roteador existente: `Gallery / Our Work` agora aparece antes de `Find Us & Opening Hours`. Os componentes internos, filtros, lightbox, mapa, horários e animações não foram recriados nem alterados.
