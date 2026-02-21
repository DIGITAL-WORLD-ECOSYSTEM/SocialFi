'use client';

// ----------------------------------------------------------------------
// Imports — Fontes, tipos e motion
// ----------------------------------------------------------------------
import '@fontsource/orbitron/900.css'; 
import '@fontsource/orbitron/700.css'; 

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
import { alpha, useTheme } from '@mui/material/styles';

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
// Componente Principal
// ----------------------------------------------------------------------
export function HomeHero({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();
  const { elementRef, scrollY } = useScrollData();

  // Efeitos de Scroll: Profundidade Profissional
  const opacity: MotionValue<number> = useTransform(scrollY, [0, 500], [1, 0]);
  const scale: MotionValue<number> = useTransform(scrollY, [0, 500], [1, 0.95]);

  // --- Render Helpers ---

  const renderHeading = () => (
    <m.div {...motionProps}>
      {/* 💊 A Pílula Padronizada (Padrão 2026) */}
      <Box
        sx={{
          display: 'inline-block',
          border: `1px solid ${theme.palette.info.main}`,
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          mb: 4,
          boxShadow: `0 0 12px ${alpha(theme.palette.info.main, 0.3)}`,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'info.main',
          }}
        >
          {t('hero.badge')}
        </Typography>
      </Box>

      {/* 🎨 Título com Hierarquia de 3 Camadas de Cores (Versão Final) */}
      <Box
        component="h1"
        sx={{
          my: 0,
          maxWidth: 720,
          typography: 'h1',
          fontWeight: 900,
          letterSpacing: '0.02em',
          fontSize: { xs: '2.5rem', md: '4.5rem' },
          lineHeight: { xs: 1.1, md: 1.05 },
          textAlign: { xs: 'center', md: 'left' },
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        {/* Camada 1: Branco (Contexto) */}
        <Box component="span" sx={{ color: 'common.white' }}>
          {t('hero.title')}
        </Box>
        <br />
        {/* Camada 2: Cinza Técnico (O Ecossistema) */}
        <Box 
          component="span" 
          sx={{ color: alpha(theme.palette.common.white, 0.5) }}
        >
          {t('hero.title_bridge')}
        </Box>
        <br />
        {/* Camada 3: Gradiente Dinâmico (Interplanetário) — Com Glow sutil */}
        <Box
          component={m.span}
          animate={{ backgroundPosition: ['0% center', '200% center'] }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
          sx={{
            ...theme.mixins.textGradient(
              `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 50%, ${theme.palette.primary.light} 100%`
            ),
            backgroundSize: '200% auto',
            display: 'inline-block',
            textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.35)}`,
          }}
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
          maxWidth: 640,
          mt: 3,
          color: 'text.secondary',
          fontSize: { xs: 18, md: 20 },
          lineHeight: 1.6,
          fontWeight: 500,
          // Ajuste solicitado: Justificado no mobile para melhor comportamento
          textAlign: { xs: 'justify', md: 'left' },
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
      sx={{ mt: 5 }}
    >
      <m.div {...motionProps}>
        {/* 🟢 Botão Principal: Cristal Esmeralda */}
        <Button
          component={RouterLink}
          href="/whitepaper"
          size="large"
          variant="contained"
          startIcon={<Iconify width={24} icon="solar:file-bold-duotone" />}
          sx={{
            height: 60,
            px: 4,
            fontSize: 16,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            borderRadius: 1.5,
            textTransform: 'uppercase',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
            transition: theme.transitions.create(['all']),
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.6)}`,
              transform: 'translateY(-2px)',
            },
          }}
        >
          {t('hero.buttons.whitepaper')}
        </Button>
      </m.div>

      <m.div {...motionProps}>
        {/* ✨ Botão Secundário: Neon Glass (Padronizado 10px Blur) */}
        <Button
          component={RouterLink}
          href="/ecosystem"
          color="inherit"
          size="large"
          variant="outlined"
          endIcon={<Iconify width={24} icon="solar:double-alt-arrow-right-bold-duotone" />}
          sx={{
            height: 60,
            px: 4,
            fontSize: 16,
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            borderRadius: 1.5,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'common.white',
            borderColor: alpha(theme.palette.info.main, 0.4),
            bgcolor: alpha(theme.palette.info.main, 0.05),
            textTransform: 'uppercase',
            transition: theme.transitions.create(['all']),
            boxShadow: `0 0 12px ${alpha(theme.palette.info.main, 0.2)}`,
            '&:hover': {
              borderColor: 'info.main',
              bgcolor: alpha(theme.palette.info.main, 0.15),
              boxShadow: `0 0 25px ${alpha(theme.palette.info.main, 0.5)}`,
              transform: 'translateY(-2px)',
            },
          }}
        >
          {t('hero.buttons.ecossistema')}
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Box
      ref={elementRef}
      component="section"
      sx={[
        {
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 18 },
          pb: 10,
          bgcolor: 'transparent',
          overflow: 'hidden',
          [theme.breakpoints.up(mdKey)]: {
            mt: `calc(var(--layout-header-desktop-height) * -1)`,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity, scale }}
        sx={{ width: 1, position: 'relative', zIndex: 10 }}
      >
        <Container component={MotionContainer}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            spacing={{ xs: 8, md: 4 }}
          >
            <Box sx={{ flex: 1 }}>
              {renderHeading()}
              {renderText()}
              {renderButtons()}
            </Box>

            {/* Espaço reservado para o Globo 3D ou Ativo Visual */}
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, minHeight: 500 }} />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function useScrollData() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  return { elementRef, scrollY };
}