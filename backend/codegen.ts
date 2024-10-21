import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/api';

// https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['../frontend/src/modules/**/operations.graphql'],
  generates: {
    '../frontend/src/generated/graphql.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */\n// @ts-nocheck',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './src/generated/resolver-types.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */\n// @ts-nocheck',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
    './src/generated/schema.json': {
      plugins: ['introspection'],
    },
    '../frontend/src/generated/schema.json': {
      plugins: ['introspection'],
    },
  },
  config: {
    skipTypename: false,
    withHooks: true, // Enable codegen for React hooks
  },
};

export default config;
