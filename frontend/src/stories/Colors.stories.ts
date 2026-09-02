import type { Meta, StoryObj } from '@storybook/vue3-vite'

import './colors.css'

const colors = [
  {
    name: 'Dark',
    token: '--color-dark',
    value: '#250902',
    usage: 'Headings and body text',
  },
  {
    name: 'Primary',
    token: '--color-primary',
    value: '#800020',
    usage: 'Brand marks and primary actions',
  },
  {
    name: 'Primary hover',
    token: '--color-primary-hover',
    value: '#A52A2A',
    usage: 'Hover and active emphasis',
  },
  {
    name: 'Error',
    token: '--color-error',
    value: '#B22222',
    usage: 'Validation and destructive states only',
  },
  {
    name: 'Soft accent',
    token: '--color-accent-soft',
    value: '#CD5C5C',
    usage: 'Borders and restrained decoration',
  },
  {
    name: 'Warm accent',
    token: '--color-accent',
    value: '#D2691E',
    usage: 'Focus rings and small highlights',
  },
]

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const BrandPalette: Story = {
  render: () => ({
    setup() {
      return { colors }
    },
    template: `
      <section class="color-preview" aria-labelledby="color-preview-title">
        <header class="color-preview__header">
          <h1 id="color-preview-title">LeoneLibrary colors</h1>
        </header>

        <ul class="color-preview__grid">
          <li v-for="color in colors" :key="color.token" class="color-preview__item">
            <div
              class="color-preview__swatch"
              :style="{ backgroundColor: 'var(' + color.token + ')' }"
              role="img"
              :aria-label="color.name + ', ' + color.value"
            ></div>
            <div class="color-preview__details">
              <strong>{{ color.name }}</strong>
              <code>{{ color.value }}</code>
              <code>var({{ color.token }})</code>
              <span>{{ color.usage }}</span>
            </div>
          </li>
        </ul>
      </section>
    `,
  }),
}
