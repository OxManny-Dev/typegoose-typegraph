import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation signUpForAccount($input: SignUpInput!) {
    signUpForAccount(signUpInput: $input) {
      id
      email
      token
    }
  }
`
