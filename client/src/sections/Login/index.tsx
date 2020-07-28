import React from 'react';
import { Field, FormSubmitHandler, reduxForm, WrappedFieldProps } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from "@material-ui/core";
import { loginStyle } from "./loginStyle"

import { useSelector } from 'react-redux'
import SendIcon from '@material-ui/icons/Send';

import { EmployeeActionTypes } from '../../actions/types';

import { useSignInMutation, SignInInput } from '../../generated/graphql-hooks';
import { IAppState } from '../../reducers';
import { IEmployeeState } from '../../reducers/employeeReducer';

/* These have to be here or whenever you first type on an input bar,
*  it will lose focus.
* */
const EmailInput = (field: WrappedFieldProps) => {
  return <TextField {...field.input} label="Standard" variant='outlined' placeholder='Enter your email'/>
}

const PasswordInput = (field: WrappedFieldProps) => {
  return <TextField {...field.input}  label="Standard" variant='outlined' placeholder='Choose a strong password'/>
}

/* To put AutoCompletion on props for redux form, You need to pass it this type */
export const Login = reduxForm<SignInInput>({form: "login"})((props) => {
  const classes = loginStyle();
  const employee = useSelector<IAppState, IEmployeeState>(state => state.employee);

  const [
    signInEmployee,
    {
      loading: signInLoading,
      error: signInError
    }
  ] = useSignInMutation();


  const { handleSubmit} = props;

  /*
  * Redux form with typescript
  * */
  const onSubmit: FormSubmitHandler<SignInInput> = async (formValues, dispatch) => {
    try {
      const { data} = await signInEmployee({variables: { input: formValues }});
      if (data) {
        sessionStorage.setItem('loggedInEmployee', JSON.stringify(data.signIn));
        dispatch({ type: EmployeeActionTypes.LOGIN_EMPLOYEE, payload: data.signIn });
      }
    } catch (e) {
      console.log(e);
    }
  }


  if (employee && employee.loggedInEmployee?.token) {
    return <Redirect to="/employees"/>;
  }

  if (signInLoading) {
    return <h1>Loading</h1>;
  }

  if (signInError) {
    return <h2>Sign in error</h2>;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Field component={EmailInput} name='email'/>
      <Field component={PasswordInput} name='password'/>
      <Button
        variant="contained"
        disableElevation
        type="submit"
        children='Click me'
        endIcon={<SendIcon/>}
        color='primary'/>
    </form>
  );
});
