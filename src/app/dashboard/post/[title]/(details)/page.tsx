import { _mock } from 'src/_mock';
import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

// ✅ CORREÇÃO MANDATÓRIA: Runtime Edge para o Cloudflare
export const runtime = 'edge';

type Props = {
  params: Promise<{
    title: string;
  }>;
};

export default async function PostDetailsPage({ params }: Props) {
  const { title } = await params;

  // Objeto post mockado para garantir renderização segura no Edge
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

  // 🔴 CORREÇÃO AQUI: Removemos 'title={title}' pois a propriedade não existe no componente.
  // O título já está dentro do objeto 'post' acima.
  return <PostDetailsView post={post as any} />;
}