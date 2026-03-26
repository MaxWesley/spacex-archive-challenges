# SpaceX Launch Archive

SPA para consultar o histórico de lançamentos da SpaceX, construída com React, TypeScript e Vite.

**[Acessar deploy](https://spacex-archive-challenge.vercel.app/)** · [Exemplo de detalhe de lançamento](https://spacex-archive-challenge.vercel.app/launches/5fe3af58b3467846b324215f)

![Demonstração da aplicação](./docs/gifs/demo.gif)

## Como rodar

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env e definir:
# VITE_API_BASE_URL=https://api.spacexdata.com/v4

# 3. Iniciar o servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Scripts disponíveis

| Script            | Comando                 | Descrição                           |
| ----------------- | ----------------------- | ----------------------------------- |
| `dev`             | `vite`                  | Servidor de desenvolvimento com HMR |
| `build`           | `tsc -b && vite build`  | Type-check + build de produção      |
| `preview`         | `vite preview`          | Preview local do build de produção  |
| `lint`            | `eslint .`              | Linting via ESLint                  |
| `format`          | `prettier --write .`    | Formatação via Prettier             |
| `test`            | `vitest run`            | Executa todos os testes             |
| `test:watch`      | `vitest`                | Testes em modo watch                |
| `test:coverage`   | `vitest run --coverage` | Testes com relatório de cobertura   |
| `storybook`       | `storybook dev -p 6006` | Storybook em modo desenvolvimento   |
| `build-storybook` | `storybook build`       | Build estático do Storybook         |

## Stack e design system

| Camada        | Tecnologia                |
| ------------- | ------------------------- |
| Framework     | React 19 + TypeScript     |
| Bundler       | Vite 8                    |
| Roteamento    | React Router v7           |
| Data fetching | TanStack Query v5         |
| HTTP client   | Axios                     |
| Design system | **Chakra UI v3**          |
| Testes        | Vitest + RTL + MSW        |
| Cobertura     | @vitest/coverage-v8       |
| Storybook     | Storybook 10 + addon-a11y |
| Lint/Format   | ESLint + Prettier         |
| Deploy        | Vercel                    |

### Identidade visual

A interface foi pensada com uma estética inspirada em terminais e painéis de controle de missão — um visual sci-fi minimalista com tipografia técnica, bordas sutis e alto contraste. A ideia é que a experiência de navegação remeta ao próprio painel de foguetes (ou como eu acho que eles se parecem).

### Por que Chakra UI?

- API declarativa com props de estilo — produtividade alta sem CSS externo.
- Suporte nativo a dark mode via `next-themes`.
- Componentes acessíveis por padrão (foco, aria, teclado).
- Boa integração com TypeScript (props tipadas).

## Funcionalidades

### Lista de lançamentos

- Listagem paginada com cards visuais (imagem, nome, status, rocket, launchpad, data).
- Busca por nome com debounce (400ms).
- Filtros avançados via drawer: status (sucesso/falha), agenda (próximos/passados), intervalo de datas.
- Paginação com navegação anterior/próxima.
- Estados de loading (skeleton), erro (retry) e empty state.
- Filtros persistidos na URL via query string — compartilhável e preservado ao voltar do detalhe.

### Detalhe do lançamento

- Carregamento por ID via API com populate de rocket, launchpad e crew.
- Hero com patch da missão, flight serial, nome e descrição.
- Stats: status (com indicador animado), data, rocket e launch site.
- Galeria de fotos da missão (Flickr) quando disponível.
- Composição da tripulação com fotos e links para Wikipedia.
- Links de recursos: webcast, wiki, artigo.
- Botão voltar que preserva o estado da lista.
- Metadados dinâmicos por rota via `react-helmet-async` (title e description).

### UI/UX

- Dark mode com toggle persistente.
- Layout responsivo (mobile-first).
- Navegação por teclado nos cards (Tab + Enter/Space).
- Header sticky com navegação e toggle de tema.
- Error Boundary global e por rota com fallback UI.
- Página 404 para rotas inexistentes.

## Testes e cobertura

O projeto possui **107 testes** distribuídos em **25 suites**, cobrindo componentes, hooks, utils, services e páginas.

### Cobertura atual

| Métrica    | Valor     |
| ---------- | --------- |
| Statements | **87.5%** |
| Branches   | **75.0%** |
| Functions  | **85.5%** |
| Lines      | **89.6%** |

### Distribuição dos testes

| Camada                 | Suites | Casos |
| ---------------------- | ------ | ----- |
| Componentes UI         | 3      | 13    |
| Componentes list/      | 5      | 21    |
| Componentes detail/    | 6      | 27    |
| Hooks                  | 3      | 14    |
| Utils                  | 1      | 12    |
| Services               | 1      | 3     |
| Pages (integração)     | 3      | 10    |
| Error Boundary + pages | 3      | 7     |

Para rodar os testes com cobertura:

```bash
pnpm test:coverage
```

## Storybook

Documentação visual interativa dos componentes com addon de acessibilidade (a11y).

```bash
pnpm storybook
```

Stories disponíveis:

- **Launches/LaunchCard** — Success, Failure, Upcoming
- **Launches/Detail/LaunchDetailHero** — WithDescription, WithoutDescription
- **Launches/Detail/LaunchDetailStats** — Success, Failure, Upcoming
- **Launches/LaunchesEmptyState** — NoFilters, WithActiveFilters
- **UI/FilterSelect** — Default, WithSelectedValue
- **UI/DateInput** — Empty, WithValue, WithConstraints
- **Feedback/ErrorFallback** — Default, ShortMessage

## Estrutura do projeto

```
src/
├── components/
│   ├── error-boundary/   # ErrorBoundary + ErrorFallback
│   ├── layouts/           # AppShell (header + main)
│   └── ui/                # PreloadedImage, FilterSelect, DateInput, etc.
├── features/
│   └── launches/
│       ├── components/
│       │   ├── list/      # LaunchCard, Filters, Pagination, Skeleton, EmptyState, ErrorState
│       │   └── detail/    # Hero, Stats, Gallery, Crew, Resources, Skeleton
│       ├── hooks/         # useLaunches, useLaunchesPage, useLaunchDetail
│       ├── pages/         # LaunchesPage, LaunchDetailPage
│       ├── services/      # launches.service (+ testes)
│       ├── types/         # Launch type
│       └── utils/         # launch.utils (imagem, status, data)
├── pages/                 # ErrorTestPage, NotFoundPage
├── router/                # Rotas com ErrorBoundary por rota
└── lib/                   # Axios instance, React Query config
```

## Deploy

O projeto está configurado para deploy na Vercel via `vercel.json`:

- **Build command**: `pnpm build`
- **Output directory**: `dist`
- **Rewrites**: SPA fallback para `index.html`

Variável de ambiente necessária: `VITE_API_BASE_URL`.

## Limitações e próximos passos

### Limitações atuais

- Galeria do detalhe não possui lightbox/zoom.
- O campo `type` do rocket vindo da API é sempre `"rocket"` (literal), então não é exibido.
- Chunk único de produção acima de 500KB — pode se beneficiar de code splitting com lazy routes.

### Próximos passos

- Implementar lazy loading de rotas para reduzir bundle inicial.
- Adicionar cancelamento de requests com `AbortController`/signal do TanStack Query.
- Explorar micro-frontends (Module Federation) para escalar a arquitetura.
- Adicionar pipeline CI/CD (GitHub Actions) com lint, test e build.
- Implementar feature flags para habilitar/desabilitar funcionalidades.
- Instrumentar métricas de frontend (carregamento, tempo até dados, erros por rota).
