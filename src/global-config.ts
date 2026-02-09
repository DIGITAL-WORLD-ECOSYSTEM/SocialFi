import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;    // Backend API (Dados RWA e Governança)
  siteUrl: string;      // Frontend (Base para SEO 2026)
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
  /**
   * NOME DA APLICAÇÃO
   * Utilizado globalmente no Manifest, Metadata e títulos de página.
   */
  appName: 'ASPPIBRA',
  
  appVersion: packageJson.version,

  /**
   * BACKEND API URL
   * Local de onde os dados de produção e usuários são consumidos.
   * A sanitização .replace(/\/$/, '') previne erros de barra dupla nas requisições.
   */
  serverUrl: (process.env.NEXT_PUBLIC_HOST_API ?? 'https://api.asppibra.com').replace(/\/$/, ''), 

  /**
   * FRONTEND SITE URL
   * Fonte Única da Verdade (SSOT) para:
   * - metadataBase (Layout)
   * - sitemap.xml
   * - robots.txt
   * - canonical links
   */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.asppibra.com').replace(/\/$/, ''),
  
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  
  isStaticExport: JSON.parse(process.env.BUILD_STATIC_EXPORT ?? 'false'),

  /**
   * CONFIGURAÇÕES DE AUTENTICAÇÃO
   * @method jwt
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};