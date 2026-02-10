'use client';

import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

const World = dynamic(() => import('src/components/threeglobe/globe').then((m) => m.World), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ opacity: 0.1, fontFamily: "'Orbitron', sans-serif" }}>
        LOADING INTERFACE...
      </Typography>
    </Box>
  ),
});

// ----------------------------------------------------------------------

export function HomeIntegrations({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const globeConfig = {
    pointSize: 4,
    globeColor: '#062056',
    showAtmosphere: true,
    atmosphereColor: theme.palette.primary.main,
    atmosphereAltitude: 0.1,
    polygonColor: 'rgba(255,255,255,0.7)',
    autoRotate: true,
    autoRotateSpeed: 1,
  };

  const renderHeader = () => (
    <Stack spacing={3} alignItems="center" sx={{ mb: { xs: 5, md: 0 }, textAlign: 'center' }}>
      <m.div variants={varFade('inUp')}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            borderRadius: 50,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            backdropFilter: 'blur(4px)',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'primary.light',
            }}
          >
            INFRAESTRUTURA RWA
          </Typography>
        </Box>
      </m.div>

      <m.div variants={varFade('inUp')}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}
        >
          SISTEMA <Box component="span" sx={{ color: 'primary.main' }}>GLOBAL</Box>
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[{ py: { xs: 10, md: 20 }, position: 'relative', overflow: 'hidden', bgcolor: 'transparent' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', minHeight: { md: 800 } }}>
          
          {renderHeader()}

          {/* Globo Central */}
          <Box
            sx={{
              height: { xs: 400, md: 700 },
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <World data={sampleArcs} globeConfig={globeConfig} />
          </Box>

          {/* CARDS TÉCNICOS - POSICIONAMENTO EM PONTAS */}
          
          {/* Superior Esquerdo: ESTADO DA CHAIN */}
          <DataPanel
            title="ESTADO_DA_CHAIN"
            label="BLOCKCHAIN_LEDGER"
            side="left"
            sx={{ top: 100, left: 0 }}
            metrics={[
              { label: 'ÚLTIMO BLOCO', value: '#8,142,002' },
              { label: 'DIFICULDADE', value: '24.81 T' },
              { label: 'CONSENSO', value: 'P-NEURAL OK', color: 'primary.main' },
            ]}
          />

          {/* Superior Direito: PODER DE CÁLCULO */}
          <DataPanel
            title="PODER DE CÁLCULO"
            label="BLOCKCHAIN_MINING"
            side="right"
            sx={{ top: 100, right: 0 }}
            metrics={[
              { label: 'HASH_RATE', value: '1.36 EB/s', color: 'info.main' },
              { label: 'TPS ATUAL', value: '14,200' },
            ]}
          />

          {/* Inferior Esquerdo: CONSOLA DE REDE */}
          <DataPanel
            title="CONSOLA_DE_REDE"
            label="NETWORK_TRAFFIC"
            side="left"
            sx={{ bottom: 50, left: 0 }}
            metrics={[
              { label: 'TRÁFEGO', value: 'UDP_ENCRYPTED' },
              { label: 'CHAVE', value: 'QUÂNTICA_ROTADA', color: 'primary.main' },
            ]}
          />

          {/* Inferior Direito: LATÊNCIA GLOBAL */}
          <DataPanel
            title="LATÊNCIA GLOBAL"
            label="NETWORK_TOPOLOGY"
            side="right"
            sx={{ bottom: 50, right: 0 }}
            metrics={[
              { label: 'PING MÉDIO', value: '10 ms', color: 'primary.main' },
              { label: 'DOWNSTREAM', value: '1.2 Tbps' },
            ]}
          />

        </Container>
      </MotionViewport>
    </Box>
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
        position: { md: 'absolute' },
        width: { xs: 1, md: 280 },
        p: 2,
        borderRadius: 1,
        borderLeft: side === 'left' ? `2px solid ${theme.palette.primary.main}` : 'none',
        borderRight: side === 'right' ? `2px solid ${theme.palette.primary.main}` : 'none',
        bgcolor: alpha(theme.palette.background.paper, 0.05),
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        mb: { xs: 2, md: 0 },
        ...sx,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, fontSize: 10, letterSpacing: 1 }}>
          {label}
        </Typography>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: `0 0 10px ${theme.palette.primary.main}` }} />
      </Stack>
      
      <Typography variant="subtitle2" sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2, fontSize: 13 }}>
        {title}
      </Typography>

      <Stack spacing={1}>
        {metrics.map((m: any) => (
          <Stack key={m.label} direction="row" justifyContent="space-between" sx={{ borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`, pb: 0.5 }}>
            <Typography sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 600 }}>{m.label}:</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: m.color || 'text.primary', fontFamily: "'Orbitron', sans-serif" }}>{m.value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

const sampleArcs = [
  { order: 1, startLat: -15.78, startLng: -47.92, endLat: 40.71, endLng: -74.0, arcAlt: 0.3, color: '#00AB55' },
  { order: 2, startLat: -15.78, startLng: -47.92, endLat: 51.5, endLng: -0.12, arcAlt: 0.4, color: '#00AB55' },
  { order: 3, startLat: -15.78, startLng: -47.92, endLat: 1.35, endLng: 103.8, arcAlt: 0.5, color: '#00AB55' },
];