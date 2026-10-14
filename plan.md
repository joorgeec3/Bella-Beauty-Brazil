# Plano de adaptação — Bella Beauty Brazil

## Escopo

Clonar e adaptar o repositório React/Vite da Sheila/Magic Hands para Bella Beauty Brazil sem trocar o template: preservar componentes, seções, animações, navegação sticky, responsividade e funcionalidades existentes. A mudança será concentrada em dados, identidade visual, conteúdo, rotas e correções de acessibilidade/links.

## Fonte de verdade

- Site institucional: https://www.bellabeautybrazil.com.au/
- Catálogo e booking: https://bellabrazil.gettimely.com/
- Reserva oficial: https://bookings.gettimely.com/bellabrazil/bb/book

Preços e durações só entram quando publicados no Timely. Cursos sem checkout seguro próprio usam CTA `Enquire`; serviços e produtos apontam para o booking/Timely sem simular pagamento.

## Design

- **Movimento:** editorial beauty studio com composição assimétrica, cards fotográficos e molduras suaves.
- **Princípios:** sofisticado, humano, luminoso e direto para reserva.
- **Paleta:** rosa blush `#EFB7C8`, nude `#F3D9D0`, vinho `#5B3239`, carvão `#2E2528` e marfim `#FFF9F7`.
- **Layout:** manter a estrutura em camadas do clone Sheila — hero full-bleed, ribbon, marquee, cards, páginas internas, drawers e CTAs flutuantes.
- **Assinaturas:** molduras finas vinho, blocos blush e tipografia serifada editorial combinada com sans moderna.
- **Interação:** toda área clicável exibe cursor pointer; filtros e lightbox são discretos; sem imagens/letras seguindo o mouse.
- **Animação:** manter reveal, marquee e transições originais, suavizar transformações e respeitar `prefers-reduced-motion`.
- **Tipografia:** Cormorant Garamond/DM Sans como direção; fallback para Raleway/Montserrat já presentes.
- **Essência:** beleza brasileira especializada que aprimora a beleza natural em Brisbane. Personal, refined, empowering.

## Estrutura

- `src/data/siteData.ts`: catálogo confirmado, cursos, horários, contatos e traduções.
- `src/data/siteImages.ts`: mapa único de imagens oficiais locais.
- `src/components/`: componentes do clone preservados e retematizados.
- `src/pages/`: About, Services, Courses, Contact e Locations.
- `public/assets/bella/`: ativos baixados das fontes oficiais identificadas.
- `public/manus-routes.json`: manifest de rotas para inspeção/SEO.

## Pendências intencionais

As fotos extras prometidas pelo usuário ainda não foram recebidas. A galeria usa somente ativos institucionais já publicados; não serão inventados resultados, avaliações ou feed Instagram.
