## Prerequisites

- Node.js >=20 (Recommended)

## Installation

**Using pnpm (Recommended)**

```sh
pnpm install
pnpm dev
```

# Using Npm
npm i
npm run dev
```

## Build

```sh
# Using pnpm
pnpm build

# Using Yarn
yarn build

# Using Npm
npm run build
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/scl/fo/bopqsyaatc8fbquswxwww/AKgu6V6ZGmxtu22MuzsL5L4?rlkey=8s55vnilwz2d8nsrcmdo2a6ci&dl=0).

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._

---

## Stacks e Versões

Esta é a lista de stacks e suas respectivas versões utilizadas no projeto, extraídas do `package.json`.

### Stacks Principais (dependencies)

| Stack | Versão | Descrição |
| :--- | :--- | :--- |
| Next.js | `^16.1.2` | Framework para React com renderização no servidor. |
| React | `^19.2.3` | Biblioteca para construção de interfaces de usuário. |
| Material-UI (MUI)| `^7.3.7` | Biblioteca de componentes de UI para React. |
| Emotion | `^11.14.0` | Biblioteca de CSS-in-JS. |
| Tiptap | `^3.15.3` | Editor de texto rico (Rich Text Editor). |
| React Hook Form | `^7.63.0` | Gerenciamento de formulários. |
| Zod | `^4.1.11` | Validação de schemas e tipos. |
| i18next | `^25.5.2` | Framework de internacionalização. |
| SWR | `^2.3.6` | Biblioteca para data fetching em React. |
| Axios | `^1.12.2` | Cliente HTTP baseado em Promises. |
| Framer Motion | `^12.23.22`| Biblioteca de animação para React. |
| ApexCharts | `^5.3.5` | Biblioteca para criação de gráficos. |
| Day.js | `^1.11.18` | Manipulação e formatação de datas. |

### Stacks de Desenvolvimento (devDependencies)

| Stack | Versão | Descrição |
| :--- | :--- | :--- |
| TypeScript | `^5.9.2` | Superset do JavaScript que adiciona tipagem estática. |
| ESLint | `^9.36.0` | Ferramenta de linting para JavaScript e TypeScript. |
| Prettier | `^3.6.2` | Formatador de código. |

---

## Estrutura de Autenticação

Essa é a minha arvore do front end dedicada ao sistema de autenticação:

└── /src
    ├── app/
    │   └── auth/               # ROTAS PÚBLICAS (O que o usuário acessa no navegador)
    │       ├── reset/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       ├── sign-in/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       ├── sign-up/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       ├── update/
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── verify/
    │           ├── layout.tsx
    │           └── page.tsx
    │
    ├── auth/
    │   ├── view/               # COMPONENTES DE UI (Os formulários e botões)
    │   │   ├── index.ts
    │   │   ├── reset.tsx
    │   │   ├── sign-in.tsx
    │   │   ├── sign-up.tsx
    │   │   ├── update.tsx
    │   │   └── verify.tsx
    │   │
    │   ├── context/            # LÓGICA DE ESTADO (O "cérebro" da autenticação)
    │   │   ├── index.ts        # Exportador principal do contexto
    │   │   ├── action.ts       # Ações de login, logout, registro (com chamadas de API)
    │   │   ├── auth-context.tsx  # Definição do Contexto React
    │   │   ├── auth-provider.tsx # Componente que gerencia o estado e o token
    │   │   ├── constant.ts     # Constantes (ex: chave de armazenamento do token)
    │   │   └── utils.ts        # Funções utilitárias (ex: set/get/remove token)
    │   │
    │   ├── guard/              # GUARDAS DE ROTA (Protegem o acesso às páginas)
    │   │   ├── index.ts
    │   │   ├── auth-guard.tsx    # Garante que o usuário esteja logado
    │   │   ├── guest-guard.tsx   # Garante que o usuário NÃO esteja logado
    │   │   └── role-based-guard.tsx # Controle de acesso baseado em permissões
    │   │
    │   └── hooks/              # HOOKS CUSTOMIZADOS (atalhos para consumir o estado)
    │       ├── index.ts
    │       ├── use-auth-context.ts # Hook para acessar o contexto de autenticação
    │       └── use-mocked-user.ts  # Hook para usar dados de usuário mockados

---

## Arquitetura do Módulo de Blog (Versão Híbrida)

A arquitetura do blog foi projetada para alta escalabilidade, combinando a robustez do Next.js com uma clara separação de responsabilidades. **Atualmente, a listagem principal de posts (`/post`) utiliza uma abordagem de renderização no cliente (`'use client'`) para agilidade, enquanto a infraestrutura para um fluxo de dados server-side completo já está implementada e pronta para ser ativada.**

