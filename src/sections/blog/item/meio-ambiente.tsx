'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

const staticMeioAmbientePosts = [
  {
    id: 'm1',
    title: 'DeFi e Créditos de Carbono: Uma Nova Economia Verde',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-15.webp',
    createdAt: new Date(),
    duration: '12 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-15.webp' },
  },
  {
    id: 'm2',
    title: 'Rastreabilidade de Cadeias de Suprimentos com Blockchain',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-16.webp',
    createdAt: new Date(),
    duration: '8 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-16.webp' },
  },
  {
    id: 'm3',
    title: 'Tokenização de Ativos Ambientais na Amazônia',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-17.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-17.webp' },
  },
  {
    id: 'm4',
    title: 'Como a IoT está ajudando a monitorar a qualidade do ar',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-18.webp',
    createdAt: new Date(),
    duration: '7 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-18.webp' },
  },
  {
    id: 'm5',
    title: 'Energias Renováveis e Redes de Energia Descentralizadas',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-19.webp',
    createdAt: new Date(),
    duration: '9 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-19.webp' },
  },
    {
    id: 'm6',
    title: 'O Futuro da Agricultura Sustentável com Drones e Blockchain',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-20.webp',
    createdAt: new Date(),
    duration: '11 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-20.webp' },
  },
  {
    id: 'm7',
    title: 'Cidades Inteligentes: Como a tecnologia pode reduzir o impacto ambiental',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/mock/cover/cover-21.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-21.webp' },
  },
];

// ----------------------------------------------------------------------

export function MeioAmbiente() {
  const viewPosts = staticMeioAmbientePosts;

  return (
    <Box
      id="meio-ambiente"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.neutral',
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            mb: 8,
            textAlign: 'center',
          }}
        >
          Meio Ambiente
        </Typography>

        <Grid container spacing={3}>
          {viewPosts.slice(0, 3).map((post, index) => (
            <Grid
              key={`env-top-${post.id}-${index}`}
              sx={{ display: { xs: 'none', lg: 'block' } }}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: index === 0 ? 6 : 3,
              }}
            >
              <PostItemLatest post={post as any} index={index} detailsHref={paths.post.details(post.title)} />
            </Grid>
          ))}

          {viewPosts.slice(0, 3).map((post, index) => (
            <Grid
              key={`env-mb-${post.id}-${index}`}
              sx={{ display: { lg: 'none' } }}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
            </Grid>
          ))}

          {viewPosts.slice(3, 7).map((post, index) => (
            <Grid
              key={`env-list-${post.id}-${index}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
