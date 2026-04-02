module.exports = {
  root: true,
  ignorePatterns: ['dist', 'coverage', 'node_modules', '.nx', '.vite'],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-unused-vars': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/test/setup.ts'],
      globals: {
        afterEach: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        expectTypeOf: 'readonly',
        it: 'readonly',
        vi: 'readonly',
      },
    },
  ],
};
