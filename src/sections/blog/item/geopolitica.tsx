import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; // <--- Essencial para centralizar
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { getPosts } from 'src/actions/blog-ssr';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

export async function Geopolitica() {
  // 1. Busca os dados
  const data = await getPosts();

  // Extração segura do array
  const allPosts = Array.isArray(data) ? data : data?.posts || [];

  // 2. Filtra pela categoria 'Geopolítica'
  const geopoliticaPosts = allPosts.filter((post: any) => post.category === 'Geopolítica');

  // 3. Lógica de Preenchimento (Garantir 7 itens: 3 destaque + 4 lista)
  const viewPosts = geopoliticaPosts.length < 7 && geopoliticaPosts.length > 0
    ? [...geopoliticaPosts, ...geopoliticaPosts, ...geopoliticaPosts].slice(0, 7)
    : geopoliticaPosts.slice(0, 7);

  // Se não houver dados, retorna null para não quebrar a UI
  if (!viewPosts.length) return null;

  return (
    <Box
      id="geopolitica"
      sx={{
        py: { xs: 8, md: 10 },
        // Sem bgcolor aqui para alternar com a seção anterior (Meio Ambiente) que era cinza
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            mb: 8,
            textAlign: 'center',
          }}
        >
          Geopolítica
        </Typography>

        <Grid container spacing={3}>
          
          {/* --- LINHA 1: Destaques (3 Itens) --- */}
          {/* Item 0 = 50% largura (lg=6), Itens 1 e 2 = 25% (lg=3) */}
          {viewPosts.slice(0, 3).map((post: any, index: number) => (
            <Grid
              key={`geo-top-${post.id}-${index}`}
              sx={{ display: { xs: 'none', lg: 'block' } }}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: index === 0 ? 6 : 3,
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
              key={`geo-mb-${post.id}-${index}`}
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
              key={`geo-list-${post.id}-${index}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }} // 4 colunas em telas grandes
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