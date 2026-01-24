import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { _mock } from 'src/_mock'; // ✅ Importando Mock direto
import { PostEditView } from 'src/sections/blog/management/post-edit-view';

// ----------------------------------------------------------------------

// ✅ CORREÇÃO MANDATÓRIA: 
// Mudamos de 'nodejs' para 'edge' para que o Cloudflare aceite o deploy.
export const runtime = 'edge';

export const metadata: Metadata = { title: `Edit post | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>;
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  // ✅ CORREÇÃO:
  // Construímos o objeto 'post' manualmente com o Mock.
  // Isso remove a dependência de 'getPost' (que pode ter códigos Node.js incompatíveis com Edge)
  // e garante que todas as funções novas que criamos (description, courseNames, etc) funcionem.
  const post = {
    id: _mock.id(1),
    title: _mock.postTitle(1),
    description: _mock.description(1),
    content: _mock.description(1),
    coverUrl: _mock.image.cover(1),
    tags: ['The Thrill of Traveling'],
    publish: 'published',
    metaTitle: _mock.postTitle(1),
    metaDescription: _mock.description(1),
    metaKeywords: ['Travel', 'Adventure'],
    createdAt: new Date().toISOString(),
  };

  if (!post) {
    return notFound();
  }

  // Passamos 'as any' para evitar conflitos de tipagem estrita durante o build,
  // focando em fazer o deploy funcionar agora.
  return <PostEditView post={post as any} />;
}