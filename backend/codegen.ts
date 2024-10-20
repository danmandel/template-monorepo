import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/api';

// https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['../frontend/src/modules/**/*.graphql'],
  generates: {
    '../frontend/src/generated/graphql.tsx': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './src/generated/resolvers-types.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
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
    withHooks: true,
  },
};

export default config;
