import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import AppDrawer from './index';
import {
  APPBAR_TEST_ID,
  DRAWER_MENU_ICON_TEST_ID,
  DRAWER_MENU_ITEM_DATA_TEST_ID,
  DRAWER_MENU_ITEM_HOME_TEST_ID,
  DRAWER_TEST_ID,
} from './constants';

jest.mock('firebase/app', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth: any = jest.fn().mockReturnValue({
    initializeApp: jest.fn(),
    signInWithRedirect: jest.fn(),
    getRedirectResult: jest.fn().mockResolvedValue({
      credential: {
        providerId: 'Google',
      },
      user: {
        getIdToken: jest.fn().mockResolvedValue('abc1234'),
      },
      additionalUserInfo: {
        profile: {
          email: 'test@test.com',
          name: 'John Doe',
        },
      },
    }),
  });

  auth.GoogleAuthProvider = class {
    addScope = jest.fn();
  };

  return { apps: jest.fn(), auth };
});

describe('components/AppDrawer', () => {
  it('renders appbar, open drawer, close drawer', async () => {
    const wrapper = render(<AppDrawer />, {
      wrapper: MemoryRouter,
    });

    const { getByTestId, queryByTestId } = wrapper;

    // verify elements
    expect(queryByTestId(APPBAR_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(DRAWER_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(DRAWER_MENU_ICON_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(DRAWER_MENU_ITEM_HOME_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(DRAWER_MENU_ITEM_DATA_TEST_ID)).toBeInTheDocument();

    const menuIcon = getByTestId(DRAWER_MENU_ICON_TEST_ID);
    const homeMenuItem = getByTestId(DRAWER_MENU_ITEM_HOME_TEST_ID);
    const dataMenuItem = getByTestId(DRAWER_MENU_ITEM_DATA_TEST_ID);

    // start closed
    expect(getByTestId(DRAWER_TEST_ID).firstChild).not.toBeVisible();

    // open
    fireEvent.click(menuIcon);
    expect(getByTestId(DRAWER_TEST_ID).firstChild).toBeVisible();

    // click home and close
    fireEvent.click(homeMenuItem);
    await new Promise((r) => setTimeout(r, 2000)); // wait for transform to finish
    expect(getByTestId(DRAWER_TEST_ID).firstChild).not.toBeVisible();

    // open
    fireEvent.click(menuIcon);
    expect(getByTestId(DRAWER_TEST_ID).firstChild).toBeVisible();

    // click data and close
    fireEvent.click(dataMenuItem);
    await new Promise((r) => setTimeout(r, 2000)); // wait for transform to finish
    expect(getByTestId(DRAWER_TEST_ID).firstChild).not.toBeVisible();
  });
});
