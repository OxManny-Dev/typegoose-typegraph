import React from 'react';
import { Field, FormSubmitHandler, reduxForm, WrappedFieldProps } from 'redux-form';
import { useMutation } from '@apollo/react-hooks';
import { Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { Redirect, useHistory } from 'react-router-dom';


import { IAppState } from '../../reducers';
import { IEmployeeState } from '../../reducers/employeeReducer';
import { ADD_RANCH } from '../../lib/graphql/mutations/AddRanch';
import { Ranches } from '../../lib/graphql/queries/Ranch';
import { ranches } from '../../lib/graphql/queries/Ranch/__generated__/ranches';
import {
  AddRanch as AddRanchData,
  AddRanchVariables
} from '../../lib/graphql/mutations/AddRanch/__generated__/AddRanch';
import { AddRanchInput } from '../../lib/graphql/globalTypes';


type Props = {
  name: string;
}

const RanchInput = (field: WrappedFieldProps) => {
  return <TextField {...field.input} label="Standard" variant='outlined' placeholder='Enter Ranch Name'/>;
};

export const AddRanch = reduxForm<Props>({ form: 'add-ranch' })((props) => {
  const employee = useSelector<IAppState, IEmployeeState>((state) => state.employee);
  const history = useHistory();
  const dispatch = useDispatch();
  const [addRanch, {
    loading,
    error,
  }
  ] = useMutation<AddRanchData, AddRanchVariables>(ADD_RANCH, {
    update: (cache, { data: AddRanch }) => {
      /* This needs to be done on every creation , deletion, and multi edits*/
      /* Read the query from the Cache  to get the result first
      * then take the result of the mutation and write it to the cache
      *  */
      const { ranches: ranchesData } = cache.readQuery<ranches>({
        query: Ranches
      })!;
      console.log(ranchesData);
      if (ranchesData) {

        cache.writeQuery({
          query: Ranches,
          data: {
            ranches: [...ranchesData, AddRanch?.AddRanch]
          }
        });
      }
    }
  });

  const { handleSubmit } = props;


  if (!employee) {
    return <Redirect to="/login"/>;
  }

  const onSubmit: FormSubmitHandler<AddRanchInput> = async (formValues) => {
    try {
      console.log(formValues);
      await addRanch({ variables: { input: formValues } });
      history.push('/ranches');
    } catch (e) {
      history.push('/ranches');
    }
  };


  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Field component={RanchInput} name='name'/>
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



