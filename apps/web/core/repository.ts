// apps/web/lib/repository.ts
export type GroupRole = 'ADMIN' | 'MEMBER'
export type Profile = { userId: string; displayName: string; avatarUrl?: string }
export type Group = { id: string; name: string; type: 'FRIENDS' | 'FAMILY'; ownerId: string }
export type GroupMember = { userId: string; role: GroupRole }

export interface IProfileRepo {
  get(userId: string): Promise<Profile | null>
  upsert(p: Profile): Promise<void>
}
export interface IGroupRepo {
  list(userId: string): Promise<Group[]>
  create(userId: string, g: { name: string; type: 'FRIENDS' | 'FAMILY' }): Promise<Group>
  get(id: string): Promise<Group | null>
  // участники и роли
  listMembers(groupId: string): Promise<GroupMember[]>
  addMember(groupId: string, userId: string, role: GroupRole): Promise<void>
  setRole(groupId: string, userId: string, role: GroupRole): Promise<void>
}

export interface Repo {
  profile: IProfileRepo
  groups: IGroupRepo
}
