// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const getDirectoriesToSort = () => {
  const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules'];
  return getDirectories(process.cwd()).filter((f) => !ignoredSortingDirectories.includes(f));
};

const getDirectories = (path) =>
  fs.readdirSync(path).filter((file) => fs.statSync(path + '/' + file).isDirectory());

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'tailwindcss/no-custom-classname': 'off',
    '@next/next/no-html-link-for-pages': 'off',
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
      'warn',
      {
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          ...getDirectoriesToSort().map((singleDir) => ({
            pattern: `${singleDir}/**`,
            group: 'internal',
          })),
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
    'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
    'prefer-arrow-callback': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-confusing-arrow': ['warn', { allowParens: true }],
  },
  overrides: [
    // Supports pages and app router
    {
      files: [
        'src/pages/**/*',
        'src/app/**/{page,layout,not-found}.tsx',
        '*.config.{mjs,js,js,ts}',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
