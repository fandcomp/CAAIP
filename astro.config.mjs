import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://caaip.example.com', // TODO: update to final domain
  integrations: [tailwind({
    applyBaseStyles: true,
  })],
  output: 'static',
});
