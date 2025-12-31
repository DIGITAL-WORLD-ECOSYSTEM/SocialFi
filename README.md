## Prerequisites

- Node.js >=20 (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Build

```sh
yarn build
# or
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

## Arquitetura do Módulo de Blog (Versão Escalável)

A arquitetura do blog foi refatorada para um padrão de alta escalabilidade, pronta para suportar uma plataforma de larga escala. Mantendo a base moderna do Next.js, a nova estrutura aprimora a separação de responsabilidades, introduz camadas de resiliência de dados e otimiza a organização de componentes para facilitar a manutenção e o crescimento futuro.

### Fluxo de Dados Resiliente (Do Servidor à Tela)

O fluxo de dados foi enriquecido com camadas de validação e transformação, garantindo robustez desde a fonte de dados até a interface do usuário.

1.  **Requisição e Estado de Carregamento**: O usuário acessa a página `/post`. Imediatamente, o Next.js renderiza o `src/app/post/loading.tsx`, exibindo *Skeleton Screens* para o usuário e melhorando a percepção de performance.

2.  **Execução no Servidor (`page.tsx`)**: Em paralelo, o Next.js executa a página `src/app/post/page.tsx` no servidor.

3.  **Ação de Dados (`actions/blog-ssr.ts`)**: A página chama a função `getPosts()` (uma Server Action) de `src/actions/blog-ssr.ts`.

4.  **Busca e Validação dos Dados Brutos**:
    *   A função `getPosts()` busca os dados da fonte (atualmente o Mock em `src/_mock/_blog.ts`, futuramente uma API externa).
    *   **NOVO**: Os dados brutos recebidos são validados contra um esquema definido em `src/schemas/blog-zod.ts` usando a biblioteca Zod. Se os dados não corresponderem ao contrato esperado (ex: um campo obrigatório está faltando), a função lança um erro.

5.  **Mapeamento para o Domínio da UI**:
    *   **NOVO**: Após a validação, os dados passam por uma camada de mapeamento em `src/actions/mappers/blog-mapper.ts`. Esta função transforma os dados da API (ex: `cover_image`, `published_at`) para o formato que os componentes de UI esperam (ex: `coverUrl`, `createdAt`). Isso desacopla a UI da estrutura da API.

6.  **Tratamento de Erros (`error.tsx`)**: Se qualquer etapa da busca, validação ou mapeamento falhar, o Next.js automaticamente captura o erro e renderiza o arquivo `src/app/post/error.tsx`, que apresenta uma mensagem amigável e uma opção para tentar novamente, evitando que a aplicação inteira quebre.

7.  **Injeção de Props para o Cliente**: Com os dados validados e mapeados, eles são retornados como `props` para o componente de view principal: `<PostListHomeView posts={posts} />`.

8.  **Renderização da UI no Cliente**: O componente de view, sendo um Componente de Cliente (`'use client'`), recebe os dados já prontos e renderiza a interface final.

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
│       ├── 📁 components/       # Componentes complexos e reutilizáveis do blog
│       │   ├── 📄 index.ts
│       │   ├── 📄 post-carousel-featured.tsx
│       │   ├── 📄 post-search.tsx
│       │   └── 📄 post-sort.tsx
│       ├── 📁 forms/
│       │   └── 📄 post-comment-form.tsx
│       ├── 📁 item/             # Componentes atômicos para itens de post
│       │   ├── 📄 index.ts
│       │   ├── 📄 post-details-skeleton.tsx
│       │   ├── 📄 post-item.tsx
│       │   └── 📄 post-list.tsx
│       └── 📁 view/             # Views principais que montam as seções
│           ├── 📄 index.ts
│           ├── 📄 post-create-view.tsx
│           ├── 📄 post-details-home-view.tsx
│           ├── 📄 post-details-view.tsx
│           ├── 📄 post-edit-view.tsx
│           ├── 📄 post-list-home-view.tsx
│           └── 📄 post-list-view.tsx
│
└── 📁 types/                   # ✅ Confirmado: Tipos e interfaces
    └── 📄 blog.ts              # Definições de tipos TypeScript para o blog

```

### Análise das Melhorias Estruturais

*   **`schemas/`**: Introduz uma camada de validação (Contrato de Dados) que torna a aplicação resiliente a mudanças inesperadas na API, prevenindo bugs em produção.
*   **`actions/mappers/`**: Cria uma camada de anti-corrupção, desacoplando o design dos seus componentes da estrutura de dados do backend. Você pode mudar a API sem precisar refatorar a UI.
*   **`loading.tsx` e `error.tsx`**: Implementam os padrões de UI/UX mais modernos do Next.js (Suspense e Error Boundaries), melhorando drasticamente a experiência do usuário durante o carregamento e em caso de falhas.
*   **Segmentação em `sections/blog/`**:
    *   **`components/`**: Agrupa componentes complexos que orquestram a interatividade (busca, sort, carrossel).
    *   **`item/`**: Isola as unidades mais atômicas (os cards de post), facilitando a criação de novas variações (compacto, largo, etc.) sem impacto no resto do sistema.
    *   **`forms/`**: Separa claramente os componentes responsáveis pela entrada de dados do usuário.
*   **`constants.ts`**: Centraliza a configuração do módulo, permitindo que um desenvolvedor altere opções (como os critérios de ordenação) em um único lugar, sem precisar "caçar" a lógica nos componentes.

Esta nova arquitetura não apenas organiza o código existente, mas estabelece uma fundação sólida e escalável para o futuro da plataforma.

---

## Decisões de Design de UI/UX

### Seção Hero: Efeito de Camadas de Glassmorphism

O efeito de desfoque implementado na seção Hero é uma técnica de design avançada conhecida como **Glassmorphism Layering**. Ele cria uma sensação de profundidade e luxo, transformando uma imagem padrão em um plano de fundo dinâmico e imersivo.

Esta é a análise técnica de como esse efeito é alcançado no código:

**1. A Arquitetura em Camadas (Z-Index)**

O efeito é um "sanduíche" de três camadas sobrepostas dentro do componente `PostCarouselFeatured`:

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

Ao aproveitar o componente `<Image />` do projeto (que provavelmente envolve o `next/image` do Next.js), o efeito permanece altamente performático:

-   A imagem de fundo é carregada e otimizada pelo Next.js.
-   O efeito de desfoque é um filtro CSS, que é acelerado por hardware e processado pela GPU do navegador. Isso garante animações e transições suaves entre os slides do carrossel sem impactar o desempenho.
