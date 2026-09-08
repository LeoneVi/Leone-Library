<script setup lang="ts">
import InputField from "@/components/ui/inputfield/InputField.vue";
import Button from "@/components/ui/button/Button.vue";
import { ref } from "vue";

const form = ref({
  email: "",
  password: "",
});

function submitLogin() {
  console.log(form.value);

  // TODO add Django backend
}
</script>

<template>
  <div class="login-form">
    <div class="login-form__card">
      <div class="login-form__header">
        <h2 class="login-form__title">Welcome Back</h2>
      </div>

      <form class="login-form__form" method="post" @submit.prevent="submitLogin">
        <InputField
            id="login-email"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
        />

        <InputField
            id="login-password"
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
        />

        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>

      <p class="login-form__signup">
        Don't have an account?
        <a href="/signup">Sign up</a>
      </p>

    </div>

  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.login-form__card {
  width: 100%;
  max-width: 28rem;
  padding: var(--space-8);

  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-default);
}

.login-form__header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.login-form__title {
  margin: 0;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
}

.login-form__form {
  display: grid;
  gap: var(--space-5);
}

.login-form__form :deep(button) {
  width: 100%;
  margin-top: var(--space-2);
}

.login-form__signup {
  padding-top: var(--space-4);
  margin: 0;
  color: var(--color-primary-hover);
  font-size: var(--font-size-sm);
  text-align: center;
}

.login-form__signup a {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}

.login-form__signup a:hover {
  text-decoration: underline;
}
</style>
