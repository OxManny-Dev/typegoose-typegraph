/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCrewInput } from "../../../globalTypes";

// ====================================================
// GraphQL mutation operation: createCrew
// ====================================================

export interface createCrew_createCrew {
  __typename: "Crew";
  crewName: string | null;
}

export interface createCrew {
  createCrew: createCrew_createCrew;
}

export interface createCrewVariables {
  input: CreateCrewInput;
}
