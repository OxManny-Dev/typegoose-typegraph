/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchCrews
// ====================================================

export interface fetchCrews_fetchCrews_crewMembers {
  __typename: "Employee";
  firstName: string | null;
  lastName: string | null;
}

export interface fetchCrews_fetchCrews {
  __typename: "Crew";
  crewName: string | null;
  crewMembers: fetchCrews_fetchCrews_crewMembers[] | null;
}

export interface fetchCrews {
  fetchCrews: fetchCrews_fetchCrews[];
}
