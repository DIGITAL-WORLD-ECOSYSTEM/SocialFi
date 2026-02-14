import type { Metadata } from 'next';

import { kebabCase } from 'es-toolkit';
import { notFound } from 'next/navigation';

import { _posts } from 'src/_mock/_blog'; // Importação direta dos dados estáticos
import { CONFIG } from 'src/global-config';
import { getPost, getLatestPosts } from 'src/actions/blog-ssr';

// ✅ CORREÇÃO: Caminho atualizado para refletir a nova estrutura de diretórios
import { PostDetailsHomeView } from 'src/sections/blog/view/home/post-details-home-view';

// ----------------------------------------------------------------------

// Mantemos nodejs para compatibilidade total com o plano gratuito da Vercel
export const runtime = 'nodejs'; 

type Props = {
  params: Promise<{ title: string }>;
};

// 🟢 SOLUÇÃO PARA O ERRO GRAVE: Metadados agora são dinâmicos mesmo com Mock
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title } = await params;
  
  // Buscamos no mock para gerar o SEO individual de cada página
  const post = _posts.find((p) => kebabCase(p.title) === title);

  if (!post) {
    return { title: `Post não encontrado | ${CONFIG.appName}` };
  }

  return {
    title: `${post.title} | ${CONFIG.appName}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${CONFIG.siteUrl}/post/${kebabCase(post.title)}`,
      images: [
        {
          url: `/post/${kebabCase(post.title)}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

// ----------------------------------------------------------------------

export default async function Page({ params }: Props) {
  const { title } = await params;

  // Chamada da action para obter o post principal
  const { post } = await getPost(title);

  if (!post) {
    notFound();
  }

  const { latestPosts } = await getLatestPosts(title);

  return <PostDetailsHomeView post={post} latestPosts={latestPosts} />;
}

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  // Isso gera todas as páginas no momento do build. 
  // Ótimo para o plano gratuito pois reduz o uso de CPU em tempo de execução.
  return _posts.map((post) => ({
    title: kebabCase(post.title),
  }));
}