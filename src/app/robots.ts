import type { MetadataRoute } from 'next';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // Bloqueia rotas de backend (melhor prática 2026)
          '/dashboard/',  // Evita desperdício de "Crawl Budget" em áreas logadas
          '/auth/',       // Protege fluxos de autenticação
          '/_next/',      // Bloqueia arquivos internos do Next.js
          '/static/',     // Bloqueia assets que não precisam de indexação direta
        ],
      },
      {
        userAgent: 'GPTBot', // Proteção contra rastreio agressivo de IAs
        disallow: ['/post/'], 
      }
    ],
    // 🟢 CORREÇÃO: Usando a propriedade siteUrl que definimos no global-config.ts
    sitemap: `${CONFIG.siteUrl}/sitemap.xml`,
  };
}