<!-- apps/web/layouts/default.vue -->
<template>
  <n-layout>
    <n-layout-header bordered :inverted="false">
      <AppHeader />
    </n-layout-header>

    <n-layout-content
      :native-scrollbar="false"
      content-style="max-width:1040px;margin:0 auto;padding:24px;"
    >
      <slot />
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
import AppHeader from '../components/AppHeader.vue'
</script>
