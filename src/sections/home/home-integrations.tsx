import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatDotIcon } from './components/svg-elements';
import { IntegrationsDiagram } from './components/integrations-diagram';

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

    <FloatLine
      vertical
      sx={{ top: 0, left: 80, display: { xs: 'none', md: 'block' } }}
    />
  </>
);

// ----------------------------------------------------------------------

export function HomeIntegrations({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate();

  const renderDescription = () => (
    <SectionTitle
      caption={t('infrastructure.caption') || 'Infraestrutura'}
      title={t('infrastructure.title') || 'Ecossistema'}
      txtGradient={t('infrastructure.title_highlight') || 'Conectado'}
      description={
        <>
          <Box component="span" sx={{ mb: 2, display: 'block', lineHeight: 1.7 }}>
            {t('infrastructure.description') ||
              'Integração nativa com protocolos de auditoria e redes blockchain para garantir a transparência dos ativos RWA.'}
          </Box>

          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              typography: 'caption',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            {t('infrastructure.footnote') ||
              '• Protocolos auditados por CertiK & OpenZeppelin'}
          </Box>
        </>
      }
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    />
  );

  const renderImage = () => (
    <Box
      sx={{
        filter: `drop-shadow(0 24px 48px ${
          theme.palette.mode === 'dark'
            ? '#000'
            : alpha(theme.palette.primary.main, 0.16)
        })`,
      }}
    >
      <IntegrationsDiagram />
    </Box>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'background.default',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Grid
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
            columnGap={{ xs: 4, md: 8 }}
            rowGap={{ xs: 6, md: 0 }}
            alignItems="center"
          >
            <Grid>
              {renderDescription()}
            </Grid>

            <Grid sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              {renderImage()}
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}
