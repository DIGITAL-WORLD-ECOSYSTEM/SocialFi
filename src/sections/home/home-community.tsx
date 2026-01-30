// ----------------------------------------------------------------------
// Imports — tipos
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------
// Imports — react & motion
// ----------------------------------------------------------------------
import { useMemo } from 'react';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------
// Imports — MUI
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { _mock } from 'src/_mock';
import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { HomeBackground } from './components/home-background';
import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------
// Configurações
// ----------------------------------------------------------------------

const SOCIAL_CHANNELS = [
  { name: 'Discord', icon: 'bi:discord', color: '#5865F2' },
  { name: 'Telegram', icon: 'logos:telegram', color: '#0088cc' },
  { name: 'Instagram', icon: 'skill-icons:instagram', color: '#E4405F' },
];

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        position: 'absolute',
        top: 64,
        right: 80,
        bottom: 64,
        zIndex: 2,
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

    <FloatLine
      vertical
      sx={{
        top: 0,
        right: 80,
        display: { xs: 'none', md: 'block' },
      }}
    />
  </>
);

// ----------------------------------------------------------------------

export function HomeCommunity({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  // Informações estáticas extraídas da captura de tela de referência
  const METRICS = useMemo(
    () => [
      {
        id: 'members',
        label: 'NETWORK STEWARDS',
        value: '+500',
      },
      {
        id: 'area',
        label: 'MANAGED HECTARES',
        value: '+10k',
      },
      {
        id: 'aum',
        label: 'ASSETS UNDER SOVEREIGNTY',
        value: '$7.5M',
      },
    ],
    []
  );

  const renderStats = () => (
    <Box
      sx={{
        mt: 6,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
        gap: { xs: 3, md: 4 },
        textAlign: 'left',
      }}
    >
      {METRICS.map((stat) => (
        <m.div key={stat.id} variants={varFade('inUp')}>
          <Stack spacing={0.5}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {stat.value}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
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
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: 'blur(12px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: theme.customShadows?.z24,
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={2} textAlign="left">
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
               Network Synergy
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', lineHeight: 1.7 }}
            >
              Our decentralized governance integrates corporations and cooperatives into a global liquidity ecosystem, overcoming tech barriers through auditable management.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
            <AvatarGroup max={4}>
              {[...Array(3)].map((_, index) => (
                <Avatar
                  key={index}
                  src={_mock.image.avatar(index + 1)}
                />
              ))}
            </AvatarGroup>

            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Network Stewards
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {SOCIAL_CHANNELS.map((channel) => (
              <Button
                key={channel.name}
                variant="soft"
                size="small"
                startIcon={<Iconify icon={channel.icon as any} width={20} />}
                sx={{
                  bgcolor: alpha(channel.color, 0.08),
                  color: channel.color,
                  fontWeight: 700,
                  '&:hover': { bgcolor: alpha(channel.color, 0.15) }
                }}
              >
                {channel.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>
    </m.div>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 10, md: 20 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <HomeBackground section="community" />

      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              gap: { xs: 8, md: 10 },
              gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
            }}
          >
            {/* COLUNA ESQUERDA: Textos e Métricas */}
            <m.div variants={varFade('inLeft')}>
              <SectionTitle
                caption="INSTITUTIONAL TRACTION"
                title="Market Potential &"
                txtGradient="Systemic Scalability"
                description="Consolidating solid metrics that reflect our global scaling capacity. ASPPIBRA-DAO provides the infrastructure to manage high-value assets with absolute legal security and decentralized liquidity."
                sx={{ textAlign: 'left', mb: 0 }}
              />

              {renderStats()}
              
              <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon={'solar:shield-user-bold-duotone' as any} width={24} />}
                  sx={{
                    height: 56,
                    px: 4,
                    borderRadius: 1.5,
                    fontSize: 16,
                    fontWeight: 700,
                    boxShadow: theme.customShadows?.primary,
                  }}
                >
                  Access Governance
                </Button>

                <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                  On-chain Data
                </Typography>
              </Stack>
            </m.div>

            {/* COLUNA DIREITA: Card de Sinergia */}
            <Box>
              {renderSocialHub()}
            </Box>
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}