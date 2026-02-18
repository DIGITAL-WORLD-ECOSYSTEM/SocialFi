/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Post List View (Client-Side Filtering & Search)
 * Version: 1.5.6 - Refactored: UI/Logic Decoupling & Hydration Safety
 */

'use client';

import type { IPostItem } from 'src/types/blog';

import { orderBy } from 'es-toolkit';
import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { BlogLayout } from 'src/layouts/blog';
import { useGetPosts } from 'src/actions/blog';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostSort } from '../components/post-sort';
import { PostSearch } from '../components/post-search';
import { PostListHorizontal } from '../item/list-horizontal';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = ['all', 'published', 'draft'] as const;

type PublishType = (typeof PUBLISH_OPTIONS)[number];

type SortType = 'latest' | 'oldest' | 'popular';

/**
 * 🟢 VIEW FILTERS:
 * Tipo customizado para a UI. Resolve o conflito onde a interface espera
 * booleano (publish: true/false) mas as Tabs usam strings ('all', 'published', 'draft').
 */
type ViewFilters = {
  publish: PublishType;
};

// ----------------------------------------------------------------------

type Props = {
  posts?: IPostItem[];
};

export function PostListView({ posts: initialPosts }: Props) {
  // Hook de busca de dados (SWR/React Query pattern)
  const { posts: fetchedPosts, postsLoading } = useGetPosts();
  
  /**
   * ✅ ESTABILIDADE DE DADOS:
   * Priorizamos initialPosts (vindos do SSR sanitizado) para evitar flickering.
   */
  const posts = useMemo(() => initialPosts || fetchedPosts || [], [initialPosts, fetchedPosts]);

  const [sortBy, setSortBy] = useState<SortType>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * ✅ ESTADO DE FILTRO (useSetState):
   * Gerencia as abas de publicação usando o tipo ViewFilters, 
   * mantendo a integridade das strings da UI.
   */
  const { state, setState } = useSetState<ViewFilters>({
    publish: 'all',
  });

  /**
   * 📊 CONTADORES (MEMOIZADOS):
   * Calcula a quantidade de posts por status para exibir nos labels das abas.
   */
  const publishCounts = useMemo(
    () => ({
      all: posts.length,
      published: posts.filter((post) => post.publish).length,
      draft: posts.filter((post) => !post.publish).length,
    }),
    [posts]
  );

  /**
   * 🔍 BUSCA (MEMOIZADA):
   * Filtra a base de posts conforme o termo digitado no componente PostSearch.
   */
  const searchResults = useMemo(() => {
    if (!searchQuery) return posts;
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  /**
   * 🛠️ FILTRAGEM FINAL:
   * Aplica a lógica de ordenação e filtros de status sobre os resultados da busca.
   */
  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: searchResults,
        filters: state,
        sortBy,
      }),
    [searchResults, state, sortBy]
  );

  const handleFilterPublish = useCallback(
    (_event: React.SyntheticEvent, newValue: PublishType) => {
      setState({ publish: newValue });
    },
    [setState]
  );

  return (
    <BlogLayout>
      <CustomBreadcrumbs
        heading="Lista de Conteúdos"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: 'Lista' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Novo Post
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box
        sx={{
          gap: 3,
          display: 'flex',
          mb: { xs: 3, md: 5 },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-end', sm: 'center' },
        }}
      >
        <PostSearch
          query={searchQuery}
          results={searchResults}
          onSearch={setSearchQuery}
          redirectPath={(title: string) => paths.dashboard.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={setSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Box>

      {/* 📑 ABAS DE NAVEGAÇÃO: Filtro por status de publicação */}
      <Tabs 
        value={state.publish} 
        onChange={handleFilterPublish} 
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {PUBLISH_OPTIONS.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            iconPosition="end"
            label={tab}
            icon={
              <Label
                variant={tab === 'all' || tab === state.publish ? 'filled' : 'soft'}
                color={tab === 'published' ? 'info' : 'default'}
                sx={{ textTransform: 'capitalize' }}
              >
                {publishCounts[tab]}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      {/* 📜 LISTAGEM: Renderiza os cards horizontais com estado de loading */}
      <PostListHorizontal 
        posts={dataFiltered} 
        loading={postsLoading && posts.length === 0} 
      />
    </BlogLayout>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPostItem[];
  filters: ViewFilters;
  sortBy: SortType;
};

/**
 * ⚙️ ENGINE DE FILTRAGEM:
 * Função pura que traduz as seleções da UI em transformações nos dados.
 */
function applyFilter({ inputData, filters, sortBy }: ApplyFilterProps) {
  let data = [...inputData];

  const { publish } = filters;

  // Aplicação de Ordenação
  switch (sortBy) {
    case 'latest':
      data = orderBy(data, ['createdAt'], ['desc']);
      break;
    case 'oldest':
      data = orderBy(data, ['createdAt'], ['asc']);
      break;
    case 'popular':
      data = orderBy(data, ['totalViews'], ['desc']);
      break;
    default:
      break;
  }

  // ✅ TRADUÇÃO UI -> DATA:
  // Converte a string da Tab para o filtro booleano esperado pelo dado original.
  if (publish === 'published') {
    data = data.filter((post) => post.publish);
  }
  if (publish === 'draft') {
    data = data.filter((post) => !post.publish);
  }

  return data;
}