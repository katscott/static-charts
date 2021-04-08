import React from 'react';

export interface AppState {
  user: number;
}

const AppContext = React.createContext<AppState>({
  user: null,
});

export default AppContext;
