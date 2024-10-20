import type { ApolloConfig } from 'apollo-language-server';

const config: Partial<ApolloConfig> = {
  client: {
    service: {
      name: 'backend',
      url: 'http://localhost:4000/graphql',
    },
    includes: [],
    excludes: ['node_modules/**', 'dist/**', 'build/**'],
  },
};

export default config;
