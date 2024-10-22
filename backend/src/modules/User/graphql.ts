import gql from 'graphql-tag';
import { login, register } from './service';
import type { Resolvers } from '../../generated/resolver-types';

export const resolvers: Resolvers = {
  Query: {
    // greetings: () => 'Hello from Apollo in a Bun app!',
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
    user: User
    users: [User!]!
  }

  type Mutation {
    register(idToken: String!): User
    login(idToken: String!): User
  }

  type User {
    id: ID!
    firebaseUid: String
    email: EmailAddress
    displayName: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
