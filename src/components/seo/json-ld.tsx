import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

// Tipagem para os dados do Schema de Artigo
type ArticleSchema = {
  url: string;
  title: string;
  description: string;
  coverUrl: string;
  createdAt: Date | string | number;
  authorName: string;
};

// ----------------------------------------------------------------------

export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ----------------------------------------------------------------------

export function generateBreadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${CONFIG.siteUrl}${item.href}`,
    })),
  };
}

// ----------------------------------------------------------------------

// 🟢 NOVA FUNÇÃO: Gera o JSON-LD completo para um artigo
export function generateArticleSchema(data: ArticleSchema) {
  const { url, title, description, coverUrl, createdAt, authorName } = data;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle', // Ou 'BlogPosting' se preferir
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${CONFIG.siteUrl}${url}`,
    },
    headline: title,
    description: description,
    image: coverUrl,
    datePublished: new Date(createdAt).toISOString(),
    dateModified: new Date(createdAt).toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: CONFIG.appName,
      logo: {
        '@type': 'ImageObject',
        url: `${CONFIG.siteUrl}/logo/logo-single.png`, // Caminho para o logo
      },
    },
  };
}
