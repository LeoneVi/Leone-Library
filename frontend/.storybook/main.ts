import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    })
  },
}

export default config
