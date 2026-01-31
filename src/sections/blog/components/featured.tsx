'use client';

import type { Theme, SxProps } from '@mui/material/styles';

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

const staticFeaturedPosts = [
  {
    id: 'feat-1',
    title: 'Revolução Silenciosa: Como a Prova de Conhecimento Zero (ZKP) está redefinindo a privacidade em blockchains e além',
    category: 'Tecnologia',
    coverUrl: '/assets/images/marketing/marketing_post_01.jpg',
    description: 'Mergulhe na tecnologia que permite transações e interações verificáveis sem revelar dados sensíveis, abrindo portas para uma nova era de segurança e confiança digital.',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/avatar/avatar_01.jpg' },
    createdAt: new Date(),
    duration: '15 min de leitura',
  },
  {
    id: 'feat-2',
    title: 'Adoção Institucional de Cripto: O catalisador silencioso que pode levar o Bitcoin a US$ 250.000 em 2026',
    category: 'Economia',
    coverUrl: '/assets/images/marketing/marketing_post_02.jpg',
    description: 'Analistas apontam para a entrada massiva de fundos de pensão, seguradoras e grandes bancos como o principal motor para a próxima grande alta do mercado.',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/avatar/avatar_02.jpg' },
    createdAt: new Date(),
    duration: '12 min de leitura',
  },
  {
    id: 'feat-3',
    title: 'Guerra Fria 2.0: A corrida global pela supremacia em semicondutores e o papel estratégico de Taiwan',
    category: 'Geopolítica',
    coverUrl: '/assets/images/marketing/marketing_post_03.jpg',
    description: 'Entenda a complexa teia de alianças, espionagem industrial e poderio militar que define a batalha pela tecnologia mais crucial do século XXI.',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/avatar/avatar_03.jpg' },
    createdAt: new Date(),
    duration: '18 min de leitura',
  },
  {
    id: 'feat-4',
    title: 'Finanças Regenerativas (ReFi): Onde a tecnologia blockchain encontra a sustentabilidade para curar o planeta',
    category: 'Meio Ambiente',
    coverUrl: '/assets/images/marketing/marketing_post_04.jpg',
    description: 'Descubra como projetos inovadores estão usando DeFi, DAOs e NFTs para financiar a regeneração de ecossistemas e combater as mudanças climáticas de forma transparente.',
    author: { name: 'Equipe DEX', avatarUrl: '/assets/images/avatar/avatar_04.jpg' },
    createdAt: new Date(),
    duration: '14 min de leitura',
  },
];

// ----------------------------------------------------------------------

export function PostFeatured({ sx }: { sx?: SxProps<Theme> }) {
  const carousel = useCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const posts = staticFeaturedPosts;

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', ...sx }}>
      <Carousel carousel={carousel}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Carousel>

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
          },
        }}
      />

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
            '&.Mui-selected': { width: 24, borderRadius: 8 },
          },
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function PostItem({ post }: { post: any }) {
  const theme = useTheme();
  const { coverUrl, title, author, createdAt, description, duration } = post;

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
            objectPosition: 'center',
          }}
        />
      </Box>

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
            <Box
              component="span"
              sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'currentColor' }}
            />
            {duration}
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
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {author?.name}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
