'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
};

/**
 * Secção 5: PUB (PostBanner)
 * Banner de largura total para publicidade ou anúncios internos.
 */
export function PostBanner({
  title = 'Anuncie no Maior Portal Cripto',
  description = 'Alcance milhares de investidores e entusiastas do ecossistema blockchain todos os dias.',
  imageUrl = '/assets/illustrations/illustration-crypto-ads.svg', // Exemplo de imagem no R2
  ctaText = 'Saiba Mais',
  ctaHref = '#',
}: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 5, md: 10 }, bgcolor: 'background.neutral' }}>
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: { xs: 5, md: 8 },
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'grey.900',
            color: 'common.white',
            boxShadow: theme.customShadows.z24,
          }}
        >
          {/* Conteúdo do Banner */}
          <Stack
            spacing={3}
            sx={{
              zIndex: 9,
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { md: 480 },
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.72 }}>
              {description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="primary"
              href={ctaHref}
              sx={{
                alignSelf: { xs: 'center', md: 'flex-start' },
                bgcolor: '#FA541C', // Cor de destaque laranja
                '&:hover': { bgcolor: alpha('#FA541C', 0.8) },
              }}
            >
              {ctaText}
            </Button>
          </Stack>

          {/* Imagem/Ilustração */}
          <Box
            sx={{
              mt: { xs: 5, md: 0 },
              width: { xs: 240, md: 320 },
              zIndex: 9,
            }}
          >
            <Image alt="Publicidade" src={imageUrl} />
          </Box>

          {/* Elementos de Fundo (Decorativos para estilo Moderno) */}
          <Box
            sx={{
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              opacity: 0.12,
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: 'primary.main',
              filter: 'blur(100px)',
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}