import React from 'react';
import {
  Field,
  FormSubmitHandler,
  reduxForm,
  WrappedFieldProps,
} from 'redux-form';
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';


import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';

import { SIGN_UP } from './../../lib/graphql/mutations';
import { signUp as signUpData, signUpVariables } from '../../lib/graphql/mutations/SignUp/__generated__/signUp';
import { SignUpInput } from '../../lib/graphql/globalTypes';
import { IAppState } from '../../reducers';
import { Redirect } from 'react-router-dom';

import { EmployeeActionTypes } from '../../actions/types';
import { IEmployeeState } from '../../reducers/employeeReducer';

/* These have to be here or whenever you first type on an input bar,
*  it will lose focus. Pretty sure we can reuse this
* */
const EmailInput = (field: WrappedFieldProps) => {
  return <TextField {...field.input} label="Standard" variant='outlined' placeholder='Enter your email' fullWidth
                    margin='dense'/>;
}

const PasswordInput = (field: WrappedFieldProps) => {
  return <TextField {...field.input} label="Standard" variant='outlined' placeholder='Choose a strong password'
                    fullWidth margin='dense'/>;
}


/* To put AutoCompletion on props for redux form, You need to pass it this type */
export const SignUp = reduxForm<SignUpInput>({ form: "login" })((props) => {
  const employee = useSelector<IAppState, IEmployeeState>(state => state.employee);
  const [
    signInUser,
    {
      data: employeeData,
      loading: signUpLoading,
      error: signUpError
    }
  ] = useMutation<signUpData, signUpVariables>(SIGN_UP);
  const { handleSubmit} = props;

  /*
  * Redux form with typescript
  * */
  const onSubmit: FormSubmitHandler<SignUpInput> = async (formValues, dispatch) => {
    try {
      const { data } = await signInUser({ variables: { input: formValues } });
      console.log(data);
      sessionStorage.setItem('employee', JSON.stringify(data?.signUp));

      dispatch({ type: EmployeeActionTypes.LOGIN_EMPLOYEE, payload: data?.signUp });
    } catch (e) {
      console.log(e);
    }
  }

  if (employee.loggedInEmployee?.token) {
    return <Redirect to="/employees"/>;
  }

  if (signUpLoading) {
    return <h1>Loading</h1>
  }

  if (signUpError) {
    return <h2>Sign in error</h2>;
  }

  return (
    <Grid container justify="center" direction="column" alignContent='center'>
      <Grid item alignItems='center'>
        <Typography variant="h3">Welcome to Pet!</Typography>
        <Typography variant="body1">
          Please Sign up for an account today!
        </Typography>
      </Grid>
      <Grid sm={4}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Field component={EmailInput} name='email'/>
          <Field component={PasswordInput} name='password'/>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            children='Sign Up for an account'
            fullWidth
            endIcon={<SendIcon/>}
            color='primary'/>
        </form>
      </Grid>
    </Grid>
  );
});
