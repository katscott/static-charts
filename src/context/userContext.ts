import React from 'react';
import firebase from 'firebase/app';

export interface UserState {
  isSignedIn: boolean;
  user: firebase.User;
}

export const UserContext = React.createContext<UserState>({
  isSignedIn: false,
  user: null,
});
