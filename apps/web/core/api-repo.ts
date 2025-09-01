// apps/web/lib/api-repo.ts
import { $fetch } from 'ofetch'
import type {
  Group,
  GroupMember,
  GroupRole,
  IGroupRepo,
  IProfileRepo,
  Profile,
  Repo,
} from './repository'

const base = () => useRuntimeConfig().public.apiBase

class ApiProfileRepo implements IProfileRepo {
  async get(_userId: string): Promise<Profile | null> {
    return await $fetch('/me', { baseURL: base() })
  }
  async upsert(p: Profile): Promise<void> {
    await $fetch('/me', { baseURL: base(), method: 'POST', body: p })
  }
}
class ApiGroupRepo implements IGroupRepo {
  async list(_userId: string): Promise<Group[]> {
    return await $fetch('/groups', { baseURL: base() })
  }
  async get(id: string): Promise<Group | null> {
    return await $fetch(`/groups/${id}`, { baseURL: base() })
  }
  async create(_uid: string, g: { name: string; type: 'FRIENDS' | 'FAMILY' }): Promise<Group> {
    return await $fetch('/groups', { baseURL: base(), method: 'POST', body: g })
  }
  async listMembers(groupId: string): Promise<GroupMember[]> {
    return await $fetch(`/groups/${groupId}/members`, { baseURL: base() })
  }
  async addMember(groupId: string, userId: string, role: GroupRole): Promise<void> {
    await $fetch(`/groups/${groupId}/members`, {
      baseURL: base(),
      method: 'POST',
      body: { userId, role },
    })
  }
  async setRole(groupId: string, userId: string, role: GroupRole): Promise<void> {
    await $fetch(`/groups/${groupId}/members/${userId}`, {
      baseURL: base(),
      method: 'PATCH',
      body: { role },
    })
  }
}
export function createApiRepo(): Repo {
  return { profile: new ApiProfileRepo(), groups: new ApiGroupRepo() }
}
