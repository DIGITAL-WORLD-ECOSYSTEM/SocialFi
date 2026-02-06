'use client';

import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

// Componentes críticos: Carregamento imediato
import { HomeBackground } from '../components/home-background';
import { HomeHero } from '../home-hero';
import { HomeEcosystem } from '../home-ecosystem';

// ✅ MELHORIA: Lazy Loading para seções pesadas e abaixo da dobra
const HomeIntegrations = dynamic(() => import('../home-integrations').then((m) => m.HomeIntegrations));
const HomeCommunity = dynamic(() => import('../home-community').then((m) => m.HomeCommunity));
const HomeTeam = dynamic(() => import('../home-team').then((m) => m.HomeTeam));
const HomeLatestNews = dynamic(() => import('../home-latest-news').then((m) => m.HomeLatestNews));
const HomeRoadmap = dynamic(() => import('../home-roadmap').then((m) => m.HomeRoadmap));
const HomeFAQs = dynamic(() => import('../home-faqs').then((m) => m.HomeFAQs));
const CtaBanner = dynamic(() => import('../cta-banner').then((m) => m.CtaBanner));
const HomeCountdownDialog = dynamic(() => import('../components/home-countdown-dialog'));

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();
  const countdown = useBoolean(true);

  // DATA ALVO: Lançamento SocialFi Alpha
  const TARGET_DATE = new Date('2026-02-15T00:00:00');

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      {/* FUNDO ÚNICO: Persistente para ASPPIBRA-DAO */}
      <HomeBackground />

      {/* Conteúdo Principal */}
      <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
        <HomeHero />

        <Stack sx={{ position: 'relative', bgcolor: 'transparent' }}>
          <HomeEcosystem />

          <HomeIntegrations />

          <HomeCommunity />

          <HomeTeam />

          <HomeLatestNews />

          <HomeRoadmap />

          <HomeFAQs />

          <CtaBanner />
        </Stack>
      </Box>

      <HomeCountdownDialog
        open={countdown.value}
        onClose={countdown.onFalse}
        targetDate={TARGET_DATE}
      />
    </>
  );
}