import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const ROADMAP_PHASES = [
  {
    phase: 'Fase 01',
    title: 'Fundação & Compliance',
    time: 'Q3 - Q4 2025',
    description:
      'Estabelecimento da estrutura jurídica da DAO e registro oficial dos primeiros produtores rurais de Paraty e Taquari.',
    status: 'completed',
    icon: 'solar:document-bold-duotone',
  },
  {
    phase: 'Fase 02',
    title: 'Tokenização RWA (Alpha)',
    time: 'Q1 - Q2 2026',
    description:
      'Lançamento da plataforma SocialFi e primeira tokenização de ativos reais focada na marca Café em Dobro.',
    status: 'in_progress',
    icon: 'solar:cup-first-bold-duotone',
  },
  {
    phase: 'Fase 03',
    title: 'Paraty Integrado & Expansão',
    time: 'Q3 - Q4 2026',
    description:
      'Realização do evento Paraty Integrado (16/08) e integração de crédito agrícola via IA para escala regional.',
    status: 'next',
    icon: 'solar:chart-2-bold-duotone',
  },
  {
    phase: 'Fase 04',
    title: 'Governança Global Agro',
    time: '2027+',
    description:
      'Plena descentralização dos ativos RWA internacionais sustentada pela infraestrutura tecnológica ASPPIBRA-DAO.',
    status: 'next',
    icon: 'solar:globus-bold-duotone',
  },
];

// ----------------------------------------------------------------------

export function HomeRoadmap({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container>
          <SectionTitle
            caption="Nossa Jornada"
            title="Roadmap de"
            txtGradient="Transformação"
            description="Uma trajetória guiada pela transparência e pelo compromisso de levar o produtor rural para o centro da economia digital."
            sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}
          />

          <Grid
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 64px 1fr' }}
            rowGap={10}
            columnGap={6}
            sx={{ position: 'relative', zIndex: 10 }}
          >
            {ROADMAP_PHASES.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <Grid
                  key={item.title}
                  gridColumn={{ xs: '1 / -1', md: isEven ? '1 / 2' : '3 / 4' }}
                >
                  <m.div variants={isEven ? varFade('inLeft') : varFade('inRight')}>
                    <Card
                      sx={{
                        p: 4,
                        bgcolor: 'background.paper',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: theme.customShadows.z24,
                        textAlign: { xs: 'center', md: isEven ? 'right' : 'left' },
                        ...(theme.palette.mode === 'dark' && {
                          bgcolor: alpha(theme.palette.background.neutral, 0.4),
                          backdropFilter: 'blur(10px)',
                        }),
                      }}
                    >
                      <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800 }}>
                        {item.phase} • {item.time}
                      </Typography>

                      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', lineHeight: 1.8 }}
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
