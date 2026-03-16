/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    include: ['tests/**/*.{test,spec}.ts'],
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'v8',
    },
  },
})
