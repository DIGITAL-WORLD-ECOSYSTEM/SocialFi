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

                {/* TÍTULO HIERÁRQUICO */}
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    letterSpacing: '0.08em',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  <Box component="span" sx={{ color: 'common.white' }}>
                    INFRAESTRUTURA
                  </Box>
                  <br />
                  <Box component="span" sx={{ color: 'text.secondary' }}>
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
                    maxWidth: 460,
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
                  endIcon={<Iconify icon="solar:arrow-right-bold" />}
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

            {/* LADO DIREITO: CARDS COM SHINE BORDER */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3}>
                {ITEMS.map((item) => (
                  <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
                    <m.div variants={varFade('inUp')}>
                      <Box
                        sx={{
                          position: 'relative',
                          p: '1.5px',
                          borderRadius: 2.5,
                          height: '100%',
                          overflow: 'hidden',
                          display: 'flex',
                          transition: theme.transitions.create('transform'),
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            '& .shine-layer': { animationDuration: '2s' },
                          },
                        }}
                      >
                        <Box
                          className="shine-layer"
                          sx={{
                            inset: '-50%',
                            zIndex: 0,
                            position: 'absolute',
                            background: `conic-gradient(from 0deg, transparent 0%, ${item.color} 15%, transparent 30%, ${alpha(item.color, 0.5)} 50%, transparent 100%)`,
                            animation: 'rotate-shine 4s linear infinite',
                            '@keyframes rotate-shine': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' },
                            },
                          }}
                        />

                        <Stack
                          spacing={3}
                          sx={{
                            p: 4,
                            width: 1,
                            zIndex: 1,
                            borderRadius: 'inherit',
                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
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
                      </Box>
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
