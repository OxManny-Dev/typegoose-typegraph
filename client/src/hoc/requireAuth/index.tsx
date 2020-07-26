import React, { FC, useEffect,  } from 'react';
import { useSelector } from 'react-redux';
import {  useHistory, RouteProps } from 'react-router-dom';

import { IAppState } from '../../reducers';
import { IEmployeeState } from '../../reducers/employeeReducer';

// export const PublicRoute: FC<RouteProps> = React.memo((props) => {
//
//
//   return (
//     <Route {...props}/>
//   );
// });
// export default const RequireAuth: <T extends RouteProps>(
//   ChildComponent: ChildContext<T>,
// )
