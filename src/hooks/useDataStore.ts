import createPersistedState from 'use-persisted-state';

const useDataState = createPersistedState('data');

const useDataStore = (
  initialData: { [key: string]: never } = {},
): [
  {
    [key: string]: never;
  },
  React.Dispatch<
    React.SetStateAction<{
      [key: string]: never;
    }>
  >,
] => useDataState(initialData);

export default useDataStore;
