
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; // <--- OBRIGATÓRIO para alinhar com o resto do site
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { getPosts } from 'src/actions/blog-ssr';

import { PostItem, PostItemLatest } from './item';

// ----------------------------------------------------------------------

export async function Tecnologia() {
  // 1. Busca os dados
  const data = await getPosts();

  // Extração segura do array
  const allPosts = Array.isArray(data) ? data : data?.posts || [];

  // 2. Filtra pela categoria 'Tecnologia'
  const tecnologiaPosts = allPosts.filter((post: any) => post.category === 'Tecnologia');

  // 3. Lógica de Layout (Garantir 7 itens: 3 em cima + 4 embaixo)
  // Se tiver menos de 7 posts reais, duplicamos para preencher o grid visualmente
  const viewPosts = tecnologiaPosts.length < 7 && tecnologiaPosts.length > 0
    ? [...tecnologiaPosts, ...tecnologiaPosts, ...tecnologiaPosts].slice(0, 7)
    : tecnologiaPosts.slice(0, 7);

  // Se não houver post nenhum, retorna null para não quebrar a tela
  if (!viewPosts.length) return null;

  return (
    <Box
      id="tecnologia"
      sx={{
        py: { xs: 8, md: 10 },
        // bgcolor: 'background.neutral', // Tecnologia geralmente não tem fundo cinza intercalado, mas se quiser, pode descomentar
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
          Tecnologia
        </Typography>

        <Grid container spacing={3}>
          
          {/* --- LINHA 1: Destaques (3 Itens) --- */}
          {/* Regra: 1º item ocupa 50% (lg=6), os outros dois 25% (lg=3) */}
          {viewPosts.slice(0, 3).map((post: any, index: number) => (
            <Grid
              key={`tec-top-${post.id}-${index}`}
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
              key={`tec-mb-${post.id}-${index}`}
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
              key={`tec-list-${post.id}-${index}`}
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