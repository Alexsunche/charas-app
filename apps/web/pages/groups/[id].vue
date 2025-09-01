<template>
  <n-space vertical size="large">
    <n-card v-if="g" :title="g.name" size="large">
      <template #header-extra>
        <n-tag type="info">{{ g.type === 'FAMILY' ? 'Семья' : 'Друзья' }}</n-tag>
      </template>
      <n-space vertical>
        <n-data-table :columns="columns" :data="rows" :bordered="true" />
        <n-input-group>
          <n-input v-model:value="newUid" placeholder="userId для добавления" />
          <n-button type="primary" @click="add">Добавить</n-button>
        </n-input-group>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { NButton, NCard, NDataTable, NInput, NInputGroup, NSpace, NTag } from 'naive-ui'
const route = useRoute()
const groups = useGroupsStore()
const profile = useProfileStore()
const gid = route.params.id as string
const g = computed(() => groups.current)
const newUid = ref('')

onMounted(async () => {
  await profile.init()
  await groups.open(gid)
})

const rows = computed(() =>
  (groups.members[gid] || []).map((m) => ({
    userId: m.userId,
    role: m.role,
    isSelf: m.userId === profile.userId,
    canPromote: groups.isAdmin(gid, profile.userId) && m.role !== 'ADMIN',
    canDemote:
      groups.isAdmin(gid, profile.userId) && m.userId !== profile.userId && m.role !== 'MEMBER',
  })),
)

const columns = [
  { title: 'Пользователь', key: 'userId' },
  {
    title: 'Роль',
    key: 'role',
    render: (row: any) =>
      h(NTag, { type: row.role === 'ADMIN' ? 'success' : 'default' }, { default: () => row.role }),
  },
  {
    title: 'Действия',
    key: 'actions',
    render: (row: any) =>
      h(NSpace, { size: 'small' }, () => [
        row.canPromote &&
          h(
            NButton,
            { size: 'small', onClick: () => setRole(row.userId, 'ADMIN') },
            { default: () => 'Сделать админом' },
          ),
        row.canDemote &&
          h(
            NButton,
            { size: 'small', tertiary: true, onClick: () => setRole(row.userId, 'MEMBER') },
            { default: () => 'Снять админа' },
          ),
      ]),
  },
]

function setRole(userId: string, role: 'ADMIN' | 'MEMBER') {
  groups.setRole(gid, userId, role)
}
function add() {
  if (!newUid.value) return
  groups.addMember(gid, newUid.value)
  newUid.value = ''
}
</script>
