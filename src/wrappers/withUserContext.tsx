import React from 'react';

import { UserContext } from '~/context/userContext';
import firebaseApp from '~/firebase';

const withUserContext = (
  WrappedComponent: React.ElementType,
): ((props: unknown) => JSX.Element) => {
  type WrappedProps = React.ComponentProps<typeof WrappedComponent>;

  const handleSignOut = () => {
    firebaseApp.auth().signOut();
  };

  return (props: WrappedProps) => (
    <UserContext.Consumer>
      {({ isSignedIn, user }) => (
        <WrappedComponent
          handleSignOut={handleSignOut}
          isSignedIn={isSignedIn}
          user={user}
          {...props}
        />
      )}
    </UserContext.Consumer>
  );
};

export default withUserContext;
