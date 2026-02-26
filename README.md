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

🌳 Árvore Hierárquica: Ecossistema de Autenticação SocialFi
Plaintext

SocialFi/
├── packages/
│   ├── back/ (Serviços de Identidade - Cloudflare Workers)
│   │   └── src/
│   │       ├── db/
│   │       │   ├── index.ts           # Inicialização do Drizzle com o D1 Database
│   │       │   └── schema.ts          # Tabelas: users (perfil), credentials (hashes), sessions (tokens)
│   │       ├── middleware/
│   │       │   ├── auth.ts            # Validador de Bearer Token / Session Cookie
│   │       │   └── rate-limit.ts      # Proteção contra Brute Force em rotas críticas
│   │       ├── routes/
│   │       │   └── core/auth/
│   │       │       ├── index.ts       # Endpoints de ciclo de vida (Login, Logout, Registro)
│   │       │       └── password.ts    # Handlers para alteração e recuperação de acesso
│   │       ├── services/
│   │       │   ├── auth.ts            # Core: Criptografia de senhas e sign de JWT
│   │       │   └── email.ts           # Disparo de códigos OTP e links de ativação
│   │       ├── utils/
│   │       │   └── auth-guard.ts      # Lógica de RBAC (Controle de acesso baseado em cargos)
│   │       └── validators/
│   │           └── auth.ts            # Contratos Zod para garantir integridade do Payload
│   │
│   └── front/ (Interface e Experiência - Next.js 15)
│       └── src/
│           ├── app/ (Roteamento Físico)
│           │   ├── auth/              # Agrupador de páginas públicas (Login/SignUp)
│           │   │   ├── sign-in/       # UI de entrada (layout + page)
│           │   │   └── verify/        # Página de validação de token/código
│           │   └── dashboard/         # Área restrita que consome o AuthGuard
│           ├── auth/ (Lógica de Autenticação do Cliente)
│           │   ├── context/
│           │   │   ├── auth-provider.tsx # Provider que injeta o estado do user no App
│           │   │   └── action.ts         # Orquestrador de chamadas à API (Login/Register)
│           │   ├── guard/
│           │   │   ├── auth-guard.tsx    # HOC que redireciona deslogados para o login
│           │   │   └── guest-guard.tsx   # Impede logados de voltarem à tela de login
│           │   ├── hooks/
│           │   │   └── use-auth-context.ts # Hook customizado para acessar o usuário global
│           │   └── view/
│           │       └── sign-in-view.tsx  # Template visual do formulário de acesso
│           ├── components/
│           │   └── hook-form/            # Inputs inteligentes validados via Zod (Front)
│           └── layouts/
│               └── auth/
│                   ├── layout.tsx        # Shell visual das páginas de auth (fundo/logo)
│                   └── content.tsx       # Wrapper de conteúdo centralizado
│
└── scripts/
    └── gerar-arvore.js                # Script de sincronização de estrutura

---

# Checklist de Pré-Lançamento (Production Readiness)

## 1. Back-end (Cloudflare Workers & D1)
A maior vulnerabilidade em sistemas SocialFi está na comunicação entre o Worker e o Banco de Dados.

- [ ] **Drizzle Migrations**: Verificar se todas as alterações no `schema.ts` foram aplicadas ao banco D1 de produção (`wrangler d1 migrations apply`).
- [ ] **JWT Secret Management**: Garantir que o `AUTH_SECRET` não está no código. Deve estar configurado como Secret no Cloudflare Dash ou via `wrangler secret put`.
- [ ] **CORS Policy**: Restringir as origens no Worker para aceitar requisições apenas do seu domínio de produção (front-end).
- [ ] **Rate Limiting**: Validar se o `rate-limit.ts` está protegendo as rotas `/login` e `/register` contra ataques de dicionário.
- [ ] **Zod Backend Validation**: Conferir se todas as rotas em `routes/core/auth/` possuem o `.parse()` do Zod para evitar Injeção de SQL (embora o Drizzle proteja, a validação de tipo é a primeira barreira).
- [ ] **Error Handling**: Substituir `console.log` por um logger estruturado ou serviço de monitoramento (ex: Sentry/Logflare).

## 2. Front-end (Next.js 15 & MUI)
O foco aqui é evitar o "vazamento" de rotas protegidas e garantir a performance da renderização.

