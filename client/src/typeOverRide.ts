import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    myButton: {
      primary: {
        main: string;
      },
      secondary: {
        main: string;
      }
    },
    background: {
      orange: string,
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    myButton?: {
      primary: {
        main?: string;
      },
      secondary: {
        main?: string;
      }
    },
    background: {
      orange?: string;
    }
  }
}
