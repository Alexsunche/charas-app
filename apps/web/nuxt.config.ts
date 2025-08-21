// apps/web/nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  // подключаем один общий файл стилей
  css: ['~/assets/main.css'],

  // Tailwind v4 через Vite-плагин
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [], // важно: без '@nuxtjs/tailwindcss'

  runtimeConfig: {
    public: { apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000' },
  },
})
