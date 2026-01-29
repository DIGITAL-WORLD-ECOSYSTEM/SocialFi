import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { CONFIG } from 'src/global-config';
import { MotionContainer } from 'src/components/animate';

import { Dots, Lines, Texts, Circles, PlusIcon } from './hero-svg';

// ----------------------------------------------------------------------

export function HeroBackground({ sx, ...other }: BoxProps) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  // 1. Efeito de Malha em Perspectiva (Cyber Landscape)
  const renderCyberGrid = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: -1,
        overflow: 'hidden',
        perspective: '800px', // Define a profundidade
      }}
    >
      <Box
        component={m.div}
        animate={{ backgroundPosition: ['0px 0px', '0px 60px'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        sx={(theme) => ({
          position: 'absolute',
          width: '300%',
          height: '200%',
          top: '20%', // Posiciona no "chão"
          left: '-100%',
          transform: 'rotateX(65deg)',
          backgroundImage: `
            linear-gradient(to right, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.2)} 1px, transparent 1px),
            linear-gradient(to bottom, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.2)} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: `linear-gradient(to bottom, transparent, black 15%, black 40%, transparent)`, // Faz o grid sumir no horizonte
        })}
      />
    </Box>
  );

  const renderSvg = () => (
    <Box
      component={m.svg}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1440 1080"
      initial="hidden"
      animate="visible"
      sx={{ 
        width: 1, 
        height: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        filter: 'drop-shadow(0 0 8px #00AB5566)', // Adiciona brilho aos SVGs (Lines, Circles)
      }}
    >
      <defs>
        <radialGradient
          id="mask_gradient_id"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(720 0 0 420 720 560)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.08} />
        </radialGradient>

        <mask id="mask_id">
          <ellipse cx="50%" cy="50%" rx="50%" ry="36%" fill="url(#mask_gradient_id)" />
        </mask>
      </defs>

      <g mask="url(#mask_id)">
        <Circles />
        <PlusIcon />
        <Lines strokeCount={16} /> {/* Aumentado para mais densidade de rede */}
      </g>
    </Box>
  );

  const renderBackground = () => (
    <Box
      component={m.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={[
        (theme) => ({
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: -2,
          position: 'absolute',
          backgroundColor: '#020817', // Base ultra-dark
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.15)} 0%, transparent 60%),
            url(${CONFIG.assetsDir}/assets/background/background-3.webp)
          `,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          ...theme.applyStyles('dark', {
            backgroundImage: [
              `radial-gradient(circle at 50% 50%, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.2)} 0%, transparent 55%)`,
              `linear-gradient(180deg, rgba(2, 8, 23, 0) 0%, #020817 100%)`, // Fade para o conteúdo abaixo
              `url(${CONFIG.assetsDir}/assets/images/home/hero-blur.webp)`,
              `url(${CONFIG.assetsDir}/assets/background/background-3.webp)`,
            ].join(', '),
          }),
        }),
      ]}
    />
  );

  return (
    <Box
      component={MotionContainer}
      sx={[
        (theme) => ({
          '--hero-line-stroke-color': varAlpha(theme.vars.palette.primary.mainChannel, 0.3),
          '--hero-circle-stroke-color': varAlpha(theme.vars.palette.primary.mainChannel, 0.5),
          '--hero-text-stroke-color': varAlpha(theme.vars.palette.primary.mainChannel, 0.2),
          
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          zIndex: 0,
          pointerEvents: 'none',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Dots />
      
      {mdUp && <Texts />}
      
      {renderCyberGrid()}
      
      {renderSvg()}
      
      {renderBackground()}
    </Box>
  );
}