import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, RouteProps } from 'react-router-dom';

import { IAppState } from '../../reducers';
import { IEmployeeState } from '../../reducers/employeeReducer';

export const PublicRoute: FC<RouteProps> = React.memo((props) => {
  const history = useHistory();
  const employee = useSelector<IAppState, IEmployeeState>(state => state.employee);
  const employeeRef = useRef(employee);



  return (
    <Route {...props}/>
  );
});
