import React from 'react';
import { Root, Routes } from 'react-static';
import { Route, Switch } from 'react-router-dom';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppDrawer from '~/components/AppDrawer';

import './app.scss';
import UserContextProvider from './components/UserContextProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }),
);

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Root>
      <UserContextProvider>
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
      </UserContextProvider>
    </Root>
  );
};

export default App;
