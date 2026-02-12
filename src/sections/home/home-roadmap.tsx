'use client';

import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { varFade, MotionViewport } from 'src/components/animate';

type RoadmapPhase = {
  phase: string;
  time: string;
  title: string;
  description: string;
  color: 'info' | 'secondary' | 'error' | 'warning';
};

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 'FASE 01',
    time: 'Q1-Q2 2024',
    title: 'Fundação & Compliance',
    description:
      'Estabelecimento da estrutura jurídica da DAO, governança institucional e registro oficial (CAR) dos primeiros produtores rurais em Paraty.',
    color: 'info',
  },
  {
    phase: 'FASE 02',
    time: 'Q3-Q4 2024',
    title: 'Tokenização RWA (MVP)',
    description:
      'Lançamento do Identity Provider (IdP) soberano e primeira tokenização de ativos reais focada na produção de café agroecológico.',
    color: 'secondary',
  },
  {
    phase: 'FASE 03',
    time: 'Q1-Q2 2025',
    title: 'Escala & Binance Listing',
    description:
      'Expansão do ecossistema de crédito agrícola via IA e submissão do processo de listagem do token de governança em exchanges globais.',
    color: 'error',
  },
  {
    phase: 'FASE 04',
    time: '2025+',
    title: 'Ecossistema Global Agro',
    description:
      'Plena integração de ativos RWA internacionais e rede global de agroecologia sustentada pela infraestrutura ASPPIBRA-DAO.',
    color: 'warning',
  },
];

export function HomeRoadmap({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  return (
    <Box
      id="roadmap"
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          {/* Badge */}
          <m.div variants={varFade('inUp')}>
            <Box
              sx={{
                display: 'inline-block',
                border: `1px solid ${theme.palette.info.main}`,
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 5,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'info.main',
                }}
              >
                ROADMAP
              </Typography>
            </Box>
          </m.div>

          {/* Title */}
          <m.div variants={varFade('inUp')}>
            <Typography
              component="h2"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: { xs: '2.2rem', md: '3rem' },
                letterSpacing: '0.08em',
                lineHeight: 1.2,
                textTransform: 'uppercase',
              }}
            >
              <Box component="span" sx={{ color: 'common.white' }}>
                ROTEIRO DO
              </Box>
              <Box component="span" sx={{ color: 'warning.main', ml: 1.5 }}>
                PROJETO
              </Box>
            </Typography>
          </m.div>

          {/* Subtitle */}
          <m.div variants={varFade('inUp')}>
            <Typography
              sx={{
                mt: 3,
                mx: 'auto',
                maxWidth: 560,
                fontFamily: "'Inter', 'Roboto', sans-serif",
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.7,
                color: alpha(theme.palette.common.white, 0.75),
              }}
            >
              Nossa jornada é guiada pela transparência e pelo compromisso de levar o produtor rural para o centro da nova economia digital.
            </Typography>
          </m.div>

          {/* Phases */}
          <Grid
            container
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 64px 1fr' }}
            rowGap={{ xs: 6, md: 8 }}
            columnGap={6}
            sx={{ mt: { xs: 8, md: 10 } }}
          >
            {ROADMAP_PHASES.map((item, index) => {
              const isEven = index % 2 === 0;
              const cardColor = theme.palette[item.color].main;

              return (
                <Grid
                  key={item.title}
                  gridColumn={{ xs: '1 / -1', md: isEven ? '1 / 2' : '3 / 4' }}
                  gridRow={{ md: index + 1 }}
                  sx={{ textAlign: { xs: 'center', md: isEven ? 'right' : 'left' } }}
                >
                  <m.div variants={isEven ? varFade('inRight') : varFade('inLeft')}>
                    <Card
                      sx={{
                        p: 4,
                        borderRadius: 2,
                        display: 'inline-block',
                        width: { xs: '100%', md: 'auto' },
                        maxWidth: 400,
                        border: `1px solid ${cardColor}`,
                        boxShadow: `0 0 24px ${alpha(cardColor, 0.4)}`,
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        bgcolor: alpha(theme.palette.grey[900], 0.2),
                      }}
                    >
                      {/* Phase + Time */}
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: cardColor,
                        }}
                      >
                        {item.phase} • {item.time}
                      </Typography>

                      {/* Title */}
                      <Typography
                        component="h3"
                        sx={{
                          mt: 1,
                          mb: 2,
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 800,
                          fontSize: { xs: 18, md: 20 },
                          letterSpacing: '0.04em',
                          color: 'common.white',
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          fontSize: 15,
                          lineHeight: 1.75,
                          color: alpha(theme.palette.common.white, 0.75),
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Card>
                  </m.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}