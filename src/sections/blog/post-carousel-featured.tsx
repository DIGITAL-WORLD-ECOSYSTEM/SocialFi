'use client';

import type { IPostItem } from 'src/types/blog';
import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';

import { Image } from 'src/components/image';
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from 'src/components/carousel';
import Autoplay from 'embla-carousel-autoplay';

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  sx?: SxProps<Theme>;
};

export function PostCarouselFeatured({ posts, sx }: Props) {
  const carousel = useCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', ...sx }}>
      <Carousel carousel={carousel}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Carousel>

      {/* Navegação: Setas Laterais (Laranja/Primary) */}
      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        sx={{
          top: '50%',
          width: 1,
          zIndex: 9,
          px: { xs: 1, md: 5 },
          position: 'absolute',
          color: 'primary.main',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Navegação: Pontos (Dots) */}
      <CarouselDotButtons
        {...carousel.dots}
        sx={{
          width: 1,
          bottom: 40,
          zIndex: 9,
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          color: 'primary.main',
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function PostItem({ post }: { post: IPostItem }) {
  const theme = useTheme();
  const { coverUrl, title, author, createdAt, description } = post;

  return (
    <Box
      sx={{
        py: 10,
        display: 'flex',
        minHeight: 640,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 10 },
      }}
    >
      {/* 1. Efeito de Fundo: Imagem Desfocada (Full Screen) */}
      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: -1,
          position: 'absolute',
          overflow: 'hidden', // Garante que o blur não vaze para fora do container
          '&:before': {
            content: '""',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: 1,
            position: 'absolute',
            bgcolor: alpha(theme.palette.common.black, 0.7),
          },
        }}
      >
        <Image 
          alt={title} 
          src={coverUrl} 
          sx={{ 
            width: 1,          // Força a ocupação de 100% da largura
            height: 1,         // Força a ocupação de 100% da altura
            filter: 'blur(24px)', 
            objectFit: 'cover', // COMPORTAMENTO CRÍTICO: Preenche o espaço mantendo a proporção
            objectPosition: 'center' // Garante que a imagem sempre expanda a partir do centro
          }} 
        />
      </Box>

      {/* 2. Card Centralizado (Layout 2 Colunas) */}
      <Card
        sx={{
          width: 1,
          maxWidth: 1000,
          display: 'flex',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: theme.customShadows.z24,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Lado Esquerdo: Imagem do Post */}
        <Box sx={{ width: { xs: 1, md: 0.6 }, position: 'relative' }}>
          <Image alt={title} src={coverUrl} ratio="4/3" />
        </Box>

        {/* Lado Direito: Informações e Conteúdo */}
        <Stack sx={{ width: { xs: 1, md: 0.4 }, p: { xs: 3, md: 5 } }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 2, typography: 'caption', color: 'text.disabled' }}
          >
            {fDate(createdAt)}
            <Box
              component="span"
              sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'currentColor' }}
            />
            8 min read
          </Stack>

          <Typography
            component={RouterLink}
            href={paths.post.details(title)}
            variant="h4"
            sx={{
              mb: 2,
              color: 'text.primary',
              textDecoration: 'none',
              transition: theme.transitions.create(['color']),
              '&:hover': { color: 'primary.main' },
              // Truncar texto após 3 linhas
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 5,
              color: 'text.secondary',
              // Truncar descrição para manter o card alinhado
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description || 'Explore as últimas tendências e novidades em nossa produção...'}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 'auto' }}>
            <Avatar src={author?.avatarUrl} alt={author?.name} />
            <Typography variant="subtitle2">{author?.name}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}