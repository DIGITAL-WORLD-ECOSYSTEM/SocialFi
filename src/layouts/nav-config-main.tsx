import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/' },
  { title: 'Ecosystem', path: '/ecosystem' },
  { title: 'Community', path: '/community' },
  { title: 'Team', path: paths.about },
  { title: 'Roadmap', path: '/roadmap' },
  { title: 'FAQ', path: paths.faqs },
  { title: 'Blog', path: paths.post.root },
];