- [ ] **Middleware de Borda (Edge)**: Implementar ou revisar o `src/middleware.ts` para interceptar rotas `/dashboard/*` antes mesmo do React carregar (Server-side Protection).
- [ ] **Cookie Security**: Verificar se o token de sessão está sendo salvo como `HttpOnly`, `Secure` e `SameSite=Lax`.
- [ ] **Environment Variables**: Validar se as variáveis `NEXT_PUBLIC_API_URL` estão apontando para o Worker de produção, não para o `localhost:8787`.
- [ ] **Zod Frontend Integration**: Garantir que o `hook-form` está exibindo mensagens de erro amigáveis para o usuário em caso de falha na validação.
- [ ] **Hydration Check**: Como você usa React 19 e MUI, verifique se não há erros de hidratação (conflito entre o que o servidor renderiza e o que o cliente monta).
- [ ] **Tree Shaking**: Confirmar se as bibliotecas pesadas (ApexCharts, Framer Motion) estão sendo importadas apenas onde são usadas para diminuir o `main.js`.

## 3. Segurança & Autenticação (Core SocialFi)
Como o sistema lida com ativos (tokenização), a segurança é crítica.

- [ ] **RBAC (Role Based Access Control)**: Testar no `auth-guard.ts` se um usuário com cargo "User" consegue acessar rotas de "Admin".
- [ ] **Session Expiry**: Configurar um tempo de expiração razoável para o JWT (ex: 1 hora) e implementar o Refresh Token se necessário.
- [ ] **OTP / Email Flow**: Testar o disparo real de e-mails via `services/email.ts` (usando Resend, SendGrid ou Mailchannel no Cloudflare).
- [ ] **Password Hashing**: Confirmar se o `services/auth.ts` está usando `bcrypt` ou `argon2` com um fator de custo adequado.

## 4. DevOps & Deploy (Cloudflare Ecosystem)
- [ ] **Wrangler Environments**: Separar as configurações no `wrangler.toml` entre `[env.production]` e `[env.preview]`.
- [ ] **Deployment Pipeline**: Configurar GitHub Actions ou Cloudflare Pages CI/CD para automatizar o deploy após os testes passarem.
- [ ] **Script de Sincronização**: Rodar o `scripts/gerar-arvore.js` uma última vez para garantir que a documentação da arquitetura reflete fielmente o que está indo para produção.

## 5. Testes de Estresse "SocialFi"
- [ ] **Concurrent Login**: Testar múltiplos logins simultâneos para ver como o D1 Database se comporta com o limite de conexões.
- [ ] **Mobile Responsiveness**: Validar a `sign-in-view.tsx` em dispositivos móveis reais (essencial para usuários de redes sociais).

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

---
## Diretrizes de Código e Padrões

### Sistema de Grid do Material-UI (Grid v2)

**Contexto:** O Material-UI (MUI) atualizou seu sistema de Grid na v7. O componente `Grid` original foi marcado como obsoleto e renomeado para `GridLegacy`, enquanto o novo e mais performático `Grid2` foi promovido para se tornar o `Grid` padrão.

**Ação Realizada:** Para alinhar o projeto com as melhores práticas e garantir a compatibilidade futura, executamos o codemod oficial do MUI em toda a base de código:
```sh
npx @mui/codemod v7.0.0/grid-props ./src
```
Este script atualizou automaticamente todas as instâncias do antigo `Grid` para a nova API, garantindo uma transição suave.

**Diretriz para Desenvolvedores:**
- **Use sempre o componente `<Grid>` importado de `@mui/material/Grid`**. Este é agora o componente de grid padrão e recomendado, baseado no antigo `Grid2`.
- **Não utilize `<GridLegacy>`**. Ele só existe para fins de compatibilidade e será removido em versões futuras.
- **Não há mais necessidade de importar `Unstable_Grid2`**. O uso foi unificado no componente `Grid`.

Esta atualização resolve as inconsistências anteriores e simplifica o desenvolvimento, fornecendo um sistema de layout mais poderoso e previsível.


Magic UI: Eles têm um componente de Particles pronto que é minimalista e combina perfeito com o seu tema "DEX World".

Aceternity UI: Tem um efeito chamado "Background Beams" que simula conexões de fibra ótica cruzando a tela. É o auge do design de governança atual.

---

## 🛠 Arquitetura de SEO & Performance (Padrão 2026)
Este projeto utiliza uma infraestrutura de SEO dinâmico baseada nas capacidades mais recentes do Next.js 16, focada em automação de metadados, dados estruturados semânticos e geração programática de imagens sociais.

