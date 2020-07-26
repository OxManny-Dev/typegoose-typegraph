/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEmployeeInput } from './../../../globalTypes';

// ====================================================
// GraphQL mutation operation: CreateEmployee
// ====================================================

export interface CreateEmployee_CreateEmployee_account {
  __typename: 'Account';
  id: string;
  name: string;
}

export interface CreateEmployee_CreateEmployee {
  __typename: 'Employee';
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
  account: CreateEmployee_CreateEmployee_account | null;
}

export interface CreateEmployee {
  CreateEmployee: CreateEmployee_CreateEmployee;
}

export interface CreateEmployeeVariables {
  input?: CreateEmployeeInput | null;
}
