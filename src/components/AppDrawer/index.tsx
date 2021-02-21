import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';

import './app.css';
import useStyles from './useStyles';
import { DRAWER_TEST_ID } from './constants';

interface DrawerProps {
  open: boolean;
}

const AppDrawer: FC<DrawerProps> = ({ open }): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    setDrawerOpen(open);
  }, [open]);

  return (
    <Drawer
      anchor="right"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={classes.drawer}
      data-testid={DRAWER_TEST_ID}
      open={drawerOpen}
      variant="persistent"
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
        <MenuItem button component={Link} to="/" key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
