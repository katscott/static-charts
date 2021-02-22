import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChartViewer from './index';
import {
  CHART_VIEWER_ADD_TEST_ID,
  CHART_VIEWER_DELETE_TEST_ID,
  CHART_VIEWER_DIALOG_TEST_ID,
  CHART_VIEWER_EDIT_TEST_ID,
  CHART_VIEWER_SELECT_LIST_TEST_ID,
  CHART_VIEWER_SELECT_TEST_ID,
  CHART_VIEWER_SNACKBAR_TEST_ID,
} from './constants';

describe('components/ChartViewer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders default viewer', async () => {
    render(<ChartViewer />);

    // verify elements
    expect(
      screen.queryByTestId(CHART_VIEWER_SELECT_TEST_ID),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(CHART_VIEWER_ADD_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(CHART_VIEWER_EDIT_TEST_ID)).toBeInTheDocument();
    expect(
      screen.queryByTestId(CHART_VIEWER_DELETE_TEST_ID),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId(CHART_VIEWER_DIALOG_TEST_ID),
    ).toBeInTheDocument();
    expect(screen.getByTestId(CHART_VIEWER_DIALOG_TEST_ID)).not.toBeVisible();

    expect(
      screen.queryByTestId(CHART_VIEWER_SNACKBAR_TEST_ID),
    ).not.toBeInTheDocument();
  });

  it('add button opens dialog', async () => {
    render(<ChartViewer />);

    const addButton = screen.getByTestId(CHART_VIEWER_ADD_TEST_ID);

    userEvent.click(addButton);

    expect(screen.getByTestId(CHART_VIEWER_DIALOG_TEST_ID)).toBeVisible();
  });

  it('select data object shows keys and enables view area on selection', async () => {
    localStorage.setItem('charts', '{"test1":"test","test2":"test"}');

    render(<ChartViewer />);

    const editButton = screen.getByTestId(CHART_VIEWER_EDIT_TEST_ID);
    const deleteButton = screen.getByTestId(CHART_VIEWER_DELETE_TEST_ID);

    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();

    const autocomplete = screen.getByTestId(CHART_VIEWER_SELECT_TEST_ID);
    const input = within(autocomplete).getByRole('textbox');

    userEvent.type(input, '');

    const list = screen.getByTestId(CHART_VIEWER_SELECT_LIST_TEST_ID);
    expect(list.children).toHaveLength(2);
    expect(list.children[0].textContent).toBe('test1');
    expect(list.children[1].textContent).toBe('test2');

    userEvent.click(list.children[0]);

    expect(editButton).not.toBeDisabled();
    expect(deleteButton).not.toBeDisabled();
  });

  it('delete object clears viewer', async () => {
    localStorage.setItem('charts', '{"test1":"test","test2":"test"}');

    render(<ChartViewer />);

    const deleteButton = screen.getByTestId(CHART_VIEWER_DELETE_TEST_ID);

    const autocomplete = screen.getByTestId(CHART_VIEWER_SELECT_TEST_ID);
    const input = within(autocomplete).getByRole('textbox');

    userEvent.type(input, 'test1');

    const list = screen.getByTestId(CHART_VIEWER_SELECT_LIST_TEST_ID);
    userEvent.click(list.children[0]);

    expect(deleteButton).not.toBeDisabled();

    userEvent.click(deleteButton);

    expect(deleteButton).toBeDisabled();
    expect(input).toHaveValue('');
  });
});
