// src/app/post/page.tsx

import { getPosts } from 'src/actions/blog-ssr';

import { Economia } from 'src/sections/blog/item/economia';
import { Tecnologia } from 'src/sections/blog/item/tecnologia';
import { Geopolitica } from 'src/sections/blog/item/geopolitica';
import { MeioAmbiente } from 'src/sections/blog/item/meio-ambiente';
import { PostListHomeView } from 'src/sections/blog/view/post-list-home-view';

// ✅ CORREÇÃO MANDATÓRIA:
// Mudamos de 'edge' (limite 1MB) para 'nodejs' (limite 50MB).
// Isso evita que o deploy falhe nesta página de listagem.
export const runtime = 'nodejs';

export const metadata = {
  title: 'DEX World: Monitorização e Notícias Cripto',
  description: 'Acompanhe as principais comunidades, vídeos e tendências do mercado blockchain em tempo real.',
};

export default async function PostListPage() {
  const data = await getPosts();

  const posts = Array.isArray(data) ? data : (data?.posts || []);

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