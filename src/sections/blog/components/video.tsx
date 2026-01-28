'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

// --- DADOS DOS VÍDEOS ---

const VIDEOS_BR = [
  {
    id: 'HPQeQwPahR0',
    title: 'O MAIOR ROUBO “LEGAL” de BITCOIN da HISTÓRIA!',
    channel: 'O Primo Rico',
    thumbnail: 'https://img.youtube.com/vi/HPQeQwPahR0/maxresdefault.jpg',
    postedAt: '2 dias atrás',
    duration: '12:40'
  },
  {
    id: 'hLMnCVEDjqE',
    title: '🔥 TUDO sobre a XRP em 2025! Vale a pena investir agora?',
    channel: 'É TopSaber',
    thumbnail: 'https://img.youtube.com/vi/hLMnCVEDjqE/maxresdefault.jpg',
    postedAt: '5 horas atrás',
    duration: '08:15'
  },
  {
    id: 'Xc6juEgNwog',
    title: 'URGENTE: FED VAI INJETAR TRILHÕES NO MERCADO',
    channel: 'Investidor 4.20',
    thumbnail: 'https://img.youtube.com/vi/Xc6juEgNwog/maxresdefault.jpg',
    postedAt: '1 dia atrás',
    duration: '15:20'
  },
  {
    id: 'x43e3g-JWWQ',
    title: 'MEMECOINS: POR QUE COMPRAR? Estratégias para 2024',
    channel: 'Bruno Perini',
    thumbnail: 'https://img.youtube.com/vi/x43e3g-JWWQ/maxresdefault.jpg',
    postedAt: '3 dias atrás',
    duration: '22:00'
  },
];

const VIDEOS_INT = [
  {
    id: 'W4mGv_8W-7I',
    title: 'Bitcoin Strategy for 2025: The Institutional Era',
    channel: 'Michael Saylor',
    thumbnail: 'https://img.youtube.com/vi/W4mGv_8W-7I/maxresdefault.jpg',
    postedAt: '1 dia atrás',
    duration: '18:10'
  },
  {
    id: 'mS7S5E-WlqU',
    title: 'Ethereum Roadmap: Beyond the Merge',
    channel: 'Vitalik Buterin',
    thumbnail: 'https://img.youtube.com/vi/mS7S5E-WlqU/maxresdefault.jpg',
    postedAt: '4 dias atrás',
    duration: '25:45'
  },
  {
    id: 'N64vL67520Q',
    title: 'Why Solana is Winning the L1 Wars in 2024',
    channel: 'Coin Bureau',
    thumbnail: 'https://img.youtube.com/vi/N64vL67520Q/maxresdefault.jpg',
    postedAt: '6 horas atrás',
    duration: '14:20'
  },
  {
    id: 'fB05fV7X_7o',
    title: 'Global Macro: The Debt Crisis Explained',
    channel: 'Raoul Pal',
    thumbnail: 'https://img.youtube.com/vi/fB05fV7X_7o/maxresdefault.jpg',
    postedAt: '12 horas atrás',
    duration: '32:00'
  },
];

// ----------------------------------------------------------------------

export function PostVideo() {
  const theme = useTheme();

  // Carrossel para a Comunidade Brasileira
  const carouselBr = useCarousel({
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    slideSpacing: '20px', 
  });

  // Carrossel para a Comunidade Internacional
  const carouselInt = useCarousel({
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    slideSpacing: '20px', 
  });

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      
      {/* SEÇÃO 1: BRASIL */}
      <Box sx={{ mb: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4">Comunidade Brasileira</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Insights do mercado nacional</Typography>
          </Box>
          <CarouselArrowBasicButtons {...carouselBr.arrows} options={carouselBr.options} />
        </Stack>

        <Carousel carousel={carouselBr}>
          {VIDEOS_BR.map((video) => (
            <VideoItem key={video.id} video={video} theme={theme} />
          ))}
        </Carousel>
      </Box>

      {/* SEÇÃO 2: INTERNACIONAL */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4">Comunidade Internacional</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>O que está acontecendo no mundo</Typography>
          </Box>
          <CarouselArrowBasicButtons {...carouselInt.arrows} options={carouselInt.options} />
        </Stack>

        <Carousel carousel={carouselInt}>
          {VIDEOS_INT.map((video) => (
            <VideoItem key={video.id} video={video} theme={theme} />
          ))}
        </Carousel>
      </Box>

    </Container>
  );
}

// ----------------------------------------------------------------------

// Componente de Card extraído para evitar repetição de código
function VideoItem({ video, theme }: { video: any, theme: any }) {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        cursor: 'pointer', 
        borderRadius: 2, 
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['box-shadow', 'transform']),
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: theme.customShadows?.z12 || theme.shadows[12],
          '& .play-button': { opacity: 1, transform: 'scale(1.1)' },
          '& .video-img': { transform: 'scale(1.08)' }
        } 
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Image 
          className="video-img"
          alt={video.title} 
          src={video.thumbnail} 
          ratio="16/9" 
          sx={{ transition: theme.transitions.create('transform', { duration: 400 }) }}
        />
        
        <Typography 
          variant="caption" 
          sx={{ 
            position: 'absolute', bottom: 8, right: 8, px: 0.8, borderRadius: 0.5, 
            color: 'common.white', bgcolor: alpha(theme.palette.common.black, 0.75), fontWeight: 'bold'
          }}
        >
          {video.duration}
        </Typography>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ top: 0, left: 0, width: 1, height: 1, position: 'absolute', bgcolor: alpha(theme.palette.common.black, 0.1) }}
        >
          <Box 
            className="play-button"
            sx={{ 
              p: 1.5, display: 'flex', borderRadius: '50%', color: 'common.black',
              backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
              bgcolor: alpha(theme.palette.common.white, 0.9), opacity: 0.8,
              transition: theme.transitions.create(['opacity', 'transform']),
            }}
          >
            <Iconify icon={"solar:play-bold" as any} width={24} />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 1, height: 44, display: '-webkit-box', WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4
          }}
        >
          {video.title}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            {video.channel}
          </Typography>
          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {video.postedAt}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}