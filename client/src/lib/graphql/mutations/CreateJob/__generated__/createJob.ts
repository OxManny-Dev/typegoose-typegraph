/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateJobInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: createJob
// ====================================================

export interface createJob_createJob {
  __typename: "Job";
  id: string | null;
  jobName: string | null;
}

export interface createJob {
  createJob: createJob_createJob;
}

export interface createJobVariables {
  input: CreateJobInput;
}
