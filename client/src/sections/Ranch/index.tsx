import React, { useEffect, useRef } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { useSelector, useDispatch } from 'react-redux';
import { IEmployeeState } from '../../reducers/employeeReducer';
import { IAppState } from '../../reducers';
import { RanchActionTypes } from '../../actions/types';


/*import { ranches } from '../../lib/graphql/queries/Ranch/__generated__/ranches';
import { Ranches } from '../../lib/graphql/queries/Ranch';*/


export const RanchesComponent = React.memo(() => {
  // const employee = useSelector<IAppState, IEmployeeState>(state => state.employee);
  // const dispatch = useDispatch();
  //
  // const {
  //   loading: getRanchesLoading,
  //   data: allRanches,
  //   error: ranchError,
  // } = useQuery<ranches>(Ranches, {
  //   onCompleted: data => {
  //     dispatch({ type: RanchActionTypes.FETCH_RANCHES, payload: data?.ranches  });
  //   },
  //   fetchPolicy: 'cache-and-network'
  // });
  //
  //
  // if (!employee.loggedInEmployee?.token) {
  //   console.log('happening in token');
  //   return <Redirect to="/"/>;
  // }
  //
  // if (getRanchesLoading) {
  //     return <h1>Loading Ranches</h1>;
  // }
  //
  // console.log('happening');

  return (
    <React.Fragment>
      <h1>Ranch Component</h1>
      <ul>
      {/*{allRanches?.ranches?.map(ranch => {*/}
      {/*  return (*/}
      {/*    employee ? <li key={ranch?.id}>*/}
      {/*      <p>Ranch id {ranch?.id.toString()}</p>*/}
      {/*      <p>Ranch Name {ranch?.name}</p>*/}
      {/*      <p>Ranch account name {ranch?.account?.name}</p>*/}
      {/*    </li> : null*/}
      {/*  )*/}
      {/*})}*/}
      </ul>
    </React.Fragment>
  );
});
