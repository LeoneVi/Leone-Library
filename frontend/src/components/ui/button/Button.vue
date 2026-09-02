<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    fullWidth?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
    fullWidth: false,
  },
)
</script>

<template>
  <button
    class="ui-button"
    :class="[`ui-button--${variant}`, { 'ui-button--full-width': fullWidth }]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  padding: var(--space-3) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.ui-button--primary {
  color: var(--color-white);
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.ui-button--primary:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.ui-button--secondary {
  color: var(--color-primary);
  background: var(--color-white);
  border-color: var(--color-primary);
}

.ui-button--secondary:hover {
  color: var(--color-white);
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.ui-button--danger {
  color: var(--color-white);
  background: var(--color-error);
  border-color: var(--color-error);
}

.ui-button--danger:hover {
  background: var(--color-dark);
  border-color: var(--color-dark);
}

.ui-button--full-width {
  width: 100%;
}

.ui-button:active:not(:disabled) {
  transform: translateY(1px);
}

.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
