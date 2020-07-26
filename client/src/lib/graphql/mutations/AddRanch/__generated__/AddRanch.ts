/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddRanchInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddRanch
// ====================================================

export interface AddRanch_AddRanch_account {
  __typename: "Account";
  id: string;
  name: string;
}

export interface AddRanch_AddRanch {
  __typename: "Ranch";
  id: string;
  name: string;
  account: AddRanch_AddRanch_account;
}

export interface AddRanch {
  AddRanch: AddRanch_AddRanch;
}

export interface AddRanchVariables {
  input: AddRanchInput;
}
