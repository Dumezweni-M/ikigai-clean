import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      'react-dom/test-utils': 'react-dom',
    },
    server: {
      deps: {
        inline: ['@testing-library/react-native'],
      },
    },
    transformMode: {
      ssr: [/\.tsx?$/, /\.jsx?$/],
    },
  },
  resolve: {
    alias: {
      'react-dom/test-utils': 'react-dom',
    },
  },
});