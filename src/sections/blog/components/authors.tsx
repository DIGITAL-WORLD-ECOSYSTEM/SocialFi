'use client';

import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const AUTHORS = [
  { id: '1', name: 'Creator 1', role: 'Análise de Mercado', avatarUrl: '' },
  { id: '2', name: 'Jane Doe', role: 'Guia de Airdrops', avatarUrl: '/assets/images/portrait/portrait-1.webp' },
  { id: '3', name: 'Paulo Camargo', role: 'Estrategista DeFi', avatarUrl: '/assets/images/portrait/portrait-2.webp' },
  { id: '4', name: 'Tina Horn', role: 'NFT Specialist', avatarUrl: '/assets/images/portrait/portrait-3.webp' },
  { id: '5', name: 'Milly Lacerda', role: 'Web3 Developer', avatarUrl: '/assets/images/portrait/portrait-4.webp' },
  { id: '6', name: 'Lucas Silva', role: 'Macro Trader', avatarUrl: '/assets/images/portrait/portrait-5.webp' },
];

export function PostAuthors() {
  const theme = useTheme();

  const renderAuthorCard = (author: typeof AUTHORS[0], index: number, rowIndex: number) => (
    <Stack
      key={`${rowIndex}-${index}-${author.id}`}
      component={RouterLink}
      href={paths.post.details(author.name)}
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        p: 2,
        minWidth: 260,
        borderRadius: 2,
        cursor: 'pointer',
        textDecoration: 'none',
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        transition: theme.transitions.create(['background-color', 'transform', 'border-color']),
        '&:hover': {
          transform: 'scale(1.02)',
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
      }}
    >
      <Avatar
        src={author.avatarUrl}
        alt={author.name}
        sx={{ 
          width: 48, 
          height: 48, 
          border: `2px solid ${theme.palette.background.paper}`,
          boxShadow: theme.customShadows.z8 
        }}
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
  );

  const renderMarqueeRow = (data: typeof AUTHORS, reverse = false, rowIndex: number) => (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        py: 1.5,
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <Stack
          key={i}
          component={m.div}
          direction="row"
          spacing={3}
          sx={{ px: 1.5, flexShrink: 0 }}
          animate={{ x: reverse ? ['-100%', '0%'] : ['0%', '-100%'] }}
          transition={{
            duration: 50, // Um pouco mais lento para facilitar a leitura dos nomes
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {data.map((author, idx) => renderAuthorCard(author, idx, rowIndex))}
        </Stack>
      ))}
    </Box>
  );

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
        Nossos Criadores
      </Typography>

      <Stack spacing={1}>
        {/* Linha 1: Normal */}
        {renderMarqueeRow(AUTHORS, false, 1)}

        {/* Linha 2: Reverso (podemos embaralhar o array para não ficar idêntico) */}
        {renderMarqueeRow([...AUTHORS].reverse(), true, 2)}
      </Stack>
    </Container>
  );
}