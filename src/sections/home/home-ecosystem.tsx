'use client';

import type { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export function HomeEcosystem({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const ITEMS = useMemo(
    () => [
      {
        id: 'tech',
        title: 'Tecnologia de Base',
        description: 'Blockchain, IA e Web3 aplicados à digitalização de processos críticos.',
        icon: 'solar:programming-2-bold-duotone',
        color: theme.palette.primary.main,
      },
      {
        id: 'gov',
        title: 'Governança Digital',
        description: 'Identidade digital, credenciais verificáveis e rastreabilidade.',
        icon: 'solar:shield-check-bold-duotone',
        color: theme.palette.info.main,
      },
      {
        id: 'business',
        title: 'Inovação & Negócios',
        description: 'Modelos digitais escaláveis com impacto econômico e social.',
        icon: 'solar:lightbulb-bold-duotone',
        color: theme.palette.secondary.main,
      },
      {
        id: 'rwa',
        title: 'Ativos Digitais (RWA)',
        description: 'Tokenização de ativos reais conectando economia física e digital.',
        icon: 'solar:graph-up-bold-duotone',
        color: theme.palette.warning.main,
      },
    ],
    [theme]
  );

  return (
    <Box
      id="ecosystem"
      component="section"
      sx={[
        {
          position: 'relative',
          py: { xs: 12, md: 18 },
          overflow: 'hidden',
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* LADO ESQUERDO: TEXTO E CTA */}
            <Grid size={{ xs: 12, md: 5 }}>
              <m.div variants={varFade('inLeft')}>
                {/* TAG "ECOSYSTEM" */}
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
                    ECOSYSTEM
                  </Typography>
                </Box>

                {/* TÍTULO HIERÁRQUICO - CORREÇÃO DE ALINHAMENTO E QUEBRA */}
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: '2rem', md: '2.6rem' }, // Ajustado para evitar quebra excessiva no desktop
                    letterSpacing: '0.05em', // Reduzido levemente para melhor leitura
                    lineHeight: 1.1, // Quebra mais compacta e profissional
                    textTransform: 'uppercase',
                  }}
                >
                  <Box component="span" sx={{ color: 'common.white' }}>
                    INFRAESTRUTURA
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: 'text.secondary', opacity: 0.7 }}>
                    DIGITAL DE
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: 'warning.main' }}>
                    NOVA GERAÇÃO
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mt: 3,
                    maxWidth: 440, // Reduzido para forçar uma quebra de linha mais harmônica
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.8,
                    color: 'text.secondary',
                  }}
                >
                  Arquiteturas seguras e interoperáveis projetadas para escalar a governança e o impacto social na era Web3.
                </Typography>

                <Button
                  component={RouterLink}
                  href={paths.dashboard.root}
                  size="large"
                  variant="outlined"
                  endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                  sx={{
                    mt: 6,
                    height: 56,
                    px: 3,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    color: 'common.white',
                    borderColor: 'info.main',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    boxShadow: `0 0 16px ${alpha(theme.palette.info.main, 0.4)}`,
                    '&:hover': {
                      borderColor: 'common.white',
                      boxShadow: `0 0 24px ${alpha(theme.palette.info.main, 0.7)}`,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                    },
                  }}
                >
                  Explorar Órbita
                </Button>
              </m.div>
            </Grid>

            {/* LADO DIREITO: CARDS COM EFEITO GLASSMORPHISM */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3}>
                {ITEMS.map((item) => (
                  <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
                    <m.div variants={varFade('inUp')}>
                      <Stack
                        spacing={3}
                        sx={{
                          p: 4,
                          height: '100%',
                          borderRadius: 2.5,
                          transition: theme.transitions.create(['transform', 'box-shadow'], {
                            duration: theme.transitions.duration.short,
                          }),
                          bgcolor: alpha(theme.palette.grey[500], 0.08),
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: `1.5px solid ${alpha(item.color, 0.3)}`,
                          boxShadow: `0 0 12px 0 ${alpha(item.color, 0.2)}`,
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 0 24px 0 ${alpha(item.color, 0.4)}`,
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

                        <Typography variant="h6" fontWeight={800}>
                          {item.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
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