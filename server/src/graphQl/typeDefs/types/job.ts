import { gql } from 'apollo-server-express';

export default gql`
  type Job {
    id: String!
    name: String!
    field: Field
    account: Account
  }

  extend type Query {
    job(id: String!): Job!
    jobs: [Job]!
  }

  input CreateJobInput {
    name: String!
  }

  extend type Mutation {
    CreateJob(input: CreateJobInput!): Job!
  }
`;
