// @ts-check
import { defineConfig } from 'astro/config';
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sqlocal from "sqlocal/vite"
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      // @ts-expect-error
      tailwindcss(),
      process.env.NODE_ENV === "development" && visualizer({
        emitFile: true,
        filename: "stat.html"
      }),
      // @ts-expect-error
      sqlocal()
    ]
  },
  site: "https://dw-tools.vercel.app",
  integrations: [react(), sitemap()]
});