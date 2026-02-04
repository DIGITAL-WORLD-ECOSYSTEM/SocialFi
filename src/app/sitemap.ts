
import { MetadataRoute } from 'next';
import { _allPosts } from 'src/_mock/_blog';
import { paths } from 'src/routes/paths';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = 'https://www.example.com'; // 🔄 SUBSTITUA PELA SUA URL DE PRODUÇÃO

  // Rotas Estáticas
  const staticRoutes = [
    '', 
    paths.post.root, 
    // Adicione outras rotas estáticas aqui
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Rotas Dinâmicas (Blog)
  const dynamicRoutes = _allPosts.map((post) => ({
    url: `${URL}${paths.post.details(post.title)}`,
    lastModified: new Date(post.createdAt).toISOString(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
