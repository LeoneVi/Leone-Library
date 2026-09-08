<script setup lang="ts">
import SiteHeader from '@/components/Header.vue'
import LoginForm from '@/components/auth/login/LoginForm.vue'
</script>

<template>
  <div class="login-page">
    <SiteHeader />

    <main id="main-content" class="login-page__main">
      <LoginForm />
    </main>
  </div>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--color-background);
}

.login-page__main {
  display: grid;
  min-height: 0;
  place-items: center;
}
</style>
