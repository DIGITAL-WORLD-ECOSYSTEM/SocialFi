// ----------------------------------------------------------------------
// Imports — Fontes, tipos e react/motion
// ----------------------------------------------------------------------
import '@fontsource/orbitron/900.css'; // ExtraBold
import '@fontsource/orbitron/700.css'; // Bold

import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import type { MotionProps, MotionValue } from 'framer-motion';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';

// ----------------------------------------------------------------------
// Imports — MUI e App
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { useTranslate } from 'src/locales';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------
// Configurações
// ----------------------------------------------------------------------
const mdKey: Breakpoint = 'md';

const motionProps: MotionProps = {
  variants: varFade('inUp', { distance: 24 }),
};

// ----------------------------------------------------------------------
// Componente
// ----------------------------------------------------------------------
export function HomeHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();
  const { elementRef, scrollY } = useScrollData();

  // Fade-out suave do texto ao scrollar
  const opacity: MotionValue<number> = useTransform(scrollY, [0, 400], [1, 0]);

  // ----------------------------------------------------------------------
  // Render Helpers
  // ----------------------------------------------------------------------
  const renderHeading = () => (
    <m.div {...motionProps}>
      {/* Sub-título */}
      <Typography
        variant="h6"
        component="h2"
        sx={(theme) => ({
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          opacity: 0.7,
          mb: 1,
          textAlign: { xs: 'center', md: 'left' },
        })}
      >
        DEX World:
      </Typography>

      {/* Título Principal */}
      <Box
        component="h1"
        sx={(theme) => ({
          my: 0,
          maxWidth: 620,
          typography: 'h1',
          fontWeight: 900,
          letterSpacing: '0.05em',
          fontSize: { xs: '2.5rem', md: '4.5rem' },
          lineHeight: { xs: 1.1, md: 1.05 },
          textAlign: { xs: 'center', md: 'left' },
          fontFamily: "'Orbitron', sans-serif",
          textShadow: '0 4px 24px rgba(0,0,0,0.7)',
        })}
      >
        {t('hero.title')}
        <br />
        <Box
          component={m.span}
          animate={{ backgroundPosition: '200% center' }}
          transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
          sx={(theme) => ({
            ...theme.mixins.textGradient(
              `300deg, ${theme.vars.palette.info.main} 0%, ${theme.vars.palette.warning.main} 50%, ${theme.vars.palette.info.light} 100%`
            ),
            backgroundSize: '400% 400%',
            display: 'inline-block',
          })}
        >
          {t('hero.title_highlight')}
        </Box>
      </Box>
    </m.div>
  );

  const renderText = () => (
    <m.div {...motionProps}>
      <Typography
        sx={{
          maxWidth: 520,
          mt: 3,
          color: 'text.secondary',
          fontSize: { xs: 17, md: 20 },
          lineHeight: 1.6,
          fontWeight: 500,
          textAlign: { xs: 'center', md: 'left' },
          textShadow: '0 2px 12px rgba(0,0,0,0.8)',
        }}
      >
        {t('hero.description')}
      </Typography>
    </m.div>
  );

  const renderButtons = () => (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={{ xs: 'center', md: 'flex-start' }}
      spacing={2}
      sx={{ mt: { xs: 6, md: 4 } }}
    >
      <m.div {...motionProps}>
        <Button
          component={RouterLink}
          href="/docs/whitepaper.pdf"
          color="primary"
          size="large"
          variant="contained"
          startIcon={<Iconify width={24} icon="solar:file-bold-duotone" />}
          sx={(theme) => ({
            height: 60,
            px: 4,
            fontSize: 16,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: `0 0 24px ${theme.vars.palette.primary.main}60`,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          })}
        >
          {t('hero.buttons.whitepaper')}
        </Button>
      </m.div>

      <m.div {...motionProps}>
        <Button
          component={RouterLink}
          href="/coming-soon"
          color="inherit"
          size="large"
          variant="outlined"
          startIcon={<Iconify width={24} icon="solar:notes-bold-duotone" />}
          sx={{
            height: 60,
            px: 4,
            fontSize: 16,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            borderRadius: 1.5,
            backdropFilter: 'blur(8px)',
            color: 'common.white',
            borderColor: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            '&:hover': {
              borderColor: 'common.white',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {t('hero.buttons.ecosystem')}
        </Button>
      </m.div>
    </Stack>
  );

  // ----------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------
  return (
    <Box
      ref={elementRef}
      component="section"
      sx={[
        (theme) => ({
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 18 },
          pb: 10,
          bgcolor: 'transparent',
          [theme.breakpoints.up(mdKey)]: {
            mt: `calc(var(--layout-header-desktop-height) * -1)`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity }}
        sx={{ width: 1, position: 'relative', zIndex: 10 }}
      >
        <Container component={MotionContainer}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            spacing={{ xs: 8, md: 4 }}
          >
            {/* Coluna esquerda — Texto */}
            <Box sx={{ flex: 1 }}>
              {renderHeading()}
              {renderText()}
              {renderButtons()}
            </Box>

            {/* Coluna direita — Arte / 3D */}
            <Box
              sx={{
                flex: 1,
                display: { xs: 'none', md: 'block' },
              }}
            >
              {/* Canvas / Vortex / 3D entra aqui */}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------
// Scroll Hook
// ----------------------------------------------------------------------
function useScrollData() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  return { elementRef, scrollY };
}
