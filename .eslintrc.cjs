module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all', printWidth: 100 }],
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/no-unknown-property': [
      2,
      {
        ignore: ['mesh', 'planeGeometry', 'args', 'position', 'intensity', 'rotation', 'object'],
      },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
