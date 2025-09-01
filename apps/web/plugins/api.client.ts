import { defineNuxtPlugin, navigateTo, useRuntimeConfig } from '#app'
import { useAuthStore } from '@/stores/auth'
import { $fetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    async onRequest({ options }) {
      await auth.init()
      if (auth.accessToken) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout()
        if (process.client) navigateTo('/auth')
      }
    },
  })

  return { provide: { api } }
})
