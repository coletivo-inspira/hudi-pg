# HUDI Pages

Construtor de smartfolios do ecossistema Hudi Labs. A aplicacao coleta o conteudo, apresenta uma previa em tempo real e prepara uma solicitacao moderada para publicacao em um repositorio proprio no GitHub Pages.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Qualidade

```bash
npm run check
```

O projeto usa Next.js com App Router, TypeScript estrito, exportacao estatica e Vitest.

## Arquitetura

- `src/domain/portfolio`: contratos do smartfolio e regras de slug/publicacao.
- `src/domain/templates`: registro central de templates e temas.
- `src/components`: editor, previa e secoes da experiencia.
- `src/services`: adaptadores para integracoes externas.
- `docs/ARCHITECTURE.md`: fluxo completo de moderacao e publicacao.

