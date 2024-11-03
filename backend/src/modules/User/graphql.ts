import gql from 'graphql-tag';
import { getUserFromIdToken, login, register } from './service';
import type { Resolvers } from '../../generated/resolver-types';

export const resolvers: Resolvers = {
  Query: {
    user: (_, { idToken }) => getUserFromIdToken(idToken),
  },
  Mutation: {
    register: (_, { idToken }) => register(idToken),
    login: (_, { input: { idToken } }) => login(idToken),
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
    login(input: LoginInput!): User
  }

  input LoginInput {
    idToken: String!
    rememberUser: Boolean
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
    """
    If true, the user won't be logged out after <TODO: period of time TBD>
    """
    rememberUser: Boolean
  }
`;
