import { gql } from "apollo-boost";

// export  const SIGN_IN = gql`
//   mutation signIn($input: SignInInput!) {
//     signIn(input: $input){
//       email
//     }
//   }
// `;

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    SignIn(input: $input) {
      id
      email
      token
    }
  }
`;
