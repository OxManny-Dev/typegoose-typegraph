import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Route, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Container } from '@material-ui/core';
import { Login } from './sections/Login';
import { SignUp } from './sections/SignUp';
import { AddRanch } from './sections/AddRanch';
import { RanchesComponent } from './sections/Ranch';
import { JobsComponent } from './sections/Jobs';
import { EmployeesComponent } from './sections/Employees';

import { AppBarNav } from './components/AppBar';
import { DrawBar } from './components/DrawBar';

import { signIn as signInData } from './lib/graphql/mutations/Login/__generated__/signIn';
import { SIGN_IN } from './lib/graphql/mutations/Login';
import { IAppState } from './reducers';
import { IEmployeeState } from './reducers/employeeReducer';
import { EmployeeActionTypes } from './actions/types';
import { AddJobComponent } from './sections/AddJob';

const appStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      maxWidth: '100%',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      marginLeft: theme.spacing(2),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }),
);

export const App = () => {
  const classes = appStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const employee = useSelector<IAppState, IEmployeeState>(state => state.employee);


  const [signInUser] = useMutation<signInData>(SIGN_IN, {
    onCompleted: data => {
      if (data && data.signIn.token) {
        sessionStorage.setItem('loggedInEmployee', JSON.stringify(data.signIn));
        dispatch({ type: EmployeeActionTypes.LOGIN_EMPLOYEE, payload: data.signIn });
        history.push('/employees');
      } else {
        sessionStorage.removeItem('employee');
        history.push('/');
      }
    },
    onError: error => {
      history.push('/');
      sessionStorage.removeItem('employee');
    }
  });

  const signInUserRef = useRef(signInUser);
  useEffect(() => {
    console.log(employee.loggedInEmployee?.token);
    if (!employee.loggedInEmployee?.token) {
      signInUserRef.current({variables: { input: { email: '', password: ''} }});
    }
  }, [employee]);


  const [open, setOpen] = React.useState(false);

  const navBarKit = {
    handleDrawerOpen: () => {
      setOpen(true);
    },
    handleDrawerClose: () => {
      setOpen(false);
    },
  };


  return (
    <div style={{ display: 'flex' }}>
      <AppBarNav open={open} handleDrawerOpen={navBarKit.handleDrawerOpen}/>
      <DrawBar open={open} handleDrawerClose={navBarKit.handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Container>
          <Route exact path='/jobs' component={JobsComponent}/>
          <Route exact path='/addjob' component={AddJobComponent}/>
          <Route exact path='/employees' component={EmployeesComponent}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/ranches' component={RanchesComponent}/>
          <Route exact path='/addranch' component={AddRanch}/>
          <Route exact path='/' component={SignUp}/>
        </Container>
      </main>
    </div>
  );
}
