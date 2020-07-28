import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { reduxForm, WrappedFieldProps, Field, FormSubmitHandler, reset } from 'redux-form';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';


import { ReactTabulator } from 'react-tabulator';


// Query
import {
  useFetchJobsQuery,
  CreateJobInput,
  useCreateJobMutation,
} from '../../generated/graphql-hooks';



// Redux
import { IAppState } from '../../reducers';
import { IJobState } from '../../reducers/jobsReducer';
import { JobsActionTypes } from '../../actions/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '500px',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);


const columns = [
  { title: 'Job Name', field: 'name', width: 150 },
];

const JobNameInput = (field: WrappedFieldProps) => {
  return <TextField
    {...field.input}
    label="Job Name"
    variant='outlined'
    placeholder='Create Job Name'
    fullWidth/>;
};

export const JobsComponent = reduxForm<CreateJobInput>({ form: 'create-job' })(React.memo((props) => {
  // Hooks
  const classes = useStyles();
  const jobState = useSelector<IAppState, IJobState>(state => state.job);
  const dispatch = useDispatch();
  // GQL Hooks
  // Queries
  const {
    error: fetchJobsError,
    loading: fetchJobsLoading,
    refetch: refetchJobs,
  } = useFetchJobsQuery({
    onCompleted: data => {
      console.log('refetching jobs');
      dispatch({ type: JobsActionTypes.FETCH_JOBS, payload: data.fetchJobs });
    },
    fetchPolicy: 'cache-and-network',
  });

  // Mutations
  const [createJob, {
    loading: createJobLoading,
    error: createJobError,
  }] = useCreateJobMutation({
    onCompleted: async data => {
      await refetchJobs();
    }
  });
  // Props
  const { handleSubmit } = props;


  const renderJobs = () => {
    if (jobState.jobs.length) {
      return jobState.jobs.map(job => {
        console.log(job);
        return <li key={job.id}>{job.jobName}</li>;
      });
    }
    return <h1>No Jobs yet</h1>;
  };

  if (fetchJobsLoading) {
    return <h1>Loading</h1>;
  }

  const onSubmit: FormSubmitHandler<CreateJobInput> = async (formValues) => {
    try {
      console.log(formValues);
      await createJob({ variables: { input: formValues } });
      dispatch(reset('create-job'));
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <h1>Jobs Component</h1>
        <Field
          name='jobName'
          component={JobNameInput}/>
        <Button
          variant='contained'
          fullWidth
          type='submit'
          color='primary'
        >Add Job
        </Button>
      </form>
      <h1>Jobs</h1>
      <ul>
        {renderJobs()}
      </ul>
    </React.Fragment>
  )
}));
