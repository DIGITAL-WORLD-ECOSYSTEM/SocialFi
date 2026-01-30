import type { BoxProps } from '@mui/material/Box';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { MotionContainer } from 'src/components/animate';
import { Lines, Texts } from './hero-svg'; // Removidos: Dots, Circles, PlusIcon

// ----------------------------------------------------------------------

export type HomeSectionType = 
  | 'hero' 
  | 'integrations' 
  | 'roadmap' 
  | 'ecosystem' 
  | 'community' 
  | 'team' 
  | 'news' 
  | 'faqs' 
  | 'cta';

interface Props extends BoxProps {
  section?: HomeSectionType;
}

export function HomeBackground({ section = 'hero', sx, ...other }: Props) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  // 1. Atmosfera Dinâmica (Substitui imagens por degradês CSS puros)
  const renderAtmosphere = () => (
    <Box
      component={m.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={(theme) => {
        const isLight = theme.palette.mode === 'light';

        // Intensidades calculadas para harmonizar com o efeito de vidro
        const primaryAlpha = isLight ? 0.08 : 0.15;
        const secondaryAlpha = isLight ? 0.06 : 0.12;
        const infoAlpha = isLight ? 0.04 : 0.08;

        return {
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: -2,
          position: 'absolute',
          // Utiliza a cor de fundo do seu palette.ts
          backgroundColor: isLight ? theme.vars.palette.background.default : '#020817',
          backgroundImage: `
            radial-gradient(circle at 20% 20%, ${varAlpha(theme.vars.palette.primary.mainChannel, primaryAlpha)} 0%, transparent 50%),
            radial-gradient(circle at 80% 40%, ${varAlpha(theme.vars.palette.secondary.mainChannel, secondaryAlpha)} 0%, transparent 60%),
            radial-gradient(circle at 40% 80%, ${varAlpha(theme.vars.palette.info.mainChannel, infoAlpha)} 0%, transparent 50%)
          `,
          transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.standard,
          }),
        };
      }}
    />
  );

  // 2. Malha Cyber (Perspectiva 3D otimizada para Light/Dark)
  const renderCyberGrid = () => {
    const showGrid = ['hero', 'team', 'cta'].includes(section);
    if (!showGrid) return null;

    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: -1,
          overflow: 'hidden',
          perspective: '1000px',
        }}
      >
        <Box
          component={m.div}
          animate={{ backgroundPosition: ['0px 0px', '0px 60px'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          sx={(theme) => ({
            position: 'absolute',
            width: '300%',
            height: '200%',
            top: section === 'hero' ? '15%' : '-50%',
            left: '-100%',
            transform: section === 'hero' ? 'rotateX(60deg)' : 'rotateX(180deg)',
            backgroundImage: `
              linear-gradient(to right, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.1)} 1px, transparent 1px),
              linear-gradient(to bottom, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.1)} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: `linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)`,
          })}
        />
      </Box>
    );
  };

  // 3. Elementos SVG (Apenas as Linhas de Grade restaram)
  const renderSvgElements = () => (
    <Box
      component={m.svg}
      viewBox="0 0 1440 1080"
      sx={{ 
        width: 1, 
        height: 1, 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 0,
      }}
    >
      <g opacity={section === 'hero' ? 0.6 : 0.15}>
        <Lines strokeCount={section === 'hero' ? 16 : 8} />
      </g>
    </Box>
  );

  return (
    <Box
      component={MotionContainer}
      sx={[
        (theme) => ({
          '--hero-line-stroke-color': varAlpha(
            theme.vars.palette.primary.mainChannel, 
            theme.palette.mode === 'light' ? 0.08 : 0.15
          ),
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
      {renderAtmosphere()}
      
      {renderCyberGrid()}
      
      {mdUp && renderSvgElements()}
      
      {mdUp && (section === 'hero' || section === 'roadmap') && <Texts />}
    </Box>
  );
}