### Fluxo de Dados Atual (Client-Side na Listagem de Posts)

1.  **Requisição e Carregamento Inicial**: O usuário acessa a página `/post`. O Next.js exibe imediatamente o componente `src/app/post/loading.tsx` (*Skeleton Screens*), melhorando a percepção de performance.

2.  **Renderização no Cliente**: A página `src/app/post/page.tsx`, marcada como `'use client'`, é carregada no navegador do usuário.

3.  **Acesso Direto aos Dados Mockados**: O componente importa diretamente a lista de posts do arquivo de mock: `import { _posts } from 'src/_mock/_blog';`.

4.  **Lógica no Cliente**: Toda a lógica de paginação, busca e filtros é executada diretamente no navegador, manipulando o array de posts importado.

5.  **Injeção de Props**: Os dados processados são passados via `props` para o componente de apresentação `<PostListHomeView />`.

6.  **Tratamento de Erros**: Caso ocorra um erro durante a renderização no cliente, o Next.js captura e exibe o componente `src/app/post/error.tsx`.

### Infraestrutura Server-Side (Pronta para Ativação)

Embora a listagem de posts opere no cliente, a arquitetura para um fluxo de dados resiliente e executado no servidor já existe, ideal para quando a aplicação se conectar a uma API real:

*   **Ações de Dados (`actions/blog-ssr.ts`)**: Contém a lógica para buscar dados no servidor (Server Actions), como a função `getPosts()`.
*   **Validação de Dados (`schemas/blog-zod.ts`)**: Esquemas Zod para validar a integridade dos dados recebidos de uma API.
*   **Mapeamento de Dados (`actions/mappers/blog-mapper.ts`)**: Transforma os dados da API para o formato esperado pela UI, desacoplando o front-end do back-end.

**Nota para Desenvolvedores:** Para migrar a listagem de posts para server-side, basta refatorar `src/app/post/page.tsx` para remover o `'use client'`, chamar a Server Action `getPosts()` e passar os dados recebidos como props.

### Árvore de Arquivos e Componentes Otimizada

A estrutura de diretórios foi desenhada para máxima organização, modularidade e escalabilidade.

```bash
src
├── 📁 _mock/                   # ✅ Confirmado: Fonte de dados Mock
│   └── 📄 _blog.ts
│
├── 📁 actions/                 # ✅ Confirmado: Lógica de negócio e acesso a dados
│   ├── 📄 blog-ssr.ts          # Ações específicas para Server-Side Rendering
│   ├── 📄 blog.ts
│   ├── ... (outras actions)
│   └── 📁 mappers/
│       └── 📄 blog-mapper.ts    # Transforma dados da API para o domínio da UI
│
├── 📁 app/                     # ✅ Confirmado: Rotas e páginas (Next.js App Router)
│   └── 📁 post/
│       ├── 📁 [title]/         # Rota dinâmica para um post específico
│       │   ├── 📄 error.tsx    # UI de erro para a rota do post
│       │   ├── 📄 loading.tsx  # UI de carregamento para a rota do post
│       │   └── 📄 page.tsx      # View do post específico
│       ├── 📁 category/
│       │   └── 📁 [slug]/       # Rota para categorias (vazio, mas estrutura existe)
│       ├── 📄 error.tsx        # UI de erro para a listagem
│       ├── 📄 layout.tsx       # Layout compartilhado para as páginas de post
│       ├── 📄 loading.tsx     # UI de carregamento para a listagem
│       └── 📄 page.tsx          # View da listagem de posts
│
├── 📁 layouts/                 # ✅ Confirmado: Componentes de layout globais
│   └── 📁 blog/
│       ├── 📄 index.ts
│       └── 📄 layout.tsx
│
├── 📁 routes/                  # ✅ Confirmado: Gestão de rotas
│   └── 📄 paths.ts             # Gerador de URLs centralizado
│
├── 📁 schemas/                 # ✅ Confirmado: Validação de contratos de dados
│   └── 📄 blog-zod.ts          # Esquemas Zod para validar Mock/API
│
├── 📁 sections/                # ✅ Confirmado: Seções da UI por feature
│   └── 📁 blog/
│       ├── 📁 components/       # Componentes de UI genéricos do blog (widgets, etc)
│       │   ├── 📄 authors.tsx
│       │   ├── 📄 banner.tsx
│       │   ├── 📄 community.tsx
│       │   ├── 📄 featured.tsx
│       │   ├── 📄 index.ts
│       │   ├── 📄 post-search.tsx
│       │   ├── 📄 post-sort.tsx
│       │   └── 📄 video.tsx
│       │
│       ├── 📁 details/          # Componentes para a página de detalhes de um post
│       │   ├── 📄 post-comment-item.tsx
│       │   ├── 📄 post-comment-list.tsx
│       │   ├── 📄 post-details-hero.tsx
│       │   └── 📄 post-details-toolbar.tsx
│       │
│       ├── 📁 forms/            # Formulários específicos do blog
│       │   ├── 📄 newsletter.tsx
│       │   └── 📄 post-comment-form.tsx
│       │
│       ├── 📁 item/             # Componentes de item de post e suas variações
│       │   ├── 📄 index.ts
│       │   ├── 📄 item-horizontal.tsx
│       │   ├── 📄 item.tsx
│       │   ├── 📄 list-horizontal.tsx
│       │   ├── 📄 list.tsx
│       │   ├── 📄 recent.tsx
│       │   ├── 📄 skeleton.tsx
│       │   └── 📄 trending.tsx
│       │
│       ├── 📁 management/       # Views e formulários para o painel de admin (CRUD)
│       │   ├── 📄 post-create-edit-form.tsx
│       │   ├── 📄 post-create-view.tsx
│       │   ├── 📄 post-details-preview.tsx
│       │   └── 📄 post-edit-view.tsx
│       │
│       ├── 📁 view/             # Views principais que montam as páginas do blog
│       │   ├── 📄 index.ts
│       │   ├── 📄 post-details-home-view.tsx
│       │   ├── 📄 post-details-view.tsx
│       │   ├── 📄 post-list-home-view.tsx
│       │   └── 📄 post-list-view.tsx
│       │
│       └── 📄 constants.ts      # Constantes do módulo de blog
│
└── 📁 types/                   # ✅ Confirmado: Tipos e interfaces
    └── 📄 blog.ts              # Definições de tipos TypeScript para o blog

```

