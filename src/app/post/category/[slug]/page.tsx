import { PostListView } from 'src/sections/blog/view/post-list-view';

// ----------------------------------------------------------------------

// ✅ CORREÇÃO FINAL:
// Categorias usam a mesma lista pesada de posts.
// Mudamos para 'nodejs' para garantir o limite de 50MB.
export const runtime = 'nodejs';

type Props = {
  params: Promise<{ slug: string }>; // Atualizado para Promise (Padrão Next.js 15)
};

export default async function Page({ params }: Props) {
  // const { slug } = await params;

  // const { posts } = await getPostsByCategory(slug);

  return <PostListView />;
}