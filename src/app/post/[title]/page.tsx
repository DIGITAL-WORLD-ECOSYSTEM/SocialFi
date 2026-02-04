import type { Metadata } from 'next';
import type { IPostItem } from 'src/types/blog';

import { kebabCase } from 'es-toolkit';
import { notFound } from 'next/navigation';

import { CONFIG } from 'src/global-config';
import { getPost, getPosts, getLatestPosts } from 'src/actions/blog-ssr';

import { PostDetailsHomeView } from 'src/sections/blog/view/post-details-home-view';

// ----------------------------------------------------------------------

export const runtime = 'nodejs';

export const metadata: Metadata = { title: `Post details - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>;
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  const post = await getPost(title);

  if (!post.post) {
    notFound();
  }

  const latestPosts = await getLatestPosts(title);

  return <PostDetailsHomeView post={post.post} latestPosts={latestPosts.posts} />;
}

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = await getPosts();
  const data: IPostItem[] = CONFIG.isStaticExport ? posts.posts : posts.posts.slice(0, 1);

  return data.map((post) => ({
    title: kebabCase(post.title),
  }));
}
