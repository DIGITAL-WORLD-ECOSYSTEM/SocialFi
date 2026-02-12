import 'src/global.css';

import type { Metadata, Viewport } from 'next';

import { Analytics } from '@vercel/analytics/next';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { CONFIG } from 'src/global-config';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { I18nProvider } from 'src/locales/i18n-provider';
import { themeConfig, primary as primaryColor } from 'src/theme';

import { JsonLd } from 'src/components/seo/json-ld';
import { detectSettings } from 'src/components/settings/server';
import { defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context'; 

import App from './app';

// ✅ CORREÇÃO DE DEPLOY: Necessário Node.js runtime para suportar a árvore complexa de Providers e i18n
export const runtime = 'nodejs'; 

const AuthProvider = JwtAuthProvider;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primaryColor.main,
};

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl), 
  title: {
    default: 'ASPPIBRA - Governança Digital e Infraestrutura RWA',
    template: `%s | ASPPIBRA`, 
  },
  description: 'Portal de Governança Digital ASPPIBRA: Infraestrutura para ativos reais (RWA), integração nativa DeFi, Blockchain e inteligência de dados aplicada ao agronegócio sustentável.',
  keywords: [
    'ASPPIBRA', 'RWA', 'Real World Assets', 'DeFi', 'Blockchain Agro', 
    'Governança Digital', 'DAO', 'IPFS Storage', 'Smart Contracts', 'Sustentabilidade'
  ],
  authors: [{ name: 'Sandro', url: CONFIG.siteUrl }],
  icons: [
    { rel: 'icon', url: `/favicon.ico` },
    { rel: 'apple-touch-icon', url: `/apple-touch-icon.png` },
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: CONFIG.siteUrl,
    siteName: 'ASPPIBRA DAO',
    images: [
      {
        url: '/opengraph-image.png', // Conecta com o gerador dinâmico que revisamos
        width: 1200,
        height: 630,
        alt: 'ASPPIBRA Governance Portal - Deep Tech RWA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASPPIBRA - Infraestrutura RWA & DeFi',
    description: 'Conectando o agronegócio brasileiro à economia digital descentralizada.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

async function getAppConfig() {
  const lang = await detectLanguage();
  const settings = await detectSettings();

  return {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    i18nLang: lang, 
    cookieSettings: settings,
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const appConfig = await getAppConfig();

  return (
    <html lang={appConfig.lang} dir={appConfig.dir} suppressHydrationWarning>
      <head>
        {/* Schema.org estruturado para validar a organização perante VCs e Google */}
        <JsonLd 
          schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ASPPIBRA Governance Portal",
            "alternateName": "ASPPIBRA DAO",
            "url": CONFIG.siteUrl,
            "description": "Plataforma de governança digital e tokenização de ativos reais (RWA)."
          }} 
        />
      </head>
      <body>
        <InitColorSchemeScript
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
          defaultMode={themeConfig.defaultMode}
        />

        <I18nProvider lang={appConfig.i18nLang}>
          <AuthProvider>
            <SettingsProvider
              defaultSettings={defaultSettings}
              cookieSettings={appConfig.cookieSettings}
            >
              <LocalizationProvider>
                <AppRouterCacheProvider options={{ key: 'css' }}>
                  <App>{children}</App>
                </AppRouterCacheProvider>
              </LocalizationProvider>
            </SettingsProvider>
          </AuthProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}