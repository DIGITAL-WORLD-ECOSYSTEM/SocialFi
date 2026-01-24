import type { Metadata } from 'next';
import type { IPostItem } from 'src/types/blog';

import { kebabCase } from 'es-toolkit';
import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { getPost, getPosts, getLatestPosts } from 'src/actions/blog-ssr';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

// ✅ CORREÇÃO MANDATÓRIA:
// Páginas de blog públicas são pesadas. Mudamos para 'nodejs' (Limite 50MB).
// Isso resolve o erro "Edge Function size is 1.52 MB".
export const runtime = 'nodejs';

export const metadata: Metadata = { title: `Post details - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>; // Atualizado para Promise (padrão Next 15+)
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  const post = await getPost(title);

  if (!post.post) {
    notFound();
  }

  await getLatestPosts(title);

  return <PostDetailsView post={post.post} />;
}

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = await getPosts();
  const data: IPostItem[] = CONFIG.isStaticExport ? posts.posts : posts.posts.slice(0, 1);

  return data.map((post) => ({
    title: kebabCase(post.title),
  }));
}