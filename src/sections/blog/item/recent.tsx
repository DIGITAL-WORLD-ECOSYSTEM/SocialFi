'use client';

import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';

import { PostItem } from './item';
import { PostItemSkeleton } from './skeleton';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  loading?: boolean;
};

/**
 * Secção 6: Recentes (PostRecent)
 * Grelha principal de artigos com suporte a Grid v6 e Load More.
 */
export function PostRecent({ posts, loading }: Props) {
  
  const renderLoading = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <PostItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );

  const renderList = () => (
    <Grid container spacing={3}>
      {/* Título da Secção Editorial */}
      <Grid size={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Artigos Recentes
        </Typography>
      </Grid>

      {/* Listagem de Posts em 4 colunas (LG: 3) */}
      {posts.map((post) => (
        <Grid 
          key={post.id} 
          size={{ 
            xs: 12, 
            sm: 6, 
            md: 4, 
            lg: 3 
          }}
        >
          <PostItem 
            post={post} 
            detailsHref={paths.post.details(post.title)} 
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      {loading ? renderLoading() : renderList()}

      {/* Botão Load More: Ativado se houver mais de 8 posts */}
      {posts.length >= 8 && (
        <Stack sx={{ mt: 8, alignItems: 'center' }}>
          <Button
            size="large"
            variant="outlined"
            color="inherit"
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            sx={{ 
              px: 5,
              borderColor: 'text.primary',
              '&:hover': { bgcolor: 'text.primary', color: 'background.paper' }
            }}
          >
            Carregar mais artigos
          </Button>
        </Stack>
      )}
    </>
  );
}