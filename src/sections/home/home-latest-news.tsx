import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';
import { useGetPosts } from 'src/actions/blog';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
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

  const { posts, postsLoading } = useGetPosts();
  const hasPosts = posts && posts.length > 0;

  const displayPosts = hasPosts
    ? posts.slice(0, 3)
    : Array.from({ length: 3 }).map((_, index) => ({
        id: `fallback-${index}`,
        title: 'Monitoramento RWA e Governança',
        description:
          'Acompanhe as últimas atualizações sobre a tokenização agrícola em Paraty.',
        coverUrl: _mock.image.cover(index + 4),
        createdAt: new Date().toISOString(),
        category: 'Blockchain',
      }));

  return (
    <Box
      component="section"
      sx={[
        { py: { xs: 10, md: 15 }, position: 'relative' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          {/* GRID PRINCIPAL */}
          <Grid
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '4fr 8fr' }}
            columnGap={8}
            rowGap={8}
          >
            {/* COLUNA ESQUERDA */}
            <Grid>
              <SectionTitle
                caption={t('home.latest_news.caption') || 'News Feed'}
                title={t('home.latest_news.title') || 'Últimas da'}
                txtGradient={t('home.latest_news.txt_gradient') || 'Comunidade'}
                description={
                  t('home.latest_news.description') ||
                  'Fique por dentro das movimentações do ecossistema ASPPIBRA-DAO e do mercado RWA.'
                }
                sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 5 }}
              />

              <m.div variants={varFade('inUp')}>
                <Button
                  component={RouterLink}
                  href={paths.post.root}
                  color="inherit"
                  variant="outlined"
                  size="large"
                  endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                  sx={{
                    borderRadius: 1.2,
                    height: 52,
                    px: 3,
                    display: { xs: 'none', md: 'inline-flex' },
                  }}
                >
                  {t('home.latest_news.view_all') || 'Ver todas'}
                </Button>
              </m.div>
            </Grid>

            {/* COLUNA DIREITA – POSTS */}
            <Grid>
              <Grid
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }}
                gap={3}
              >
                {postsLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          height: 320,
                          borderRadius: 2,
                          bgcolor: 'action.hover',
                          animation: 'pulse 1.5s ease-in-out infinite',
                        }}
                      />
                    ))
                  : displayPosts.map((post: any, index: number) => (
                      <m.div
                        key={post.id}
                        variants={varFade('inUp')}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          component={RouterLink}
                          href={hasPosts ? paths.post.details(post.title) : '#'}
                          sx={{
                            height: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            textDecoration: 'none',
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            border: `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
                            transition: theme.transitions.create([
                              'transform',
                              'box-shadow',
                            ]),
                            '&:hover': {
                              transform: 'translateY(-12px)',
                              boxShadow: theme.customShadows.z24,
                              '& .card-image': { transform: 'scale(1.15)' },
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
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography
                                variant="overline"
                                sx={{ color: 'primary.main', fontWeight: 800 }}
                              >
                                {post.category || 'DEX World'}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                {fDate(post.createdAt)}
                              </Typography>
                            </Stack>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
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
