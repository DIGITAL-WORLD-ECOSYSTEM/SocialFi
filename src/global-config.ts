'use client';

import { paths } from 'src/routes/paths';
import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
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
  appName: 'DEX World',
  appVersion: packageJson.version,
  // O .replace(/\/$/, '') garante que mesmo se houver uma barra no dashboard da Vercel, 
  // ela será removida aqui para evitar caminhos como //posts
  serverUrl: (process.env.NEXT_PUBLIC_HOST_API ?? '').replace(/\/$/, ''), 
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