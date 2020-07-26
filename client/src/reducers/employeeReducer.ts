import { EmployeeActionTypes } from '../actions/types';


export interface LoggedInEmployee {
  id?: string;
  email?: string;
  token?: string;
}

export interface IEmployee extends LoggedInEmployee {
  firstName?: string;
  lastName?: string;
  role?: string;
}


export interface IEmployeeState {
  loggedInEmployee?: LoggedInEmployee;
  employee?: IEmployee;
  employees: IEmployee[];
}

export interface IEmployeeActions {
  type: EmployeeActionTypes,
  payload: IEmployee & IEmployee[],
}


const INITIAL_STATE = {
  loggedInEmployee: {},
  employee: {},
  employees: [],
};


export const employeeReducer = (state: IEmployeeState = INITIAL_STATE, action: IEmployeeActions) => {
  switch (action.type) {
    case EmployeeActionTypes.LOGIN_EMPLOYEE:
      return { ...state, loggedInEmployee: action.payload };
    case EmployeeActionTypes.FETCH_EMPLOYEE:
      return { ...state, employee: action.payload };
    case EmployeeActionTypes.FETCH_EMPLOYEES:
      return { ...state, employees: action.payload };
    default:
      return state;
  }
}
