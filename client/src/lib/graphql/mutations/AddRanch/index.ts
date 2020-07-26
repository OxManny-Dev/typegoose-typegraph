import { gql } from "apollo-boost";

export const ADD_RANCH = gql`
  mutation AddRanch($input: AddRanchInput!) {
    AddRanch(input: $input) {
      id
      name
      account {
        id
        name
      }
    }
  }
`
