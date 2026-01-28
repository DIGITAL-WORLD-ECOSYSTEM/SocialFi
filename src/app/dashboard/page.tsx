import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

// ✅ CORREÇÃO PREVENTIVA OBRIGATÓRIA:
// Dashboards contêm gráficos pesados. Mudamos para 'nodejs' para ter 50MB de limite.
export const runtime = 'nodejs';

export const metadata: Metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewAppView />;
}