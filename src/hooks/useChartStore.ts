import { Chart } from '~/types';
import createPersistedState from 'use-persisted-state';

const useChartState = createPersistedState('charts');

const useChartStore = (
  initialData: { [key: string]: Chart } = {},
): [
  {
    [key: string]: Chart;
  },
  React.Dispatch<
    React.SetStateAction<{
      [key: string]: Chart;
    }>
  >,
] => useChartState(initialData);

export default useChartStore;
