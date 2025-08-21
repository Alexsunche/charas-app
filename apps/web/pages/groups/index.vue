<!-- apps/web/pages/groups/index.vue -->
<template>
  <n-card title="Мои группы" size="large">
    <n-grid :cols="1" :x-gap="16" :y-gap="16" responsive="screen" :sm="2">
      <n-grid-item v-for="g in groups" :key="g.id">
        <n-card :title="g.name" size="small">
          <n-thing title="">
            <template #description>{{ g.type === 'FAMILY' ? 'Семья' : 'Друзья' }}</template>
          </n-thing>
        </n-card>
      </n-grid-item>
    </n-grid>
    <template #footer v-if="groups.length === 0">
      <n-text depth="3">Пока пусто. Создай первую группу.</n-text>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NGrid, NGridItem, NText, NThing } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useLocal } from '../../composables/useLocal'

const { listGroups } = useLocal()
const groups = ref<Array<{ id: string; name: string; type: 'FRIENDS' | 'FAMILY' }>>([])
onMounted(() => {
  groups.value = listGroups()
})
</script>
