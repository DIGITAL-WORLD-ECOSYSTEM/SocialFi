import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" /> },
  { title: 'Tecnologia', path: '/tecnologia', icon: <Iconify width={22} icon="solar:laptop-bold-duotone" /> },
  { title: 'Finanças', path: '/financas', icon: <Iconify width={22} icon="solar:wallet-money-bold-duotone" /> },
];
