import type { BoxProps } from '@mui/material/Box';

import { useMemo } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import { alpha, useTheme } from '@mui/material/styles';

import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const SOCIAL_CHANNELS = [
  { name: 'Discord', icon: 'bi:discord', color: '#5865F2' },
  { name: 'Telegram', icon: 'logos:telegram', color: '#0088cc' },
  { name: 'Instagram', icon: 'skill-icons:instagram', color: '#E4405F' },
];

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        right: 80,
        zIndex: 2,
        bottom: 64,
        position: 'absolute',
        transform: 'translateX(50%)',
        display: { xs: 'none', md: 'flex' },
        '& span': { position: 'static', opacity: 0.12 },
      }}
    >
      <FloatDotIcon />
      <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
      <Box sx={{ flexGrow: 1 }} />
      <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
      <FloatDotIcon />
    </Stack>

    <FloatLine vertical sx={{ top: 0, right: 80, display: { xs: 'none', md: 'block' } }} />
  </>
);

// ----------------------------------------------------------------------

export function HomeCommunity({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const METRICS = useMemo(
    () => [
      {
        id: 'members',
        label: t('traction.stats.members'),
        value: t('traction.stats.members_value'),
      },
      { id: 'area', label: t('traction.stats.area'), value: t('traction.stats.area_value') },
      { id: 'aum', label: t('traction.stats.aum'), value: t('traction.stats.aum_value') },
    ],
    [t]
  );

  const renderDescription = () => (
    <SectionTitle
      caption={t('traction.caption')}
      title={t('traction.title')}
      txtGradient={t('traction.title_highlight')}
      description={t('traction.description')}
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    />
  );

  const renderStats = () => (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: { xs: 3, md: 4 },
        mt: 5,
      }}
    >
      {METRICS.map((stat) => (
        <m.div key={stat.id} variants={varFade('inUp')}>
          <Stack spacing={0.5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {stat.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              {stat.label}
            </Typography>
          </Stack>
        </m.div>
      ))}
    </Box>
  );

  const renderSocialHub = () => (
    <m.div variants={varFade('inRight')}>
      <Box
        sx={{
          p: 5,
          borderRadius: 3,
          position: 'relative',
          border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow: theme.customShadows?.z24 ?? undefined,
          overflow: 'hidden',
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h4">{t('traction.card.title')}</Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', lineHeight: 1.7, textAlign: 'justify' }}
            >
              {t('traction.card.content')}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 40, height: 40 } }}>
              {[...Array(5)].map((_, index) => (
                <Avatar key={index} alt={_mock.fullName(index)} src={_mock.image.avatar(index + 10)} />
              ))}
            </AvatarGroup>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {t('traction.stats.members')}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            {SOCIAL_CHANNELS.map((channel) => (
              <Button
                key={channel.name}
                variant="soft"
                color="inherit"
                startIcon={<Iconify icon={channel.icon as any} width={20} />}
                sx={{
                  borderRadius: 1,
                  bgcolor: alpha(channel.color, 0.08),
                  color: channel.color,
                }}
              >
                {channel.name}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Iconify
          icon={'solar:chart-square-bold-duotone' as any}
          sx={{
            position: 'absolute',
            bottom: -40,
            right: -40,
            width: 240,
            height: 240,
            opacity: 0.03,
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    </m.div>
  );

  return (
    <Box
      sx={[{ position: 'relative', overflow: 'hidden', py: { xs: 10, md: 15 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          {/* Layout principal substituindo Grid: Stack responsivo */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 8, md: 10 }}
            alignItems="center"
          >
            {/* Coluna esquerda */}
            <Box sx={{ flex: 1, width: '100%' }}>
              {renderDescription()}
              {renderStats()}

              <m.div variants={varFade('inUp')}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 5, justifyContent: { xs: 'center', md: 'flex-start' } }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Iconify icon={'solar:shield-user-bold-duotone' as any} width={24} />}
                    sx={{
                      height: 56,
                      px: 4,
                      borderRadius: 1.2,
                      boxShadow: theme.customShadows?.primary ?? undefined,
                    }}
                  >
                    {t('traction.buttons.join')}
                  </Button>

                  <Link
                    href="#"
                    color="inherit"
                    variant="subtitle2"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      opacity: 0.7,
                      fontWeight: 700,
                    }}
                  >
                    {t('traction.buttons.data')}
                    <Iconify icon={'solar:external-link-outline' as any} width={18} />
                  </Link>
                </Stack>
              </m.div>
            </Box>

            {/* Coluna direita */}
            <Box sx={{ flex: 1, width: '100%' }}>{renderSocialHub()}</Box>
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}
