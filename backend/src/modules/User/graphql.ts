import gql from 'graphql-tag';
import { getUserFromIdToken, login, register } from './service';
import type { Resolvers } from '../../generated/resolver-types';

export const resolvers: Resolvers = {
  Query: {
    user: (_: any, { idToken }: { idToken: string }) => getUserFromIdToken(idToken),
  },
  Mutation: {
    register: (_: any, { idToken }: { idToken: string }) => register(idToken),
    login: (_: any, { idToken }: { idToken: string }) => login(idToken),
  },
};

// TODO: extend type query/mutation instead of type?
// TODO: @auth
export const typeDef = gql`
  type Query {
    user(idToken: String!): User!
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
    """
    The user's display name, shown in the UI.
    """
    displayName: String
    createdAt: DateTime!
    updatedAt: DateTime
    """
    The URL of the user's profile photo.
    """
    photoURL: String
    """
    A unique @handle for the user. Others can mention the user with this handle.
    """
    handle: String
  }
`;
