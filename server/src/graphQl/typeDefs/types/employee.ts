import { gql } from 'apollo-server-express';

const signInInput = `
  email: String!
  password: String!
`;

const signUpInput = `
  ${signInInput}
`;

export default gql`
  type Employee {
    id: ID
    email: String
    firstName: String
    lastName: String
    role: String
    token: String
    account: Account
    ranches: Ranch
  }

  extend type Query {
    employee(id: String): Employee!
    employees: [Employee!]!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input CreateEmployeeInput {
    email: String!
    firstName: String
    lastName: String
    password: String!
    role: String!
  }

  extend type Mutation {
    CreateEmployee(input: CreateEmployeeInput): Employee!
    SignUp(input: SignUpInput): Employee!
    SignIn(input: SignInInput): Employee!
    SignOut: Boolean!
  }
`;
