import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Badge, Menu, MenuItem } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AccountCircle } from '@material-ui/icons';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { appStyles } from './appStyle';


import { useSignOutMutation } from '../../generated/graphql-hooks';
// Redux for logout
import { useDispatch } from 'react-redux';
import { EmployeeActionTypes } from '../../actions/types';

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
}

export const AppBarNav: FC<Props> = (props) => {
  const classes = appStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [signOutUser] = useSignOutMutation({
    onCompleted: data => {
      console.log(data.signOut);
      if (data) {
        sessionStorage.removeItem('loggedInEmployee');
        dispatch({ type: EmployeeActionTypes.LOGIN_EMPLOYEE, payload: '' });
        history.push('/');
      }
    }
  });
  /*
* The anchorEl should be used for a specific menu dropped down
* anchorEl becomes the menu that appears when setAnchorEl is called
* We need to have one for every menu
* Each menu should have it's own handler
*/
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  /*
  * This is for the Mobile version
  */
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);
  // Checks if there is an anchor element, it will return true
  // this is used for checking if an anchor element should be shown
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Sets the User Profile Menu as a Popup
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // Unsets The profile menu element the mobile version as well
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleSignOutClose = async () => {
    await signOutUser();
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  // Closes the menu
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  /*
  * Because of the awesome power of menu's it makes it hard to find each one of them
  * Let's use id's to identify which Element the Menu belongs to
  */
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };



  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'bottom', horizontal: 'right'}}

    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleSignOutClose}>Sign Out</MenuItem>
    </Menu>
  );


  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon/>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: props.open,
          })}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" noWrap className={classes.brandName}>
          Cloud Pet
        </Typography>

        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to='/user'>
            <Badge badgeContent={4} color="secondary">
              <MailIcon/>
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MenuIcon/>
          </IconButton>
        </div>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};
