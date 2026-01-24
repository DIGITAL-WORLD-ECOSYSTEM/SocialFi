// src/actions/blog-ssr.ts

// 1. Obtém a URL do Backend configurada no .env.local e Vercel
const API_URL = process.env.NEXT_PUBLIC_HOST_API;

// ----------------------------------------------------------------------

/**
 * BUSCA PRINCIPAL: Retorna todos os posts da API Real.
 */
export async function getPosts() {
  try {
    // 'no-store' garante que o Next.js não mostre dados velhos (Cache)
    const url = `${API_URL}/api/posts`;
    console.log('📡 Fetching GET:', url);

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.warn(`⚠️ API respondeu com status: ${res.status}`);
      return { posts: [] };
    }

    const data = await res.json();

    // Garante retorno seguro (Array) mesmo se a API mudar formato
    const posts = Array.isArray(data) ? data : (data.posts || []);

    return { posts };

  } catch (error) {
    console.error('🚨 Erro ao conectar com o Backend (getPosts):', error);
    return { posts: [] };
  }
}

// ----------------------------------------------------------------------

/**
 * BUSCA INDIVIDUAL: Pega um post específico pelo Título/Slug.
 */
export async function getPost(paramTitle: string) {
  try {
    // Normaliza para garantir que a URL esteja limpa
    const slug = encodeURIComponent(paramTitle);
    const url = `${API_URL}/api/posts/${slug}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) return { post: null };

    const data = await res.json();

    return { post: data };

  } catch (error) {
    console.error(`🚨 Erro ao buscar post "${paramTitle}":`, error);
    return { post: null };
  }
}

// ----------------------------------------------------------------------

/**
 * BUSCA RELACIONADOS: Tenta buscar os últimos posts (menos o atual).
 */
export async function getLatestPosts(paramTitle: string) {
  try {
    // Busca todos para filtrar localmente (ou use um endpoint /latest se criar no back)
    const url = `${API_URL}/api/posts`;
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) return { latestPosts: [] };

    const data = await res.json();
    const allPosts = Array.isArray(data) ? data : (data.posts || []);

    // Filtra o post atual da lista de "mais recentes"
    const latestPosts = allPosts
      .filter((p: any) => p.paramTitle !== paramTitle && p.slug !== paramTitle)
      .slice(0, 4);

    return { latestPosts };

  } catch (error) {
    return { latestPosts: [] };
  }
}

// ----------------------------------------------------------------------

/**
 * BUSCA POR CATEGORIA: Filtra no Backend via Query String.
 */
export async function getPostsByCategory(category: string) {
  try {
    const url = `${API_URL}/api/posts?category=${encodeURIComponent(category)}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) return { posts: [] };

    const data = await res.json();
    const posts = Array.isArray(data) ? data : (data.posts || []);

    return { posts };

  } catch (error) {
    console.error('Erro getPostsByCategory:', error);
    return { posts: [] };
  }
}