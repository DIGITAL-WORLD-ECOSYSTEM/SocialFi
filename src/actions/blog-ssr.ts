import { _posts } from 'src/_mock/_blog';

// Utilitário para normalizar strings para comparação segura (remove acentos e caixa alta)
const normalize = (str: string) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// ----------------------------------------------------------------------

/**
 * BUSCA PRINCIPAL: Retorna todos os posts ordenados por data (mais recente primeiro).
 */
export async function getPosts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // CORREÇÃO: Garante ordenação cronológica decrescente
  const sortedPosts = [..._posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return { 
    posts: sortedPosts 
  };
}

// ----------------------------------------------------------------------

/**
 * BUSCA INDIVIDUAL: Melhora a lógica de match para tolerar variações de URL.
 */
export async function getPost(paramTitle: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // CORREÇÃO: Normaliza a URL para comparação (param-case -> clean string)
  const targetSlug = normalize(decodeURIComponent(paramTitle).replace(/-/g, ' '));

  const post = _posts.find((p) => {
    // Normaliza o título do banco de dados para comparar com o slug da URL
    const dbTitleNormalized = normalize(p.title);
    // Tenta match exato ou match parcial (para lidar com hífens originais vs hífens de slug)
    return dbTitleNormalized === targetSlug || dbTitleNormalized.replace(/-/g, ' ') === targetSlug;
  });
  
  return { 
    post: post || null 
  };
}

// ----------------------------------------------------------------------

/**
 * BUSCA RELACIONADOS: Garante que "latest" seja realmente cronológico.
 */
export async function getLatestPosts(paramTitle: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const targetSlug = normalize(decodeURIComponent(paramTitle).replace(/-/g, ' '));

  // CORREÇÃO: Filtra o atual E ordena por data antes de cortar
  const latestPosts = _posts
    .filter((p) => {
        const dbTitleNormalized = normalize(p.title);
        return dbTitleNormalized !== targetSlug && dbTitleNormalized.replace(/-/g, ' ') !== targetSlug;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return { 
    latestPosts 
  };
}

// ----------------------------------------------------------------------

/**
 * BUSCA POR CATEGORIA: Match insensível a caixa e acentos.
 */
export async function getPostsByCategory(category: string) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  const targetCategory = normalize(category);

  const filteredPosts = _posts.filter(
    (p) => normalize(p.category) === targetCategory
  );

  return { 
    posts: filteredPosts 
  };
}
