import { defineStore } from 'pinia'
import { useRepo } from '~/composables/useRepo'
import type { Group, GroupMember } from '~/core/repository'
import { useProfileStore } from './profile'

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    list: [] as Group[],
    members: {} as Record<string, GroupMember[]>,
    current: null as Group | null,
  }),
  getters: {
    isAdmin: (s) => (gid: string, uid: string) =>
      s.members[gid]?.some((m) => m.userId === uid && m.role === 'ADMIN') || false,
  },
  actions: {
    async load() {
      const p = useProfileStore()
      await p.init()
      this.list = await useRepo().groups.list(p.userId)
    },
    async open(gid: string) {
      this.current = await useRepo().groups.get(gid)
      this.members[gid] = await useRepo().groups.listMembers(gid)
    },
    async create(data: { name: string; type: 'FRIENDS' | 'FAMILY' }) {
      const p = useProfileStore()
      await p.init()
      const g = await useRepo().groups.create(p.userId, data)
      this.list.unshift(g)
      // создатель уже ADMIN (repo.create это сделал); подгрузим участников
      this.members[g.id] = await useRepo().groups.listMembers(g.id)
    },
    async addMember(gid: string, userId: string) {
      await useRepo().groups.addMember(gid, userId, 'MEMBER')
      this.members[gid] = await useRepo().groups.listMembers(gid)
    },
    async setRole(gid: string, userId: string, role: 'ADMIN' | 'MEMBER') {
      await useRepo().groups.setRole(gid, userId, role)
      this.members[gid] = await useRepo().groups.listMembers(gid)
    },
  },
})
