'use client';

import type { Theme, SxProps } from '@mui/material/styles';
import type { IPostItem } from 'src/types/blog';

import Autoplay from 'embla-carousel-autoplay';

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

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
  sx?: SxProps<Theme>;
};

/**
 * Secção 1: Hero (PostFeatured)
 * Implementa o Carousel principal com efeito de Glassmorphism.
 */
export function PostFeatured({ posts, sx }: Props) {
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

      {/* Navegação: Setas circulares customizadas (#FA541C) */}
      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        sx={{
          top: '50%',
          width: 1,
          zIndex: 9,
          px: { xs: 1, md: 5 },
          position: 'absolute',
          color: '#FA541C',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)',
          '& button': {
            bgcolor: alpha('#000', 0.3),
            '&:hover': { bgcolor: alpha('#FA541C', 0.8), color: '#fff' },
          }
        }}
      />

      {/* Navegação: Dots estilo Pill */}
      <CarouselDotButtons
        {...carousel.dots}
        sx={{
          width: 1,
          bottom: 40,
          zIndex: 9,
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          color: '#FA541C',
          '& .MuiButtonBase-root': {
            width: 8,
            height: 8,
            transition: 'all 0.3s',
            '&.Mui-selected': { width: 24, borderRadius: 8 }
          }
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
      {/* 1. Camada de Fundo: Desfoque (12px) e Overlay (0.5) */}
      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: -1,
          position: 'absolute',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: 1,
            position: 'absolute',
            bgcolor: alpha('#000', 0.5),
          },
        }}
      >
        <Image 
          alt={title} 
          src={coverUrl} 
          sx={{ 
            width: 1, 
            height: 1, 
            filter: 'blur(12px)', 
            objectFit: 'cover',
            objectPosition: 'center'
          }} 
        />
      </Box>

      {/* 2. Camada de Conteúdo: Card Glassmorphism (blur 20px) */}
      <Card
        sx={{
          width: 1,
          maxWidth: 1000,
          display: 'flex',
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
          boxShadow: theme.customShadows.z24,
          bgcolor: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#fff', 0.12)}`,
        }}
      >
        <Box sx={{ width: { xs: 1, md: 0.6 }, position: 'relative' }}>
          <Image alt={title} src={coverUrl} ratio="4/3" />
        </Box>

        <Stack sx={{ width: { xs: 1, md: 0.4 }, p: { xs: 3, md: 5 } }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 2, typography: 'caption', color: 'text.secondary' }}
          >
            {fDate(createdAt)}
            <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'currentColor' }} />
            5 min read
          </Stack>

          <Typography
            component={RouterLink}
            href={paths.post.details(title)}
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': { color: '#FA541C' },
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
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 'auto' }}>
            <Avatar src={author?.avatarUrl} alt={author?.name} />
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>{author?.name}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}