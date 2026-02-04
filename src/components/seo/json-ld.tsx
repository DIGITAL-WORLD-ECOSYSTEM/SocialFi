import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type BreadcrumbItem = {
  name: string;
  href: string;
};

/**
 * Gera o schema JSON-LD para Breadcrumbs.
 * @param items - Uma lista de itens de breadcrumb.
 * @example
 * const breadcrumbs = [
 *   { name: 'Home', href: '/' },
 *   { name: 'Blog', href: '/blog' },
 *   { name: 'Post Title', href: '/post/post-title' },
 * ];
 */
export const generateBreadcrumbs = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${CONFIG.site.baseUrl}${item.href}`,
  })),
});

// ----------------------------------------------------------------------

type Props = {
  schema: object;
};

export function JsonLd({ schema }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
