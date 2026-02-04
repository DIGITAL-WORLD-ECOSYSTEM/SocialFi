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

import { SectionTitle } from './components/section-title';
import { HomeBackground } from './components/home-background';

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
        { position: 'relative', py: { xs: 12, md: 18 }, overflow: 'hidden' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <HomeBackground section="ecosystem" />

      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6}>
            
            {/* LADO ESQUERDO: TEXTO E CTA */}
            <Grid size={{ xs: 12, md: 5 }}>
              <m.div variants={varFade('inLeft')}>
                <SectionTitle
                  caption="Ecossistema Tecnológico"
                  title="Infraestrutura Digital"
                  txtGradient="de Nova Geração"
                />
                <Typography
                  sx={{
                    mt: 3,
                    maxWidth: 460,
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.8,
                    color: 'text.secondary',
                  }}
                >
                  Arquiteturas digitais seguras, escaláveis e interoperáveis para inovação, governança e impacto social.
                </Typography>
                
                <Button
                  component={RouterLink}
                  href={paths.dashboard.root}
                  size="large"
                  variant="contained"
                  color="inherit"
                  /* CORREÇÃO TS: 'as any' para ignorar restrição de string do Iconify */
                  endIcon={<Iconify icon={"solar:arrow-right-bold" as any} />}
                  sx={{
                    mt: 6,
                    height: 56,
                    px: 4,
                    fontWeight: 700,
                    borderRadius: 1.5,
                    boxShadow: theme.customShadows.z12,
                  }}
                >
                  Explorar Ecossistema
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
                          p: '1.5px', // Espessura da borda brilhante
                          borderRadius: 2.5,
                          height: '100%',
                          overflow: 'hidden',
                          display: 'flex',
                          transition: theme.transitions.create('transform'),
                          '&:hover': { 
                            transform: 'translateY(-8px)',
                            '& .shine-layer': { animationDuration: '2s' } // Acelera ao passar o mouse
                          },
                        }}
                      >
                        {/* CAMADA 1: O BRILHO ROTATIVO (Fundo) */}
                        <Box
                          className="shine-layer"
                          sx={{
                            inset: '-50%', // Expande para cobrir as bordas ao rotacionar
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

                        {/* CAMADA 2: CONTEÚDO DO CARD (Sobreposto) */}
                        <Stack
                          spacing={3}
                          sx={{
                            p: 4,
                            width: 1,
                            zIndex: 1,
                            borderRadius: 'inherit',
                            bgcolor: alpha(theme.palette.background.paper, 0.92),
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
                            {/* CORREÇÃO TS: 'as any' no mapeamento dinâmico */}
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