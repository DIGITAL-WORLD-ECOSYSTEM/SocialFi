import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { JsonLd, generateBreadcrumbs, generateArticleSchema } from 'src/components/seo/json-ld';

import { PostItem } from '../item/post-item';
import { PostDetailsHero } from '../components/post-details-hero';
import { PostCommentList, PostCommentForm } from '../components/post-comment';

// ----------------------------------------------------------------------

type Props = {
  post: IPostItem;
  latestPosts: IPostItem[];
};

export function PostDetailsHomeView({ post, latestPosts }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: paths.post.root },
    { name: post?.title ?? 'Post', href: post?.title ? paths.post.details(post.title) : '' },
  ];

  if (!post) {
    return null;
  }

  return (
    <>
      <JsonLd schema={generateBreadcrumbs(breadcrumbs)} />
      <JsonLd
        schema={generateArticleSchema({
          title: post.title,
          description: post.description,
          coverUrl: post.coverUrl,
          createdAt: post.createdAt,
          authorName: post.author.name,
          url: `${paths.post.details(post.title)}`,
        })}
      />

      <PostDetailsHero
        title={post.title}
        author={post.author}
        coverUrl={post.coverUrl}
        createdAt={post.createdAt}
      />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.vars.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs links={breadcrumbs} sx={{ ml: `calc(var(--layout-simple-content-px) * -1)` }} />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 5 }}>
            {post.description}
          </Typography>

          <Markdown
            sx={{
              '& p': {
                mb: 3,
              },
            }}
          >
            {post.content}
          </Markdown>

          {post.tags.length > 0 && (
            <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 5 }}>
              <Typography variant="subtitle2" sx={{ mr: 1 }}>
                Tags:
              </Typography>
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {post.tags.map((tag) => (
                  <Chip key={tag} size="small" label={tag} variant="soft" onClick={() => {}} />
                ))}
              </Stack>
            </Stack>
          )}

          <PostCommentForm sx={{ my: 5 }} />

          {post.comments.length > 0 && <PostCommentList comments={post.comments} />}
        </Stack>
      </Container>

      {!!latestPosts?.length && (
        <Container sx={{ pb: 15 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Recent Posts
          </Typography>

          <Grid container spacing={3}>
            {latestPosts.slice(0, 4).map((latestPost) => (
              <Grid key={latestPost.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PostItem post={latestPost} detailsHref={paths.post.details(latestPost.title)} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}
