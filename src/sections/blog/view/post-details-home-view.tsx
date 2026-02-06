'use client';

import type { IPostItem, IPostComment } from 'src/types/blog';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { paths } from 'src/routes/paths';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { JsonLd, generateBreadcrumbs } from 'src/components/seo/json-ld';

import { PostItem } from '../item/item';
import { PostCommentForm } from '../forms/post-comment-form';
import { PostCommentList } from '../details/post-comment-list';
import { PostDetailsHero } from '../details/post-details-hero';

// ----------------------------------------------------------------------

type Props = {
  post?: IPostItem;
  latestPosts?: IPostItem[];
};

export function PostDetailsHomeView({ post, latestPosts }: Props) {
  // --- Valores normalizados e tipados ---
  const title: string = post?.title ?? '';
  const description: string = post?.description ?? '';
  const content: string = post?.content ?? '';
  const coverUrl: string = post?.coverUrl ?? '';
  const createdAt = post?.createdAt;
  const author = post?.author;

  const tags: string[] = post?.tags ?? [];

  const favoritePeople: {
    name?: string;
    avatarUrl?: string;
  }[] = post?.favoritePerson ?? [];

  // ✅ Correção do TS2322
  const comments: IPostComment[] = post?.comments ?? [];

  const totalFavorites: number = Number(post?.totalFavorites ?? 0);

  const latest: IPostItem[] = latestPosts ?? [];

  // ✅ Pré-calcular posts recentes
  const recentPosts: IPostItem[] = latest.slice(
    Math.max(0, latest.length - 4)
  );

  // ✅ Breadcrumbs simples
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: paths.post.root },
    { name: title, href: title ? paths.post.details(title) : '' },
  ];

  return (
    <>
      <JsonLd schema={generateBreadcrumbs(breadcrumbs)} />

      <PostDetailsHero
        title={title}
        author={author}
        coverUrl={coverUrl}
        createdAt={createdAt}
      />

      <Container
        maxWidth={false}
        sx={(theme) => ({
          py: 3,
          mb: 5,
          borderBottom: `solid 1px ${theme.vars.palette.divider}`,
        })}
      >
        <CustomBreadcrumbs links={breadcrumbs} sx={{ maxWidth: 720, mx: 'auto' }} />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1">{description}</Typography>

          <Markdown children={content} />

          <Stack
            spacing={3}
            sx={(theme) => ({
              py: 3,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            })}
          >
            <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} variant="soft" />
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                label={fShortenNumber(totalFavorites)}
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    color="error"
                    icon={<Iconify icon="solar:heart-bold" />}
                    checkedIcon={<Iconify icon="solar:heart-bold" />}
                  />
                }
                sx={{ mr: 1 }}
              />

              <AvatarGroup
                sx={{
                  [`& .${avatarGroupClasses.avatar}`]: {
                    width: 32,
                    height: 32,
                  },
                }}
              >
                {favoritePeople.map((person, idx) => (
                  <Avatar
                    key={person.name ?? person.avatarUrl ?? idx}
                    alt={person.name ?? ''}
                    src={person.avatarUrl}
                  />
                ))}
              </AvatarGroup>
            </Box>
          </Stack>

          <Box sx={{ mb: 3, mt: 5, display: 'flex', gap: 1 }}>
            <Typography variant="h4">Comments</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
              ({comments.length})
            </Typography>
          </Box>

          <PostCommentForm />

          <Divider sx={{ mt: 5, mb: 2 }} />

          {/* ✅ Tipagem correta */}
          <PostCommentList comments={comments} />
        </Stack>
      </Container>

      {recentPosts.length > 0 && (
        <Container sx={{ pb: 15 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Recent Posts
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {recentPosts.map((latestPost) => {
              // ✅ Quebra da inferência complexa
              const detailsHref: string = paths.post.details(latestPost.title);

              return (
                <PostItem
                  key={latestPost.id}
                  post={latestPost}
                  detailsHref={detailsHref}
                />
              );
            })}
          </Box>
        </Container>
      )}
    </>
  );
}
