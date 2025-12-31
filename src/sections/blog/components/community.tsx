'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

// Dados das comunidades monitorizadas e parceiras
const COMMUNITIES = [
  { name: 'CoinTelegraph', logo: '/assets/icons/communities/cointelegraph.svg', url: 'https://cointelegraph.com' },
  { name: 'Binance Academy', logo: '/assets/icons/communities/binance.svg', url: 'https://academy.binance.com' },
  { name: 'Ethereum Org', logo: '/assets/icons/communities/eth.svg', url: 'https://ethereum.org' },
  { name: 'CoinDesk', logo: '/assets/icons/communities/coindesk.svg', url: 'https://coindesk.com' },
  { name: 'CryptoPanic', logo: '/assets/icons/communities/cryptopanic.svg', url: 'https://cryptopanic.com' },
  { name: 'Solana Foundation', logo: '/assets/icons/communities/solana.svg', url: 'https://solana.com' },
];

/**
 * Secção 3: Comunidades (PostCommunity)
 * Exibe as fontes monitorizadas com estética Glassmorphism.
 */
export function PostCommunity() {
  const theme = useTheme();

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={4}>
        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Comunidades Cripto</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Monitorizamos os principais ecossistemas globais em tempo real.
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(6, 1fr)',
            },
          }}
        >
          {COMMUNITIES.map((community) => (
            <Box
              key={community.name}
              component="a"
              href={community.url}
              target="_blank"
              rel="noopener"
              sx={{
                p: 3,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: theme.transitions.create(['background-color', 'transform', 'box-shadow']),
                bgcolor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(8px)', // Efeito Glassmorphism
                WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  boxShadow: theme.customShadows.z24,
                  '& .community-logo': { transform: 'scale(1.1)' },
                },
              }}
            >
              <Image
                alt={community.name}
                src={community.logo}
                className="community-logo"
                sx={{
                  width: 48,
                  height: 48,
                  mb: 2,
                  transition: theme.transitions.create('transform'),
                }}
              />
              <Typography variant="subtitle2" sx={{ color: 'text.primary', textAlign: 'center' }}>
                {community.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}