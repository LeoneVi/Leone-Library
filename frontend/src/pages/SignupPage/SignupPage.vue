<script setup lang="ts">
import SiteHeader from '@/components/Header.vue'
import SignupForm from '@/components/auth/signup/SignupForm.vue'
</script>

<template>
  <div class="signup-page">
    <SiteHeader />

    <main id="main-content" class="signup-page__main">
      <SignupForm />
    </main>
  </div>
</template>

<style scoped>
.signup-page {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-background);
}

.signup-page__main {
  display: grid;
  min-height: 0;
  place-items: center;
}
</style>
