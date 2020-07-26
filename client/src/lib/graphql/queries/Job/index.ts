import { gql } from 'apollo-boost';


export const FETCH_JOBS = gql`
  query jobs {
    jobs {
      id
      name
      account {
        id
        name
      }
    }
  }
`;
