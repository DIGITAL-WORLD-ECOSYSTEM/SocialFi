'use client';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ACTIONS = [
  { name: 'Profile', icon: 'solar:user-bold-duotone', onClick: () => console.info('Profile') },
  { name: 'GitHub', icon: 'ant-design:github-filled', onClick: () => console.info('GitHub') },
  { name: 'Support', icon: 'solar:headset-help-bold-duotone', onClick: () => console.info('Support') },
  { name: 'Docs', icon: 'solar:document-text-bold-duotone', onClick: () => console.info('Docs') },
  { name: 'ThemeMode', icon: 'solar:moon-bold-duotone', onClick: () => console.info('ThemeMode') },
];

export function CoreNav() {
  const open = useBoolean();

  return (
    <Box
      sx={{
        transform: 'scale(1)',
        zIndex: (theme) => theme.zIndex.speedDial,
        position: 'fixed',
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
      }}
    >
      <SpeedDial
        ariaLabel="Core Nav"
        icon={<Iconify icon="solar:menu-dots-bold-duotone" />}
        openIcon={<Iconify icon="solar:close-circle-bold-duotone" />}
        direction="up"
        onClose={open.onFalse}
        onOpen={open.onTrue}
        open={open.value}
      >
        {ACTIONS.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<Iconify icon={action.icon} />}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
