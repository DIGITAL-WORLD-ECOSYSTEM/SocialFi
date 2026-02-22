'use client';

import type { BoxProps } from '@mui/material/Box';

import { useMemo } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

type RoadmapPhase = {
  phase: string;
  time: string;
  title: string;
  description: string;
  color: 'info' | 'secondary' | 'error' | 'warning';
};

export function HomeRoadmap({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const ROADMAP_PHASES: RoadmapPhase[] = useMemo(
    () => [
      {
        phase: t('roadmap.phases.p1.label'),
        time: t('roadmap.phases.p1.time'),
        title: t('roadmap.phases.p1.title'),
        description: t('roadmap.phases.p1.description'),
        color: 'info',
      },
      {
        phase: t('roadmap.phases.p2.label'),
        time: t('roadmap.phases.p2.time'),
        title: t('roadmap.phases.p2.title'),
        description: t('roadmap.phases.p2.description'),
        color: 'secondary',
      },
      {
        phase: t('roadmap.phases.p3.label'),
        time: t('roadmap.phases.p3.time'),
        title: t('roadmap.phases.p3.title'),
        description: t('roadmap.phases.p3.description'),
        color: 'error',
      },
      {
        phase: t('roadmap.phases.p4.label'),
        time: t('roadmap.phases.p4.time'),
        title: t('roadmap.phases.p4.title'),
        description: t('roadmap.phases.p4.description'),
        color: 'warning',
      },
    ],
    [t]
  );

  return (
    <Box
      id="roadmap"
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          {/* Badge */}
          <m.div variants={varFade('inUp')}>
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
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'info.main',
                }}
              >
                {t('roadmap.badge')}
              </Typography>
            </Box>
          </m.div>

          {/* Title */}
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
                {t('roadmap.title')}
              </Box>
              <Box component="span" sx={{ color: 'warning.main', ml: 1.5 }}>
                {t('roadmap.title_highlight')}
              </Box>
            </Typography>
          </m.div>

          {/* Subtitle */}
          <m.div variants={varFade('inUp')}>
            <Typography
              sx={{
                mt: 3,
                mx: 'auto',
                maxWidth: 560,
                fontFamily: "'Inter', 'Roboto', sans-serif",
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.7,
                color: alpha(theme.palette.common.white, 0.75),
              }}
            >
              {t('roadmap.description')}
            </Typography>
          </m.div>

          {/* Phases */}
          <Grid
            container
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 64px 1fr' }}
            rowGap={{ xs: 6, md: 8 }}
            columnGap={6}
            sx={{ mt: { xs: 8, md: 10 } }}
          >
            {ROADMAP_PHASES.map((item, index) => {
              const isEven = index % 2 === 0;
              const cardColor = theme.palette[item.color].main;

              return (
                <Grid
                  key={item.title}
                  gridColumn={{ xs: '1 / -1', md: isEven ? '1 / 2' : '3 / 4' }}
                  gridRow={{ md: index + 1 }}
                  sx={{ textAlign: { xs: 'center', md: isEven ? 'right' : 'left' } }}
                >
                  <m.div variants={isEven ? varFade('inRight') : varFade('inLeft')}>
                    <Card
                      sx={{
                        p: 4,
                        borderRadius: 2,
                        display: 'inline-block',
                        width: { xs: '100%', md: 'auto' },
                        maxWidth: 400,
                        border: `1px solid ${cardColor}`,
                        boxShadow: `0 0 24px ${alpha(cardColor, 0.4)}`,
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        bgcolor: alpha(theme.palette.grey[900], 0.2),
                      }}
                    >
                      {/* Phase + Time */}
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: cardColor,
                        }}
                      >
                        {item.phase} • {item.time}
                      </Typography>

                      {/* Title */}
                      <Typography
                        component="h3"
                        sx={{
                          mt: 1,
                          mb: 2,
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 800,
                          fontSize: { xs: 18, md: 20 },
                          letterSpacing: '0.04em',
                          color: 'common.white',
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          fontSize: 15,
                          lineHeight: 1.75,
                          color: alpha(theme.palette.common.white, 0.75),
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Card>
                  </m.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}