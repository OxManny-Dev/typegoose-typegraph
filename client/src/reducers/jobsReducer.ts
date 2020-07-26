import { JobsActionTypes } from '../actions/types';

export interface IJob {
  id?: string
  name?: string;
  account?: {
    id: string;
    name: string;
  }
}

export interface IJobState {
  jobs: IJob[];
}

export interface IJobActions {
  type: JobsActionTypes,
  payload: IJob[];
}

const INITIAL_STATE = {
  jobs: [{ id: '1', name: 'First Job'}],
};

export const jobsReducer = (state: IJobState = INITIAL_STATE, action: IJobActions) => {
  switch (action.type)  {
    case JobsActionTypes.FETCH_JOBS:
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
};
