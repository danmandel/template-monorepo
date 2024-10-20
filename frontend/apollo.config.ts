import type { ApolloConfig } from 'apollo-language-server';

const config: Partial<ApolloConfig> = {
  client: {
    service: {
      name: 'frontend',
      localSchemaFile: './src/generated/schema.json',
    },
    includes: ['./src/modules/**/operations.graphql'],
    excludes: [
      // '**/__tests__/**',
      // '**/*.spec.ts',
      // '**/*.test.ts',
      'node_modules/**',
      '.next/**', // Exclude Next.js build artifacts
      'dist/**',
      'build/**',
      'pages/api/**',
    ],
  },
};

export default config;
