import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import ProductShopDetailsView from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product details - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // CORREÇÃO LINT: A variável 'id' foi removida pois não estava sendo usada.
  // Se precisar dela no futuro para buscar dados, descomente a linha abaixo:
  // const { id } = await params;

  return <ProductShopDetailsView />;
}

// ----------------------------------------------------------------------

// CORREÇÃO BUILD: Removemos 'generateStaticParams' para evitar erros de API (Axios) durante o build.
// Isso força a página a ser renderizada dinamicamente (SSR), o que é o comportamento correto agora.