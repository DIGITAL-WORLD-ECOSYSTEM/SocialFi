import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Mantém barras no final para consistência de SEO e roteamento estático
  trailingSlash: true,

  /**
   * PERFORMANCE & OTIMIZAÇÕES (Foco em subir a nota 36 para 90+)
   */
  
  // ATIVE A COMPRESSÃO: Reduz drasticamente o tamanho do JS (860KB atualmente)
  // Essencial para baixar o TBT (Total Blocking Time) de 27.8s 
  compress: true,

  // Impede o download de arquivos de mapa (.map) pesados em ambiente de produção
  productionBrowserSourceMaps: false,

  // Configuração de Imagens
  images: {
    // Mantido como 'true' para suporte a 'output: export'. 
    // Se usar servidor (Vercel/Node), mude para 'false' para redimensionamento automático.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * ESTABILIDADE E QUALIDADE (Foco em Práticas Recomendadas - Nota 96) [cite: 15, 1120]
   */

  // Não ignora erros de tipagem no build, garantindo que o código seja estável para o usuário
  typescript: {
    ignoreBuildErrors: false,
  },

  /**
   * DESENVOLVIMENTO & COMPATIBILIDADE
   */

  allowedDevOrigins: [
    '8082-firebase-socialfi-1769577659883.cluster-hkcruqmgzbd2aqcdnktmz6k7ba.cloudworkstations.dev',
  ],

  // Suporte para transformar SVGs em componentes React (usado em ícones e logos)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // Configuração específica para o motor Turbopack (npm run dev)
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