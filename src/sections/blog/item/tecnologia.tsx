'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { varFade, MotionViewport } from 'src/components/animate';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

const staticTecnologiaPosts = [
  {
    id: 't1',
    title: 'Análise: Por que a Layer 2 da Ethereum está dominando o mercado?',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-8.webp',
    createdAt: new Date(),
    duration: '10 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-8.webp' },
  },
  {
    id: 't2',
    title: 'Solana vs. Aptos: A batalha pela escalabilidade em tempo real',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-9.webp',
    createdAt: new Date(),
    duration: '7 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-9.webp' },
  },
  {
    id: 't3',
    title: 'Entenda o algoritmo de consenso da nova rede modular Celestia',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-10.webp',
    createdAt: new Date(),
    duration: '15 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-10.webp' },
  },
  {
    id: 't4',
    title: 'Tutorial: Criando seu primeiro bot de trading na rede Arbitrum',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-11.webp',
    createdAt: new Date(),
    duration: '9 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-11.webp' },
  },
  {
    id: 't5',
    title: 'Inteligência Artificial e Blockchain: A convergência de 2026',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-12.webp',
    createdAt: new Date(),
    duration: '11 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-12.webp' },
  },
  {
    id: 't6',
    title: 'Segurança em Smart Contracts: Novas ferramentas de auditoria',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-13.webp',
    createdAt: new Date(),
    duration: '8 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-13.webp' },
  },
  {
    id: 't7',
    title: 'WebAssembly (WASM) e o Futuro dos Contratos Inteligentes',
    category: 'Tecnologia',
    coverUrl: '/assets/images/mock/cover/cover-14.webp',
    createdAt: new Date(),
    duration: '6 min de leitura',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-14.webp' },
  },
];

// ----------------------------------------------------------------------

export function Tecnologia() {
  const theme = useTheme();
  const viewPosts = staticTecnologiaPosts;

  return (
    <Box
      id="tecnologia"
      component="section"
      sx={{
        position: 'relative',
        bgcolor: 'transparent', // 1. TRANSPARÊNCIA ESTRATÉGICA
        py: { xs: 10, md: 15 },
        overflow: 'hidden',
      }}
    >
      <Container component={MotionViewport}>
        {/* Título com Estética Orbitron e Glow */}
        <m.div variants={varFade('inDown')}>
          <Typography
            variant="h2"
            sx={{
              mb: 8,
              textAlign: 'center',
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'common.white',
              textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            Tecnologia
          </Typography>
        </m.div>

        <Grid container spacing={4}>
          {/* Desktop: Destaques (Primeiros 3) */}
          {viewPosts.slice(0, 3).map((post, index) => (
            <Grid
              key={`tec-top-${post.id}-${index}`}
              sx={{ display: { xs: 'none', lg: 'block' } }}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: index === 0 ? 6 : 3,
              }}
            >
              <m.div variants={varFade('inUp')}>
                <PostItemLatest
                  post={post as any}
                  index={index}
                  detailsHref={paths.post.details(post.title)}
                />
              </m.div>
            </Grid>
          ))}
          
          {/* Mobile/Tablet: Destaques (Primeiros 3) */}
          {viewPosts.slice(0, 3).map((post, index) => (
            <Grid
              key={`tec-mb-${post.id}-${index}`}
              sx={{ display: { lg: 'none' } }}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <m.div variants={varFade('inUp')}>
                <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
              </m.div>
            </Grid>
          ))}

          {/* Lista Restante (Posts 4 a 7) */}
          {viewPosts.slice(3, 7).map((post, index) => (
            <Grid
              key={`tec-list-${post.id}-${index}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <m.div variants={varFade('inUp')}>
                <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}