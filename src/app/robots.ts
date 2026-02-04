import type { MetadataRoute } from 'next';
import { CONFIG } from 'src/global-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // Bloqueia rotas de backend
          '/dashboard/',  // Bloqueia área logada (SEO Cleanup)
          '/auth/',       // Bloqueia páginas de login/registro
          '/_next/',      // Bloqueia arquivos internos do framework
          '/static/',     // Bloqueia assets que não precisam de indexação direta
        ],
      },
      {
        userAgent: 'GPTBot', // Exemplo de controle para robôs de IA
        disallow: ['/post/'], // Protege seus artigos de serem minerados, se desejar
      }
    ],
    sitemap: `${CONFIG.site.baseUrl}/sitemap.xml`,
  };
}
