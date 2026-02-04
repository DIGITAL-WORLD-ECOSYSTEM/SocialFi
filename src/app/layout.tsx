import 'src/global.css';

import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { CONFIG } from 'src/global-config';
import { detectLanguage } from 'src/locales/server';
import { I18nProvider } from 'src/locales/i18n-provider';
import { LocalizationProvider } from 'src/locales';
import { themeConfig, primary as primaryColor } from 'src/theme';
import { detectSettings } from 'src/components/settings/server';
import { defaultSettings, SettingsProvider } from 'src/components/settings';
import { AuthProvider as JwtAuthProvider } from 'src/auth/context';
// Novo Componente de SEO que revisamos na árvore
import { JsonLd } from 'src/components/seo/json-ld'; 

import App from './app';

export const runtime = 'edge'; 

const AuthProvider = JwtAuthProvider;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primaryColor.main,
};

// 🟢 METADATA PROFISSIONAL 2026
export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.site.baseUrl), // Vital para links canônicos e OG images
  title: {
    default: 'SocialFi - Rede Social Descentralizada',
    template: `%s | SocialFi`, // Permite que páginas internas usem apenas o nome específico
  },
  description: 'Conecte-se, crie e monetize na nova era da internet. Construído com Next.js e Web3.',
  keywords: ['Web3', 'SocialFi', 'Blockchain', 'Rede Social', 'Cripto'],
  authors: [{ name: 'SocialFi Team' }],
  icons: [
    { rel: 'icon', url: `${CONFIG.assetsDir}/favicon.ico` },
    { rel: 'apple-touch-icon', url: `${CONFIG.assetsDir}/apple-touch-icon.png` },
  ],
  // Fallback para OpenGraph (Home)
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: CONFIG.site.baseUrl,
    siteName: 'SocialFi',
    images: [
      {
        url: '/opengraph-image', // Aponta para o seu arquivo src/app/opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: 'SocialFi - Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@socialfi',
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
    i18nLang: { id: lang, label: '', icon: '' },
    cookieSettings: settings,
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const appConfig = await getAppConfig();

  return (
    <html lang={appConfig.lang} dir={appConfig.dir} suppressHydrationWarning>
      <head>
        {/* 🟢 Injeção de Dados Estruturados Globais (SGE Ready) */}
        <JsonLd 
          schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SocialFi",
            "url": CONFIG.site.baseUrl
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
