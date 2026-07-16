# HUDI Pages

Construtor de smartfolios do ecossistema Hudi Labs. A aplicação coleta o conteúdo, apresenta uma prévia em tempo real e prepara uma solicitação moderada para publicação em um repositório próprio no GitHub Pages.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Qualidade

```bash
npm run check
```

O projeto usa Next.js com App Router, TypeScript estrito, exportação estática e Vitest.

## Arquitetura

- `src/domain/portfolio`: contratos do smartfolio e regras de slug/publicação.
- `src/domain/templates`: registro central de templates, temas e blocos.
- `src/components`: editor, prévia e seções da experiência.
- `src/services`: adaptadores para integrações externas.
- `docs/ARCHITECTURE.md`: fluxo completo de moderação e publicação.
