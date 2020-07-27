import { gql } from "apollo-boost";


export const SIGN_IN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      email
      token
    }
  }
`;
