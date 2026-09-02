<script setup lang="ts">
import lionShieldSvg from '@/assets/icons/lion-shield.svg'
</script>

<template>
  <a class="brand-logo" href="/" aria-label="LeoneLibrary">
    <span class="brand-logo__name">LeoneLibrary</span>
    <img
      class="brand-logo__mark"
      :src="lionShieldSvg"
      alt=""
      width="44"
      height="45"
      aria-hidden="true"
    />
  </a>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.225rem;
  color: inherit;
  text-decoration: none;
}

.brand-logo__name {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
}

.brand-logo__mark {
  display: block;
  width: 2.75rem;
  height: auto;
  flex: none;
}
</style>
