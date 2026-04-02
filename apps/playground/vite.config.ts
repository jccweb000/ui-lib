import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@ui-lib/ui/styles.css',
        replacement: path.resolve(workspaceRoot, 'packages/ui/src/styles.css'),
      },
      {
        find: '@ui-lib/ui',
        replacement: path.resolve(workspaceRoot, 'packages/ui/src/index.ts'),
      },
      {
        find: '@ui-lib/utils',
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
