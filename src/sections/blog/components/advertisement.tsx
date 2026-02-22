'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { varFade, MotionViewport } from 'src/components/animate';
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
 * Secção: Publicidade (PostAdvertisement)
 * Banner adaptado para o padrão Space/Glass 2026.
 */
export function PostAdvertisement({
  title = 'Anuncie no Maior Portal Cripto',
  description = 'Alcance milhares de investidores e entusiastas do ecossistema blockchain todos os dias.',
  imageUrl = '/assets/illustrations/illustration-crypto-ads.svg',
  ctaText = 'Saiba Mais',
  ctaHref = '#',
}: Props) {
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 5, md: 10 }, 
        bgcolor: 'transparent', // 🟢 Transparência para revelar o fundo espacial
        position: 'relative' 
      }}
    >
      <Container component={MotionViewport}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: { xs: 5, md: 8 },
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            color: 'common.white',
            // 🟢 EFEITO GLASSMORPHISM
            bgcolor: alpha(theme.palette.grey[900], 0.4),
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.1)}`,
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
            <m.div variants={varFade('inLeft')}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 900,
                  fontFamily: "'Orbitron', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  textShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.35)}`,
                }}
              >
                {title}
              </Typography>
            </m.div>

            <m.div variants={varFade('inLeft')}>
              <Typography variant="body1" sx={{ opacity: 0.8, color: 'grey.300' }}>
                {description}
              </Typography>
            </m.div>

            <m.div variants={varFade('inUp')}>
              <Button
                variant="contained"
                size="large"
                href={ctaHref}
                sx={{
                  alignSelf: { xs: 'center', md: 'flex-start' },
                  px: 4,
                  fontWeight: 800,
                  fontFamily: "'Orbitron', sans-serif",
                  bgcolor: '#FA541C',
                  boxShadow: `0 0 20px ${alpha('#FA541C', 0.4)}`,
                  '&:hover': { 
                    bgcolor: alpha('#FA541C', 0.9),
                    boxShadow: `0 0 30px ${alpha('#FA541C', 0.6)}`,
                    transform: 'translateY(-2px)'
                  },
                }}
              >
                {ctaText}
              </Button>
            </m.div>
          </Stack>

          {/* Imagem/Ilustração com animação suave */}
          <Box
            component={m.div}
            variants={varFade('inRight')}
            sx={{
              mt: { xs: 5, md: 0 },
              width: { xs: 240, md: 320 },
              zIndex: 9,
              filter: `drop-shadow(0 0 20px ${alpha(theme.palette.primary.main, 0.2)})`
            }}
          >
            <Image alt="Publicidade" src={imageUrl} />
          </Box>

          {/* Efeito Glow de Fundo (Nebulosa) */}
          <Box
            sx={{
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              opacity: 0.15,
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: 'primary.main',
              filter: 'blur(100px)',
              zIndex: 0,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}