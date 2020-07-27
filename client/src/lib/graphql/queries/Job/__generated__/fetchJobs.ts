/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchJobs
// ====================================================

export interface fetchJobs_fetchJobs_employees {
  __typename: "Employee";
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface fetchJobs_fetchJobs {
  __typename: "Job";
  id: string | null;
  jobName: string | null;
  employees: fetchJobs_fetchJobs_employees[];
}

export interface fetchJobs {
  fetchJobs: fetchJobs_fetchJobs[];
}
