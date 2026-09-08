<script setup lang="ts">
import SiteHeader from '@/components/Header.vue'
</script>

<template>
  <div class="home-page">
    <SiteHeader />
    <main id="main-content"></main>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--color-background);
}
</style>
