import { gql } from 'apollo-boost';

export const FETCH_EMPLOYEES = gql`
  query employees {
    employees {
      id
      firstName
      lastName
      email
      role
    }
  }
`;
