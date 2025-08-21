<!-- apps/web/components/AppHeader.vue -->
<template>
  <n-space
    align="center"
    justify="space-between"
    size="large"
    style="height: 56px; padding: 0 16px"
  >
    <NuxtLink to="/" style="font-weight: 600; text-decoration: none; color: inherit"
      >charas</NuxtLink
    >

    <n-space align="center" size="large">
      <NuxtLink to="/onboarding" style="text-decoration: none; color: inherit">Профиль</NuxtLink>
      <NuxtLink to="/groups" style="text-decoration: none; color: inherit">Группы</NuxtLink>
      <NuxtLink to="/groups/create" style="text-decoration: none">
        <n-button type="primary" strong round>+ Группа</n-button>
      </NuxtLink>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
</script>
