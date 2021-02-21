import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
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

import useStyles from './useStyles';
import {
  APPBAR_TEST_ID,
  DRAWER_MENU_ICON_TEST_ID,
  DRAWER_MENU_ITEM_DATA_TEST_ID,
  DRAWER_MENU_ITEM_HOME_TEST_ID,
  DRAWER_TEST_ID,
} from './constants';

const AppDrawer: FC = ({}): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
        </div>
        <Divider />
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
