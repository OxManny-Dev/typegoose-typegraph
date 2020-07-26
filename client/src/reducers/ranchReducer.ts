import { RanchActionTypes } from '../actions/types';

export interface IRanch {
  id?: string;
  name?: string;
  account: {
    id: string;
    name: string;
  }
}


export interface IRanchState {
  // ranch: IRanch;
  ranches: IRanch[];
}

export interface IRanchActions {
  type: RanchActionTypes,
  payload: IRanch[]
}

const INITIAL_STATE = {
  // ranch: {
  //   id: '',
  //   name: '',
  //   account: {
  //     id: '',
  //     name: '',
  //   }
  // },
  ranches: [],
}

export const ranchReducer = (state: IRanchState = INITIAL_STATE, action: IRanchActions) => {
  switch (action.type) {
    case RanchActionTypes.FETCH_RANCHES:
      return { ...state, ranches: action.payload };
    default:
      return state;
  }
};
