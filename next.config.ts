/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Next.js Engine Configuration
 * Version: 1.5.2 - Performance Hardened & TS Error Fix
 * Goal: Subir nota Lighthouse de 36 para 90+
 */

import type { NextConfig } from 'next';

/**
 * 🛠️ SOLUÇÃO PARA ERRO TS2353:
 * Extendemos o tipo NextConfig para garantir que o TypeScript reconheça 
 * a propriedade 'eslint', que em algumas versões do Next 15 pode apresentar conflito de tipos.
 */
const nextConfig: NextConfig & { eslint?: { ignoreDuringBuilds: boolean } } = {
  // 1. ROTEAMENTO E SEO
  // Mantém barras no final para consistência de indexação e evita redirects 301.
  trailingSlash: true,

  // ----------------------------------------------------------------------
  // 🚀 PERFORMANCE & BUNDLE OPTIMIZATION (Foco em TBT e LCP)
  // ----------------------------------------------------------------------
  
  // Ativa compressão Brotli/Gzip para reduzir o bundle de JS (atualmente em 860KB).
  compress: true,

  // Remove Source Maps no build de produção para reduzir peso e proteger a lógica.
  productionBrowserSourceMaps: false,

  // ----------------------------------------------------------------------
  // 🖼️ OTIMIZAÇÃO DE IMAGENS (FOCO EM CONEXÕES RURAIS/MÓVEIS)
  // ----------------------------------------------------------------------
  images: {
    /** * 🟢 MELHORIA LCP: unoptimized setado como FALSE.
     * Permite que a Vercel redimensione imagens do R2 para WebP/AVIF automaticamente.
     */
    unoptimized: false,
    
    formats: ['image/avif', 'image/webp'],
    
    // Whitelist do bucket R2 para processamento seguro de mídia.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-15c2a7d2de27447584fea9f9be60585b.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ----------------------------------------------------------------------
  // 🔒 GOVERNANÇA & ESTABILIDADE (STRICT MODE)
  // ----------------------------------------------------------------------

  // Impede deploys se houver erros de tipagem.
  typescript: {
    ignoreBuildErrors: false,
  },

  // Garante que o build falhe se houver avisos críticos de ESLint.
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ----------------------------------------------------------------------
  // 🛠️ DEV TOOLS & COMPATIBILIDADE
  // ----------------------------------------------------------------------

  // Autoriza origens do ambiente Cloud Workstations (HMR fix).
  allowedDevOrigins: [
    '8082-firebase-socialfi-1769577659883.cluster-hkcruqmgzbd2aqcdnktmz6k7ba.cloudworkstations.dev',
  ],

  /**
   * Suporte nativo para transformar SVGs em componentes React.
   */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  /**
   * Otimizações para o motor Turbopack (Next.js 15+).
   */
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