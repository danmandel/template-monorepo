// eslint-disable-next-line @typescript-eslint/no-require-imports
// var fs = require('fs');

module.exports = {
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],

  plugins: ['prettier', 'import'],
  rules: {
    // 'arrow-parens': ['error', 'as-needed'],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'tailwindcss/classnames-order': 'off',
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    'import/no-default-export': 'error',
  },
  overrides: [
    {
      // Model.ts files must have default exports
      files: ['src/datastructures/**/model.ts', 'src/algorithms/initializeDb.ts'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
