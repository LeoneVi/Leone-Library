import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SignupPage from './SignupPage.vue'

const meta = {
  title: 'Pages/Signup',
  component: SignupPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
