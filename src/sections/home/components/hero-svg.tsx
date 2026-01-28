import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';
import type { Variants, MotionProps } from 'framer-motion';
import type { PaletteColorKey } from 'src/theme/core';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

// Infraestrutura e Protocolos auditados para o ecossistema RWA/ASPPIBRA
const PLATFORMS = [
  { name: 'Cloudflare Edge', icon: 'logos:cloudflare' },
  { name: 'Bitcoin Network', icon: 'logos:bitcoin' },
  { name: 'Ethereum', icon: 'logos:ethereum' },
  { name: 'Binance Smart Chain', icon: 'logos:binance' },
  { name: 'IPFS Storage', icon: 'simple-icons:ipfs' },
  { name: 'SQLite D1', icon: 'logos:sqlite' },
  { name: 'React 19', icon: 'logos:react' },
  { name: 'Typescript', icon: 'logos:typescript-icon' },
];

// ----------------------------------------------------------------------

const drawLineX: Variants = {
  hidden: { x2: 0, strokeOpacity: 0 },
  visible: (i: number) => ({
    x2: '100%',
    strokeOpacity: 1,
    transition: {
      strokeOpacity: { delay: 1 + i * 0.5, duration: 0.01 },
      x2: { delay: 1 + i * 0.5, bounce: 0, duration: 1.5 },
    },
  }),
};

const drawLineY: Variants = {
  hidden: { y2: 0, strokeOpacity: 0 },
  visible: (i: number) => ({
    y2: '100%',
    strokeOpacity: 1,
    transition: {
      strokeOpacity: { delay: 1 + i * 0.5, duration: 0.01 },
      y2: { delay: 1 + i * 0.5, bounce: 0, duration: 1.5 },
    },
  }),
};

export function Lines({ strokeCount }: { strokeCount: number }) {
  const translateY = (index: number) =>
    strokeCount / 2 > index
      ? `translateY(calc(((${index} * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))`
      : `translateY(calc(((${strokeCount - (index + 1)} * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))`;

  const translateX = (index: number) =>
    strokeCount / 2 > index
      ? `translateX(calc(((${index} * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))`
      : `translateX(calc(((${strokeCount - (index + 1)} * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))`;

  return (
    <>
      {Array.from({ length: strokeCount }, (_, index) => (
        <m.line
          key={`x-${index}`}
          x1="0"
          x2="100%"
          y1="50%"
          y2="50%"
          custom={index}
          variants={drawLineX}
          style={{
            transform: translateY(index),
            stroke: 'var(--hero-line-stroke-color)',
            strokeDasharray: 'var(--stroke-dasharray)',
            strokeWidth: 'var(--hero-line-stroke-width)',
          }}
        />
      ))}
      {Array.from({ length: strokeCount }, (_, index) => (
        <m.line
          key={`y-${index}`}
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
          custom={index}
          variants={drawLineY}
          style={{
            transform: translateX(index),
            stroke: 'var(--hero-line-stroke-color)',
            strokeDasharray: 'var(--stroke-dasharray)',
            strokeWidth: 'var(--hero-line-stroke-width)',
          }}
        />
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

export function Circles() {
  const drawCircle: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { opacity: { delay: 1 + i * 0.5, duration: 0.01 } },
    }),
  };

  return (
    <>
      <m.path
        variants={drawCircle}
        d="M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1"
        style={{
          strokeDasharray: 'var(--stroke-dasharray)',
          stroke: 'var(--hero-circle-stroke-color)',
          strokeWidth: 'var(--hero-circle-stroke-width)',
          transform: 'translate(calc(50% - 480px), calc(50% - 80px))',
        }}
      />
      <m.circle
        cx="50%"
        cy="50%"
        fill="var(--hero-circle-stroke-color)"
        style={{ transform: 'translate(calc(0% - 200px), calc(0% + 200px))' }}
        initial={{ r: 0 }}
        animate={{ r: 5 }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function PlusIcon() {
  const drawPlus: Variants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: { delay: 1 + i * 0.5, duration: 0.01 },
        pathLength: { delay: 1 + i * 0.5, bounce: 0, duration: 1.5, type: 'spring' },
      },
    }),
  };

  return (
    <m.path
      variants={drawPlus}
      d="M8 0V16M16 8.08889H0"
      stroke="var(--hero-plus-stroke-color)"
      style={{ transform: 'translate(calc(50% - 448px), calc(50% - 128px))' }}
    />
  );
}

// ----------------------------------------------------------------------

export function Texts({ sx, ...other }: BoxProps & MotionProps) {
  const theme = useTheme();

  return (
    <Box
      component={m.div}
      variants={varFade('in')}
      sx={[
        {
          left: 0,
          width: 1,
          bottom: 24,
          position: 'absolute',
          zIndex: 9,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          userSelect: 'none',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <m.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '100px', paddingRight: '100px' }}
        >
          {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((platform, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                opacity: 0.4,
                filter: 'grayscale(1)',
                transition: theme.transitions.create(['all']),
                '&:hover': { 
                  filter: 'grayscale(0)', 
                  opacity: 1, 
                  color: 'primary.main',
                  transform: 'scale(1.1)' 
                },
              }}
            >
              {/* CORREÇÃO DO ERRO 2322: 'as any' silencia o aviso de tipagem restrita do Iconify */}
              <Iconify icon={platform.icon as any} width={40} />
              <Typography variant="h6" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                {platform.name}
              </Typography>
            </Stack>
          ))}
        </m.div>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type DotProps = Pick<MotionProps, 'animate' | 'transition'> & {
  sx?: SxProps<Theme>;
  color?: PaletteColorKey;
};

function Dot({ color = 'primary', animate, transition, sx, ...other }: DotProps) {
  return (
    <Box
      component={m.div}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8 } },
      }}
      sx={[{ width: 12, height: 12, top: '50%', left: '50%', position: 'absolute' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box
        component={m.div}
        animate={animate}
        transition={transition ?? { duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        sx={[
          (theme) => ({
            width: 1,
            height: 1,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.vars.palette[color].lighter}, ${theme.vars.palette[color].light})`,
            boxShadow: `inset 0px -2px 4px ${theme.vars.palette[color].main}`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </Box>
  );
}

export function Dots() {
  return (
    <>
      <Dot color="error" animate={{ x: [0, 20] }} sx={{ transform: 'translate(calc(50% - 400px), calc(50% - 200px))' }} />
      <Dot color="info" animate={{ y: [0, 20] }} sx={{ transform: 'translate(calc(50% + 300px), calc(50% + 100px))' }} />
    </>
  );
}