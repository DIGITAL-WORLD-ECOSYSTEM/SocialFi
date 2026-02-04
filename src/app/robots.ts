import type { MetadataRoute } from 'next';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${CONFIG.site.baseUrl}/sitemap.xml`,
  };
}
