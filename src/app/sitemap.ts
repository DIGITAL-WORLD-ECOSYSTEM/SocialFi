import type { MetadataRoute } from 'next';

// 🟢 CORREÇÃO 1: O erro 2724 avisou que o nome correto exportado é _posts
import { _posts } from 'src/_mock/_blog'; 
import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🟢 CORREÇÃO 2: Erro 2339 resolvido usando siteUrl (como definido no global-config.ts)
  const URL = CONFIG.siteUrl; 

  // Rotas Estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${URL}${paths.post.root}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 🟢 CORREÇÃO 3: Erro 7006 resolvido mapeando o array correto (_posts) 
  // e garantindo que o tipo 'post' seja reconhecido
  const postRoutes: MetadataRoute.Sitemap = _posts.map((post) => ({
    url: `${URL}${paths.post.details(post.title)}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}