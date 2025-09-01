<template>
  <div class="auth-shell">
    <aside class="auth-hero">
      <img src="/app_hero.png" alt="welcome" />
      <div class="auth-hero__overlay"></div>
    </aside>
    <main class="auth-panel">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// подключаем внешний CSS один раз для этого layout
import '~/assets/styles/auth.css'
</script>
