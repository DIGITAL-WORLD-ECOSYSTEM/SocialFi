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
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { HomeBackground } from './components/home-background';

// ----------------------------------------------------------------------

const ROADMAP_PHASES = [
  {
    phase: 'FASE 01',
    title: 'Fundação & Compliance',
    time: 'Q3 - Q4 2023',
    description:
      'Estabelecimento da estrutura jurídica da DAO, governança institucional e registro oficial (CAR) dos primeiros produtores rurais em Paraty.',
  },
  {
    phase: 'FASE 02',
    title: 'Tokenização RWA (MVP)',
    time: 'Q1 - Q2 2024',
    description:
      'Lançamento do Identity Provider (IdP) soberano e primeira tokenização de ativos reais focada na produção de café agroecológico.',
  },
  {
    phase: 'FASE 03',
    title: 'Escala & Binance Listing',
    time: 'Q3 - Q4 2024',
    description:
      'Expansão do ecossistema de crédito agrícola via IA e submissão do processo de listagem do token de governança em exchanges globais.',
  },
  {
    phase: 'FASE 04',
    title: 'Ecossistema Global Agro',
    time: '2025+',
    description:
      'Plena integração de ativos RWA internacionais e rede global de agroecologia sustentada pela infraestrutura ASPPIBRA-DAO.',
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
      {/* INTEGRAÇÃO FASE 1: Fundo unificado configurado para o Roadmap */}
      <HomeBackground section="roadmap" />

      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 10 }}>
          <SectionTitle
            caption="NOSSA JORNADA"
            title="Roteiro do"
            txtGradient="Projeto"
            description="Nossa jornada é guiada pela transparência e pelo compromisso de levar o produtor rural para o centro da nova economia digital."
            sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}
          />

          <Grid
            container
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 64px 1fr' }}
            rowGap={8}
            columnGap={6}
          >
            {ROADMAP_PHASES.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <Grid
                  key={item.title}
                  gridColumn={{ xs: '1 / -1', md: isEven ? '1 / 2' : '3 / 4' }}
                  sx={{
                    gridRow: { md: index + 1 }
                  }}
                >
                  <m.div variants={isEven ? varFade('inLeft') : varFade('inRight')}>
                    <Card
                      sx={{
                        p: 4,
                        borderRadius: 2,
                        textAlign: { xs: 'center', md: isEven ? 'right' : 'left' },
                        // Estética Glassmorphism consistente com o tema dark/futurista
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                        boxShadow: theme.customShadows.z24,
                      }}
                    >
                      <Typography variant="overline" sx={{ color: 'info.main', fontWeight: 800 }}>
                        {item.phase} • {item.time}
                      </Typography>

                      <Typography variant="h4" sx={{ mt: 1, mb: 2, fontWeight: 800 }}>
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