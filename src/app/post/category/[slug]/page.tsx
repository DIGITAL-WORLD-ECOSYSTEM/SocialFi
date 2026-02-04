import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';
import { _posts } from 'src/_mock/_blog';
import { PostListView } from 'src/sections/blog/view/post-list-view';

// ----------------------------------------------------------------------

export const runtime = 'nodejs';

type Props = {
  params: Promise<{ slug: string }>;
};

// 🟢 SEO DINÂMICO PARA CATEGORIAS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Encontra a categoria formatada (ex: transforma "tecnologia" em "Tecnologia")
  const categoryName = _posts.find((p) => kebabCase(p.category) === slug)?.category || slug;

  return {
    title: `${categoryName} | Notícias ASPPIBRA`,
    description: `Explore as últimas novidades e artigos sobre ${categoryName} na ASPPIBRA.`,
    openGraph: {
      title: `Categoria: ${categoryName}`,
      description: `Conteúdo focado em ${categoryName} para o produtor rural.`,
      url: `${CONFIG.siteUrl}/post/category/${slug}`,
    },
  };
}

// ----------------------------------------------------------------------

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // 🟢 FILTRAGEM NO MOCK (Simulando o Backend)
  const filteredPosts = _posts.filter((post) => kebabCase(post.category) === slug);

  if (filteredPosts.length === 0) {
    notFound();
  }

  return <PostListView posts={filteredPosts} />;
}

// ----------------------------------------------------------------------

// 🟢 PERFORMANCE: Pré-gera as páginas de categoria no build
export async function generateStaticParams() {
  const categories = Array.from(new Set(_posts.map((post) => kebabCase(post.category))));

  return categories.map((slug) => ({
    slug,
  }));
}