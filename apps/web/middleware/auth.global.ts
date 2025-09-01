// apps/web/middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  await auth.init()
  if (!auth.isAuthed && !to.path.startsWith('/auth')) return navigateTo('/auth')
})
