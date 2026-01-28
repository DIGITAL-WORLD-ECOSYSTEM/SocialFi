
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  // output: 'export', // <--- A MUDANÇA MÁGICA (Gera HTML estático)

  // Otimizações
  productionBrowserSourceMaps: false,
  compress: false,
  
  // Obrigatório para exportação estática (sem servidor de imagem)
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  allowedDevOrigins: [
    '8082-firebase-socialfi-1768249815935.cluster-gizzoza7hzhfyxzo5d76y3flkw.cloudworkstations.dev',
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
