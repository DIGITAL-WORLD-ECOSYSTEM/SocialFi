'use client';

import dynamic from 'next/dynamic';
import { m, Variants } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';

import { MotionViewport } from 'src/components/animate';
import { SectionTitle } from './components/section-title';

// ✅ REMOVIDO: HomeBackground não é mais necessário aqui pois já está centralizado no HomeView

// ----------------------------------------------------------------------

const World = dynamic(() => import('src/components/threeglobe/globe').then((m) => m.World), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: { xs: 400, md: 600 },
        bgcolor: 'background.neutral',
        borderRadius: 2,
        opacity: 0.1,
      }}
    />
  ),
});

// ----------------------------------------------------------------------

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function HomeIntegrations({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  
  // ✅ AJUSTE: Forçamos o fundo para transparente para ver o Vortex unificado
  const isLight = theme.palette.mode === 'light';

  const globeConfig = {
    pointSize: 4,
    globeColor: isLight ? theme.palette.grey[300] : '#062056',
    showAtmosphere: true,
    atmosphereColor: theme.palette.primary.main,
    atmosphereAltitude: 0.1,
    polygonColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.7)',
    autoRotate: true,
    autoRotateSpeed: 1,
  };

  const renderDescription = () => (
    <SectionTitle
      caption="Infraestrutura RWA"
      title="Ecossistema"
      txtGradient="Conectado"
      description={
        <>
          <Box component="span" sx={{ mb: 2, display: 'block', lineHeight: 1.7 }}>
            Nossa rede sincroniza ativos tangíveis brasileiros com a liquidez global descentralizada,
            garantindo auditabilidade e transparência on-chain.
          </Box>

          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              typography: 'caption',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            • Infraestrutura escalável operada via Cloudflare Edge
          </Box>
        </>
      }
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    />
  );

  const renderGlobe = () => (
    <m.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      <Box
        sx={{
          height: { xs: 400, md: 600 },
          width: '100%',
          position: 'relative',
          filter: `drop-shadow(0 24px 48px ${
            theme.palette.mode === 'dark' ? '#000' : alpha(theme.palette.primary.main, 0.12)
          })`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <World data={sampleArcs} globeConfig={globeConfig} />
      </Box>
    </m.div>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          // ✅ CRUCIAL: Alterado de 'background.default' para 'transparent'
          bgcolor: 'transparent', 
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* ✅ LINHA REMOVIDA: <HomeBackground section="integrations" /> */}

      <Container component={MotionViewport} sx={{ position: 'relative', zIndex: 9 }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 6, md: 3 },
            alignItems: 'center',
            justifyContent: 'space-between',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
            width: '100%',
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 5' } }}>{renderDescription()}</Box>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'span 6' } }}>{renderGlobe()}</Box>
        </Box>
      </Container>
    </Box>
  );
}

// sampleArcs permanece o mesmo...
const sampleArcs = [
  { order: 1, startLat: -15.78, startLng: -47.92, endLat: 40.71, endLng: -74.0, arcAlt: 0.3, color: '#00AB55' },
  { order: 2, startLat: -15.78, startLng: -47.92, endLat: 51.5, endLng: -0.12, arcAlt: 0.4, color: '#00AB55' },
  { order: 3, startLat: -15.78, startLng: -47.92, endLat: 1.35, endLng: 103.8, arcAlt: 0.5, color: '#00AB55' },
];