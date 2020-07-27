/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchEmployees
// ====================================================

export interface fetchEmployees_fetchEmployees {
  __typename: "Employee";
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
}

export interface fetchEmployees {
  fetchEmployees: fetchEmployees_fetchEmployees[];
}
