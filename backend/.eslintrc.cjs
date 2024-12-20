module.exports = {
  parserOptions: {
    ecmaVersion: '2020', // Allows modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
  },
  env: {
    node: true, // Defines Node.js global variables and scope
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier', // Disables conflicting Prettier rules
    'plugin:@typescript-eslint/recommended', // Recommended rules from @typescript-eslint
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier', // Enables Prettier plugin for ESLint
    'import', // Enables ESLint's import plugin for sorting and managing imports
  ],
  rules: {
    'prettier/prettier': 'error', // Ensures prettier errors are displayed
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_', // Ignores unused arguments prefixed with an underscore
        varsIgnorePattern: '^_', // Ignores unused variables prefixed with an underscore
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
      },
    ],
    'import/no-default-export': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
    'prefer-arrow-callback': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-confusing-arrow': ['warn', { allowParens: true }],
    'require-await': 'warn',
    'no-return-await': 'warn',
  },
  overrides: [
    {
      // These files must have default exports.
      files: ['src/modules/**/model.ts', 'src/db.ts', 'codegen.ts', 'apollo.config.ts'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
