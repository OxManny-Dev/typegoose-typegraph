import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
// Query
import { FETCH_EMPLOYEES } from '../../../lib/graphql/queries/Employees';
import { employees } from '../../../lib/graphql/queries/Employees/__generated__/employees';

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

export const EmployeeListComponent = React.memo(() => {
  const dispatch = useDispatch();
  const employeeState = useSelector<IAppState, IEmployeeState>(state => state.employee);
  // GQL QUERY
  const {
    error: fetchEmployeesError,
    loading: fetchEmployeesLoading,
  } = useQuery<employees>(FETCH_EMPLOYEES, {
    onCompleted: data => {
      dispatch({ type: EmployeeActionTypes.FETCH_EMPLOYEES, payload: data.employees });
    },
  });

  const tabulator = useCallback(() => {
    return <ReactTabulator
      data={employeeState.employees}
      columns={columns}
      tooltips={true}
      layout="fitData"
    />;
  }, [employeeState.employees]);

  return (
    <Container fixed>
      {tabulator()}
    </Container>
  );
});
