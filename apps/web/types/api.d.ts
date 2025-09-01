// apps/web/types/api.d.ts
import type { NitroFetchRequest } from 'nitropack'
import type { $Fetch } from 'ofetch'

// Расширяем NuxtApp и Vue-компоненты: теперь $api не unknown
declare module 'nuxt/app' {
  interface NuxtApp {
    $api: $Fetch<unknown, NitroFetchRequest>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: $Fetch<unknown, NitroFetchRequest>
  }
}

export {}
