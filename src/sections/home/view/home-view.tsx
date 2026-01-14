'use client';

import Stack from '@mui/material/Stack';

// 1. IMPORTAR O HOOK DE ESTADO
import { useBoolean } from 'src/hooks/use-boolean';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeTeam } from '../home-team';
import { HomeIntegrations } from '../home-integrations';
import { HomeAdvertisement } from '../home-advertisement';

// 2. IMPORTAR O COMPONENTE DO POP-UP
import HomeCountdownDialog from '../home-countdown-dialog';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  // 3. CONTROLE DO POP-UP (Inicia como 'true' para abrir automaticamente)
  const countdownOpen = useBoolean(true);

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeIntegrations />

        <HomeTeam />

        <HomeFAQs />

        <HomeAdvertisement />
      </Stack>

      {/* 4. CHAMADA DO POP-UP */}
      <HomeCountdownDialog
        open={countdownOpen.value}
        onClose={countdownOpen.onFalse}
        // Defina a data alvo para o fim da contagem aqui
        targetDate={new Date('2026-02-20T23:59:59')}
      />
    </>
  );
}