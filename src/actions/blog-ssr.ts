import { _mock } from 'src/_mock/_mock';
import { _id, _postTitles, _descriptions, _fullNames, _sentences } from 'src/_mock/assets';

// ----------------------------------------------------------------------

/**
 * GERADOR DE DADOS: Aumentamos para 20 itens para preencher as 8 secções do portal.
 * Adicionámos o campo 'category' para monitorização.
 */
const CATEGORIES = ['Análise', 'Notícias', 'Vídeo', 'Comunidade', 'DEX', 'Altcoins'];

const _posts = Array.from({ length: 20 }, (_, index) => ({
  id: _id[index] || `post-${index}`,
  author: {
    name: _fullNames[index] || 'Autor Desconhecido',
    avatarUrl: _mock.image.avatar(index),
  },
  category: CATEGORIES[index % CATEGORIES.length], // Distribui categorias dinamicamente
  comments: [],
  comment: (index === 2 && 8) || (index === 3 && 12) || 2,
  coverUrl: _mock.image.cover(index),
  createdAt: _mock.time(index),
  description: _descriptions[index] || 'Sem descrição disponível.',
  favorite: _mock.number.nativeL(index),
  favoritePerson: Array.from({ length: 8 }, (__, i) => ({
    name: _fullNames[i + 8],
    avatarUrl: _mock.image.avatar(i + 8),
  })),
  message: _sentences[index],
  share: _mock.number.nativeL(index),
  tags: ['Bitcoin', 'Ethereum', 'Solana', 'Web3', 'Blockchain'].slice(0, _mock.number.nativeS(index)),
  title: _postTitles[index] || `Notícia Cripto #${index}`,
  view: _mock.number.nativeL(index),
  publish: 'published',
  content: (_sentences[index + 1] || '') + (_sentences[index + 2] || ''),
  metaTitle: _postTitles[index],
  metaDescription: _descriptions[index],
  metaKeywords: ['Cripto', 'Monitorização', 'DEX World'],
  // Campos utilizados nas Secções 6 e 7
  totalViews: _mock.number.nativeL(index),
  totalShares: _mock.number.nativeL(index),
  totalComments: (index === 2 && 8) || (index === 3 && 12) || 2,
  totalFavorites: _mock.number.nativeL(index),
}));

// ----------------------------------------------------------------------

/**
 * BUSCA PRINCIPAL: Retorna todos os posts para a PostListHomeView.
 */
export async function getPosts() {
  // Simula latência da Cloudflare Edge
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  // Retornamos um objeto com a chave 'posts' para compatibilidade com a sua View
  return { posts: _posts };
}

// ----------------------------------------------------------------------

/**
 * BUSCA INDIVIDUAL: Utilizada na página de detalhes do artigo.
 */
export async function getPost(title: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const post = _posts.find((p) => p.title === title.replace(/-/g, ' '));
  
  return { post };
}

// ----------------------------------------------------------------------

/**
 * BUSCA RELACIONADOS: Utilizada no final de cada artigo.
 */
export async function getLatestPosts(title: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const latestPosts = _posts
    .filter((p) => p.title !== title.replace(/-/g, ' '))
    .slice(0, 4); // Reduzido para 4 para o widget lateral ou final

  return { latestPosts };
}