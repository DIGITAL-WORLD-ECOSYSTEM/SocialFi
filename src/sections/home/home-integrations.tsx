'use client';

// Importação de tipos para integridade com o componente 3D
import type { ArcData } from 'src/components/threeglobe/globe';

import { m } from 'framer-motion';
import dynamic from 'next/dynamic';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box, { type BoxProps } from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const World = dynamic(() => import('src/components/threeglobe/globe').then((mod) => mod.World), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ opacity: 0.1, fontFamily: "'Orbitron', sans-serif" }}>
        INITIALIZING HUD...
      </Typography>
    </Box>
  ),
});

// ----------------------------------------------------------------------

export function HomeIntegrations({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 8, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {/* Container principal (Margens alinhadas ao Menu) */}
        <Container maxWidth="lg" sx={{ position: 'relative', minHeight: { md: 950 } }}>
          
          {/* 1. Cabeçalho Centralizado com o Badge reinserido */}
          <SectionHeader t={t} />

          {/* Área de Visualização Técnica */}
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 700, md: 800 }, mt: 5 }}>
            
            {/* 2. Camada do Globo: Centralização Matemática */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '100%', md: 1100 }, 
                height: 800,
                zIndex: 1,
                pointerEvents: 'none', 
                filter: `drop-shadow(0 0 60px ${alpha(theme.palette.primary.main, 0.1)})`,
              }}
            >
              <World 
                data={SAMPLE_ARCS} 
                globeConfig={{
                  autoRotate: true,
                  autoRotateSpeed: 0.8,
                  globeColor: '#020617'
                }} 
              />
            </Box>

            {/* 3. Camada HUD: Cards com expansão interna (380px) sobrepondo o globo */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              {/* Cards Superiores */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ width: '100%' }}>
                <DataPanel
                  title={t('integrations.panels.chain.title') || 'ESTADO_DA_CHAIN'}
                  label="BLOCKCHAIN_LEDGER"
                  side="left"
                  metrics={[
                    { label: 'ÚLTIMO BLOCO', value: '#8,142,002' },
                    { label: 'CONSENSO', value: 'P-NEURAL OK', color: 'info.main' },
                  ]}
                />
                <DataPanel
                  title={t('integrations.panels.power.title') || 'PODER DE CÁLCULO'}
                  label="BLOCKCHAIN_MINING"
                  side="right"
                  metrics={[
                    { label: 'HASH_RATE', value: '1.36 EB/s', color: 'warning.main' },
                    { label: 'TPS', value: '14,200' },
                  ]}
                />
              </Stack>

              {/* Cards Inferiores */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ width: '100%' }}>
                <DataPanel
                  title={t('integrations.panels.network.title') || 'CONSOLA_DE_REDE'}
                  label="NETWORK_TRAFFIC"
                  side="left"
                  metrics={[
                    { label: 'ENCRYPTION', value: 'UDP_SECURE' },
                    { label: 'KEY', value: 'QUANTUM_ROT', color: 'info.main' },
                  ]}
                />
                <DataPanel
                  title={t('integrations.panels.latency.title') || 'LATÊNCIA GLOBAL'}
                  label="NETWORK_TOPOLOGY"
                  side="right"
                  metrics={[
                    { label: 'AVG PING', value: '10 ms', color: 'info.main' },
                    { label: 'UPSTREAM', value: '1.2 Tbps' },
                  ]}
                />
              </Stack>
            </Box>
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

function SectionHeader({ t }: { t: any }) {
  const theme = useTheme();

  return (
    <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center' }}>
      {/* BADGE REINSERIDO - Conforme imagem original */}
      <m.div variants={varFade('inUp')}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            borderRadius: 50, // Estilo pílula conforme imagem
            border: `1px solid ${theme.palette.info.main}`,
            bgcolor: alpha(theme.palette.info.main, 0.1),
            backdropFilter: 'blur(10px)',
            mb: 2
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'info.main',
            }}
          >
            {t('integrations.badge') || 'CONECTIVIDADE'}
          </Typography>
        </Box>
      </m.div>

      {/* TÍTULO PRINCIPAL */}
      <m.div variants={varFade('inUp')}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            lineHeight: 1.1,
            textTransform: 'uppercase',
            fontSize: { xs: '2rem', md: '3.5rem' }
          }}
        >
          SISTEMA DE <br />
          <Box component="span" sx={{ color: alpha(theme.palette.common.white, 0.6) }}>
            REDE E ATIVOS
          </Box>
          <br />
          <Box component="span" sx={{ color: 'warning.main' }}>
            GLOBAL
          </Box>
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function DataPanel({ title, label, metrics, side, sx }: any) {
  const theme = useTheme();

  return (
    <Box
      component={m.div}
      variants={varFade(side === 'left' ? 'inLeft' : 'inRight')}
      sx={{
        width: { xs: 1, md: 380 }, // Largura aumentada para sobrepor o globo
        minHeight: 200, 
        p: 3, 
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        pointerEvents: 'auto',
        borderLeft: side === 'left' ? `3px solid ${theme.palette.info.main}` : 'none',
        borderRight: side === 'right' ? `3px solid ${theme.palette.info.main}` : 'none',
        bgcolor: alpha(theme.palette.grey[900], 0.45),
        backdropFilter: 'blur(16px)',
        borderTop: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        boxShadow: `0 25px 50px ${alpha(theme.palette.common.black, 0.5)}`,
        ...sx,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Typography 
          variant="caption" 
          sx={{ color: 'info.main', fontWeight: 800, fontSize: 11, letterSpacing: 1.5, fontFamily: "'Orbitron', sans-serif" }}
        >
          {label}
        </Typography>
        <Box 
          sx={{ 
            width: 8, height: 8, borderRadius: '50%', bgcolor: 'info.main', 
            boxShadow: `0 0 10px ${theme.palette.info.main}`
          }} 
        />
      </Stack>

      <Typography 
        variant="subtitle1" 
        sx={{ fontFamily: "'Orbitron', sans-serif", mb: 3, fontWeight: 800, color: 'common.white', textTransform: 'uppercase' }}
      >
        {title}
      </Typography>

      <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
        {metrics.map((metric: any) => (
          <Stack
            key={metric.label}
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`, pb: 1 }}
          >
            <Typography sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>
              {metric.label}
            </Typography>
            <Typography
              sx={{ fontSize: 12, fontWeight: 800, color: metric.color || 'common.white', fontFamily: "'Orbitron', sans-serif" }}
            >
              {metric.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

const SAMPLE_ARCS: ArcData[] = [
  { order: 1, startLat: -15.78, startLng: -47.92, endLat: 40.71, endLng: -74.0, arcAlt: 0.3, color: '#00AB55' },
  { order: 2, startLat: -15.78, startLng: -47.92, endLat: 51.5, endLng: -0.12, arcAlt: 0.4, color: '#00AB55' },
  { order: 3, startLat: -15.78, startLng: -47.92, endLat: 1.35, endLng: 103.8, arcAlt: 0.5, color: '#00AB55' },
];