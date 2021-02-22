import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChartDialog from './index';
import {
  CHART_DIALOG_CANCEL_TEST_ID,
  CHART_DIALOG_EDITOR_TEST_ID,
  CHART_DIALOG_KEY_TEST_ID,
  CHART_DIALOG_SAVE_TEST_ID,
  CHART_DIALOG_TYPE_TEST_ID,
  DEFAULT_CHART_CODE,
} from './constants';

describe('components/ChartDialog', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('verify main elements', async () => {
    render(<ChartDialog onClose={jest.fn()} onSave={jest.fn()} open={true} />);

    // verify elements
    expect(screen.queryByText('Add Chart')).toBeInTheDocument();
    expect(screen.queryByTestId(CHART_DIALOG_KEY_TEST_ID)).toBeInTheDocument();
    expect(
      screen.queryByTestId(CHART_DIALOG_CANCEL_TEST_ID),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(CHART_DIALOG_SAVE_TEST_ID)).toBeInTheDocument();
  });

  it('does not dave when cancel button used', async () => {
    const mockSave = jest.fn();
    render(<ChartDialog onClose={jest.fn()} onSave={mockSave} open={true} />);

    const cancelButton = screen.getByTestId(CHART_DIALOG_CANCEL_TEST_ID);

    userEvent.click(cancelButton);

    expect(mockSave).not.toHaveBeenCalled();
  });

  it('correctly saves when save button used', async () => {
    let savedKey = '';
    const mockSave = jest.fn((key: string) => {
      savedKey = key;
    });
    render(<ChartDialog onClose={jest.fn()} onSave={mockSave} open={true} />);

    const keyControl = screen.getByTestId(CHART_DIALOG_KEY_TEST_ID);
    const keyInput = within(keyControl).getByRole('textbox');
    const typeControl = screen.getByTestId(CHART_DIALOG_TYPE_TEST_ID);
    const typeInput = within(typeControl).getByRole('combobox');
    const aceEditor = screen.getByTestId(CHART_DIALOG_EDITOR_TEST_ID);
    const valueInput = within(aceEditor).getByRole('textbox');
    const saveButton = screen.getByTestId(CHART_DIALOG_SAVE_TEST_ID);

    userEvent.tab();
    expect(keyInput).toHaveFocus();
    userEvent.type(keyInput, 'test');
    expect(keyInput).toHaveValue('test');

    userEvent.tab();
    expect(typeInput).toHaveFocus();

    userEvent.tab();
    expect(valueInput).toHaveFocus();

    userEvent.click(saveButton);

    expect(mockSave).toHaveBeenCalledWith(savedKey);
    expect(localStorage.getItem('charts')).toEqual(
      JSON.stringify({
        [savedKey]: {
          id: savedKey,
          type: 'bar',
          name: 'test',
          code: DEFAULT_CHART_CODE,
        },
      }),
    );
  });
});
