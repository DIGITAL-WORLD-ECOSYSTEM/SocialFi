// ----------------------------------------------------------------------
// Imports — tipos
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------
// Imports — react & motion
// ----------------------------------------------------------------------
import { m } from 'framer-motion';

// ----------------------------------------------------------------------
// Imports — MUI
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { HomeBackground } from './components/home-background';
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

// ----------------------------------------------------------------------

export function HomeLatestNews({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  // Dados estáticos baseados na captura de tela de referência
  const displayPosts = [
    {
      id: 'post-1',
      title: 'Lançamento da DEX V2: Mais Rápida e Segura',
      description: 'Lançamento da DEX V2: Mais Rápida e Segura lançamento da...',
      coverUrl: _mock.image.cover(4),
      createdAt: new Date().toISOString(),
      category: 'NOVOS RECURSOS',
    },
    {
      id: 'post-2',
      title: 'Parceria Estratégica com Grande Protocolo DeFi',
      description: 'Parceria Estratégica com Grande Protocolo DeFi o nosso ecossistema D...',
      coverUrl: _mock.image.cover(5),
      createdAt: new Date().toISOString(),
      category: 'PARCERIA',
    },
    {
      id: 'post-3',
      title: 'O Futuro dos NFTs e a Governança DAO',
      description: 'O Futuro dos NFTs e a provoperztade a análise de...',
      coverUrl: _mock.image.cover(6),
      createdAt: new Date().toISOString(),
      category: 'ANÁLISE DE MERCADO',
    },
  ];

  return (
    <Box
      component="section"
      sx={[
        { py: { xs: 10, md: 15 }, position: 'relative', overflow: 'hidden' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <HomeBackground section="news" />

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
            {/* COLUNA ESQUERDA */}
            <Grid>
              <SectionTitle
                caption="BLOG & ARTIGOS RECENTES"
                title="Últimas Notícias"
                txtGradient="e Atualizações"
                description="Fique por dentro das novidades, anúncios e análises do nosso ecossistema DeFi."
                sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 5 }}
              />

              <m.div variants={varFade('inUp')}>
                <Button
                  component={RouterLink}
                  href={paths.post.root}
                  color="inherit"
                  variant="outlined"
                  size="large"
                  endIcon={<Iconify icon={"solar:double-alt-arrow-right-bold-duotone" as any} />}
                  sx={{
                    borderRadius: 1.2,
                    height: 52,
                    px: 3,
                    borderWidth: 2,
                    fontWeight: 700,
                    display: { xs: 'none', md: 'inline-flex' },
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  Ver Todas as Notícias
                </Button>
              </m.div>
            </Grid>

            {/* COLUNA DIREITA – POSTS */}
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
                        textDecoration: 'none',
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        backdropFilter: 'blur(12px)',
                        border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                        transition: theme.transitions.create(['transform', 'box-shadow']),
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: `0 24px 48px -12px ${alpha(theme.palette.primary.main, 0.2)}`,
                          '& .card-image': { transform: 'scale(1.1)' },
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', pt: '66%', overflow: 'hidden' }}>
                        <Box
                          component="img"
                          className="card-image"
                          alt={post.title}
                          src={post.coverUrl}
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            width: 1,
                            height: 1,
                            objectFit: 'cover',
                            transition: theme.transitions.create('transform', {
                              duration: theme.transitions.duration.complex,
                            }),
                          }}
                        />
                      </Box>

                      <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography
                            variant="overline"
                            sx={{ color: 'info.main', fontWeight: 800, fontSize: 11 }}
                          >
                            {post.category}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                            {fDate(post.createdAt)}
                          </Typography>
                        </Stack>

                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 800,
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {post.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
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