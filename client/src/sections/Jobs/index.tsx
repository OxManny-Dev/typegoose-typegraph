import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { reduxForm, WrappedFieldProps, Field, FormSubmitHandler, reset } from 'redux-form';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';


import { ReactTabulator } from 'react-tabulator';


// Query
import { FETCH_JOBS } from '../../lib/graphql/queries/Job';
import { jobs } from '../../lib/graphql/queries/Job/__generated__/jobs';

// Mutation
import { CREATE_JOB } from '../../lib/graphql/mutations/CreateJob';
import {
  CreateJob as CreateJobData,
  CreateJobVariables
} from '../../lib/graphql/mutations/CreateJob/__generated__/CreateJob';
import { CreateJobInput } from '../../lib/graphql/globalTypes';

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

type Props = {
  name: string
}

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

export const JobsComponent = reduxForm<Props>({ form: 'create-job' })(React.memo((props) => {
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
  } = useQuery<jobs>(FETCH_JOBS, {
    onCompleted: data => {
      console.log('refetching jobs');
      dispatch({ type: JobsActionTypes.FETCH_JOBS, payload: data.jobs });
    },
    fetchPolicy: 'cache-and-network',
  });

  // Mutations
  const [createJob, {
    loading: createJobLoading,
    error: createJobError,
  }] = useMutation<CreateJobData, CreateJobVariables>(CREATE_JOB, {
    onCompleted: async data => {
      await refetchJobs();
    }
  });
  // Props
  const { handleSubmit } = props;


  const renderJobs = () => {
    if (jobState.jobs.length) {
      return jobState.jobs.map(job => {
        return <li key={job.id}>{job.name}</li>;
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
          name='name'
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
