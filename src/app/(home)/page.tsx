import type { Metadata } from 'next';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

// ✅ BLINDAGEM OBRIGATÓRIA:
// Landing Pages são pesadas (Hero, Features, Animações).
// Mudamos para 'nodejs' para garantir o limite de 50MB e evitar erros no deploy.
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Minimals UI: The starting point for your next project',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
};

export default function Page() {
  return <HomeView />;
}