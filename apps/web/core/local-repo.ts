// apps/web/lib/local-repo.ts
import type {
  Group,
  GroupMember,
  GroupRole,
  IGroupRepo,
  IProfileRepo,
  Profile,
  Repo,
} from './repository'

const key = {
  profile: (uid: string) => `profile:${uid}`,
  groups: (uid: string) => `groups:${uid}`,
  groupMembers: (gid: string) => `groupMembers:${gid}`,
  groupMeta: (gid: string) => `group:${gid}`,
}

function read<T>(k: string, fallback: T): T {
  const raw = localStorage.getItem(k)
  return raw ? (JSON.parse(raw) as T) : fallback
}
function write<T>(k: string, val: T) {
  localStorage.setItem(k, JSON.stringify(val))
}

class LocalProfileRepo implements IProfileRepo {
  async get(userId: string): Promise<Profile | null> {
    return read<Profile | null>(key.profile(userId), null)
  }
  async upsert(p: Profile): Promise<void> {
    write(key.profile(p.userId), p)
  }
}

class LocalGroupRepo implements IGroupRepo {
  async list(userId: string): Promise<Group[]> {
    return read<Group[]>(key.groups(userId), [])
  }
  async get(id: string): Promise<Group | null> {
    return read<Group | null>(key.groupMeta(id), null)
  }
  async create(userId: string, g: { name: string; type: 'FRIENDS' | 'FAMILY' }): Promise<Group> {
    const listKey = key.groups(userId)
    const all = read<Group[]>(listKey, [])
    const newG: Group = { id: `g_${Date.now().toString(36)}`, ownerId: userId, ...g }
    // сохраняем мету и включаем создателя как ADMIN
    write(key.groupMeta(newG.id), newG)
    write(key.groupMembers(newG.id), [{ userId, role: 'ADMIN' as GroupRole }])
    all.unshift(newG)
    write(listKey, all)
    return newG
  }
  async listMembers(groupId: string): Promise<GroupMember[]> {
    return read<GroupMember[]>(key.groupMembers(groupId), [])
  }
  async addMember(groupId: string, userId: string, role: GroupRole): Promise<void> {
    const members = read<GroupMember[]>(key.groupMembers(groupId), [])
    const idx = members.findIndex((m) => m.userId === userId)
    if (idx === -1) members.push({ userId, role })
    else members[idx].role = role
    write(key.groupMembers(groupId), members)
  }
  async setRole(groupId: string, userId: string, role: GroupRole): Promise<void> {
    const members = read<GroupMember[]>(key.groupMembers(groupId), [])
    const idx = members.findIndex((m) => m.userId === userId)
    if (idx !== -1) {
      members[idx].role = role
      write(key.groupMembers(groupId), members)
    }
  }
}

export function createLocalRepo(): Repo {
  return { profile: new LocalProfileRepo(), groups: new LocalGroupRepo() }
}
