import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@jccnpm/ui/styles.css',
        replacement: path.resolve(workspaceRoot, 'packages/ui/src/styles.css'),
      },
      {
        find: '@jccnpm/ui',
        replacement: path.resolve(workspaceRoot, 'packages/ui/src/index.ts'),
      },
      {
        find: '@jccnpm/utils',
        replacement: path.resolve(workspaceRoot, 'packages/utils/src/index.ts'),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
