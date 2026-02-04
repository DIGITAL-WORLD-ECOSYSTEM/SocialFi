
import { MetadataRoute } from 'next';

// ----------------------------------------------------------------------

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SocialFi - Sua Rede Social Descentralizada',
    short_name: 'SocialFi',
    description: 'Conecte-se, crie e monetize na nova era da internet. Construído com Next.js e Web3.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FFFFFF',
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
      },
      {
        src: '/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
