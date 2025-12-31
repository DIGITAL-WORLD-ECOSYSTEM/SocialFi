// src/app/post/page.tsx

import { getPosts } from 'src/actions/blog-ssr';
import { PostListHomeView } from 'src/sections/blog/view/post-list-home-view';

// Configuração para execução na Edge da Cloudflare
export const runtime = 'edge'; 

export const metadata = {
  title: 'DEX World: Monitorização e Notícias Cripto',
  description: 'Acompanhe as principais comunidades, vídeos e tendências do mercado blockchain em tempo real.',
};

export default async function PostListPage() {
  // 1. Busca os dados. 
  // O retorno parece ser um objeto { posts: [...] } de acordo com o erro.
  const data = await getPosts();

  // 2. Garantimos que extraímos apenas o array para passar para a View
  // Se 'data' for um array, usamos ele. Se for um objeto com a propriedade 'posts', usamos ela.
  const posts = Array.isArray(data) ? data : (data?.posts || []);

  // 3. Agora o TypeScript reconhecerá que 'posts' é um array de IPostItem[]
  return <PostListHomeView posts={posts} />;
}