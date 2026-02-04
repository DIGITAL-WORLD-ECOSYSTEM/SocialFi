import { MetadataRoute } from 'next';
// Importamos o CONFIG para manter a cor do tema sincronizada
import { CONFIG } from 'src/global-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SocialFi - Sua Rede Social Descentralizada',
    short_name: 'SocialFi',
    description: 'Conecte-se, crie e monetize na nova era da internet. Construído com Next.js e Web3.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait', // Garante a melhor experiência mobile
    background_color: '#000000',
    theme_color: '#000000', // Sincronizado com sua marca
    categories: ['social', 'finance', 'crypto'], // Ajuda no SEO de Apps
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
        purpose: 'any', 
      },
      {
        src: '/logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable', // 🟢 VITAL: Permite que o Android molde o ícone (círculo, quadrado, etc)
      },
      {
        src: '/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
