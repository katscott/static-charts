import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import AppDrawer from './index';
import { DRAWER_TEST_ID } from './constants';

describe('components/AppDrawer', () => {
  it('shows open', async () => {
    const { queryByTestId } = render(<AppDrawer open={true} />, {
      wrapper: MemoryRouter,
    });

    expect(queryByTestId(DRAWER_TEST_ID)).not.toBeNull();
  });
});
