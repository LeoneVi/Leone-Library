import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SignupForm from './SignupForm.vue'

const meta = {
    title: 'Layout/SignupForm',
    component: SignupForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SignupForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
