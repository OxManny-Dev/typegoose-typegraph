/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddRanchInput {
  name: string;
}

export interface CreateCrewInput {
  name: string;
}

export interface CreateEmployeeInput {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  role: string;
}

export interface CreateJobInput {
  name: string;
}

export interface SignUpInput {
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
