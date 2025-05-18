import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    Pages({
      onRoutesGenerated: (routes) => {
        generateSitemap({
          //show up on google searches
          routes,
          hostname: 'https://crocodillo.org',
          dest: 'public',
        })
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: ['devserver-main--crocodillo.netlify.app'],
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})