---

## Decisões de Design de UI/UX

### Seção Hero: Efeito de Camadas de Glassmorphism

O efeito de desfoque implementado na seção Hero é uma técnica de design avançada conhecida como **Glassmorphism Layering**. Ele cria uma sensação de profundidade e luxo, transformando uma imagem padrão em um plano de fundo dinâmico e imersivo.

Esta é a análise técnica de como esse efeito é alcançado no código:

**1. A Arquitetura em Camadas (Z-Index)**

O efeito é um "sanduíche" de três camadas sobrepostas dentro do componente `PostFeatured`:

-   **Camada Base (Imagem):** Renderizamos a imagem de capa do post (`coverUrl`) com um `filter: 'blur(24px)'`. O desfoque difunde as cores da imagem, criando uma textura suave e dinâmica que muda conforme o carrossel desliza.
-   **Camada de Contraste (Overlay):** Um pseudo-elemento `&:before` aplica uma sobreposição preta com 70% de transparência (`alpha(..., 0.7)`). Essa camada é crucial para garantir que o card de conteúdo branco se destaque visualmente, fornecendo o contraste necessário.
-   **Camada de Conteúdo (Card):** O card de conteúdo principal fica no topo da pilha, elevado pela sombra `z24` do tema.

**2. Centralização e Escala Inteligentes**

Para resolver problemas de alinhamento durante o zoom do navegador ou em diferentes proporções de tela, duas propriedades CSS críticas foram aplicadas à imagem de fundo:

-   `objectFit: 'cover'`: Garante que a imagem sempre preencha 100% de seu contêiner (vertical e horizontalmente) sem distorção ou deixar espaços vazios.
-   `objectPosition: 'center'`: Ancorar a imagem em seu centro. Quando a janela de visualização é redimensionada, a imagem se expande ou se contrai a partir do meio, mantendo a harmonia visual com o card centralizado.

**3. O Segredo para um "Blur" sem Vazamentos**

Um detalhe técnico importante é o uso de `overflow: hidden` no contêiner pai.

-   **Nota Técnica:** Quando um filtro de desfoque forte é aplicado, as bordas da imagem podem "vazar" para fora de seus limites pretendidos, criando uma névoa indesejada sobre as seções adjacentes (como o cabeçalho). `overflow: hidden` corta esse excesso, mantendo o efeito limpo e contido estritamente dentro da seção Hero.

**Análise de Desempenho**

Ao aproveitar o componente `<Image />` do projeto (que provavelmente envolve o `next/image` do Next.js), o efeito permanece highly performático:

-   A imagem de fundo é carregada e otimizada pelo Next.js.
-   O efeito de desfoque é um filtro CSS, que é acelerado por hardware e processado pela GPU do navegador. Isso garante animações e transições suaves entre os slides do carrossel sem impactar o desempenho.
