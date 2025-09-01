import { defineStore } from 'pinia'
import type { Profile } from '~/core/repository'
import { useAuthStore } from './auth'

export const useProfileStore = defineStore('profile', {
  state: () => ({ profile: null as Profile | null }),
  getters: { isOnboarded: (s) => Boolean(s.profile?.displayName) },
  actions: {
    async init() {
      const auth = useAuthStore()
      await auth.init()
      if (!auth.isAuthed) {
        this.profile = null
        return
      }
      const { $api } = useNuxtApp()
      try {
        this.profile = (await $api('/auth/me')) as any
      } catch {
        this.profile = null
      }
    },
  },
})
