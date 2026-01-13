import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; // <--- IMPORTANTE: Importação nova
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { getPosts } from 'src/actions/blog-ssr';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

export async function Economia() {
  // 1. Busca os dados do Mock/API
  const data = await getPosts();
  
  // Extração segura do array
  const allPosts = Array.isArray(data) ? data : data?.posts || [];

  // 2. Filtra pela categoria 'Economia'
  const economiaPosts = allPosts.filter((post: any) => post.category === 'Economia');

  // 3. Lógica de Fallback e Preenchimento (Para garantir 7 itens no layout)
  const viewPosts = economiaPosts.length < 7 && economiaPosts.length > 0
    ? [...economiaPosts, ...economiaPosts, ...economiaPosts].slice(0, 7)
    : economiaPosts.slice(0, 7);

  // Se não houver nenhum post, não renderiza nada
  if (!viewPosts.length) return null;

  return (
    <Box
      id="economia"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.neutral',
      }}
    >
      {/* ADICIONEI O CONTAINER AQUI 
         Ele centraliza o conteúdo e segura as margens laterais 
      */}
      <Container> 
        <Typography
          variant="h3"
          sx={{
            mb: 8,
            textAlign: 'center',
          }}
        >
          Economia
        </Typography>

        <Grid container spacing={3}>
          
          {/* --- LINHA 1: Destaques (3 Itens) --- */}
          {viewPosts.slice(0, 3).map((post: any, index: number) => (
            <Grid
              key={`eco-top-${post.id}-${index}`}
              sx={{ display: { xs: 'none', lg: 'block' } }}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: index === 0 ? 6 : 3, // O 1º ocupa 50%, os outros 25%
              }}
            >
              <PostItemLatest 
                post={post} 
                index={index} 
                detailsHref={paths.post.details(post.title)} 
              />
            </Grid>
          ))}

          {/* Versão Mobile/Tablet para a Linha 1 */}
          {viewPosts.slice(0, 3).map((post: any, index: number) => (
            <Grid
              key={`eco-mb-${post.id}-${index}`}
              sx={{ display: { lg: 'none' } }}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <PostItem 
                post={post} 
                detailsHref={paths.post.details(post.title)} 
              />
            </Grid>
          ))}

          {/* --- LINHA 2: Lista Padrão (4 Itens) --- */}
          {viewPosts.slice(3, 7).map((post: any, index: number) => (
            <Grid
              key={`eco-list-${post.id}-${index}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }} // 4 itens por linha
            >
              <PostItem 
                post={post} 
                detailsHref={paths.post.details(post.title)} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}