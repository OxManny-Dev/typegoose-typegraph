import { gql } from 'apollo-boost';

export const CREATE_CREATE = gql`
  mutation createCrew($input: CreateCrewInput!) {
    createCrew(createCrewInput: $input) {
      crewName
    }
  }
`;
