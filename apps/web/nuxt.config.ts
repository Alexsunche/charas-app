import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  // 👇 сюда сводим порт/хост дев-сервера
  devServer: {
    port: 3001,
    host: '127.0.0.1', // поменяй на '0.0.0.0', если нужно открыть по LAN/с телефона
  },

  css: ['~/assets/main.css'],
  vite: { plugins: [tailwindcss()] },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
      useLocalRepo: false, // false = работаем с реальным API
    },
  },
})
