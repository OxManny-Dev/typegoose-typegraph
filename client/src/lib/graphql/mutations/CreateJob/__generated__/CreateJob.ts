/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateJobInput } from './../../../globalTypes';

// ====================================================
// GraphQL mutation operation: CreateJob
// ====================================================

export interface CreateJob_CreateJob {
  __typename: 'Job';
  id: string;
  name: string;
}

export interface CreateJob {
  CreateJob: CreateJob_CreateJob;
}

export interface CreateJobVariables {
  input: CreateJobInput;
}
