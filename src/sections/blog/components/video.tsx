'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

const VIDEOS = [
  {
    id: 'HPQeQwPahR0',
    title: 'O MAIOR ROUBO “LEGAL” de BITCOIN da HISTÓRIA!',
    channel: 'O Primo Rico',
    thumbnail: 'https://img.youtube.com/vi/HPQeQwPahR0/maxresdefault.jpg',
  },
  {
    id: 'hLMnCVEDjqE',
    title: '🔥 TUDO sobre a XRP em 2025!',
    channel: 'É TopSaber',
    thumbnail: 'https://img.youtube.com/vi/hLMnCVEDjqE/maxresdefault.jpg',
  },
  {
    id: 'Xc6juEgNwog',
    title: 'URGENTE: FED VAI INJETAR TRILHÕES NO MERCADO',
    channel: 'Investidor 4.20',
    thumbnail: 'https://img.youtube.com/vi/Xc6juEgNwog/maxresdefault.jpg',
  },
  {
    id: 'x43e3g-JWWQ',
    title: 'MEMECOINS: POR QUE COMPRAR?',
    channel: 'Bruno Perini',
    thumbnail: 'https://img.youtube.com/vi/x43e3g-JWWQ/maxresdefault.jpg',
  },
];

export function PostVideo() {
  const theme = useTheme();

  // CORREÇÃO 1: Alterado 'gutter' para 'spacing' conforme a tipagem do CarouselOptions
  const carousel = useCarousel({
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    slideSpacing: '20px', 
  });

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4">Vídeos.</Typography>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </Stack>

      <Carousel carousel={carousel}>
        {VIDEOS.map((video) => (
          <Box 
            key={video.id} 
            sx={{ 
              position: 'relative', 
              cursor: 'pointer', 
              borderRadius: 2, 
              overflow: 'hidden',
              bgcolor: 'background.neutral' 
            }}
          >
            <Image 
              alt={video.title} 
              src={video.thumbnail} 
              ratio="16/9" 
              sx={{ 
                transition: theme.transitions.create('transform'),
                '&:hover': { transform: 'scale(1.05)' } 
              }}
            />
            
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                position: 'absolute',
                bgcolor: alpha(theme.palette.common.black, 0.2),
              }}
            >
              <Box 
                sx={{ 
                  p: 1.5, 
                  display: 'flex',
                  borderRadius: '50%', 
                  color: 'common.black',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  bgcolor: alpha(theme.palette.common.white, 0.8),
                }}
              >
                {/* CORREÇÃO 2: Cast para 'any' para evitar erro de união estrita do Iconify */}
                <Iconify icon={"solar:play-bold" as any} width={24} />
              </Box>
            </Stack>

            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" noWrap sx={{ mb: 0.5 }}>
                {video.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                {video.channel}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}