/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: employees
// ====================================================

export interface employees_employees {
  __typename: 'Employee';
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
}

export interface employees {
  employees: employees_employees[];
}
