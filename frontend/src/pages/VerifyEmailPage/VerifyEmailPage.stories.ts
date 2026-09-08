import type { Meta, StoryObj } from '@storybook/vue3-vite'

import VerifyEmailPage from './VerifyEmailPage.vue'

const meta = {
  title: 'Pages/Verify Email',
  component: VerifyEmailPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    verificationKey: 'example-verification-key',
  },
} satisfies Meta<typeof VerifyEmailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
