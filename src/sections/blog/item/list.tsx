'use client';

import type { IPostItem } from 'src/types/blog';

import Grid from '@mui/material/Grid';

import { PostItem } from './item';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
};

export function PostList({ posts }: Props) {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid
          key={post.id}
          // CORREÇÃO: Removemos 'item' e usamos 'size' para definir as larguras
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <PostItem post={post} detailsHref={`/post/${post.title}`} />
        </Grid>
      ))}
    </Grid>
  );
}