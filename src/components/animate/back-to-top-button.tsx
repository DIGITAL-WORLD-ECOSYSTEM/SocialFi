'use client';

import type { FabProps } from '@mui/material/Fab';

import { cloneElement } from 'react';
import { useBackToTop } from 'minimal-shared/hooks';

import Fab from '@mui/material/Fab';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type BackToTopProps = FabProps & {
  isDebounce?: boolean;
  scrollThreshold?: string | number;
  renderButton?: (isVisible?: boolean) => React.ReactElement;
};

export function BackToTopButton({
  sx,
  isDebounce,
  renderButton,
  scrollThreshold = '90%',
  ...other
}: BackToTopProps) {
  const { onBackToTop, isVisible } = useBackToTop(scrollThreshold, isDebounce);

  if (renderButton) {
    return cloneElement(renderButton(isVisible) as React.ReactElement<{ onClick?: () => void }>, {
      onClick: onBackToTop,
    });
  }

  return (
    <Fab
      size="small"
      aria-label="Back to top"
      onClick={onBackToTop}
      sx={[
        (theme) => ({
          position: 'fixed',
          transform: 'scale(0)',
          // Ajuste de precisão:
          right: theme.spacing(2),
          bottom: theme.spacing(8.5), // Ajustado para ficar logo acima do CoreNav (aprox 68px)
          width: 40, // Garantindo o tamanho exato do SpeedDial
          height: 40, // Garantindo o tamanho exato do SpeedDial
          zIndex: theme.zIndex.speedDial,
          bgcolor: '#00C896', // Padronizando a cor conforme a imagem
          color: 'white',
          '&:hover': { bgcolor: '#00A87D' },
          transition: theme.transitions.create(['transform', 'background-color']),
          ...(isVisible && { transform: 'scale(1)' }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify width={24} icon="solar:double-alt-arrow-up-bold-duotone" />
    </Fab>
  );
}
