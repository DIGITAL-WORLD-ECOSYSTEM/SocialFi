import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const POST_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'Rascunho' },
];

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Mais recentes' },
  { value: 'popular', label: 'Populares' },
  { value: 'oldest', label: 'Antigos' },
];

// CORREÇÃO LINT: Adicionado 'export' para resolver o aviso de variável não utilizada.
// Agora essa lista pode ser importada na Sidebar ou nos Filtros se necessário.
export const POST_CATEGORIES = [
  'Economia', 
  'Tecnologia', 
  'Meio Ambiente', 
  'Geopolítica',
  'Economia', // Repetimos para dar peso maior
  'Tecnologia'
];

// Títulos expandidos para garantir volume de dados (24 títulos)
const POST_TITLES = [
  // ECONOMIA / GERAL
  'Bitcoin rompe barreira histórica: O que esperar para o próximo trimestre?',
  'Inflação Global e Bitcoin: A reserva de valor definitiva?',
  'O impacto das taxas de juros do FED no mercado cripto',
  'Tokenização de Ativos Reais (RWA): O futuro da economia global',
  'Dólar Digital vs. Euro Digital: A corrida das CBDCs',
  'Análise Macro: Como a recessão técnica afeta o DeFi',
  
  // TECNOLOGIA
  'Análise: Por que a Layer 2 da Ethereum está dominando o mercado?',
  'Solana vs. Aptos: A batalha pela escalabilidade em tempo real',
  'Entenda o algoritmo de consenso da nova rede modular Celestia',
  'Tutorial: Criando seu primeiro bot de trading na rede Arbitrum',
  'Inteligência Artificial e Blockchain: A convergência de 2026',
  'Segurança em Smart Contracts: Novas ferramentas de auditoria',

  // MEIO AMBIENTE
  'Mineração Sustentável: O uso de energia vulcânica em El Salvador',
  'Créditos de Carbono na Blockchain: Transparência real?',
  'O impacto ambiental dos NFTs: Mitos e verdades em 2026',
  'Protocolos Verdes: Redes Proof-of-Stake com pegada negativa',
  'Agrofloresta e Web3: Financiando o campo com tokens',
  'ESG e Criptoativos: Como grandes fundos estão se posicionando',

  // GEOPOLÍTICA
  'O impacto das novas regulamentações de stablecoins na Europa (MiCA)',
  'China e o retorno silencioso ao mercado de criptoativos',
  'Adoção em massa na América Latina: O caso do Brasil e Argentina',
  'Sanções Econômicas e o uso de Cripto na Rússia e Irã',
  'Eleições nos EUA: O que cada candidato propõe para o Bitcoin',
  'O papel das criptomoedas em zonas de conflito geopolítico',
];

// ----------------------------------------------------------------------

export const _posts = POST_TITLES.map((title, index) => {
  // Distribui as categorias ciclicamente baseada no índice
  // Ex: 0=Economia, 1=Tecnologia, 2=Meio Ambiente, 3=Geopolítica, etc.
  const categoryIndex = index % 4; 
  // Forçamos as categorias principais para garantir que os filtros funcionem
  const categoriesMap = ['Economia', 'Tecnologia', 'Meio Ambiente', 'Geopolítica'];
  const category = categoriesMap[categoryIndex];

  return {
    id: _mock.id(index),
    title,
    category, // Categoria garantida
    description: 'This is a mock description.',
    content: 'This is mock content.',
    coverUrl: _mock.image.cover(index),
    // CORREÇÃO: Convertido para boolean para alinhar com a interface IPostItem
    publish: index % 10 !== 0,
    createdAt: _mock.time(index),
    totalViews: _mock.number.nativeL(index),
    totalShares: _mock.number.nativeL(index + 1),
    totalComments: _mock.number.nativeL(index + 2),
    totalFavorites: _mock.number.nativeL(index + 3),
    tags: ['BTC', 'Crypto', 'Trading', 'Web3', 'DeFi'].slice(0, (index % 4) + 2),
    metaTitle: title,
    metaDescription: 'This is a mock meta description.',
    metaKeywords: ['crypto', 'news', 'analysis'],
    author: {
      name: _mock.fullName(index),
      avatarUrl: _mock.image.avatar(index),
    },
    favoritePerson: [...Array(5)].map((_, i) => ({
      name: _mock.fullName(i),
      avatarUrl: _mock.image.avatar(i),
    })),
    comments: [...Array(3)].map((_, i) => ({
      id: _mock.id(i),
      name: _mock.fullName(i),
      avatarUrl: _mock.image.avatar(i),
      message: 'This is a mock sentence.',
      postedAt: _mock.time(i),
      users: [{ id: _mock.id(i), name: _mock.fullName(i), avatarUrl: _mock.image.avatar(i) }],
      replyComment: [],
    })),
  };
});