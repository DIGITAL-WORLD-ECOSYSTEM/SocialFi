// src/actions/blog-ssr.ts

// 1. Obtém a URL do Backend configurada no .env.local e Vercel
const API_URL = process.env.NEXT_PUBLIC_HOST_API;

// ----------------------------------------------------------------------

/**
 * BUSCA PRINCIPAL: Retorna todos os posts da API Real.
 */
export async function getPosts() {
  try {
    const url = `${API_URL}/api/posts`;
    
    // Otimização: No Next.js 15+, 'cache: no-store' deve ser acompanhado de 
    // export const dynamic = 'force-dynamic' no arquivo da página.
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.warn(`⚠️ API respondeu com status: ${res.status} em ${url}`);
      return { posts: [] };
    }

    const data = await res.json();
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
  if (!paramTitle) return { post: null };

  try {
    const slug = encodeURIComponent(paramTitle);
    const url = `${API_URL}/api/posts/${slug}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`❌ Post não encontrado: ${paramTitle}`);
      return { post: null };
    }

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
    // Reutiliza a lógica de busca para manter consistência
    const { posts } = await getPosts();
    
    if (!posts || posts.length === 0) return { latestPosts: [] };

    const latestPosts = posts
      .filter((p: any) => p.paramTitle !== paramTitle && p.slug !== paramTitle)
      .slice(0, 4);

    return { latestPosts };
  } catch (error) {
    console.error('🚨 Erro ao filtrar posts recentes:', error);
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
    console.error('🚨 Erro getPostsByCategory:', error);
    return { posts: [] };
  }
}