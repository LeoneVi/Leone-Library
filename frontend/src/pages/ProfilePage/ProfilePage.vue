<script setup lang="ts">
import SiteHeader from '@/components/Header.vue'

defineProps<{
  username: string
}>()
</script>

<template>
  <div class="profile-page">
    <SiteHeader />

    <main id="main-content" class="container page-section">
      <h1>{{ username }}</h1>
    </main>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--color-background);
}
</style>
