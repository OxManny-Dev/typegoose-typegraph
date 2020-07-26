import clsx from 'clsx';
import React, { FC } from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { drawBarStyles } from './DrawBarStyles';

type Props = {
  open: boolean;
  handleDrawerClose: () => void;
}

export const DrawBar: FC<Props> = (props) => {
  const classes = drawBarStyles();
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </IconButton>
      </div>
      <Divider/>
      <List>
        {['SignUp', 'Login', 'User', 'Employees', 'Jobs', 'Ranches', 'Fields'].map((text, index) => (
          <ListItem button key={text} component={Link} to={ index === 0 ? '/' : text.toLowerCase()}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['Add Employee', 'Add Field', 'Add Ranch', 'Add Job'].map((text, index) => (
          <ListItem button key={text} component={Link} to={ index === 0 ? '/' : text.replace(/\s+/g, '').toLowerCase()}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};


