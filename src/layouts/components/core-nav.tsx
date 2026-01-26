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
      icon: 'solar:user-id-bold',
      onClick: () => router.push(paths.auth.signIn),
    },
    { name: 'GitHub', icon: 'mdi:github', onClick: () => console.info('GitHub') },
    {
      name: 'Support',
      icon: 'solar:headset-bold',
      onClick: () => console.info('Support'),
    },
    { name: 'Docs', icon: 'solar:document-bold', onClick: () => console.info('Docs') },
    {
      name: 'ThemeMode',
      icon: settings.state.mode === 'light' ? 'solar:moon-bold' : 'solar:sun-bold',
      onClick: () => settings.setField('mode', settings.state.mode === 'light' ? 'dark' : 'light'),
    },
  ] as const;

  return (
    <Box
      sx={{
        zIndex: (theme) => theme.zIndex.speedDial,
        position: 'fixed',
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
        width: 40, // Força uma largura idêntica ao Fab small
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <SpeedDial
        FabProps={{
          size: 'small',
          sx: {
            bgcolor: '#00C896', // Cor da sua imagem
            '&:hover': { bgcolor: '#00A87D' },
          },
        }}
        ariaLabel="Core Nav"
        icon={<Iconify icon="solar:menu-dots-linear" />}
        openIcon={<Iconify icon="solar:close-circle-bold" />}
        direction="up"
        onClose={open.onFalse}
        onOpen={open.onTrue}
        open={open.value}
      >
        {ACTIONS.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<Iconify icon={action.icon as any} />}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
