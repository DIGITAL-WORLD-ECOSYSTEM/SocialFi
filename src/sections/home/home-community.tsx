'use client';

import type { BoxProps } from '@mui/material/Box';

import { useMemo } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const SOCIAL_CHANNELS = [
  { name: 'Discord', icon: 'bi:discord', color: '#5865F2' },
  { name: 'Telegram', icon: 'logos:telegram', color: '#0088cc' },
  { name: 'Instagram', icon: 'skill-icons:instagram', color: '#E4405F' },
];

/**
 * SOLUÇÃO PARA ERRO VERCEL (TS2590):
 * Isolar o AvatarGroup em um Styled Component remove a complexidade de união de tipos
 * do fluxo principal do JSX, permitindo que o build complete com sucesso.
 */
const StyledAvatarGroup = styled(AvatarGroup)(() => ({
  [`& .${avatarGroupClasses.avatar}`]: {
    width: 32,
    height: 32,
  },
}));

// ----------------------------------------------------------------------

export function HomeCommunity({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const METRICS = useMemo(
    () => [
      { id: 'members', label: 'Network Stewards', value: '+500' },
      { id: 'area', label: 'Managed Hectares', value: '+10K' },
      { id: 'aum', label: 'Assets Under Sovereignty', value: '$7.5M' },
    ],
    []
  );

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
      <FloatLine vertical sx={{ top: 0, right: 80, display: { xs: 'none', md: 'block' } }} />
    </>
  );

  const renderSocialHub = () => (
    <m.div variants={varFade('inRight')}>
      <Stack
        spacing={4}
        sx={{
          p: 5,
          width: 1,
          borderRadius: 3,
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.short,
          }),
          bgcolor: alpha(theme.palette.grey[500], 0.08),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1.5px solid ${alpha(theme.palette.info.main, 0.3)}`,
          boxShadow: `0 0 24px 0 ${alpha(theme.palette.info.main, 0.2)}`,
          '&:hover': {
            boxShadow: `0 0 32px 0 ${alpha(theme.palette.info.main, 0.4)}`,
          },
        }}
      >
        <Stack spacing={2} textAlign="left">
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Network Synergy
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            Nossa governança descentralizada integra corporações e cooperativas em um ecossistema de liquidez global focado em ativos reais.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
          {/* ✅ APLICAÇÃO DA CORREÇÃO AQUI */}
          <StyledAvatarGroup max={4}>
            <Avatar src={_mock.image.avatar(1)} />
            <Avatar src={_mock.image.avatar(2)} />
            <Avatar src={_mock.image.avatar(3)} />
          </StyledAvatarGroup>
          
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
                '&:hover': { bgcolor: alpha(channel.color, 0.15) },
              }}
            >
              {channel.name}
            </Button>
          ))}
        </Stack>
      </Stack>
    </m.div>
  );

  return (
    <Box
      id="community"
      component="section"
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 10, md: 20 },
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
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
            <m.div variants={varFade('inLeft')}>
              {/* TAG */}
              <Box
                sx={{
                  display: 'inline-block',
                  border: `1px solid ${theme.palette.info.main}`,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  mb: 5,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'info.main',
                  }}
                >
                  COMMUNITY
                </Typography>
              </Box>

              {/* TÍTULO HIERÁRQUICO */}
              <Typography
                component="h2"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  letterSpacing: '0.08em',
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  mb: 3,
                }}
              >
                <Box component="span" sx={{ color: 'common.white' }}>
                  POTENCIAL DE MERCADO &
                </Box>
                <br />
                <Box component="span" sx={{ color: 'info.main' }}>
                  ESCALABILIDADE
                </Box>
              </Typography>
              
              <Typography
                sx={{
                  maxWidth: 560,
                  fontSize: { xs: 16, md: 18 },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  textAlign: 'left',
                }}
              >
                A ASPPIBRA-DAO provê infraestrutura robusta para gerir ativos de alto valor, como a produção de café agroecológico, garantindo segurança jurídica e liquidez on-chain.
              </Typography>

              {/* MÉTRICAS */}
              <Box
                sx={{
                  mt: 6,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: { xs: 4, md: 2 },
                  textAlign: 'left',
                  maxWidth: 580, 
                }}
              >
                {METRICS.map((stat) => (
                  <m.div key={stat.id} variants={varFade('inUp')}>
                    <Stack spacing={0.5}>
                      <Typography
                        sx={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 900,
                          fontSize: { xs: '2rem', md: '2.5rem' },
                          color: 'info.main',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 600,
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

              {/* BOTÕES DE AÇÃO */}
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={3} sx={{ mt: 8, justifyContent: 'flex-start' }}>
                <Button
                  component={RouterLink}
                  href={paths.dashboard.root} 
                  variant="outlined"
                  size="large"
                  startIcon={<Iconify icon="solar:file-bold-duotone" />}
                  sx={{
                    height: 56,
                    px: 3,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    color: 'common.white',
                    borderColor: 'info.main',
                    letterSpacing: '0.05em',
                    boxShadow: `0 0 16px ${alpha(theme.palette.info.main, 0.4)}`,
                    '&:hover': {
                      borderColor: 'common.white',
                      boxShadow: `0 0 24px ${alpha(theme.palette.info.main, 0.7)}`,
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                    },
                  }}
                >
                  Access Governance
                </Button>

                <Button
                  component={RouterLink}
                  href="#" 
                  color="inherit"
                  endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
                  sx={{
                    fontWeight: 700,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'info.main',
                    },
                  }}
                >
                  On-chain Data
                </Button>
              </Stack>
            </m.div>

            <Box>
              {renderSocialHub()}
            </Box>
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}