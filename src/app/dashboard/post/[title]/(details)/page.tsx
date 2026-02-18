/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Dashboard Post Details (Admin View)
 * Version: 1.4.3 - Fix: Prerender stability & Runtime optimization
 */

import { _mock } from 'src/_mock';
import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

/**
 * ✅ ESTABILIDADE DE BUILD:
 * Forçamos 'force-dynamic' para evitar que o Next.js tente gerar versões estáticas 
 * de páginas administrativas durante o build, eliminando erros de Prerender.
 */
export const dynamic = 'force-dynamic';

/**
 * ✅ CONFIGURAÇÃO DE RUNTIME:
 * O uso de 'nodejs' garante suporte a bibliotecas densas e evita os limites 
 * restritivos de memória do Edge Runtime na Vercel.
 */
export const runtime = 'nodejs';

type Props = {
  params: Promise<{
    title: string;
  }>;
};

// ----------------------------------------------------------------------

export default async function PostDetailsPage({ params }: Props) {
  const { title } = await params;

  /**
   * 🛠️ CONSTRUÇÃO DO OBJETO (SERVER-SIDE):
   * Simulamos a busca de dados. O uso do 'title' da URL garante consistência 
   * visual durante os testes de navegação.
   */
  const post = {
    id: _mock.id(1),
    title: title.replace(/-/g, ' ') || _mock.postTitle(1),
    description: _mock.description(1),
    content: _mock.description(1),
    coverUrl: _mock.image.cover(1),
    tags: ['Governança', 'Agronegócio', 'RWA'],
    publish: 'published',
    metaTitle: _mock.postTitle(1),
    metaDescription: _mock.description(1),
    metaKeywords: ['ASPPIBRA', 'DAO', 'Blockchain'],
    createdAt: new Date().toISOString(),
    author: {
      name: _mock.fullName(1),
      avatarUrl: _mock.image.avatar(1),
    },
  };

  /**
   * ✅ HIGIENIZAÇÃO DE DADOS (SERIALIZAÇÃO):
   * Garantimos que o objeto passado para a View seja um JSON puro, prevenindo
   * o erro "Functions cannot be passed directly to Client Components".
   */
  const sanitizedPost = JSON.parse(JSON.stringify(post));

  return <PostDetailsView post={sanitizedPost} />;
}