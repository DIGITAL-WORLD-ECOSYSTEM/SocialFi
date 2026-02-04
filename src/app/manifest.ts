import type { MetadataRoute } from 'next';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONFIG.appName, // 🟢 Agora usa "ASPPIBRA" vindo do global-config
    short_name: CONFIG.appName,
    description: 'Associação dos Pequenos Produtores Integrados do Brasil - Conectando o agronegócio à tecnologia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait' as const, // 🟢 O "as const" resolve erros de tipagem
    categories: ['business', 'productivity', 'education'], 
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any' as const, // 🟢 Resolvendo tipagem literal
      },
      {
        src: '/logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable' as const, // 🟢 Resolvendo tipagem literal
      },
      {
        src: '/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}