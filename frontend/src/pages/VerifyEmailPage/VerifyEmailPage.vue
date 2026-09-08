<script setup lang="ts">
import { ref } from 'vue'

import SiteHeader from '@/components/Header.vue'
import { verifyEmailAuth } from '@/components/auth/auth'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  verificationKey: string
}>()

const isVerifying = ref(false)
const isVerified = ref(false)
const statusMessage = ref('Confirm your email address to finish creating your account.')
const errorMessage = ref('')
const continuePath = ref('/login')

async function verifyEmail() {
  isVerifying.value = true
  errorMessage.value = ''

  try {
    const result = await verifyEmailAuth(props.verificationKey)

    if (result.status === 200 || result.status === 401) {
      const username = result.body.data?.user?.username

      if (result.body.meta?.is_authenticated && username) {
        continuePath.value = `/user/${encodeURIComponent(username)}`
        statusMessage.value = 'Your email is verified and your account is ready.'
      } else {
        statusMessage.value = 'Your email is verified. You can now log in.'
      }

      isVerified.value = true
      return
    }

    errorMessage.value =
      result.body.errors?.[0]?.message ?? 'This verification link is invalid or expired.'
  } catch {
    errorMessage.value = 'Could not connect to the server. Please try again.'
  } finally {
    isVerifying.value = false
  }
}
</script>

<template>
  <div class="verify-email-page">
    <SiteHeader />

    <main id="main-content" class="verify-email-page__main container">
      <section class="verify-email-page__content" aria-labelledby="verify-email-title">
        <h1 id="verify-email-title">Verify your email</h1>
        <p aria-live="polite">{{ statusMessage }}</p>
        <p v-if="errorMessage" class="verify-email-page__error" role="alert">
          {{ errorMessage }}
        </p>

        <Button v-if="!isVerified" :disabled="isVerifying" @click="verifyEmail">
          {{ isVerifying ? 'Verifying…' : 'Verify email' }}
        </Button>

        <a v-else :href="continuePath">Continue</a>
      </section>
    </main>
  </div>
</template>

<style scoped>
.verify-email-page {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--color-background);
}

.verify-email-page__main {
  display: grid;
  min-height: 0;
  place-items: center;
}

.verify-email-page__content {
  display: grid;
  gap: var(--space-4);
  justify-items: center;
  padding-block: var(--space-6);
  text-align: center;
}

.verify-email-page__error {
  color: var(--color-error);
}
</style>
