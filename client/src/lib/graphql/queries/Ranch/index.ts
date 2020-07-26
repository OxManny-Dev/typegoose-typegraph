import { gql } from 'apollo-boost';

export const Ranches = gql`
  query ranches {
    ranches {
      id
      name
      account {
        id
        name
      }
    }
  }
`;
