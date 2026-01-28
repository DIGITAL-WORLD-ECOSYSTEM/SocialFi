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

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        left: 80,
        zIndex: 2,
        bottom: 64,
        position: 'absolute',
        transform: 'translateX(-50%)',
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

    <FloatLine vertical sx={{ top: 0, left: 80, display: { xs: 'none', md: 'block' } }} />
  </>
);

// ----------------------------------------------------------------------

export function HomeEcosystem({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const ECOSYSTEM_ITEMS = useMemo(
    () => [
      {
        id: 'reurb',
        title: 'REURB-S Social',
        description:
          'Regularização fundiária focada em segurança jurídica para o produtor rural.',
        icon: 'solar:square-academic-cap-bold-duotone',
        color: 'primary' as const,
      },
      {
        id: 'agro',
        title: 'Agroecologia RWA',
        description:
          'Monitoramento de produção de Café Arábica e Conilon via Blockchain.',
        icon: 'solar:rocket-bold-duotone',
        color: 'success' as const,
      },
      {
        id: 'defi',
        title: 'Crédito Descentralizado',
        description:
          'Acesso a liquidez e financiamento agrícola sem intermediários bancários.',
        icon: 'solar:chart-2-bold-duotone',
        color: 'info' as const,
      },
      {
        id: 'governance',
        title: 'Governança DAO',
        description:
          'Poder de decisão para a comunidade ASPPIBRA através do token de governança.',
        icon: 'solar:token-bold-duotone',
        color: 'warning' as const,
      },
    ],
    []
  );

  const renderGrid = () => (
    <Grid container columns={12} spacing={3}>
      {ECOSYSTEM_ITEMS.map((item) => (
        <Grid
          key={item.id}
          sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}
        >
          <m.div variants={varFade('inUp')}>
            <Stack
              spacing={2.5}
              sx={{
                p: 3.5,
                height: '100%',
                borderRadius: 2,
                bgcolor: 'background.neutral',
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                transition: theme.transitions.create(['all']),
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: theme.customShadows.z24,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  display: 'flex',
                  borderRadius: 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(theme.palette[item.color].main, 0.1),
                }}
              >
                <Iconify icon={item.icon as any} width={36} />
              </Box>

              <Typography variant="h6" fontWeight={800}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Stack>
          </m.div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      component="section"
      sx={[
        { py: { xs: 10, md: 15 }, position: 'relative' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container>
          <Grid container columns={12} spacing={6} alignItems="center">
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
              <SectionTitle
                caption="Ecosystem"
                title="O Futuro do"
                txtGradient="Agro Digital"
              />

              <Button
                component={RouterLink}
                href={paths.dashboard.root}
                size="large"
                variant="contained"
                endIcon={<Iconify icon={'solar:alt-arrow-right-outline' as any} />}
                sx={{ mt: 5 }}
              >
                Explorar Ecossistema
              </Button>
            </Grid>

            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
              {renderGrid()}
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}
