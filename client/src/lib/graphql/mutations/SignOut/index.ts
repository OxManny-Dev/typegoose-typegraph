import { gql } from 'apollo-boost';

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      logOut
    }
  }
`;
