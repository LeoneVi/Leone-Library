<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    name?: string
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
    placeholder?: string
    autocomplete?: string
    hint?: string
    error?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: undefined,
    autocomplete: undefined,
    hint: undefined,
    error: undefined,
    required: false,
    disabled: false,
    readonly: false,
  },
)

const model = defineModel<string>({ default: '' })

const describedBy = computed(() => {
  const descriptions = []

  if (props.hint) descriptions.push(`${props.id}-hint`)
  if (props.error) descriptions.push(`${props.id}-error`)

  return descriptions.join(' ') || undefined
})
</script>

<template>
  <div class="input-field">
    <label class="input-field__label" :for="id">
      {{ label }}
      <span v-if="required" class="input-field__required" aria-hidden="true">*</span>
    </label>

    <input
      :id="id"
      v-model="model"
      class="input-field__control"
      :class="{ 'input-field__control--error': error }"
      :name="name ?? id"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    />

    <p v-if="hint" :id="`${id}-hint`" class="input-field__hint">
      {{ hint }}
    </p>

    <p v-if="error" :id="`${id}-error`" class="input-field__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.input-field {
  display: grid;
  gap: var(--space-2);
  width: 100%;
}

.input-field__label {
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
}

.input-field__required,
.input-field__error {
  color: var(--color-error);
}

.input-field__control {
  width: 100%;
  min-height: 2.75rem;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.input-field__control:hover:not(:disabled) {
  border-color: var(--color-primary-hover);
}

.input-field__control--error {
  border-color: var(--color-error);
}

.input-field__control:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.input-field__hint,
.input-field__error {
  margin: 0;
  font-size: var(--font-size-sm);
}
</style>
