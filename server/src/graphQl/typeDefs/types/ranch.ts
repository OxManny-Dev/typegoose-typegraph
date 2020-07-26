import { gql } from 'apollo-server-express';

export default gql`
  type Ranch {
    id: String!
    name: String!
    account: Account!
    fields: [Field]
  }

  extend type Query {
    ranch(id: String!): Ranch!
    ranches: [Ranch]
  }

  input AddRanchInput {
    name: String!
  }

  extend type Mutation {
    AddRanch(input: AddRanchInput!): Ranch!
  }
`;
