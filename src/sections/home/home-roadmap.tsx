'use client';

// ----------------------------------------------------------------------
// Imports — tipos e motion
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';
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

// ✅ REMOVIDO: HomeBackground não é mais necessário aqui pois já está centralizado no HomeView

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
      id="roadmap"
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          // ✅ GARANTINDO TRANSPARÊNCIA: Essencial para ver o fundo unificado
          bgcolor: 'transparent', 
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* ✅ LINHA REMOVIDA: <HomeBackground section="roadmap" /> */}

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
                    <Box
                      sx={{
                        position: 'relative',
                        p: '2px', 
                        borderRadius: 2,
                        overflow: 'hidden',
                        display: 'flex',
                        transition: theme.transitions.create('transform'),
                        '&:hover': { 
                          transform: 'translateY(-8px)',
                          '& .roadmap-shine': { animationDuration: '3s' } 
                        },
                      }}
                    >
                      <Box
                        className="roadmap-shine"
                        sx={{
                          inset: '-50%',
                          zIndex: 0,
                          position: 'absolute',
                          background: `conic-gradient(from 0deg, transparent 0%, #00FFCC 15%, transparent 30%, #7A5AF8 50%, transparent 100%)`,
                          animation: 'rotate-shine 6s linear infinite',
                          '@keyframes rotate-shine': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }}
                      />

                      <Card
                        sx={{
                          p: 4,
                          width: 1,
                          zIndex: 1,
                          borderRadius: 'inherit',
                          textAlign: { xs: 'center', md: isEven ? 'right' : 'left' },
                          // ✅ VIDRO LÍQUIDO: Transparência ajustada para mostrar o Vortex 3D
                          bgcolor: alpha(theme.palette.background.paper, 0.85),
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
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
                    </Box>
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