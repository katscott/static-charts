import { ChartType } from '~/types';

export const CHART_DIALOG_CANCEL_TEST_ID = 'cd-cancel-button';
export const CHART_DIALOG_EDITOR_TEST_ID = 'cd-value-input';
export const CHART_DIALOG_KEY_TEST_ID = 'cd-key-input';
export const CHART_DIALOG_SAVE_TEST_ID = 'cd-save-button';
export const CHART_DIALOG_TYPE_TEST_ID = 'cd-type-input';

export const DEFAULT_CHART_NAME = '';
export const DEFAULT_CHART_TYPE = ChartType.Bar;
export const DEFAULT_CHART_CODE = `(dataStore, Chartist) => {
  return { data: null, options: null };
};`;
