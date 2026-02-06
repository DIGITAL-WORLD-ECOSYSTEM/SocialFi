'use client';

import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

// Componentes Críticos (Immediate Loading)
import { HomeBackground } from '../components/home-background';
import { HomeHero } from '../home-hero';
import { HomeEcosystem } from '../home-ecosystem';

// ✅ Lazy Loading Otimizado para Produção
const HomeIntegrations = dynamic(() => import('../home-integrations').then((m) => m.HomeIntegrations), { ssr: false });
const HomeCommunity = dynamic(() => import('../home-community').then((m) => m.HomeCommunity), { ssr: false });
const HomeTeam = dynamic(() => import('../home-team').then((m) => m.HomeTeam), { ssr: false });
const HomeLatestNews = dynamic(() => import('../home-latest-news').then((m) => m.HomeLatestNews), { ssr: false });
const HomeRoadmap = dynamic(() => import('../home-roadmap').then((m) => m.HomeRoadmap), { ssr: false });
const HomeFAQs = dynamic(() => import('../home-faqs').then((m) => m.HomeFAQs), { ssr: false });
const CtaBanner = dynamic(() => import('../cta-banner').then((m) => m.CtaBanner), { ssr: false });
const HomeCountdownDialog = dynamic(() => import('../components/home-countdown-dialog'), { ssr: false });

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();
  const countdown = useBoolean(true);

  // DATA ALVO: Lançamento SocialFi Alpha (15 de Fevereiro de 2026)
  const TARGET_DATE = new Date('2026-02-15T00:00:00');

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      {/* FUNDO ÚNICO: Persistente para ASPPIBRA-DAO e infraestrutura RWA */}
      <HomeBackground />

      {/* Conteúdo Principal flutuando sobre o Vortex Galáctico */}
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

      {/* Dialog de contagem regressiva para 15/02/2026 */}
      <HomeCountdownDialog
        open={countdown.value}
        onClose={countdown.onFalse}
        targetDate={TARGET_DATE}
      />
    </>
  );
}