'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

// Mock de dados baseado na sua referência visual
const AUTHORS = [
  { id: '1', name: 'Creator 1', role: 'Post title 1', avatarUrl: '' },
  { id: '2', name: 'Jane Doe', role: 'O guia em português...', avatarUrl: '/assets/images/portrait/portrait-1.webp' },
  { id: '3', name: 'Paulo Camargo', role: 'Você é pago para...', avatarUrl: '/assets/images/portrait/portrait-2.webp' },
  { id: '4', name: 'Tina Horn', role: 'O que de errado t...', avatarUrl: '/assets/images/portrait/portrait-3.webp' },
  { id: '5', name: 'Milly Lacerda', role: 'Políticas feminina...', avatarUrl: '/assets/images/portrait/portrait-4.webp' },
];

export function PostAuthors() {
  const theme = useTheme();

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
        Nossos Criadores
      </Typography>

      <Stack
        direction="row"
        spacing={3}
        sx={{
          pb: 3,
          overflowX: 'auto',
          scrollbarWidth: 'none', // Oculta scrollbar no Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Oculta scrollbar no Chrome/Safari
        }}
      >
        {AUTHORS.map((author) => (
          <Stack
            key={author.id}
            component={RouterLink}
            href={paths.post.details(author.name)} // Redireciona para o perfil/posts do autor
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              p: 2,
              minWidth: 240,
              borderRadius: 2,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: theme.transitions.create(['background-color', 'transform']),
              border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
              '&:hover': {
                transform: 'translateY(-4px)',
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <Avatar
              src={author.avatarUrl}
              alt={author.name}
              sx={{ width: 48, height: 48, border: `2px solid ${theme.palette.background.paper}` }}
            />

            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap sx={{ color: 'text.primary' }}>
                {author.name}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
                {author.role}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}