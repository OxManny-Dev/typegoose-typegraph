import React from 'react';
import { Redirect } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { reduxForm, FormSubmitHandler, Field, WrappedFieldProps, reset } from 'redux-form';
import { TextField, Button, MenuItem, Grid, Container } from '@material-ui/core/';


import {
  FetchEmployeesQuery,
  useCreateEmployeeMutation,
  CreateEmployeeInput,
  FetchEmployeesDocument,
} from '../../generated/graphql-hooks';

// Redux
import { IAppState } from '../../reducers';
import { IEmployeeState } from '../../reducers/employeeReducer';

import { useDispatch, useSelector } from 'react-redux';


import { EmployeeListComponent } from './EmployeesList';
import { EmployeeActionTypes } from '../../actions/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '500px',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    fullWidth: {
      width: '100%',
    },
  }),
);


const TextFieldInput = ({ input, label, type, placeholder }: WrappedFieldProps & { label: string, type: string, placeholder: string }) => {
  return <TextField
    {...input}
    label={label}
    variant='outlined'
    type={type}
    placeholder={placeholder}
    fullWidth/>;
};


const SelectFieldInput = (
  { input, label, placeholder }: WrappedFieldProps & { label: string, placeholder: string }
) => {

  const ROLE_TYPES = [
    {
      value: 'Admin'
    },
    {
      value: 'Manager'
    },
    {
      value: 'InputUser'
    },
    {
      value: 'FieldUser'
    },
    {
      value: 'SetupUser'
    },
    {
      value: 'Worker'
    }
  ];
  return (
    <TextField
      {...input}
      select
      size='medium'
      label={label}
      style={{ width: 130 }}
      helperText="Set Employee's Role"
    >
      {ROLE_TYPES.map(role => (
        <MenuItem key={role.value} value={role.value}>
          {role.value}
        </MenuItem>
      ))}
    </TextField>
  );
};


export const EmployeesComponent = reduxForm<CreateEmployeeInput>({ form: 'create-employee' })(React.memo((props) => {
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const employeeState = useSelector<IAppState, IEmployeeState>(state => state.employee);
  // GQL Mutation
  const [createEmployee, {
    loading: createEmployeeLoading,
    error: createEmployeeError,
  }] = useCreateEmployeeMutation({
    update: (cache, { data: CreateEmployee }) => {
      const { fetchEmployees: employeesData } = cache.readQuery<FetchEmployeesQuery>({
        query: FetchEmployeesDocument,
      })!;
      if (employeesData) {
        cache.writeQuery({
          query: FetchEmployeesDocument,
          data: {
            fetchEmployees: [...employeesData, CreateEmployee?.createEmployee]
          }
        });
      }
      const { fetchEmployees: newEmployees } = cache.readQuery<FetchEmployeesQuery>({
        query: FetchEmployeesDocument,
      })!;
      dispatch({ type: EmployeeActionTypes.FETCH_EMPLOYEES, payload: newEmployees });
    }
  });

  // Authentication
  if (!employeeState.loggedInEmployee?.token) {
    return <Redirect to='/'/>;
  }

  // Redux form props
  const { handleSubmit } = props;
  // On Submit
  const onSubmit: FormSubmitHandler<CreateEmployeeInput> = async (formValues) => {
    try {
      console.log(formValues);
      await createEmployee({ variables: { input: formValues } });
      dispatch(reset('create-employee'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Field name='role' label='Employee Role' placeholder='Role' component={SelectFieldInput}/>
        <Field name='email' label='email' type='input' placeholder='Employee Email' component={TextFieldInput}/>
        <Field name='password' label='password' type='password' placeholder='Employee Password'
               component={TextFieldInput}/>
        <Field name='firstName' label='First name' type='input' placeholder='Employee first name'
               component={TextFieldInput}/>
        <Field name='lastName' label='Last name' type='input' placeholder='Employee last name'
               component={TextFieldInput}/>
        <Button
          variant='contained'
          fullWidth
          type='submit'
          color='primary'
        >Add Employee
        </Button>
      </form>
      <Grid container className={classes.fullWidth}>
        <EmployeeListComponent/>
      </Grid>
    </Container>
  );
}));
