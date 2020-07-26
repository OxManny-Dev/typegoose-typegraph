import { createMuiTheme } from '@material-ui/core/styles';
import {green, purple} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  myButton: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: green[500]
    }
  },
  background: {
    orange: '#ff6f00',
  }
});
