/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: jobs
// ====================================================

export interface jobs_jobs_account {
  __typename: 'Account';
  id: string;
  name: string;
}

export interface jobs_jobs {
  __typename: 'Job';
  id: string;
  name: string;
  account: jobs_jobs_account | null;
}

export interface jobs {
  jobs: (jobs_jobs | null)[];
}
