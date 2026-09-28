/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // TypeScript prop types already do this job
    'react/prop-types': 'off',
    // Apostrophes in prose are fine; only flag characters that break JSX
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
  },
  overrides: [
    {
      // shadcn-generated components export variants alongside components by design
      files: ['src/components/ui/**'],
      rules: { 'react-refresh/only-export-components': 'off' },
    },
    {
      files: ['api/**'],
      env: { browser: false, node: true },
    },
  ],
}
