import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    jobLog: JobLog!
    jobLogs: [JobLog!]!
  }

  type JobLog {
    id: String!
    originalTimeIn: String!
    originalTimeOut: String
    timeIn: String!
    timeOut: String
  }

  type Mutation {
    CreateJobLog: JobLog!
  }
`;
