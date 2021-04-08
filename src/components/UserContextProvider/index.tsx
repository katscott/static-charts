import React, { FC, useEffect, useState } from 'react';
import firebase from 'firebase/app';

import { UserContext } from '~/context/userContext';
import firebaseApp from '~/firebase';

const UserContextProvider: FC = ({ children }): JSX.Element => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  let unregisterAuthObserver: firebase.Unsubscribe;

  useEffect(() => {
    unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <UserContext.Provider value={{ isSignedIn, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
