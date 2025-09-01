import { defineStore } from 'pinia'
const AUTH_KEY = 'auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({ accessToken: '' as string }),
  getters: { isAuthed: (s) => !!s.accessToken },
  actions: {
    async init() {
      if (this.accessToken) return
      const raw = localStorage.getItem(AUTH_KEY)
      if (raw) this.accessToken = JSON.parse(raw).accessToken
    },
    async register(displayName: string, email: string, password: string) {
      const { $api } = useNuxtApp()
      const res = (await $api('/auth/register', {
        method: 'POST',
        body: { displayName, email, password },
      })) as any
      this.accessToken = res.accessToken
      localStorage.setItem(AUTH_KEY, JSON.stringify({ accessToken: res.accessToken }))
    },
    async login(email: string, password: string) {
      const { $api } = useNuxtApp()
      const res = (await $api('/auth/login', { method: 'POST', body: { email, password } })) as any
      this.accessToken = res.accessToken
      localStorage.setItem(AUTH_KEY, JSON.stringify({ accessToken: res.accessToken }))
    },
    logout() {
      this.accessToken = ''
      localStorage.removeItem(AUTH_KEY)
    },
  },
})
