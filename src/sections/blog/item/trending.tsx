'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

const staticTrendingPosts = [
  {
    id: 'trend-1',
    title: 'Como a Prova de Conhecimento Zero (ZKP) está revolucionando a privacidade',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-5.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-5.webp' },
  },
  {
    id: 'trend-2',
    title: 'Adoção institucional de cripto: O que esperar em 2026?',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-6.webp',
    createdAt: new Date(),
    duration: '12 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-6.webp' },
  },
  {
    id: 'trend-3',
    title: 'NFTs Dinâmicos: A próxima evolução dos colecionáveis digitais',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-7.webp',
    createdAt: new Date(),
    duration: '8 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-7.webp' },
  },
  {
    id: 'trend-4',
    title: 'A tokenização de ativos do mundo real (RWA) e o futuro do mercado',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-8.webp',
    createdAt: new Date(),
    duration: '9 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-8.webp' },
  },
  {
    id: 'trend-5',
    title: 'BRICS e a desdolarização: O papel das moedas digitais',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-9.webp',
    createdAt: new Date(),
    duration: '11 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-9.webp' },
  },
  {
    id: 'trend-6',
    title: 'Redes de energia descentralizadas e o impacto no meio ambiente',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-10.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-10.webp' },
  },
  {
    id: 'trend-7',
    title: 'A Regulamentação da IA na União Europeia e seus impactos globais',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-11.webp',
    createdAt: new Date(),
    duration: '12 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-11.webp' },
  },
];

export function PostTrending() {
  const viewPosts = staticTrendingPosts;

  return (
    <Box sx={{ mt: 8 }}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Artigos em Alta
          </Typography>
        </Grid>

        {viewPosts.slice(0, 3).map((post, index) => (
          <Grid
            key={`${post.id}-${index}-lg`}
            sx={{ display: { xs: 'none', lg: 'block' } }}
            size={{ xs: 12, sm: 6, md: 4, lg: index === 0 ? 6 : 3 }}
          >
            <PostItemLatest post={post as any} index={index} detailsHref={paths.post.details(post.title)} />
          </Grid>
        ))}

        {viewPosts.slice(0, 3).map((post, index) => (
          <Grid
            key={`${post.id}-${index}-mb`}
            sx={{ display: { lg: 'none' } }}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          >
            <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
          </Grid>
        ))}

        {viewPosts.slice(3, 7).map((post, index) => (
          <Grid
            key={`${post.id}-${index}-rest`}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          >
            <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
