'use client';

// ----------------------------------------------------------------------
// Imports — tipos e react/motion
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

// ----------------------------------------------------------------------
// Imports — MUI
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { _socials, _carouselsMembers } from 'src/_mock';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function HomeTeam({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
  });

  return (
    <Box
      id="team"
      component="section"
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container
        component={MotionViewport}
        sx={{ position: 'relative', zIndex: 1, py: { xs: 10, md: 15 } }}
      >
        {/* HEADER: TAG + TÍTULO E BOTÃO NA DIREITA */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          justifyContent="space-between"
          sx={{ mb: 8, gap: 3 }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            {/* TAG "TEAM" */}
            <m.div variants={varFade('inUp')}>
              <Box
                sx={{
                  display: 'inline-block',
                  border: `1px solid ${theme.palette.info.main}`,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  mb: 4,
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
                  {t('team.badge')}
                </Typography>
              </Box>
            </m.div>

            {/* TÍTULO HIERÁRQUICO */}
            <m.div variants={varFade('inUp')}>
              <Typography
                component="h2"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  letterSpacing: '0.08em',
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                }}
              >
                <Box component="span" sx={{ color: 'common.white' }}>
                  {t('team.title')}
                </Box>
                <br />
                <Box component="span" sx={{ color: 'warning.main' }}>
                  {t('team.title_highlight')}
                </Box>
              </Typography>
            </m.div>
          </Box>

          {/* BOTÃO MOVIDO PARA A DIREITA */}
          <m.div variants={varFade('inRight')}>
            <Button
              component={RouterLink}
              href={paths.about}
              variant="outlined"
              endIcon={<Iconify icon="solar:double-alt-arrow-right-bold-duotone" />}
              sx={{
                height: 56,
                px: 4,
                borderRadius: 1.5,
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'common.white',
                borderColor: alpha(theme.palette.info.main, 0.3),
                '&:hover': {
                  borderColor: theme.palette.info.main,
                  boxShadow: `0 0 15px ${alpha(theme.palette.info.main, 0.4)}`,
                },
              }}
            >
              {t('team.button')}
            </Button>
          </m.div>
        </Stack>

        {/* CAROUSEL */}
        <Box sx={{ position: 'relative' }}>
          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

          <Carousel carousel={carousel} sx={{ px: 0.5 }}>
            {_carouselsMembers.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade('in')}
                sx={{ py: { xs: 4, md: 5 } }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function MemberCard({ member }: { member: (typeof _carouselsMembers)[number] }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        textAlign: 'center',
        height: '100%',
        bgcolor: alpha(theme.palette.grey[500], 0.08),
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 3,
        overflow: 'hidden',
        // BORDAS NEON ESTÁTICAS
        border: `1px solid ${alpha(theme.palette.info.main, 0.25)}`,
        boxShadow: `0 0 12px 0 ${alpha(theme.palette.info.main, 0.1)}`,
        transition: theme.transitions.create(['all'], {
          duration: theme.transitions.duration.standard,
        }),
        // EFEITO HOVER NEON
        '&:hover': {
          transform: 'translateY(-10px)',
          borderColor: theme.palette.info.main,
          boxShadow: `0 0 20px 0 ${alpha(theme.palette.info.main, 0.4)}`,
        },
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ mt: 2.5, mb: 0.5, fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
      >
        {member.name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {member.role}
      </Typography>

      <Box sx={{ px: 2, pb: 1 }}>
        <Image alt={member.name} src={member.avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {_socials.map((social) => (
          <IconButton
            key={social.label}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'info.main',
                bgcolor: alpha(theme.palette.info.main, 0.1),
              },
            }}
          >
            {social.value === 'twitter' && <Iconify icon={"bi:twitter-x" as any} />}
            {social.value === 'facebook' && <Iconify icon={"eva:facebook-fill" as any} />}
            {social.value === 'instagram' && <Iconify icon={"ant-design:instagram-filled" as any} />}
            {social.value === 'linkedin' && <Iconify icon={"eva:linkedin-fill" as any} />}
          </IconButton>
        ))}
      </Box>
    </Card>
  );
}