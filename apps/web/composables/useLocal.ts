// apps/web/composables/useLocal.ts
export type Profile = { displayName: string; avatarUrl?: string }
export type Group = { id: string; name: string; type: 'FRIENDS' | 'FAMILY' }

export const useLocal = () => {
  const getProfile = (): Profile | null => {
    const s = localStorage.getItem('profile')
    return s ? JSON.parse(s) : null
  }
  const saveProfile = (p: Profile) => localStorage.setItem('profile', JSON.stringify(p))

  const listGroups = (): Group[] => JSON.parse(localStorage.getItem('groups') || '[]')
  const createGroup = (g: Omit<Group, 'id'>): Group => {
    const gs = listGroups()
    const newG: Group = { id: `g_${Date.now().toString(36)}`, ...g }
    gs.push(newG)
    localStorage.setItem('groups', JSON.stringify(gs))
    return newG
  }

  return { getProfile, saveProfile, listGroups, createGroup }
}
