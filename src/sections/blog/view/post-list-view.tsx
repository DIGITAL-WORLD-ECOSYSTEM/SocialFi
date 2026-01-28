'use client';

import type { IPostItem, IPostFilters } from 'src/types/blog';

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

// ----------------------------------------------------------------------

export function PostListView() {
  const { posts, postsLoading } = useGetPosts();

  // 🔹 Ordenação tipada
  const [sortBy, setSortBy] = useState<SortType>('latest');

  // 🔹 Busca controlada (necessária para o PostSearch)
  const [searchQuery, setSearchQuery] = useState('');

  // 🔹 Filtros
  const { state, setState } = useSetState<IPostFilters>({
    publish: 'all',
  });

  // ----------------------------------------------------------------------
  // 🔹 Contadores memorizados (evita múltiplos filter no render)
  const publishCounts = useMemo(() => ({
      all: posts.length,
      published: posts.filter((post) => post.publish === 'published').length,
      draft: posts.filter((post) => post.publish === 'draft').length,
    }), [posts]);

  // ----------------------------------------------------------------------
  // 🔹 Resultados da busca
  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  // ----------------------------------------------------------------------
  // 🔹 Dados finais filtrados e ordenados
  const dataFiltered = useMemo(() => applyFilter({
      inputData: searchResults,
      filters: state,
      sortBy,
    }), [searchResults, state, sortBy]);

  // ----------------------------------------------------------------------
  const handleFilterPublish = useCallback(
    (_event: React.SyntheticEvent, newValue: PublishType) => {
      setState({ publish: newValue });
    },
    [setState]
  );

  // ----------------------------------------------------------------------

  return (
    <BlogLayout>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Add post
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Toolbar */}
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

        <PostSort
          sort={sortBy}
          onSort={setSortBy}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Box>

      {/* Tabs */}
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
                variant={
                  tab === 'all' || tab === state.publish ? 'filled' : 'soft'
                }
                color={tab === 'published' ? 'info' : 'default'}
              >
                {publishCounts[tab]}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      {/* Lista */}
      <PostListHorizontal posts={dataFiltered} loading={postsLoading} />
    </BlogLayout>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPostItem[];
  filters: IPostFilters;
  sortBy: SortType;
};

function applyFilter({ inputData, filters, sortBy }: ApplyFilterProps) {
  let data = [...inputData];

  const { publish } = filters;

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

  if (publish !== 'all') {
    data = data.filter((post) => post.publish === publish);
  }

  return data;
}
