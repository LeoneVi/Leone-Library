import type { Meta, StoryObj } from '@storybook/vue3-vite'

import LoginForm from './LoginForm.vue'

const meta = {
    title: 'Layout/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
