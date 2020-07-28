import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';

import { useFetchEmployeesQuery } from '../../../generated/graphql-hooks';

// Redux
import { IAppState } from '../../../reducers';
import { IEmployeeState } from '../../../reducers/employeeReducer';
import { EmployeeActionTypes } from '../../../actions/types';
import { useDispatch, useSelector } from 'react-redux';

import { ReactTabulator } from 'react-tabulator';

const columns = [
  { title: 'First Name', field: 'lastName' },
  { title: 'Last Name', field: 'firstName' },
  { title: 'Email', field: 'email' },
  { title: 'Role', field: 'role' },
];

export const EmployeeListComponent = () => {
  const dispatch = useDispatch();
  const employeeState = useSelector<IAppState, IEmployeeState>(state => state.employee);
  // GQL QUERY

  // const tabulator = useCallback(() => {
  //   return <ReactTabulator
  //     data={employeeState.employees}
  //     columns={columns}
  //     tooltips={true}
  //     layout="fitData"
  //   />;
  // }, [employeeState.employees]);


  const {
    data: fetchEmployeesData,
    error: fetchEmployeesError,
    loading: fetchEmployeesLoading,
  } = useFetchEmployeesQuery({
    onCompleted: data => {
      console.log('i am data', data);
      dispatch({ type: EmployeeActionTypes.FETCH_EMPLOYEES, payload: data.fetchEmployees });
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Container fixed>
      <ReactTabulator
        data={employeeState.employees}
        columns={columns}
        tooltips={true}
        layout="fitData"
      />;
    </Container>
  );
}
