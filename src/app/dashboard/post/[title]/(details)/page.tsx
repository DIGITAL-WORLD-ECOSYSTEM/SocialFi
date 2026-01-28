import { _mock } from 'src/_mock';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

// ✅ CORREÇÃO CRUCIAL:
// Mudamos de 'edge' (limite 1MB) para 'nodejs' (limite 50MB).
// Isso evita que o deploy falhe na Vercel por causa do tamanho da função.
export const runtime = 'nodejs';

type Props = {
  params: Promise<{
    title: string;
  }>;
};

export default async function PostDetailsPage({ params }: Props) {
  const { title } = await params;

  // Objeto post mockado
  const post = {
    id: _mock.id(1),
    title: _mock.postTitle(1),
    description: _mock.description(1),
    content: _mock.description(1),
    coverUrl: _mock.image.cover(1),
    tags: ['Travel', 'Technology'],
    publish: 'published',
    metaTitle: _mock.postTitle(1),
    metaDescription: _mock.description(1),
    metaKeywords: ['Blog', 'App'],
    createdAt: new Date().toISOString(),
    author: {
      name: _mock.fullName(1),
      avatarUrl: _mock.image.avatar(1),
    },
  };

  return <PostDetailsView post={post as any} />;
}