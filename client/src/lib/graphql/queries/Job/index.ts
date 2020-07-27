import { gql } from 'apollo-boost';


export const FETCH_JOBS = gql`
  query fetchJobs {
    fetchJobs {
      id
      jobName
      employees {
        firstName
        lastName
        email
      }
    }
  }
`;
