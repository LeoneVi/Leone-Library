import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ProfilePage from './ProfilePage.vue'

const meta = {
  title: 'Pages/Profile',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    username: 'reader',
  },
} satisfies Meta<typeof ProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
