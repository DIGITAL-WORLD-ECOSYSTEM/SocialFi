'use client';

import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;    // Backend API
  siteUrl: string;      // Frontend SEO 2026
  assetsDir: string;
  isStaticExport: boolean;
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'ASPPIBRA',
  appVersion: packageJson.version,
  /**
   * BACKEND API URL
   * Local de onde os dados são consumidos
   */
  serverUrl: (process.env.NEXT_PUBLIC_HOST_API ?? 'https://api.asppibra.com').replace(/\/$/, ''), 
  /**
   * FRONTEND SITE URL
   * Base para geração de Sitemap, Robots e Metadados dinâmicos
   */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.asppibra.com').replace(/\/$/, ''),
  
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(process.env.BUILD_STATIC_EXPORT ?? 'false'),
  /**
   * Auth
   * @method jwt
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};
