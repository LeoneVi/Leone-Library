<script setup lang="ts">
import { ref } from "vue";

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

async function submitSignup() {
  console.log(form.value);

  passwordError.value = "";

  // ensure both passwords are the same
  if(form.value.password !== form.value.confirmPassword) {
    passwordError.value = "Passwords do not match";
    return;
  }
  const result = await signupAuth({
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
  })

  console.log(result)
}

</script>

<template>
  <div class="signup-form">
    <div class="signup-form__card">
      <div class="signup-form__header">
        <h2 class="signup-form__title">Create Account</h2>
      </div>

      <form class="signup-form__form" method="post" @submit.prevent="submitSignup">
        <InputField
            id="signup-email"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter your email"
        />

        <InputField
            id="signup-username"
            v-model="form.username"
            label="Username"
            type="text"
            placeholder="Enter your username"
        />

        <InputField
            id="signup-password"
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter your password"
        />

        <InputField
            id="signup-confirm-password"
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
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
