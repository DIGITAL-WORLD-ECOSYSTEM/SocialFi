import type { NextConfig } from 'next';

const isStaticExport = false;

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: isStaticExport ? 'export' : undefined,

  // --- OTIMIZACAO EXTREMA DE MEMORIA ---
  productionBrowserSourceMaps: false, // Sem mapas de fonte
  compress: false,                    // Sem compressao Gzip no build
  // -------------------------------------

  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    BUILD_STATIC_EXPORT: JSON.stringify(isStaticExport),
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
