import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

/**
 * Skeleton para a grelha de posts (Secções 6 e 7)
 * Essencial para evitar Layout Shift durante o carregamento progressivo.
 */
export function PostItemSkeleton() {
  return (
    <Stack spacing={2}>
      {/* Imagem com proporção 4/3 para alinhar com os cards reais */}
      <Skeleton 
        variant="rectangular" 
        sx={{ 
          width: 1, 
          borderRadius: 2, 
          paddingTop: '75%', // Mantém o rácio 4:3
          position: 'relative' 
        }} 
      />

      <Stack spacing={1} sx={{ px: 1 }}>
        {/* Badge/Data */}
        <Skeleton variant="text" sx={{ width: 0.4, height: 12 }} />
        
        {/* Título (duas linhas para simular densidade) */}
        <Skeleton variant="text" sx={{ width: 1, height: 24 }} />
        <Skeleton variant="text" sx={{ width: 0.8, height: 24 }} />

        {/* Rodapé: Avatar + Nome do Autor */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={60} height={12} />
        </Stack>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

/**
 * Skeleton para a página de detalhes do post
 */
export function PostDetailsSkeleton() {
  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Skeleton variant="rectangular" width="100%" height={480} sx={{ borderRadius: 2 }} />
      <Stack sx={{ mt: 5 }} spacing={3}>
        <Skeleton variant="text" width="80%" height={40} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
      </Stack>
    </Container>
  );
}