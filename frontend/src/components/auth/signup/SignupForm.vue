<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'

import InputField from "@/components/ui/inputfield/InputField.vue";
import Button from "@/components/ui/button/Button.vue";
import { signupAuth } from '@/components/auth/auth.ts'

const form = ref({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
});

const passwordError = ref("")
const formError = ref("")
const formMessage = ref("")
const router = useRouter();

async function submitSignup() {
  passwordError.value = "";
  formError.value = "";
  formMessage.value = "";

  // ensure both passwords are the same
  if(form.value.password !== form.value.confirmPassword) {
    passwordError.value = "Passwords do not match";
    return;
  }

  try {
    const result = await signupAuth({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    })

    if (result.status === 200) {
      const username = result.body.data.user.username

      await router.push(`/user/${username}`)
      return
    }

    if (result.status === 400) {
      formError.value = result.body.errors?.[0]?.message ?? "Could not create account.";
      return
    }

    if(result.status === 401) {
      formMessage.value = "Check your email for a verification link.";
      return
    }

    formError.value = "Could not create account.";

  } catch {
    formError.value = "Could not connect to server."
  }
}

</script>

<template>
  <div class="signup-form">
    <div class="signup-form__card">
      <div class="signup-form__header">
        <h2 class="signup-form__title">Create Account</h2>
      </div>

      <p v-if="formError" class="signup-form__error" role="alert">
        {{ formError }}
      </p>

      <p v-if="formMessage" class="signup-form__message" role="status">
        {{ formMessage }}
      </p>

      <form class="signup-form__form" method="post" @submit.prevent="submitSignup">
        <InputField
            id="signup-email"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            required
        />

        <InputField
            id="signup-username"
            v-model="form.username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            autocomplete="username"
            required
        />

        <InputField
            id="signup-password"
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autocomplete="new-password"
            required
        />

        <InputField
            id="signup-confirm-password"
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autocomplete="new-password"
            required
            :error="passwordError"
        />

        <Button type="submit" variant="primary">
          Sign up
        </Button>
      </form>

      <p class="signup-form__login">
        Already have an account?
        <a href="/login">Log in</a>
      </p>

    </div>

  </div>
</template>

<style scoped>
.signup-form {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.signup-form__card {
  width: 100%;
  max-width: 28rem;
  padding: var(--space-8);

  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-default);
}

.signup-form__header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.signup-form__title {
  margin: 0;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
}

.signup-form__error,
.signup-form__message {
  margin: 0 0 var(--space-4);
  text-align: center;
}

.signup-form__error {
  color: var(--color-error);
}

.signup-form__form {
  display: grid;
  gap: var(--space-5);
}

.signup-form__form :deep(button) {
  width: 100%;
  margin-top: var(--space-2);
}

.signup-form__login {
  padding-top: var(--space-4);
  margin: 0;
  color: var(--color-primary-hover);
  font-size: var(--font-size-sm);
  text-align: center;
}

.signup-form__login a {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}

.signup-form__login a:hover {
  text-decoration: underline;
}
</style>
