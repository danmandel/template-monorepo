import gql from 'graphql-tag';

export const resolvers = {
  Query: {
    greetings: () => 'Hello from Apollo in a Bun app!',
  },
};

export const typeDef = gql`
  type Query {
    greetings: String
  }

  type User {
    id: ID!
  }
`;
