import React from 'react';
import { Root, Routes } from 'react-static';
import { Route, Switch } from 'react-router-dom';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppDrawer from 'components/AppDrawer';

import './app.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
  }),
);

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Root>
      <CssBaseline />
      <AppDrawer />
      <div className="content">
        <div className={classes.drawerHeader} />
        <React.Suspense fallback={<em>Loading...</em>}>
          <Switch>
            <Route render={() => <Routes />} />
          </Switch>
        </React.Suspense>
      </div>
    </Root>
  );
};

export default App;
