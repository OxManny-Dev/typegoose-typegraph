/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "../../../globalTypes";

// ====================================================
// GraphQL mutation operation: signIn
// ====================================================

export interface signIn_signIn {
  __typename: "Employee";
  id: string | null;
  email: string | null;
  token: string | null;
}

export interface signIn {
  signIn: signIn_signIn;
}

export interface signInVariables {
  input: SignInInput;
}
