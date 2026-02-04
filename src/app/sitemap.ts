import { MetadataRoute } from 'next';
import { _allPosts } from 'src/_mock/_blog';
import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/global-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = CONFIG.site.baseUrl; // 🟢 Usa a URL centralizada do seu app

  // Rotas Estáticas com Prioridade e Frequência
  const staticRoutes = [
    {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0, // Home é a página mais importante
    },
    {
      url: `${URL}${paths.post.root}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Listagem de posts
    },
  ];

  // Rotas Dinâmicas (Blog)
  const dynamicRoutes = _allPosts.map((post) => ({
    url: `${URL}${paths.post.details(post.title)}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'monthly' as const, // Posts individuais mudam menos
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
