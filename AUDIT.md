# Auditoria e backup — Bella Beauty Brazil

Data da auditoria: 2026-10-13

## Estado original

- Repositório: `joorgeec3/Site-Sheila`
- Commit inicial preservado: `22ae49f`
- Stack: React 19 + Vite + Tailwind v4 + TypeScript + lucide-react.
- Backup Git bundle: `/home/ubuntu/backups/site-sheila-original.bundle`
- Backup de fonte: `/home/ubuntu/backups/site-sheila-original-source.tar.gz`
- SHA-256 do bundle: `447701517fcef0d68e6e72bf1aca64b442f06013ed757b51c985510164ce07a4`
- SHA-256 da fonte: `fa3723de206f6469f56b4d4e9dc3cfeba628930628043dc1841a84a66ad55c16`

## Conteúdo confirmado

O institucional confirma a marca Bella Beauty Brazil, a narrativa de Meet Livia, o endereço Suite 3, 412 Logan Road, Greenslopes, Brisbane, QLD 4120, o telefone 0402148437, o e-mail livia.anjos14@gmail.com e Instagram `@bellabeautybrazil`.

O Timely confirma o booking `https://bookings.gettimely.com/bellabrazil/bb/book`, tratamentos, pacotes, produtos e quatro cursos. A extração integral está preservada em `TIMELY-SOURCE.md` dentro do pacote final.

Horários publicados no Timely: Monday 11:00am–5:30pm; Tuesday 9:15am–7:30pm; Wednesday 1:30pm–3:30pm; Thursday 9:15am–7:30pm; Friday 9:15am–4:00pm; Saturday 8:30am–3:30pm.

## Não inventado

- Nenhum preço foi criado fora do Timely.
- Não foi simulado feed Instagram; o CTA leva ao perfil oficial.
- Não foi simulado checkout; cursos usam `Enquire` e serviços usam reserva oficial.
- Não foram adicionadas avaliações não verificadas.
- Fotos extras do usuário ainda aguardam recebimento.

## Pendências

1. Classificar e inserir as fotos extras autorizadas quando forem enviadas.
2. Confirmar a aprovação de uso dos ativos oficiais fora dos domínios de origem, se necessário.
3. Validar em navegador real os estados de menu mobile e lightbox após a próxima rodada de imagens.


## Correção incremental — outubro de 2026

A home e as páginas internas não exibem mais a seção Before & After, comparadores ou fotos de resultados. O catálogo foi restringido aos tratamentos publicados no Timely: cosmetic tattooing/Nano Strokes, Lip Blush, brows, lashes, skin treatments, waxing e cursos. Drenagem linfática, modelagem corporal e resíduos da Sheila foram removidos. A galeria comum usa filtros e lightbox com os ativos Bella disponíveis.

## Google Reviews — verificação pública incremental (13 October 2026)

Fonte oficial consultada pelo Place ID fornecido: https://www.google.com/maps/search/?api=1&query=Bella%20Beauty%20Brazil&query_place_id=ChIJbSI9huFbkWsRzCJ02qxGr_I&hl=en

O perfil exibiu Bella Beauty Brazil, endereço 412 Logan Rd, Greenslopes QLD 4120, Australia, nota 5.0 e 126 reviews. Foram usados somente excertos públicos visíveis, sem completar trechos truncados pelo Google: Jéssica Amaral, Graciele Santos e Chandrika Gurung. A integração em tempo real não foi usada e nenhuma API paga foi adicionada.
