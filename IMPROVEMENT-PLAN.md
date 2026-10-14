# Plano de melhoria do website — Bella Beauty Brazil

## Objetivo

O objetivo não é simplesmente ter um site mais bonito. O website deve atrair novas clientes, aparecer nas pesquisas do Google, ser facilmente compreendido por ferramentas de inteligência artificial, como o ChatGPT, e transformar visitantes em agendamentos.

## Recomendação estratégica

Antes de investir em novas fotos, cores ou textos, a estrutura do site deve ser avaliada. Se ela não permitir boa indexação, páginas com URLs próprias, carregamento rápido e rastreamento confiável, deve-se considerar uma reconstrução estrutural — sem alterar o design premium aprovado sem necessidade.

## Diagnóstico do clone atual

- O projeto preserva o clone Sheila adaptado, com componentes, animações, layout responsivo, galeria, mapa, horários, idiomas e CTAs já aprovados.
- A aplicação atual é uma SPA React/Vite com abas internas (`home`, `about`, `services`, `locations`, `contact`, `store` e `courses`).
- Não existe roteamento de navegador completo para cada serviço; portanto, não foram criadas URLs falsas ou páginas quase idênticas por bairro.
- O sitemap e o manifest registram as páginas institucionais principais, mas a indexação profunda de serviços individuais exigirá uma fase estrutural de rotas reais e SSR/prerender.
- Esta rodada melhora conteúdo local, metadados, dados estruturados, consistência do Timely e acessibilidade sem trocar o template.

## Conteúdo e conversão

- Priorizar na home: Nano Strokes, Microblading, Shadow/Hybrid Brows, Lip Blush, Brow Sculpting, Brow Lamination, Lash Lift, cursos, localização, avaliações reais, galeria e Book Now.
- Manter serviços confirmados no catálogo Timely, valores em AUD somente quando verificados e `Enquire` quando não houver preço confirmado.
- Manter Meet Livia, Bella Beauty Brazil, Suite 3, 412 Logan Road, Greenslopes, QLD 4120, Australia, telefone, e-mail, Instagram, WhatsApp, Get Directions e horários publicados.
- Não usar Before & After, avaliações fictícias, feed Instagram simulado, imagens não autorizadas ou tratamentos não publicados no Timely.

## SEO local e IA

- Utilizar naturalmente Greenslopes, Stones Corner, Coorparoo, Holland Park, Annerley, Tarragindi, Woolloongabba, Mount Gravatt, Upper Mount Gravatt, Carina, Carindale, Camp Hill, Sunnybank, Eight Mile Plains e Greater Brisbane.
- Trabalhar intenções como Nano Strokes Brisbane, Nano Brows Brisbane, Microblading Greenslopes, Lip Blush Brisbane, Ombre/Powder Brows Brisbane, Brow Sculpting Greenslopes e Lash Lift Brisbane Southside sem prometer volume, posição ou resultado.
- Manter conteúdo factual e acessível sobre serviços, profissional, endereço, contatos, horários e reserva.
- Usar JSON-LD LocalBusiness, Person, Service e BreadcrumbList somente com informações confirmadas; FAQPage apenas onde houver FAQ real.

## Performance e acessibilidade

- Priorizar mobile, imagens responsivas, lazy loading fora da hero, alt descritivo, `prefers-reduced-motion`, sem overflow horizontal e sem conflito entre animações.
- Usar como metas de engenharia, não como promessa: LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1.

## Próxima fase recomendada

Se a aquisição orgânica for prioridade, implementar rotas reais para páginas de serviços, prerender/SSR, canonicals por URL, breadcrumbs por página, sitemap completo e redirecionamentos 301 após confirmar as URLs atuais. Essa mudança deve ser planejada como uma fase estrutural independente para não quebrar o clone aprovado.