### 🌳 Estrutura do Diretório de SEO
```
SocialFi/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # MetadataBase: Configuração global (Title Templates/Canonical)
│   │   ├── robots.ts               # Dinâmico: Controle de indexação e acesso a bots
│   │   ├── sitemap.ts              # Dinâmico: Mapa do site que lê automaticamente o [_blog.ts]
│   │   ├── manifest.ts             # Dinâmico: Configurações de PWA e SEO Mobile
│   │   ├── apple-icon.tsx          # Dinâmico: Ícone Apple gerado com resolução adaptativa
│   │   │
│   │   /* SEO RAIZ & SOCIAL BRANDING */
│   │   ├── opengraph-image.tsx      # Geração via código da imagem de preview principal
│   │   ├── twitter-image.tsx        # Imagem otimizada para algoritmos do X/Twitter
│   │   │
│   │   ├── post/
│   │   │   └── [title]/
│   │   │       ├── page.tsx        # SEO dinâmico por Post (generateMetadata)
│   │   │       ├── opengraph-image.tsx # Banner social automático com o título do artigo
│   │   │       └── twitter-image.tsx   # Banner Twitter automático por artigo
│   │   │
│   │   └── category/[slug]/
│   │           └── page.tsx        # SEO de Siloing: Agrupamento de autoridade por nicho
│   │
│   ├── components/seo/             # Central Técnica de Busca
│   │   ├── json-ld.tsx             # Injeção de Structured Data (JSON-LD - Schema.org)
│   │   └── analytics.tsx           # Hub de telemetria (Vercel/Google Analytics)
│   │
│   ├── actions/
│   │   └── blog-ssr.ts             # Renderização no Servidor (Pre-rendering para Crawlers)
│   │
│   └── _mock/
│       └── _blog.ts                # Single Source of Truth para o conteúdo indexável
│
├── next.config.ts                  # Headers de segurança e redirects permanentes
└── public/                         # Assets estáticos remanescentes (Favicons legados)
```

### 🚀 Pilares Estratégicos da Nova Arquitetura
1. **Automação de Sitemap & Robots**
Diferente de métodos legados, os arquivos sitemap.ts e robots.ts são gerados em tempo de execução (ou build). Isso significa que, ao adicionar um novo post no `src/_mock/_blog.ts`, o Google descobre a nova URL instantaneamente, sem necessidade de atualizar arquivos manuais.

2. **Metadados Dinâmicos (ZPE - Zero Point Entry)**
Utilizamos a API `generateMetadata` nas rotas dinâmicas (`[title]`, `[slug]`). Isso permite que cada página possua um `canonical link`, `title` e `description` únicos, combatendo o conteúdo duplicado e aumentando a relevância para palavras-chave específicas.

3. **Social Engagement (Image-as-Code)**
Implementamos arquivos `opengraph-image.tsx` que utilizam a engine Satori para renderizar HTML/CSS como imagens .png.
**Benefício**: Redução de custos com design e garantia de que toda postagem compartilhada no WhatsApp, LinkedIn ou X terá um visual atraente e informativo automaticamente.

4. **Semantic Search (JSON-LD)**
Através do componente `json-ld.tsx`, injetamos esquemas do `Schema.org` (Article, Organization, Breadcrumbs). Isso facilita a conquista de Rich Snippets (resultados enriquecidos com fotos e estrelas) e prepara o app para a SGE (Search Generative Experience) dos navegadores modernos.

5. **Web Vitals & Image Optimization**
Todas as imagens são servidas via componente `src/components/image/image.tsx`, garantindo:
- Formato `.webp` automático.
- Lazy loading nativo.
- Prevenção de CLS (Cumulative Layout Shift).

### Como Adicionar um Novo Post
Graças à arquitetura de SEO dinâmico, adicionar um novo post é um processo simples e centralizado. Basta atualizar o arquivo `src/_mock/_blog.ts`.

1.  **Abra `src/_mock/_blog.ts`**: Este arquivo atua como a "fonte única da verdade" (Single Source of Truth) para todo o conteúdo do blog.
2.  **Adicione um novo objeto** ao array `_posts`.

O sistema fará o resto automaticamente:
- O **Sitemap Dinâmico** (`sitemap.ts`) incluirá a nova URL.
- A **Página do Post** será gerada dinamicamente.
- Os **Metadados e Imagens Sociais** (`opengraph-image.tsx`) serão criados com o título e a descrição do novo post.

### Ferramentas de Validação de SEO
Para garantir que os dados estruturados e os metadados estejam sendo implementados corretamente, utilize as seguintes ferramentas oficiais:

*   **[Google Rich Results Test](https://search.google.com/test/rich-results)**: Valida o JSON-LD e outros dados estruturados para verificar se suas páginas são elegíveis para Rich Snippets.
*   **[Google Search Console](https://search.google.com/search-console)**: Ferramenta essencial para monitorar a saúde do seu site no Google, inspecionar URLs e verificar o status de indexação.
