import { gql } from 'apollo-boost';

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: CreateEmployeeInput) {
    CreateEmployee(input: $input) {
      id
      firstName
      lastName
      email
      role
      account {
        id
        name
      }
    }
  }
`;
