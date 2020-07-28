import { gql } from 'apollo-boost';


export const FETCH_CREWS = gql`
  query fetchCrews {
    fetchCrews {
      crewName
      crewMembers {
        firstName
        lastName
      }
    }
  }
`;
