var fs = require('fs');
// import fs from 'fs';

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
    'import/order': [
      1,
      {
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          // ...getDirectoriesToSort().map((singleDir) => ({
          //   pattern: `${singleDir}/**`,
          //   group: 'internal',
          // })),
          {
            pattern: 'env',
            group: 'internal',
          },
          {
            pattern: 'theme',
            group: 'internal',
          },
          {
            pattern: 'public/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-default-export': 'error',
  },
};

// function getDirectoriesToSort() {
//   const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules'];
//   return getDirectories(process.cwd()).filter((f) => !ignoredSortingDirectories.includes(f));
// }

// function getDirectories(path) {
//   return fs.readdirSync(path).filter(function (file) {
//     return fs.statSync(path + '/' + file).isDirectory();
//   });
// }
