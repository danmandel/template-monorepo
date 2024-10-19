import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/api';

const config: CodegenConfig = {
  schema: printSchema(schema),
  //   documents: './src/**/*.graphql', // Location of your operations (queries/mutations)
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        // 'typescript-react-apollo', // Frontend: React Apollo hooks
      ],
    },
    './src/generated/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  config: {
    skipTypename: false,
    withHooks: true,
  },
};

export default config;
