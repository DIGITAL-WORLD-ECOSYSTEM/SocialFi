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
          
          {/* BADGE ACIMA DO ALINHAMENTO PRINCIPAL */}
          <m.div variants={varFade('inUp')}>
            <Box
              sx={{
                display: 'inline-block',
                border: `1px solid ${theme.palette.info.main}`,
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 6, // Margem aumentada para destacar e isolar o badge
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

          {/* GRID COM ALINHAMENTO STRETCH PARA SINCRONIZAR INÍCIO E FIM */}
          <Grid container spacing={6} alignItems="stretch">
            
            {/* LADO ESQUERDO: TEXTO E CTA (ALINHADOS VERTICALMENTE) */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack
                component={m.div}
                variants={varFade('inLeft')}
                justifyContent="space-between"
                sx={{ height: 1 }}
              >
                <Box>
                  <Typography
                    component="h2"
                    sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 900,
                      fontSize: { xs: '2.2rem', md: '2.8rem' },
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

                  <Typography
                    sx={{
                      mt: 3,
                      maxWidth: 460,
                      fontSize: { xs: 16, md: 18 },
                      lineHeight: 1.8,
                      color: 'text.secondary',
                      textAlign: { xs: 'justify', md: 'left' },
                    }}
                  >
                    {t('ecosystem.description')}
                  </Typography>
                </Box>

                {/* BOTÃO ALINHADO À BASE DA GRID DE CARDS */}
                <Box sx={{ mt: { xs: 6, md: 0 } }}>
                  <Button
                    component={RouterLink}
                    href={paths.dashboard.root}
                    size="large"
                    variant="outlined"
                    endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                    sx={{
                      height: 56,
                      px: 4,
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      borderRadius: 1.5,
                      color: 'common.white',
                      borderColor: 'info.main',
                      textTransform: 'uppercase',
                      transition: theme.transitions.create(['all']),
                      boxShadow: `0 0 16px ${alpha(theme.palette.info.main, 0.3)}`,
                      '&:hover': {
                        borderColor: 'common.white',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 0 24px ${alpha(theme.palette.info.main, 0.6)}`,
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                      },
                    }}
                  >
                    {t('hero.buttons.ecossistema')}
                  </Button>
                </Box>
              </Stack>
            </Grid>

            {/* LADO DIREITO: GRID DE CARDS COM EQUAL HEIGHT */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3}>
                {ITEMS.map((item) => (
                  <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
                    <m.div variants={varFade('inUp')} style={{ height: '100%' }}>
                      <Stack
                        spacing={3}
                        sx={{
                          p: 4,
                          height: 1, // Altura total preenchida para alinhamento simétrico
                          borderRadius: 2.5,
                          transition: theme.transitions.create(['transform', 'box-shadow']),
                          bgcolor: alpha(theme.palette.grey[500], 0.08),
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: `1.5px solid ${alpha(item.color, 0.3)}`,
                          boxShadow: `0 0 12px 0 ${alpha(item.color, 0.15)}`,
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 0 24px 0 ${alpha(item.color, 0.35)}`,
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
                          }}
                        >
                          <Iconify icon={item.icon as any} width={28} />
                        </Box>

                        <Typography 
                          variant="h6" 
                          fontWeight={800} 
                          sx={{ color: 'common.white' }}
                        >
                          {item.title}
                        </Typography>

                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          lineHeight={1.7}
                          sx={{ textAlign: { xs: 'justify', md: 'left' } }}
                        >
                          {item.description}
                        </Typography>
                      </Stack>
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