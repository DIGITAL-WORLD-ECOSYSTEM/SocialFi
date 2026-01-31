
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

const staticEconomiaPosts = [
  {
    id: 'e1',
    title: 'Bitcoin rompe barreira histórica: O que esperar para o próximo trimestre?',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-1.webp',
    createdAt: new Date(),
    duration: '8 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-1.webp' },
  },
  {
    id: 'e2',
    title: 'Inflação Global e Bitcoin: A reserva de valor definitiva?',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-2.webp',
    createdAt: new Date(),
    duration: '5 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-2.webp' },
  },
  {
    id: 'e3',
    title: 'O impacto das taxas de juros do FED no mercado cripto',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-3.webp',
    createdAt: new Date(),
    duration: '12 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-3.webp' },
  },
  {
    id: 'e4',
    title: 'Tokenização de Ativos Reais (RWA): O futuro da economia global',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-4.webp',
    createdAt: new Date(),
    duration: '7 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-4.webp' },
  },
  {
    id: 'e5',
    title: 'Dólar Digital vs. Euro Digital: A corrida das CBDCs',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-5.webp',
    createdAt: new Date(),
    duration: '9 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-5.webp' },
  },
  {
    id: 'e6',
    title: 'Análise Macro: Como a recessão técnica afeta o DeFi',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-6.webp',
    createdAt: new Date(),
    duration: '6 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-6.webp' },
  },
  {
    id: 'e7',
    title: 'A Web3 pode resolver a crise da cadeia de suprimentos global?',
    category: 'Economia',
    coverUrl: '/assets/images/mock/cover/cover-7.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-7.webp' },
  },
];

// ----------------------------------------------------------------------

export function Economia() {
  const viewPosts = staticEconomiaPosts;

  return (
    <Box
      id="economia"
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
          Economia
        </Typography>

        <Grid container spacing={3}>
          {viewPosts.slice(0, 3).map((post: any, index: number) => (
            <Grid
              key={`eco-top-${post.id}-${index}`}
              sx={{ display: { xs: 'none', lg: 'block' } }}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: index === 0 ? 6 : 3,
              }}
            >
              <PostItemLatest
                post={post}
                index={index}
                detailsHref={paths.post.details(post.title)}
              />
            </Grid>
          ))}

          {viewPosts.slice(0, 3).map((post: any, index: number) => (
            <Grid
              key={`eco-mb-${post.id}-${index}`}
              sx={{ display: { lg: 'none' } }}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <PostItem post={post} detailsHref={paths.post.details(post.title)} />
            </Grid>
          ))}

          {viewPosts.slice(3, 7).map((post: any, index: number) => (
            <Grid
              key={`eco-list-${post.id}-${index}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <PostItem post={post} detailsHref={paths.post.details(post.title)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
