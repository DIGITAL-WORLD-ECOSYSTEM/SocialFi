'use client';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export function CoreNav() {
  const router = useRouter();

  const open = useBoolean();

  const settings = useSettingsContext();

  const ACTIONS = [
    {
      name: 'Profile',
      icon: 'solar:user-bold-duotone',
      onClick: () => router.push(paths.auth.signIn),
    },
    { name: 'GitHub', icon: 'ant-design:github-filled', onClick: () => console.info('GitHub') },
    {
      name: 'Support',
      icon: 'solar:headset-help-bold-duotone',
      onClick: () => console.info('Support'),
    },
    { name: 'Docs', icon: 'solar:document-text-bold-duotone', onClick: () => console.info('Docs') },
    {
      name: 'ThemeMode',
      icon: settings.state.mode === 'light' ? 'solar:moon-bold-duotone' : 'solar:sun-bold-duotone',
      onClick: () => settings.setField('mode', settings.state.mode === 'light' ? 'dark' : 'light'),
    },
  ];

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
