'use client';

import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';

import { PostItemSkeleton } from './post-skeleton';
import { PostItem, PostItemLatest } from './post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  loading?: boolean;
};

// Renomeamos para PostTrending para alinhar com o nosso plano de 8 seções
export function PostTrending({ posts, loading }: Props) {
  
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
      {/* Título da Secção para dar contexto ao utilizador */}
      <Grid size={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>Artigos em Alta</Typography>
      </Grid>

      {/* Destaque da Alta: Os 3 primeiros posts com layout diferenciado */}
      {posts.slice(0, 3).map((post, index) => (
        <Grid
          key={post.id}
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
      {posts.slice(0, 3).map((post) => (
        <Grid
          key={post.id}
          sx={{ display: { lg: 'none' } }}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <PostItem post={post} detailsHref={paths.post.details(post.title)} />
        </Grid>
      ))}

      {/* Restante da lista "Trending" */}
      {posts.slice(3, 8).map((post) => ( // Limitamos a 8 itens para não sobrecarregar a secção de tendência
        <Grid
          key={post.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <PostItem post={post} detailsHref={paths.post.details(post.title)} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ mt: 8 }}> {/* Espaçamento superior para separar da Secção 6 */}
      {loading ? renderLoading() : renderList()}

      {posts.length > 8 && (
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