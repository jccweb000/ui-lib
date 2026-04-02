import { fileURLToPath } from 'node:url';

import { createPackageConfig } from '../../tools/rollup/create-package-config.mjs';

const packageDir = fileURLToPath(new URL('./', import.meta.url));

export default createPackageConfig({
  packageDir,
  css: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@jccnpm/utils'],
});
