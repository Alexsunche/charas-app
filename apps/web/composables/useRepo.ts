// apps/web/composables/useRepo.ts
import { createApiRepo } from '~/core/api-repo'
import { createLocalRepo } from '~/core/local-repo'
import type { Repo } from '~/core/repository'

let cached: Repo | null = null

export const useRepo = (): Repo => {
  if (cached) return cached
  const { useLocalRepo } = useRuntimeConfig().public
  cached = useLocalRepo ? createLocalRepo() : createApiRepo()
  return cached
}
