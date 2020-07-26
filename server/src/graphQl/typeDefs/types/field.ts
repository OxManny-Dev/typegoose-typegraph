import { gql } from 'apollo-server-express';

export default gql`
  type Field {
    id: String!
    name: String!
    ranch: Ranch!
  }
  
  type Query {
    field(id: String!): Field!
    fields: [Field!]!
  }
  
  type Mutation {
    CreatedField(name: String!): Field!
  }
`;
