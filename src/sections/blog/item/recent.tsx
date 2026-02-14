'use client';

import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
// ✅ Importação do tipo para garantir a integridade
import type { IPostItem } from 'src/types/blog';

import { PostItem } from './item';

// ----------------------------------------------------------------------

// ✅ Adicionada interface de Props para receber os dados do componente pai
type Props = {
  posts?: IPostItem[];
};

export function PostRecent({ posts: postsFromProps }: Props) {
  const [viewLimit, setViewLimit] = useState(4);

  const handleLoadMore = () => {
    setViewLimit((prev) => prev + 4);
  };

  // ✅ Prioriza os posts vindos da API (via SSR) e usa os estáticos apenas como fallback
  const posts = (postsFromProps && postsFromProps.length > 0) 
    ? postsFromProps 
    : staticRecentPosts;

  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Artigos Recentes
          </Typography>
        </Grid>

        {posts.slice(0, viewLimit).map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <PostItem post={post as any} detailsHref={paths.post.details(post.title)} />
          </Grid>
        ))}
      </Grid>

      {posts.length > viewLimit && (
        <Stack sx={{ mt: 8, alignItems: 'center' }}>
          <Button
            size="large"
            variant="outlined"
            color="inherit"
            onClick={handleLoadMore}
            sx={{
              px: 5,
              borderColor: 'text.primary',
              '&:hover': { bgcolor: 'text.primary', color: 'background.paper' },
            }}
          >
            Carregar mais artigos
          </Button>
        </Stack>
      )}
    </Container>
  );
}

// ----------------------------------------------------------------------

// Fallback estático mantido para evitar que a tela fique vazia caso a API falhe
const staticRecentPosts = [
  { id: 'rec-1', title: 'Governança em DAOs: Lições aprendidas com os maiores protocolos', category: 'Tecnologia', coverUrl: '/assets/images/mock/cover/cover-12.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-12.webp' }, createdAt: new Date(), duration: '10 min de leitura' },
  { id: 'rec-2', title: 'Staking de Ethereum: Riscos e Recompensas após a atualização Shanghai', category: 'Economia', coverUrl: '/assets/images/mock/cover/cover-13.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-13.webp' }, createdAt: new Date(), duration: '8 min de leitura' },
  { id: 'rec-3', title: 'Criptomoedas e privacidade: Uma análise de Monero, Zcash e Grin', category: 'Tecnologia', coverUrl: '/assets/images/mock/cover/cover-14.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-14.webp' }, createdAt: new Date(), duration: '9 min de leitura' },
  { id: 'rec-4', title: 'O impacto da Web3 na indústria da música e direitos autorais', category: 'Economia', coverUrl: '/assets/images/mock/cover/cover-15.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-15.webp' }, createdAt: new Date(), duration: '7 min de leitura' },
  { id: 'rec-5', title: 'Ameaças de segurança em contratos inteligentes: Hacks e Prevenção', category: 'Tecnologia', coverUrl: '/assets/images/mock/cover/cover-16.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-16.webp' }, createdAt: new Date(), duration: '11 min de leitura' },
  { id: 'rec-6', title: 'Finanças Regenerativas (ReFi): Um novo paradigma para o desenvolvimento sustentável', category: 'Meio Ambiente', coverUrl: '/assets/images/mock/cover/cover-17.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-17.webp' }, createdAt: new Date(), duration: '10 min de leitura' },
  { id: 'rec-7', title: 'A competição entre as soluções de Camada 2: Optimism vs. Arbitrum', category: 'Tecnologia', coverUrl: '/assets/images/mock/cover/cover-18.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-18.webp' }, createdAt: new Date(), duration: '12 min de leitura' },
  { id: 'rec-8', title: 'A geopolítica da mineração de Bitcoin: Onde estão os maiores players?', category: 'Geopolítica', coverUrl: '/assets/images/mock/cover/cover-19.webp', author: { name: 'Equipe DEX', avatarUrl: '/assets/images/mock/avatar/avatar-19.webp' }, createdAt: new Date(), duration: '9 min de leitura' },
];