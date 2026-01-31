'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

const staticGeopoliticaPosts = [
  {
    id: 'g1',
    title: 'Guerra Fria 2.0: A disputa pela supremacia em semicondutores',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-22.webp',
    createdAt: new Date(),
    duration: '15 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-22.webp' },
  },
  {
    id: 'g2',
    title: 'A ascensão do Sul Global e o novo equilíbrio de poder',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-23.webp',
    createdAt: new Date(),
    duration: '12 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-23.webp' },
  },
  {
    id: 'g3',
    title: 'CBDCs: A nova fronteira da soberania monetária digital',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-24.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-24.webp' },
  },
  {
    id: 'g4',
    title: 'Regulação de Criptoativos: O embate entre EUA, Europa e Ásia',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-1.webp',
    createdAt: new Date(),
    duration: '8 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-1.webp' },
  },
  {
    id: 'g5',
    title: 'A influência da China na infraestrutura digital da África',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-2.webp',
    createdAt: new Date(),
    duration: '9 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-2.webp' },
  },
  {
    id: 'g6',
    title: 'A corrida espacial do século 21 e a mineração de asteroides',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-3.webp',
    createdAt: new Date(),
    duration: '11 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-3.webp' },
  },
  {
    id: 'g7',
    title: 'Sanções econômicas e o papel do Bitcoin como ativo de refúgio',
    category: 'Geopolítica',
    coverUrl: '/assets/images/mock/cover/cover-4.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-4.webp' },
  },
];

// ----------------------------------------------------------------------

export function Geopolitica() {
  const viewPosts = staticGeopoliticaPosts;

  return (
    <Box
      id="geopolitica"
      sx={{
        py: { xs: 8, md: 10 },
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
          Geopolítica
        </Typography>

        <Grid container spacing={3}>
          {viewPosts.slice(0, 3).map((post, index) => (
            <Grid
              key={`geo-top-${post.id}-${index}`}
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
              key={`geo-mb-${post.id}-${index}`}
              sx={{ display: { lg: 'none' } }}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
            </Grid>
          ))}

          {viewPosts.slice(3, 7).map((post, index) => (
            <Grid
              key={`geo-list-${post.id}-${index}`}
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
