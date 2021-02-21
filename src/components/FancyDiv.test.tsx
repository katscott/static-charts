import React from 'react';
import { render } from '@testing-library/react';

import FancyDiv from './FancyDiv';

describe('components/FancyDiv', () => {
  it('renders', () => {
    const { queryByTestId } = render(<FancyDiv />);

    expect(queryByTestId('testid')).not.toBeNull();
  });
});
