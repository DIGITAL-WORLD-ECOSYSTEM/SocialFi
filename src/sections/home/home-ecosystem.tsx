import type { BoxProps } from '@mui/material/Box';

import { useMemo } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

export function HomeEcosystem({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const ITEMS = useMemo(
    () => [
      {
        id: 'tech',
        title: 'Tecnologia de Base',
        description:
          'Blockchain, IA e Web3 aplicados à digitalização de processos críticos.',
        icon: 'solar:programming-2-bold-duotone',
        color: theme.palette.primary.main,
      },
      {
        id: 'gov',
        title: 'Governança Digital',
        description:
          'Identidade digital, credenciais verificáveis e rastreabilidade.',
        icon: 'solar:shield-check-bold-duotone',
        color: theme.palette.info.main,
      },
      {
        id: 'business',
        title: 'Inovação & Negócios',
        description:
          'Modelos digitais escaláveis com impacto econômico e social.',
        icon: 'solar:lightbulb-bold-duotone',
        color: theme.palette.secondary.main,
      },
      {
        id: 'rwa',
        title: 'Ativos Digitais (RWA)',
        description:
          'Tokenização de ativos reais conectando economia física e digital.',
        icon: 'solar:graph-up-bold-duotone',
        color: theme.palette.warning.main,
      },
    ],
    [theme]
  );

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 12, md: 18 },
          background: `
            radial-gradient(900px 500px at 15% 20%,
              ${alpha(theme.palette.primary.main, 0.12)},
              transparent 55%)
          `,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Container>
          <Grid container columns={12} spacing={6}>
            {/* TEXTO À ESQUERDA */}
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
              <m.div variants={varFade('inLeft')}>
                <SectionTitle
                  caption="Ecossistema Tecnológico"
                  title="Infraestrutura Digital"
                  txtGradient="de Nova Geração"
                />

                <Typography
                  sx={{
                    mt: 3,
                    maxWidth: 460,
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.8,
                    color: 'text.secondary',
                  }}
                >
                  Arquiteturas digitais seguras, escaláveis e interoperáveis
                  para inovação, governança e impacto social.
                </Typography>

                <Button
                  component={RouterLink}
                  href={paths.dashboard.root}
                  size="large"
                  variant="contained"
                  color="inherit"
                  endIcon={
                    <Iconify icon="solar:arrow-right-bold" />
                  }
                  sx={{
                    mt: 6,
                    height: 56,
                    px: 4,
                    fontWeight: 700,
                    borderRadius: 1.5,
                    boxShadow: theme.customShadows.z12,
                  }}
                >
                  Explorar Ecossistema
                </Button>
              </m.div>
            </Grid>

            {/* CARDS À DIREITA */}
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
              <Grid container columns={12} spacing={3}>
                {ITEMS.map((item) => (
                  <Grid
                    key={item.id}
                    sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}
                  >
                    <m.div variants={varFade('inUp')}>
                      <Stack
                        spacing={3}
                        sx={{
                          p: 4,
                          height: '100%',
                          borderRadius: 2.5,
                          bgcolor: alpha(
                            theme.palette.background.paper,
                            0.9
                          ),
                          border: `1px solid ${alpha(item.color, 0.25)}`,
                          transition: theme.transitions.create(
                            ['transform', 'box-shadow'],
                            { duration: 300 }
                          ),
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 32px 64px -20px ${alpha(
                              item.color,
                              0.45
                            )}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: item.color,
                            bgcolor: alpha(item.color, 0.18),
                          }}
                        >
                          <Iconify icon={item.icon} width={28} />
                        </Box>

                        <Typography variant="h6" fontWeight={800}>
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          lineHeight={1.7}
                        >
                          {item.description}
                        </Typography>
                      </Stack>
                    </m.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}
