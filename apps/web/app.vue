<!-- apps/web/app.vue -->
<template>
  <n-config-provider :theme-overrides="theme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  type GlobalThemeOverrides,
} from 'naive-ui'

const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: '#32a89e',
  },
}
</script>
