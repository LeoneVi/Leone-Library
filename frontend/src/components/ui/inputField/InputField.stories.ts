import type { Meta, StoryObj } from '@storybook/vue3-vite'

import InputField from './InputField.vue'

const meta = {
  title: 'UI/Input Field',
  component: InputField,
  tags: ['autodocs'],
  args: {
    id: 'email-address',
    label: 'Email address',
    type: 'email',
    placeholder: 'reader@example.com',
    autocomplete: 'email',
    required: false,
    disabled: false,
    readonly: false,
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    id: 'password',
    label: 'Password',
    type: 'password',
    autocomplete: 'new-password',
    hint: 'Use at least eight characters.',
  },
}

export const Invalid: Story = {
  args: {
    error: 'Enter a complete email address.',
    modelValue: 'reader@example',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'reader@example.com',
  },
}
