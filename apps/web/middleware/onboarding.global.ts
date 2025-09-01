// apps/web/middleware/onboarding.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  // // белый список маршрутов, куда пускать и без профиля
  // if (to.path.startsWith('/onboarding')) return
  // // при необходимости добавишь сюда ещё: /join, /legal и т.д.
  // const s = useProfileStore() // Pinia-стор (автоимпорт)
  // await s.init() // подтягиваем профиль (из repo)
  // if (!s.isOnboarded) return navigateTo('/onboarding')
})
