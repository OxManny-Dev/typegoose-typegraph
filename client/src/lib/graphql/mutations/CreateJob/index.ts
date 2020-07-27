import { gql } from 'apollo-boost';

export const CREATE_JOB = gql`
  mutation createJob($input: CreateJobInput!) {
    createJob(createJobInput: $input) {
      id
      jobName
    }
  }
`;
