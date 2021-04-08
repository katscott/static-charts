import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import { useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import useStyles from './useStyles';
import {
  APPBAR_TEST_ID,
  DRAWER_MENU_ICON_TEST_ID,
  DRAWER_MENU_ITEM_DATA_TEST_ID,
  DRAWER_MENU_ITEM_HOME_TEST_ID,
  DRAWER_TEST_ID,
} from './constants';
import firebaseApp from '~/firebase';

interface AppDrawerProps {
  handleSignOut: () => void;
  isSignedIn: boolean;
  user: firebase.User;
}

const AppDrawer: FC<AppDrawerProps> = ({
  handleSignOut,
  isSignedIn,
  user,
}): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <>
      <AppBar
        className={classes.appBar}
        data-testid={APPBAR_TEST_ID}
        position="fixed"
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Charts
          </Typography>
          <IconButton
            aria-label="open drawer"
            data-testid={DRAWER_MENU_ICON_TEST_ID}
            color="inherit"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
        data-testid={DRAWER_TEST_ID}
        keepMounted={true}
        onClose={handleDrawerClose}
        open={drawerOpen}
        variant="temporary"
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Grid
            alignItems="flex-end"
            container
            direction="row"
            justify="flex-end"
          >
            <Grid item>
              {isSignedIn && (
                <img
                  src={user?.photoURL}
                  style={{ width: '40px', borderRadius: '20px' }}
                />
              )}
            </Grid>
          </Grid>
        </div>
        <Divider />
        <Grid
          className={classes.signInGrid}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            {!isSignedIn && (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebaseApp.auth()}
              />
            )}
            {isSignedIn && (
              <Button
                className={classes.signInButton}
                color="primary"
                onClick={handleSignOut}
                size="large"
                variant="contained"
              >
                Sign Out
              </Button>
            )}
          </Grid>
        </Grid>
        <List>
          <MenuItem
            button
            component={Link}
            data-testid={DRAWER_MENU_ITEM_HOME_TEST_ID}
            key="Home"
            onClick={handleDrawerClose}
            to="/"
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
          <MenuItem
            button
            component={Link}
            data-testid={DRAWER_MENU_ITEM_DATA_TEST_ID}
            key="Data"
            onClick={handleDrawerClose}
            to="/data"
          >
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Data" />
          </MenuItem>
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
