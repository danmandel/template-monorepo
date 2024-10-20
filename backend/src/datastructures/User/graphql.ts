import gql from 'graphql-tag';
import { login, register } from './service';

export const resolvers = {
  Query: {
    greetings: () => 'Hello from Apollo in a Bun app!',
  },
  Mutation: {
    register: async (_: any, { idToken }: { idToken: string }) => {
      return register(idToken);
    },
    login: async (_: any, { idToken }: { idToken: string }) => {
      return login(idToken);
    },
  },
};

export const typeDef = gql`
  type Query {
    greetings: String
  }

  type Mutation {
    register(idToken: String!): User
    login(idToken: String!): User
  }

  type User {
    id: ID!
    firebaseUid: String
    email: String
    displayName: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
