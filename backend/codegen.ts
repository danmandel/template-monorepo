import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/api';

const config: CodegenConfig = {
  schema: printSchema(schema),
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
  },
  config: {
    skipTypename: false,
    withHooks: true,
  },
};

export default config;
