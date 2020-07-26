import { gql } from 'apollo-server-express';

export default gql`
  type Account {
    id: String!
    name: String!
  }
  
  type Query {
    account(id: String): Account!
    accounts: [Account]!
  }
`;
