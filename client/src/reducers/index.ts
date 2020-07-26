import { combineReducers } from 'redux';
import { employeeReducer } from './employeeReducer';
import { IRanchState, ranchReducer } from './ranchReducer';

import { FormStateMap, reducer as formReducer } from 'redux-form';
import { IEmployeeState } from './employeeReducer';
import { IJobState, jobsReducer } from './jobsReducer';

/*
* This tells our app what our store looks like and each reducer should return
*/

export interface IAppState {
  form: FormStateMap;
  employee: IEmployeeState,
  ranch: IRanchState,
  job: IJobState,
}


export default combineReducers<IAppState>({
  form: formReducer,
  employee: employeeReducer,
  ranch: ranchReducer,
  job: jobsReducer,
});
