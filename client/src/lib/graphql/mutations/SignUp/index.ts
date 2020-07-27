import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(signUpInput: $input) {
      id
      email
      token
    }
  }
`
