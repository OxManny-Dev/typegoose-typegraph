/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEmployeeInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: createEmployee
// ====================================================

export interface createEmployee_createEmployee_account {
  __typename: "Account";
  id: string | null;
}

export interface createEmployee_createEmployee {
  __typename: "Employee";
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
  account: createEmployee_createEmployee_account | null;
}

export interface createEmployee {
  createEmployee: createEmployee_createEmployee;
}

export interface createEmployeeVariables {
  input: CreateEmployeeInput;
}
