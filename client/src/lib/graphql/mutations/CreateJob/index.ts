import { gql } from 'apollo-boost';

export const CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    CreateJob(input: $input) {
      id
      name
    }
  }
`;
