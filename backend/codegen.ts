import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/api';

// https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['../frontend/src/datastructures/**/*.graphql'],
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
