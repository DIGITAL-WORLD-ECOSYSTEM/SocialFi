'use client';

// ----------------------------------------------------------------------
// Imports — tipos e react/motion
// ----------------------------------------------------------------------
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box, { type BoxProps } from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — App
// ----------------------------------------------------------------------
import { useTranslate } from 'src/locales';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

// Carregamento dinâmico do Globo para performance (LCP)
const World = dynamic(() => import('src/components/threeglobe/globe').then((mod) => mod.World), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ opacity: 0.1, fontFamily: "'Orbitron', sans-serif" }}>
        INITIALIZING INTERFACE...
      </Typography>
    </Box>
  ),
});

// ----------------------------------------------------------------------

export function HomeIntegrations({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

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
    <Stack spacing={3} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
      {/* BADGE PADRONIZADO (Gênesis Style) */}
      <m.div variants={varFade('inUp')}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            borderRadius: 2, // Padronizado com as outras seções
            border: `1px solid ${theme.palette.info.main}`,
            bgcolor: alpha(theme.palette.info.main, 0.1),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'info.main',
            }}
          >
            {t('integrations.badge') || 'CONECTIVIDADE'}
          </Typography>
        </Box>
      </m.div>

      {/* TÍTULO HIERÁRQUICO (3 CAMADAS) */}
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
          <Box component="span" sx={{ color: 'common.white' }}>
            {t('integrations.title') || 'SISTEMA'}
          </Box>
          <br />
          <Box component="span" sx={{ color: alpha(theme.palette.common.white, 0.5) }}>
            {t('integrations.title_bridge') || 'DE REDE'}
          </Box>
          <br />
          <Box component="span" sx={{ color: 'warning.main' }}>
            {t('integrations.title_highlight') || 'GLOBAL'}
          </Box>
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[
        { 
          py: { xs: 8, md: 15 }, // Padding vertical padronizado conforme checklist
          position: 'relative', 
          overflow: 'hidden', 
          bgcolor: 'transparent' 
        }, 
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', minHeight: { md: 900 } }}>
          
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
              filter: `drop-shadow(0 0 50px ${alpha(theme.palette.primary.main, 0.2)})`,
            }}
          >
            <World data={sampleArcs} globeConfig={globeConfig} />
          </Box>

          {/* PAINÉIS DE DADOS - Sincronizados com i18n */}
          
          {/* Superior Esquerdo */}
          <DataPanel
            title={t('integrations.panels.chain.title') || 'ESTADO_DA_CHAIN'}
            label={t('integrations.panels.chain.label') || 'BLOCKCHAIN_LEDGER'}
            side="left"
            sx={{ top: 120, left: 0 }}
            metrics={[
              { label: t('integrations.metrics.block'), value: '#8,142,002' },
              { label: t('integrations.metrics.consensus'), value: 'P-NEURAL OK', color: 'info.main' },
            ]}
          />

          {/* Superior Direito */}
          <DataPanel
            title={t('integrations.panels.power.title') || 'PODER DE CÁLCULO'}
            label={t('integrations.panels.power.label') || 'BLOCKCHAIN_MINING'}
            side="right"
            sx={{ top: 120, right: 0 }}
            metrics={[
              { label: 'HASH_RATE', value: '1.36 EB/s', color: 'warning.main' },
              { label: 'TPS', value: '14,200' },
            ]}
          />

          {/* Inferior Esquerdo */}
          <DataPanel
            title={t('integrations.panels.network.title') || 'CONSOLA_DE_REDE'}
            label={t('integrations.panels.network.label') || 'NETWORK_TRAFFIC'}
            side="left"
            sx={{ bottom: 80, left: 0 }}
            metrics={[
              { label: 'ENCRYPTION', value: 'UDP_SECURE' },
              { label: 'KEY', value: 'QUANTUM_ROT', color: 'info.main' },
            ]}
          />

          {/* Inferior Direito */}
          <DataPanel
            title={t('integrations.panels.latency.title') || 'LATÊNCIA GLOBAL'}
            label={t('integrations.panels.latency.label') || 'NETWORK_TOPOLOGY'}
            side="right"
            sx={{ bottom: 80, right: 0 }}
            metrics={[
              { label: 'AVG PING', value: '10 ms', color: 'info.main' },
              { label: 'UPSTREAM', value: '1.2 Tbps' },
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
        borderRadius: 1.5,
        borderLeft: side === 'left' ? `2px solid ${theme.palette.info.main}` : 'none',
        borderRight: side === 'right' ? `2px solid ${theme.palette.info.main}` : 'none',
        bgcolor: alpha(theme.palette.grey[900], 0.25),
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 10,
        boxShadow: `0 0 15px ${alpha(theme.palette.info.main, 0.1)}`,
        mb: { xs: 2, md: 0 },
        ...sx,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'info.main', fontWeight: 800, fontSize: 10, letterSpacing: 1.5 }}>
          {label}
        </Typography>
        <Box sx={{ 
          width: 6, 
          height: 6, 
          borderRadius: '50%', 
          bgcolor: 'info.main', 
          boxShadow: `0 0 10px ${theme.palette.info.main}` 
        }} />
      </Stack>
      
      <Typography variant="subtitle2" sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2, fontSize: 13, color: 'common.white' }}>
        {title}
      </Typography>

      <Stack spacing={1}>
        {metrics.map((metric: any) => (
          <Stack 
            key={metric.label} 
            direction="row" 
            justifyContent="space-between" 
            sx={{ borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`, pb: 0.5 }}
          >
            <Typography sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 600 }}>{metric.label}:</Typography>
            <Typography sx={{ 
              fontSize: 11, 
              fontWeight: 700, 
              color: metric.color || 'common.white', 
              fontFamily: "'Orbitron', sans-serif" 
            }}>
              {metric.value}
            </Typography>
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