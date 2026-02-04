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
import { JsonLd } from 'src/components/seo/json-ld'; 

import App from './app';

export const runtime = 'edge'; 

const AuthProvider = JwtAuthProvider;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primaryColor.main,
};

// 🟢 CORREÇÃO SEO 2026: Usando CONFIG.siteUrl e corrigindo branding
export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl), 
  title: {
    default: 'ASPPIBRA - Associação dos Pequenos Produtores Integrados do Brasil',
    template: `%s | ASPPIBRA`, 
  },
  description: 'Conecte-se e gerencie sua produção com tecnologia e transparência.',
  keywords: ['ASPPIBRA', 'Agronegócio', 'Blockchain', 'Produtor Rural', 'Sustentabilidade'],
  icons: [
    { rel: 'icon', url: `/favicon.ico` },
    { rel: 'apple-touch-icon', url: `/apple-touch-icon.png` },
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: CONFIG.siteUrl,
    siteName: 'ASPPIBRA',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ASPPIBRA - Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
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
    // 🟢 CORREÇÃO ERRO 2322: O provider espera apenas a string do ID (ex: 'pt')
    i18nLang: lang, 
    cookieSettings: settings,
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const appConfig = await getAppConfig();

  return (
    <html lang={appConfig.lang} dir={appConfig.dir} suppressHydrationWarning>
      <head>
        {/* 🟢 CORREÇÃO: JsonLd usando a propriedade correta do CONFIG */}
        <JsonLd 
          schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "ASPPIBRA",
            "url": CONFIG.siteUrl
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