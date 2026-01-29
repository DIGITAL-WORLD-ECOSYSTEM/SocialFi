'use client';

import Stack from '@mui/material/Stack';

// Importação do hook de estado para o Pop-up
import { useBoolean } from 'src/hooks/use-boolean';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeTeam } from '../home-team';
import { HomeRoadmap } from '../home-roadmap';
import { HomeEcosystem } from '../home-ecosystem';
import { HomeCommunity } from '../home-community';
import { HomeLatestNews } from '../home-latest-news';
import { HomeIntegrations } from '../home-integrations';
import { CtaBanner } from '../cta-banner';
// Importação do componente que revisamos
import HomeCountdownDialog from '../components/home-countdown-dialog';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();
  
  // Controle do estado do Pop-up (Inicia aberto por padrão)
  const countdown = useBoolean(true);

  // DATA ALVO: Defina aqui a data de lançamento da SocialFi Alpha
  const TARGET_DATE = new Date('2026-02-15T00:00:00');

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      {/* Seção Principal: ASPPIBRA-DAO & RWA */}
      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeEcosystem />

        <HomeIntegrations />

        <HomeCommunity />

        <HomeTeam />

        <HomeLatestNews />

        <HomeRoadmap />

        <HomeFAQs />

        <CtaBanner />
      </Stack>

      {/* POP-UP: Posicionado na raiz para evitar conflitos de Z-Index do Hero */}
      <HomeCountdownDialog
        open={countdown.value}
        onClose={countdown.onFalse}
        targetDate={TARGET_DATE}
      />
    </>
  );
}