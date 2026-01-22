import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { getPost } from 'src/actions/blog-ssr';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post details | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>;
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  // Busca os dados do post em tempo de execução (SSR)
  const { post } = await getPost(title);

  if (!post) {
    return notFound();
  }

  return <PostDetailsView post={post} />;
}