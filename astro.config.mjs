import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://caaip.id',
  integrations: [tailwind({
    applyBaseStyles: true,
  })],
  output: 'static',
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
