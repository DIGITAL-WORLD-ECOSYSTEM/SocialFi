'use client';

import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        left: 80,
        zIndex: 2,
        bottom: 64,
        position: 'absolute',
        transform: 'translateX(-50%)',
        display: { xs: 'none', md: 'flex' },
        '& span': { position: 'static', opacity: 0.12 },
      }}
    >
      <FloatDotIcon />
      <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
      <Box sx={{ flexGrow: 1 }} />
      <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
      <FloatDotIcon />
    </Stack>
    <FloatLine vertical sx={{ top: 0, left: 80, display: { xs: 'none', md: 'block' } }} />
  </>
);

export function HomeLatestNews({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const displayPosts = [
    {
      id: 'post-1',
      title: 'Lançamento da DEX V2: Mais Rápida e Segura',
      description: 'Aprimoramos nossa infraestrutura para garantir liquidez descentralizada e auditabilidade on-chain.',
      coverUrl: _mock.image.cover(4),
      createdAt: new Date().toISOString(),
      category: 'NOVOS RECURSOS',
    },
    {
      id: 'post-2',
      title: 'Parceria Estratégica: Agroecologia e Web3',
      description: 'Integramos produtores de café agroecológico de Paraty ao nosso ecossistema de ativos reais.',
      coverUrl: _mock.image.cover(5),
      createdAt: new Date().toISOString(),
      category: 'PARCERIA',
    },
    {
      id: 'post-3',
      title: 'O Futuro dos NFTs e a Governança DAO',
      description: 'Como a ASPPIBRA-DAO utiliza governança institucional para gerir ativos tangíveis com segurança jurídica.',
      coverUrl: _mock.image.cover(6),
      createdAt: new Date().toISOString(),
      category: 'ANÁLISE DE MERCADO',
    },
  ];

  return (
    <Box
      component="section"
      sx={[
        { 
          py: { xs: 10, md: 15 }, 
          position: 'relative', 
          overflow: 'hidden',
          bgcolor: 'transparent' 
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Grid
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '4fr 8fr' }}
            columnGap={8}
            rowGap={8}
            alignItems="center"
          >
            <Grid sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <m.div variants={varFade('inUp')}>
                {/* 💊 Pílula Padronizada (Pill Style - borderRadius: 50) */}
                <Box
                  sx={{
                    display: 'inline-block',
                    border: `1px solid ${theme.palette.info.main}`,
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    mb: 4,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'info.main',
                    }}
                  >
                    LATEST NEWS
                  </Typography>
                </Box>
              </m.div>

              <m.div variants={varFade('inUp')}>
                {/* 🖋️ Título Otimizado (Caixa Alta e Quebra Controlada) */}
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: '2.2rem', md: '3rem' },
                    letterSpacing: '0.05em',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                  }}
                >
                  <Box component="span" sx={{ color: 'common.white' }}>
                    ÚLTIMAS NOTÍCIAS
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: 'text.secondary', opacity: 0.5, mr: 1.5 }}>
                    &
                  </Box>
                  <Box component="span" sx={{ color: 'warning.main' }}>
                    ATUALIZAÇÕES
                  </Box>
                </Typography>
              </m.div>

              <m.div variants={varFade('inUp')}>
                <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, maxWidth: 420 }}>
                  Fique por dentro das novidades, anúncios e análises do ecossistema ASPPIBRA-DAO.
                </Typography>
              </m.div>

              <m.div variants={varFade('inUp')}>
                {/* ✨ Botão Neon Orbit Style */}
                <Button
                  component={RouterLink}
                  href={paths.post.root}
                  variant="outlined"
                  size="large"
                  endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                  sx={{
                    height: 56,
                    px: 3,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    textTransform: 'uppercase',
                    color: 'common.white',
                    borderColor: alpha(theme.palette.info.main, 0.3),
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    boxShadow: `0 0 12px ${alpha(theme.palette.info.main, 0.2)}, inset 0 0 8px ${alpha(theme.palette.info.main, 0.05)}`,
                    display: { xs: 'none', md: 'inline-flex' },
                    '&:hover': {
                      borderColor: 'info.main',
                      bgcolor: alpha(theme.palette.info.main, 0.15),
                      boxShadow: `0 0 25px ${alpha(theme.palette.info.main, 0.5)}`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Ver Tudo
                </Button>
              </m.div>
            </Grid>

            {/* GRID DE POSTS */}
            <Grid>
              <Grid
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }}
                gap={3}
              >
                {displayPosts.map((post, index) => (
                  <m.div
                    key={post.id}
                    variants={varFade('inUp')}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.grey[500], 0.08),
                        backdropFilter: 'blur(16px)',
                        border: `solid 1px ${alpha(theme.palette.primary.main, 0.15)}`,
                        transition: theme.transitions.create(['transform', 'box-shadow']),
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: `0 24px 48px -12px ${alpha(theme.palette.primary.main, 0.25)}`,
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', pt: '66%', overflow: 'hidden' }}>
                        <Box
                          component="img"
                          alt={post.title}
                          src={post.coverUrl}
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            width: 1,
                            height: 1,
                            objectFit: 'cover',
                          }}
                        />
                      </Box>

                      <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="overline" sx={{ color: 'info.main', fontWeight: 800, fontSize: 11 }}>
                            {post.category}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                            {fDate(post.createdAt)}
                          </Typography>
                        </Stack>

                        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.4, color: 'common.white' }}>
                          {post.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                          {post.description}
                        </Typography>
                      </Stack>
                    </Card>
                  </m.div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}