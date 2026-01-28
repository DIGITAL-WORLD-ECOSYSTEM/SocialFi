'use client';

import type { ReactNode } from 'react';
import type { IPostItem } from 'src/types/blog';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { PostRecent } from '../item/recent';
import { PostVideo } from '../components/video';
import { PostTrending } from '../item/trending';
import { PostBanner } from '../components/banner';
import { PostAuthors } from '../components/authors';
import { PostNewsletter } from '../forms/newsletter';
import { PostFeatured } from '../components/featured';
import { PostCommunity } from '../components/community';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  economiaSection: ReactNode;
  tecnologiaSection: ReactNode;
  meioAmbienteSection: ReactNode;
  geopoliticaSection: ReactNode;
};

export function PostListHomeView({ 
  posts, 
  economiaSection, 
  tecnologiaSection, 
  meioAmbienteSection, 
  geopoliticaSection 
}: Props) {

  // Lógica do Featured (Banner Escuro)
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 5).length > 0
    ? posts.filter((post) => post.featured).slice(0, 5)
    : posts.slice(0, 5);

  // Lógica do Trending (Grid)
  const trendingPosts = [...posts]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 7); 

  // Lógica dos Recentes (Remove o que já apareceu no featured e no trending para não repetir)
  const recentPosts = posts.filter((post) => 
    !featuredPosts.find(f => f.id === post.id) && 
    !trendingPosts.find(t => t.id === post.id)
  );

  return (
    <Stack spacing={0} sx={{ pb: 10 }}>

      {/* 1. HERO PRINCIPAL: O Banner Escuro (PostFeatured) */}
      <PostFeatured posts={featuredPosts} />

      {/* 2. DESTAQUES SECUNDÁRIOS: O Grid Assimétrico (PostTrending) */}
      <Container sx={{ mt: { xs: 4, md: 8 } }}>
        <PostTrending posts={trendingPosts} />
      </Container>

      {/* 3. PROVA SOCIAL: Fontes Monitoradas */}
      <Container sx={{ my: 10 }}>        
        <PostCommunity />
      </Container>

      {/* 4. O "AGORA": Últimas Atualizações */}
      <PostRecent posts={recentPosts} />

      {/* 5. CONTEÚDO DENSO (Bloco A): Economia */}
      {economiaSection}

      {/* 6. QUEBRA VISUAL: Vídeos */}
      <Container sx={{ my: 10 }}>
        <PostVideo />
      </Container>

      {/* 7. CONTEÚDO DENSO (Bloco B): Tecnologia */}
      {tecnologiaSection}

      {/* 8. CONVERSÃO: Banner de Anúncio */}
      <Container sx={{ my: 10 }}>
        <PostBanner />
      </Container>

      {/* 9. CONTEÚDO DENSO (Bloco C): Geopolítica */}
      {geopoliticaSection}

      {/* 10. CONTEÚDO NICHO (Bloco D): Meio Ambiente */}
      {meioAmbienteSection}

      {/* 11. HUMANIZAÇÃO: Autores */}
      <Container sx={{ my: 10 }}>        
        <PostAuthors />
      </Container>

      {/* 12. RETENÇÃO FINAL: Newsletter */}
      <PostNewsletter />

    </Stack>
  );
}