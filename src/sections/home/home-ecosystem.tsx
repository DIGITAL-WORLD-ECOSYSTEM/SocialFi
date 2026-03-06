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

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function HomeEcosystem({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const ITEMS = useMemo(
    () => [
      {
        id: 'tech',
        title: t('ecosystem.items.tech.title'),
        description: t('ecosystem.items.tech.description'),
        icon: 'solar:programming-2-bold-duotone',
        color: theme.palette.primary.main,
      },
      {
        id: 'gov',
        title: t('ecosystem.items.gov.title'),
        description: t('ecosystem.items.gov.description'),
        icon: 'solar:shield-check-bold-duotone',
        color: theme.palette.info.main,
      },
      {
        id: 'business',
        title: t('ecosystem.items.business.title'),
        description: t('ecosystem.items.business.description'),
        icon: 'solar:lightbulb-bold-duotone',
        color: theme.palette.secondary.main,
      },
      {
        id: 'rwa',
        title: t('ecosystem.items.rwa.title'),
        description: t('ecosystem.items.rwa.description'),
        icon: 'solar:graph-up-bold-duotone',
        color: theme.palette.warning.main,
      },
    ],
    [theme, t]
  );

  return (
    <Box
      id="ecosystem"
      component="section"
      sx={[
        {
          position: 'relative',
          py: { xs: 8, md: 15 },
          overflow: 'hidden',
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          
          {/* HEADER COM TÍTULO E BOTÃO NA EXTREMIDADE DIREITA */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ md: 'flex-end' }}
            justifyContent="space-between"
            sx={{ mb: 10, gap: 3 }}
          >
            <Box>
              <m.div variants={varFade('inUp')}>
                <Box
                  sx={{
                    display: 'inline-block',
                    border: `1px solid ${theme.palette.info.main}`,
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    mb: 4,
                    boxShadow: `0 0 12px ${alpha(theme.palette.info.main, 0.3)}`,
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
                    {t('ecosystem.badge') || 'ECOSYSTEM'}
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
                    {t('ecosystem.title')}
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: alpha(theme.palette.common.white, 0.5) }}>
                    {t('ecosystem.title_bridge')}
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: 'warning.main' }}>
                    {t('ecosystem.title_highlight')}
                  </Box>
                </Typography>
              </m.div>
            </Box>

            <m.div variants={varFade('inRight')}>
              <Button
                component={RouterLink}
                href={paths.dashboard.root}
                variant="outlined"
                endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                sx={{
                  height: 56,
                  px: 4,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  borderRadius: 1.5,
                  color: 'common.white',
                  borderColor: alpha(theme.palette.info.main, 0.3),
                  textTransform: 'uppercase',
                  '&:hover': {
                    borderColor: 'info.main',
                    boxShadow: `0 0 15px ${alpha(theme.palette.info.main, 0.4)}`,
                    bgcolor: alpha(theme.palette.info.main, 0.08),
                  },
                }}
              >
                {t('hero.buttons.ecossistema')}
              </Button>
            </m.div>
          </Stack>

          {/* GRID DE CARDS COM BORDAS NEON ESPECÍFICAS POR ITEM */}
          <Grid container spacing={3}>
            {ITEMS.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <m.div variants={varFade('inUp')} style={{ height: '100%' }}>
                  <Stack
                    spacing={3}
                    sx={{
                      p: 4,
                      height: 1,
                      borderRadius: 2.5,
                      bgcolor: alpha(theme.palette.grey[500], 0.08),
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      // BORDAS NEON DINÂMICAS POR ITEM
                      border: `1.5px solid ${alpha(item.color, 0.25)}`,
                      boxShadow: `0 0 12px 0 ${alpha(item.color, 0.1)}`,
                      transition: theme.transitions.create(['all']),
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: item.color,
                        boxShadow: `0 0 20px 0 ${alpha(item.color, 0.4)}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        bgcolor: alpha(item.color, 0.12),
                        border: `1px solid ${alpha(item.color, 0.3)}`,
                      }}
                    >
                      <Iconify icon={item.icon as any} width={28} />
                    </Box>

                    <Typography 
                      variant="h6" 
                      fontWeight={800} 
                      sx={{ color: 'common.white', fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {item.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      lineHeight={1.7}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}