/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_SignIn {
  __typename: "Employee";
  id: string | null;
  email: string | null;
  token: string | null;
}

export interface SignIn {
  SignIn: SignIn_SignIn;
}

export interface SignInVariables {
  input?: SignInInput | null;
}
