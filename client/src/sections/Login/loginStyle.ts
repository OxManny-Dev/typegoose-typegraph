import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";



export const loginStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0, 3, 0, 0),
      }
    }
  }),
);
