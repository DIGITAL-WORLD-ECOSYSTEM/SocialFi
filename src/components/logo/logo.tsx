'use client';

import type { LinkProps } from '@mui/material/Link';

import { mergeClasses } from 'minimal-shared/utils';

// Adicionado Box para renderizar a imagem corretamente
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export function Logo({
  sx,
  disabled,
  className,
  href = '/',
  isSingle = true,
  ...other
}: LogoProps) {

  /*
   * CORREÇÃO:
   * Agora o código aponta para os arquivos REAIS que você indicou:
   * - Single: android-chrome-192x192.png
   * - Full: android-chrome-512x512.png
   */

  const singleLogo = (
    <Box
      component="img"
      alt="Single logo"
      src="/logo/android-chrome-192x192.png" 
      sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  );

  const fullLogo = (
    <Box
      component="img"
      alt="Full logo"
      src="/logo/android-chrome-512x512.png"
      sx={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }}
    />
  );

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: 40,
          height: 40,
          // Ajusta o tamanho do container quando for o logo completo
          ...(!isSingle && { width: 102, height: 40 }),
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));