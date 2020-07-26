/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ranches
// ====================================================

export interface ranches_ranches_account {
  __typename: "Account";
  id: string;
  name: string;
}

export interface ranches_ranches {
  __typename: "Ranch";
  id: string;
  name: string;
  account: ranches_ranches_account;
}

export interface ranches {
  ranches: (ranches_ranches | null)[] | null;
}
