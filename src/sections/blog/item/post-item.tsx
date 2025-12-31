'use client';

import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import type { IPostItem } from 'src/types/blog';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
  post: IPostItem;
  detailsHref: string;
};

/**
 * Componente de Card Padrão (Utilizado na Secção 6: Recentes)
 */
export function PostItem({ post, detailsHref, sx, ...other }: PostItemProps) {
  return (
    <Card 
      sx={{
        '&:hover .post-image': { transform: 'scale(1.1)' },
        ...sx
      }} 
      {...other}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Badge de Categoria - Cast para 'any' evita erro se o tipo ainda não foi atualizado */}
        <Box
          sx={{
            top: 12,
            left: 12,
            zIndex: 9,
            px: 1,
            py: 0.5,
            borderRadius: 0.75,
            position: 'absolute',
            typography: 'caption',
            fontWeight: 'bold',
            color: 'common.white',
            bgcolor: '#FA541C',
            textTransform: 'uppercase',
          }}
        >
          {(post as any).category || 'Cripto'}
        </Box>

        <Avatar
          alt={post.author.name}
          src={post.author.avatarUrl}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: -16,
            position: 'absolute',
            border: (theme) => `solid 2px ${theme.vars.palette.background.paper}`,
          }}
        />

        <Image 
          alt={post.title} 
          src={post.coverUrl} 
          ratio="4/3" 
          className="post-image"
          sx={{ transition: (theme) => theme.transitions.create('transform', { duration: 400 }) }}
        />
      </Box>

      <CardContent sx={{ pt: 3 }}>
        <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
          {fDate(post.createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={detailsHref}
          color="inherit"
          variant="subtitle2"
          sx={(theme) => ({
            ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
            '&:hover': { color: '#FA541C' },
            transition: theme.transitions.create('color'),
          })}
        >
          {post.title}
        </Link>

        <InfoBlock
          totalViews={post.totalViews}
          totalShares={post.totalShares}
          totalComments={post.totalComments}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostItemLatestProps = {
  post: IPostItem;
  index: number;
  detailsHref: string;
};

/**
 * Componente de Card de Destaque (Utilizado na Secção 7: Alta)
 */
export function PostItemLatest({ post, index, detailsHref }: PostItemLatestProps) {
  const isLarge = index === 0;

  return (
    <Card sx={{ '&:hover .post-image': { transform: 'scale(1.05)' } }}>
      <Avatar
        alt={post.author.name}
        src={post.author.avatarUrl}
        sx={{
          top: 24,
          left: 24,
          zIndex: 9,
          position: 'absolute',
          border: (theme) => `solid 2px ${theme.vars.palette.common.white}`,
        }}
      />

      <Image
        alt={post.title}
        src={post.coverUrl}
        ratio={isLarge ? '1/1' : '4/3'}
        className="post-image"
        sx={{ 
          height: isLarge ? { lg: 560 } : { lg: 270 },
          transition: (theme) => theme.transitions.create('transform', { duration: 800 }) 
        }}
        slotProps={{
          overlay: {
            sx: (theme) => ({
              bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
              background: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.grey[900]} 100%)`,
            }),
          },
        }}
      />

      <CardContent
        sx={{
          width: 1,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="caption" component="div" sx={{ mb: 1, opacity: 0.64 }}>
          {fDate(post.createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={detailsHref}
          color="inherit"
          variant={isLarge ? 'h3' : 'subtitle1'}
          sx={(theme) => ({
            ...theme.mixins.maxLine({
              line: 2,
              persistent: isLarge ? theme.typography.h3 : theme.typography.subtitle1,
            }),
            '&:hover': { color: '#FA541C' },
            transition: theme.transitions.create('color'),
          })}
        >
          {post.title}
        </Link>

        <InfoBlock
          totalViews={post.totalViews}
          totalShares={post.totalShares}
          totalComments={post.totalComments}
          sx={{ mt: 2, opacity: 0.8, color: 'common.white', justifyContent: 'flex-start' }}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type InfoBlockProps = BoxProps & Pick<IPostItem, 'totalViews' | 'totalShares' | 'totalComments'>;

/**
 * Bloco de Informações (Views, Shares, Comments)
 */
function InfoBlock({ sx, totalViews, totalShares, totalComments, ...other }: InfoBlockProps) {
  return (
    <Box
      sx={[
        () => ({
          mt: 2,
          gap: 1.5,
          display: 'flex',
          typography: 'caption',
          color: 'text.disabled',
          justifyContent: 'flex-end',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
        <Iconify width={14} icon="solar:chat-round-dots-bold" />
        {fShortenNumber(totalComments)}
      </Box>

      <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
        <Iconify width={14} icon="solar:eye-bold" />
        {fShortenNumber(totalViews)}
      </Box>

      <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
        <Iconify width={14} icon="solar:share-bold" />
        {fShortenNumber(totalShares)}
      </Box>
    </Box>
  );
}