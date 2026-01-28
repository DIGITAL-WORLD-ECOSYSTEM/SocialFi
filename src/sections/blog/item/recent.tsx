'use client';

import type { IPostItem } from 'src/types/blog';

import { useState } from 'react'; // Import necessário para controlar a quantidade

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'; // Import para alinhar as margens
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
 * Agora mostra apenas 4 posts inicialmente para evitar poluição visual.
 */
export function PostRecent({ posts, loading }: Props) {
  // Estado para controlar quantos posts aparecem. Começa com 4.
  const [viewLimit, setViewLimit] = useState(4);

  // Função para mostrar mais 4 posts ao clicar no botão
  const handleLoadMore = () => {
    setViewLimit((prev) => prev + 4);
  };

  const renderLoading = () => (
    <Grid container spacing={3}>
      {/* Mostramos apenas 4 skeletons carregando para não assustar o usuário */}
      {[...Array(4)].map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <PostItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );

  const renderList = () => (
    <Grid container spacing={3}>
      {/* Título da Secção */}
      <Grid size={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Artigos Recentes
        </Typography>
      </Grid>

      {/* Listagem LIMITADA pelo viewLimit (Slice) */}
      {posts.slice(0, viewLimit).map((post) => (
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
    <Container sx={{ mt: 10, mb: 10 }}> {/* Container adicionado para alinhar e dar espaçamento */}
      {loading ? renderLoading() : renderList()}

      {/* Botão Load More: 
          Só aparece se a quantidade de posts totais for maior que a quantidade visível 
      */}
      {posts.length > viewLimit && (
        <Stack sx={{ mt: 8, alignItems: 'center' }}>
          <Button
            size="large"
            variant="outlined"
            color="inherit"
            onClick={handleLoadMore} // Ativa a função de carregar mais
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
    </Container>
  );
}