'use client';

import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';

import { PostItemSkeleton } from './skeleton';
import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  loading?: boolean;
};

export function PostTrending({ posts, loading }: Props) {
  
  // SOLUÇÃO: Se tiver menos de 7 posts, duplicamos eles para preencher o layout visualmente
  // Quando você tiver dados reais suficientes no backend, pode remover essa linha.
  const viewPosts = posts.length < 7 ? [...posts, ...posts] : posts;

  const renderLoading = () => (
    <Box
      sx={{
        gap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
      }}
    >
      <PostItemSkeleton />
    </Box>
  );

  const renderList = () => (
    <Grid container spacing={3}>
      {/* Título da Secção */}
      <Grid size={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>Artigos em Alta</Typography>
      </Grid>

      {/* Destaque da Alta: Os 3 primeiros posts */}
      {viewPosts.slice(0, 3).map((post, index) => (
        <Grid
          key={`${post.id}-${index}-lg`} // Adicionei index na key para evitar erro de duplicata no React
          sx={{ display: { xs: 'none', lg: 'block' } }}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: index === 0 ? 6 : 3,
          }}
        >
          <PostItemLatest post={post} index={index} detailsHref={paths.post.details(post.title)} />
        </Grid>
      ))}

      {/* Versão Mobile/Tablet para os 3 primeiros */}
      {viewPosts.slice(0, 3).map((post, index) => (
        <Grid
          key={`${post.id}-${index}-mb`}
          sx={{ display: { lg: 'none' } }}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <PostItem post={post} detailsHref={paths.post.details(post.title)} />
        </Grid>
      ))}

      {/* Restante da lista: Exatamente 4 cards agora */}
      {/* Pegamos do índice 3 ao 7 do array expandido */}
      {viewPosts.slice(3, 7).map((post, index) => (
        <Grid
          key={`${post.id}-${index}-rest`}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <PostItem post={post} detailsHref={paths.post.details(post.title)} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ mt: 8 }}>
      {loading ? renderLoading() : renderList()}

      {viewPosts.length > 7 && (
        <Stack sx={{ mt: 8, alignItems: 'center' }}>
          <Button
            size="large"
            variant="outlined"
            startIcon={<CircularProgress size={18} color="inherit" />}
          >
            Ver mais tendências
          </Button>
        </Stack>
      )}
    </Box>
  );
}