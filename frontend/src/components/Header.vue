<script setup lang="ts">
import Logo from '@/components/Logo.vue'
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner container">
      <Logo />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  width: 100%;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-block: var(--space-4);
}
</style>
