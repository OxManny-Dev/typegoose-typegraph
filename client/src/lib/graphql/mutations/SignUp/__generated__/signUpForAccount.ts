/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: signUpForAccount
// ====================================================

export interface signUpForAccount_signUpForAccount {
  __typename: "Employee";
  id: string;
  email: string | null;
  token: string | null;
}

export interface signUpForAccount {
  signUpForAccount: signUpForAccount_signUpForAccount;
}

export interface signUpForAccountVariables {
  input: SignUpInput;
}
