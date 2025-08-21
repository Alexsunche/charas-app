<!-- apps/web/pages/index.vue -->
<template>
  <n-card title="Добро пожаловать 👋" size="large">
    <n-space size="large">
      <NuxtLink to="/onboarding"><n-button type="primary">Профиль</n-button></NuxtLink>
      <NuxtLink to="/groups/create"><n-button quaternary>Создать группу</n-button></NuxtLink>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NButton, NCard, NSpace } from 'naive-ui'
</script>
