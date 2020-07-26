import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput) {
    SignUp(input: $input) {
      id
      email
      token
    }
  }
`
