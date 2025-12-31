'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// Importação das 8 Seções Objetivas
import { PostFeatured } from '../components/featured';     // 1. Hero
import { PostAuthors } from '../components/authors';       // 2. Criadores
import { PostCommunity } from '../components/community';   // 3. Comunidades
import { PostVideo } from '../components/video';           // 4. Vídeos
import { PostBanner } from '../components/banner';         // 5. PUB
import { PostRecent } from '../item/recent';               // 6. Recentes
import { PostTrending } from '../item/trending';           // 7. Alta
import { PostNewsletter } from '../forms/newsletter';       // 8. Newsletter

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
};

export function PostListHomeView({ posts }: Props) {
  // Divisão inicial dos dados para as seções
  const featuredPosts = posts.slice(0, 5); // Os 5 primeiros para o Hero
  const recentPosts = posts.slice(5);      // O restante para a grade principal

  return (
    <Stack sx={{ pb: 10 }}>
      {/* 1. Hero - Carousel de Destaque */}
      <PostFeatured posts={featuredPosts} />

      {/* 2. Criadores - Autores do Portal */}
      <PostAuthors />

      {/* 3. Comunidades - Fontes Monitoradas */}
      <PostCommunity />

      {/* 4. Vídeos - Galeria Youtube */}
      <PostVideo />

      {/* 5. PUB - Banner Publicitário */}
      <PostBanner />

      <Container sx={{ mt: { xs: 8, md: 10 } }}>
        {/* 6. Recentes - Grelha Cronológica */}
        <PostRecent posts={recentPosts} />

        {/* 7. Alta - Mais Engajados */}
        <PostTrending posts={featuredPosts} />
      </Container>

      {/* 8. Newsletter - Conversão */}
      <PostNewsletter />
    </Stack>
  );
}