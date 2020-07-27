import { gql } from 'apollo-boost';

export const FETCH_EMPLOYEES = gql`
  query fetchEmployees {
    fetchEmployees {
      id
      firstName
      lastName
      email
      role
    }
  }
`;
