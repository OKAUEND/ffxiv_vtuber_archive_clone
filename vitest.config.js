import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, '/app'),
    },
  },
  define: {
    'import.meta.vitest': false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // includeSource: ['src/**/*.{js,ts,tsx}'],
    mockReset: true,
  },
});
