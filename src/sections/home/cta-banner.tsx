'use client';

// ----------------------------------------------------------------------
// Imports — tipos e motion
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------
// Imports — MUI
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useTranslate } from 'src/locales';

import { CONFIG } from 'src/global-config';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function CtaBanner({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();

  const renderDescription = () => (
    <Stack 
      spacing={5} 
      sx={{ 
        zIndex: 9,
        alignItems: { xs: 'center', md: 'flex-start' }
      }}
    >
      <Stack spacing={2}>
        <Typography
          component={m.h2}
          variants={varFade('inDown', { distance: 24 })}
          sx={{
            m: 0,
            color: 'common.white',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}
        >
          <Box component="span" sx={{ color: 'common.white' }}>
            {t('cta.title') || 'Pronto para'}
          </Box>
          <br />
          <Box component="span" sx={{ color: alpha('#fff', 0.5) }}>
            {t('cta.title_bridge') || 'Começar a'}
          </Box>
          <br />
          <Box component="span" sx={{ color: 'warning.main' }}>
            {t('cta.title_highlight') || 'Evoluir?'}
          </Box>
        </Typography>
      </Stack>

      <m.div variants={varFade('inRight', { distance: 24 })}>
        <Button
          component={RouterLink}
          href={paths.dashboard.root}
          color="primary"
          size="large"
          variant="contained"
          sx={{ 
            height: 56,
            px: 4,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            borderRadius: 1.5,
            fontSize: 16,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            '&:hover': {
               transform: 'translateY(-2px)',
               boxShadow: (theme) => `0 0 30px ${alpha(theme.palette.primary.main, 0.6)}`,
            }
          }}
        >
          {t('cta.button') || 'Explorar Agora'}
        </Button>
      </m.div>
    </Stack>
  );

  const renderImage = () => (
    <m.div variants={varFade('inUp')}>
      <Box
        component={m.img}
        animate={{ y: [-15, 0, -15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        alt="Rocket"
        src={`${CONFIG.assetsDir}/assets/illustrations/illustration-rocket-large.webp`}
        sx={{
          zIndex: 9,
          width: { xs: 240, md: 360 },
          aspectRatio: '1/1',
          position: 'relative',
          filter: 'drop-shadow(0 0 40px rgba(0, 171, 85, 0.2))',
        }}
      />
    </m.div>
  );

  const renderBlur = () => (
    <Box
      component="span"
      sx={(theme) => ({
        top: 0,
        right: 0,
        zIndex: 7,
        width: 1,
        opacity: 0.3,
        maxWidth: 420,
        aspectRatio: '1/1',
        position: 'absolute',
        backgroundImage: `radial-gradient(farthest-side at top right, ${theme.vars.palette.primary.main} 0%, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.08)} 75%, transparent 90%)`,
      })}
    />
  );

  return (
    <Box
      component="section"
      sx={[
        { 
          position: 'relative', 
          py: { xs: 8, md: 15 }, // Respiro padronizado 2026
          overflow: 'hidden',
          bgcolor: 'transparent' 
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Box
            sx={(theme) => ({
              ...theme.mixins.bgGradient({
                images: [
                  `linear-gradient(0deg, ${varAlpha(theme.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                  `linear-gradient(90deg, ${varAlpha(theme.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                ],
                sizes: ['36px 36px'],
                repeats: ['repeat'],
              }),
              py: { xs: 6, md: 10 },
              px: { xs: 3, md: 10 },
              borderRadius: 3,
              display: 'flex',
              overflow: 'hidden',
              bgcolor: alpha(theme.palette.grey[900], 0.4), // Mais transparente para integrar com estrelas
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: { xs: 'center', md: 'left' },
              flexDirection: { xs: 'column', md: 'row-reverse' }, // Inversão para zigue-zague
              border: `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`,
            })}
          >
            {renderImage()}
            {renderDescription()}
            {renderBlur()}
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}