import type { Preview } from '@storybook/react'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'warm',
      values: [
        { name: 'warm', value: '#FAF8F5' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#1C1C1A' },
      ],
    },
    docs: {
      toc: true,
    },
  },
}

export default preview
