import type { Meta, StoryObj } from '@storybook/vue3-vite'

import HomePage from './HomePage.vue'

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
