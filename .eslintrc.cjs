module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    'ecmaVersion': 13,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'modules': true
    }
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'indent': ['error',2],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'linebreak-style': ['error','unix'],
    'quotes': ['error','single'],
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
