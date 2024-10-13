import gql from 'graphql-tag';

export const typeDef = gql`
  type Event {
    id: ID!
    aggregateId: ID!
    type: String!
    # payload: JSON!
    # timestamp: DateTime!
  }
`;
