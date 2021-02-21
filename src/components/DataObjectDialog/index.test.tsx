import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataObjectDialog from './index';
import {
  DATA_OBJECT_DIALOG_CANCEL_TEST_ID,
  DATA_OBJECT_DIALOG_EDITOR_TEST_ID,
  DATA_OBJECT_DIALOG_KEY_TEST_ID,
  DATA_OBJECT_DIALOG_SAVE_TEST_ID,
} from './constants';

describe('components/DataObjectDialog', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('verify main elements', async () => {
    render(
      <DataObjectDialog onClose={jest.fn()} onSave={jest.fn()} open={true} />,
    );

    // verify elements
    expect(screen.queryByText('Add Data Object')).toBeInTheDocument();
    expect(
      screen.queryByTestId(DATA_OBJECT_DIALOG_KEY_TEST_ID),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(DATA_OBJECT_DIALOG_CANCEL_TEST_ID),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(DATA_OBJECT_DIALOG_SAVE_TEST_ID),
    ).toBeInTheDocument();
  });

  it('does not dave when cancel button used', async () => {
    const mockSave = jest.fn();
    render(
      <DataObjectDialog onClose={jest.fn()} onSave={mockSave} open={true} />,
    );

    const cancelButton = screen.getByTestId(DATA_OBJECT_DIALOG_CANCEL_TEST_ID);

    userEvent.click(cancelButton);

    expect(mockSave).not.toHaveBeenCalled();
  });

  it('correctly saves when save button used', async () => {
    const mockSave = jest.fn();
    render(
      <DataObjectDialog onClose={jest.fn()} onSave={mockSave} open={true} />,
    );

    const keyControl = screen.getByTestId(DATA_OBJECT_DIALOG_KEY_TEST_ID);
    const keyInput = within(keyControl).getByRole('textbox');
    const aceEditor = screen.getByTestId(DATA_OBJECT_DIALOG_EDITOR_TEST_ID);
    const valueInput = within(aceEditor).getByRole('textbox');
    const saveButton = screen.getByTestId(DATA_OBJECT_DIALOG_SAVE_TEST_ID);

    userEvent.tab();
    expect(keyInput).toHaveFocus();
    userEvent.type(keyInput, 'test');
    expect(keyInput).toHaveValue('test');

    userEvent.tab();
    expect(valueInput).toHaveFocus();
    userEvent.paste(valueInput, 'test');
    fireEvent.change(valueInput, { target: { value: 'test' } });
    expect(valueInput).toHaveValue('test');

    userEvent.click(saveButton);

    expect(mockSave).toHaveBeenCalledWith('test');
    expect(localStorage.getItem('data')).toBe('{"test":"test"}');
  });
});
