import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
const drawerWidth = 240;

export const appStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      background: theme.background.orange,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    brandName: {
      flexGrow: 2,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    // drawer: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    //   whiteSpace: 'nowrap',
    // },
    // drawerOpen: {
    //   width: drawerWidth,
    //   transition: theme.transitions.create('width', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    // },
    // drawerClose: {
    //   transition: theme.transitions.create('width', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    //   }),
    //   overflowX: 'hidden',
    //   width: theme.spacing(7) + 1,
    //   [theme.breakpoints.up('sm')]: {
    //     width: theme.spacing(9) + 1,
    //   },
    // },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      marginLeft: theme.spacing(2),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    inputFields: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0, 1),
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);
