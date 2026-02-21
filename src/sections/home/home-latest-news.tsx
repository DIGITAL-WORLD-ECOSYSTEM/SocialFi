'use client';

// ----------------------------------------------------------------------
// Imports — tipos e react/motion
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';

import { useMemo } from 'react';
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
// Imports — App
// ----------------------------------------------------------------------
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useTranslate } from 'src/locales';

import { fDate } from 'src/utils/format-time';
import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function HomeLatestNews({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const displayPosts = useMemo(() => [
    {
      id: 'post-1',
      title: t('news.posts.post1.title'),
      description: t('news.posts.post1.description'),
      coverUrl: _mock.image.cover(4),
      createdAt: new Date().toISOString(),
      category: t('news.posts.post1.category'),
    },
    {
      id: 'post-2',
      title: t('news.posts.post2.title'),
      description: t('news.posts.post2.description'),
      coverUrl: _mock.image.cover(5),
      createdAt: new Date().toISOString(),
      category: t('news.posts.post2.category'),
    },
    {
      id: 'post-3',
      title: t('news.posts.post3.title'),
      description: t('news.posts.post3.description'),
      coverUrl: _mock.image.cover(6),
      createdAt: new Date().toISOString(),
      category: t('news.posts.post3.category'),
    },
  ], [t]);

  return (
    <Box
      component="section"
      sx={[
        { 
          py: { xs: 8, md: 15 }, 
          position: 'relative', 
          overflow: 'hidden',
          bgcolor: 'transparent' 
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Grid container spacing={8} alignItems="center">
            
            {/* COLUNA DE TEXTO - Utilizando 'size' para evitar erros de TypeScript */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <m.div variants={varFade('inUp')}>
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
                    {t('news.badge')}
                  </Typography>
                </Box>
              </m.div>

              <m.div variants={varFade('inUp')}>
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
                    {t('news.title')}
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: alpha(theme.palette.common.white, 0.5), mr: 1.5 }}>
                    {t('news.title_bridge')}
                  </Box>
                  <Box component="span" sx={{ color: 'warning.main' }}>
                    {t('news.title_highlight')}
                  </Box>
                </Typography>
              </m.div>

              <m.div variants={varFade('inUp')}>
                <Typography 
                  sx={{ 
                    mt: 3, 
                    mb: 5, 
                    color: 'text.secondary', 
                    fontSize: { xs: 16, md: 18 }, 
                    lineHeight: 1.8, 
                    maxWidth: 420,
                    textAlign: { xs: 'justify', md: 'left' }
                  }}
                >
                  {t('news.description')}
                </Typography>
              </m.div>

              <m.div variants={varFade('inUp')}>
                <Button
                  component={RouterLink}
                  href={paths.post.root}
                  variant="outlined"
                  size="large"
                  endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                  sx={{
                    height: 56,
                    px: 4,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    textTransform: 'uppercase',
                    color: 'common.white',
                    borderColor: alpha(theme.palette.info.main, 0.3),
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    boxShadow: `0 0 12px ${alpha(theme.palette.info.main, 0.2)}`,
                    '&:hover': {
                      borderColor: 'info.main',
                      bgcolor: alpha(theme.palette.info.main, 0.15),
                      boxShadow: `0 0 25px ${alpha(theme.palette.info.main, 0.5)}`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {t('news.button_view_all')}
                </Button>
              </m.div>
            </Grid>

            {/* GRID DE POSTS - Utilizando 'size' para evitar erros de TypeScript */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={3}>
                {displayPosts.map((post, index) => (
                  <Grid key={post.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <m.div
                      variants={varFade('inUp')}
                      transition={{ delay: index * 0.1 }}
                      style={{ height: '100%' }}
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

                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, textAlign: 'justify' }}>
                            {post.description}
                          </Typography>
                        </Stack>
                      </Card>
                    </m.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}