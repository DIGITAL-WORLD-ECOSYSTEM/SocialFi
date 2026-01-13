import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'ECONOMIA', path: '#economia', icon: <Iconify width={22} icon="solar:economy-bold-duotone" /> },
  { title: 'TECNOLOGIA', path: '#tecnologia', icon: <Iconify width={22} icon="solar:laptop-bold-duotone" /> },
  { title: 'MEIO AMBIENTE', path: '#meio-ambiente', icon: <Iconify width={22} icon="solar:leaf-bold-duotone" /> },
  { title: 'GEOPOLÍTICA', path: '#geopolitica', icon: <Iconify width={22} icon="solar:map-bold-duotone" /> },
];
