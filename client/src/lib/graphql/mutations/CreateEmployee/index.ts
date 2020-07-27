import { gql } from 'apollo-boost';

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($input: CreateEmployeeInput!) {
    createEmployee(createEmployeeInput: $input) {
      id
      firstName
      lastName
      email
      role
      account {
        id
      }
    }
  }
`;
