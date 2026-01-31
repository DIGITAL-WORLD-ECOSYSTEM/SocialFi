'use client';

import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
// components
import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

const COMMUNITIES = [
  { name: 'CoinTelegraph', logo: '/assets/icons/communities/cointelegraph.svg', url: 'https://cointelegraph.com' },
  { name: 'Binance Academy', logo: '/assets/icons/communities/binance.svg', url: 'https://academy.binance.com' },
  { name: 'Ethereum Org', logo: '/assets/icons/communities/eth.svg', url: 'https://ethereum.org' },
  { name: 'CoinDesk', logo: '/assets/icons/communities/coindesk.svg', url: 'https://coindesk.com' },
  { name: 'CryptoPanic', logo: '/assets/icons/communities/cryptopanic.svg', url: 'https://cryptopanic.com' },
  { name: 'Solana Foundation', logo: '/assets/icons/communities/solana.svg', url: 'https://solana.com' },
];

export function PostCommunity() {
  const theme = useTheme();

  const renderMarqueeRow = (reverse = false) => (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        py: 1,
      }}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <Stack
          key={index}
          component={m.div}
          direction="row"
          spacing={3}
          sx={{ px: 1.5, flexShrink: 0 }}
          animate={{ x: reverse ? ['-100%', '0%'] : ['0%', '-100%'] }}
          transition={{
            duration: 40,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {COMMUNITIES.map((community) => (
            <Box
              key={`${index}-${community.name}`}
              component="a"
              href={community.url}
              target="_blank"
              rel="noopener"
              sx={{
                p: 3,
                width: 180,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                textDecoration: 'none',
                bgcolor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
                transition: theme.transitions.create(['background-color', 'transform']),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Image alt={community.name} src={community.logo} sx={{ width: 48, height: 48, mb: 1.5 }} />
              <Typography variant="subtitle2" noWrap sx={{ color: 'text.primary' }}>
                {community.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      ))}
    </Box>
  );

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={5}>
        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Comunidades Cripto</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Monitorizamos os principais ecossistemas globais em tempo real.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {/* Primeira linha: Normal (Direita -> Esquerda) */}
          {renderMarqueeRow(false)}
          
          {/* Segunda linha: Reverso (Esquerda -> Direita) */}
          {renderMarqueeRow(true)}
        </Stack>
      </Stack>
    </Container>
  );
}