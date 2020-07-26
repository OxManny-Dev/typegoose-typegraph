import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';


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


export const AddJobComponent = () => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h1>Add a Job</h1>
      <TextField
        label='Name of Job'
        placeholder='Add a Job'
        inputProps={{ 'aria-label': 'description' }}
        fullWidth
      />
      <Button
        variant='contained'
        fullWidth
        color='primary'
      >Add Job
      </Button>
    </form>
  )
}
