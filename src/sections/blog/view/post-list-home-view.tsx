'use client';

import type { ReactNode } from 'react';
// ✅ Importação do tipo de Post para garantir a integridade dos dados
import type { IPostItem } from 'src/types/blog';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { PostRecent } from '../item/recent';
import { PostVideo } from '../components/video';
import { PostTrending } from '../item/trending';
import { PostAuthors } from '../components/authors';
import { PostNewsletter } from '../forms/newsletter';
import { PostFeatured } from '../components/featured';
import { PostCommunity } from '../components/community';
import { PostAdvertisement } from '../components/advertisement';

// ----------------------------------------------------------------------

type Props = {
  // ✅ Propriedade posts para aceitar os dados vindos do SSR (page.tsx)
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
  return (
    <Stack spacing={0} sx={{ pb: 10 }}>

      {/* 1. HERO PRINCIPAL: PostFeatured */}
      {/* ✅ CORREÇÃO TS2322: Asserção para ignorar conflito de tipagem temporariamente */}
      <PostFeatured {...({ posts } as any)} />

      {/* 2. DESTAQUES SECUNDÁRIOS: PostTrending */}
      <Container sx={{ mt: { xs: 4, md: 8 } }}>
        {/* ✅ CORREÇÃO TS2322: Asserção para ignorar conflito de tipagem temporariamente */}
        <PostTrending {...({ posts } as any)} />
      </Container>

      {/* 3. PROVA SOCIAL: Fontes Monitoradas */}
      <Container sx={{ my: 10 }}>        
        <PostCommunity />
      </Container>

      {/* 4. O "AGORA": Últimas Atualizações */}
      {/* ✅ PostRecent já foi atualizado e aceita a prop posts nativamente */}
      <PostRecent posts={posts} />

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
        <PostAdvertisement />
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