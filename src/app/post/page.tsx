// src/app/post/page.tsx

import { getPosts } from 'src/actions/blog-ssr';

import { Economia } from 'src/sections/blog/item/economia';
import { Tecnologia } from 'src/sections/blog/item/tecnologia';
import { Geopolitica } from 'src/sections/blog/item/geopolitica';
import { MeioAmbiente } from 'src/sections/blog/item/meio-ambiente';
import { PostListHomeView } from 'src/sections/blog/view/post-list-home-view';

// ✅ Mantemos o nodejs para suportar libs mais pesadas se necessário
export const runtime = 'nodejs';

export const metadata = {
  title: 'DEX World: Monitorização e Notícias Cripto',
  description: 'Acompanhe as principais comunidades, vídeos e tendências do mercado blockchain em tempo real.',
};

export default async function PostListPage() {
  const data = await getPosts();

  // 1. Extração segura
  const rawPosts = Array.isArray(data) ? data : (data?.posts || []);

  // 2. 🛡️ SANITIZAÇÃO (A Correção do Erro)
  // O erro acontece porque 'rawPosts' pode ter métodos de classe ou dados não-seriáveis.
  // Este truque converte tudo para JSON puro, removendo o que o Client Component não aceita.
  const posts = JSON.parse(JSON.stringify(rawPosts));

  return (
    <PostListHomeView
      posts={posts}
      economiaSection={<Economia />}
      tecnologiaSection={<Tecnologia />}
      meioAmbienteSection={<MeioAmbiente />}
      geopoliticaSection={<Geopolitica />}
    />
  );
}