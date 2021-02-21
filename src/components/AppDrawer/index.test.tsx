import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import AppDrawer from './index';
import {
  APPBAR_TEST_ID,
  DRAWER_MENU_ICON_TEST_ID,
  DRAWER_MENU_ITEM_HOME_TEST_ID,
  DRAWER_TEST_ID,
} from './constants';

describe('components/AppDrawer', () => {
  it('renders appbar, open drawer, close drawer', async () => {
    const wrapper = render(<AppDrawer />, {
      wrapper: MemoryRouter,
    });

    const { getByTestId, queryByTestId } = wrapper;

    expect(queryByTestId(APPBAR_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(DRAWER_TEST_ID)).toBeInTheDocument();

    expect(getByTestId(DRAWER_TEST_ID).firstChild).not.toBeVisible();

    const menuIcon = getByTestId(DRAWER_MENU_ICON_TEST_ID);
    fireEvent.click(menuIcon);
    expect(getByTestId(DRAWER_TEST_ID).firstChild).toBeVisible();

    const homeMenuItem = getByTestId(DRAWER_MENU_ITEM_HOME_TEST_ID);
    fireEvent.click(homeMenuItem);
    await new Promise((r) => setTimeout(r, 2000)); // wait for transform to finish
    expect(getByTestId(DRAWER_TEST_ID).firstChild).not.toBeVisible();
  });
});
