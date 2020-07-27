/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: signUp
// ====================================================

export interface signUp_signUp {
  __typename: "Employee";
  id: string | null;
  email: string | null;
  token: string | null;
}

export interface signUp {
  signUp: signUp_signUp;
}

export interface signUpVariables {
  input: SignUpInput;
}
