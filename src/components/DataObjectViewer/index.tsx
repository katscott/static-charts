import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { Color } from '@material-ui/lab/Alert';

import Autocomplete from '@material-ui/lab/Autocomplete';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';

import useDataStore from '~/hooks/useDataStore';
import DataObjectDialog from '~/components/DataObjectDialog';

import useStyles from './useStyles';
import {
  DATA_OBJECT_VIEWER_ADD_TEST_ID,
  DATA_OBJECT_VIEWER_CODE_TEST_ID,
  DATA_OBJECT_VIEWER_DELETE_TEST_ID,
  DATA_OBJECT_VIEWER_DIALOG_TEST_ID,
  DATA_OBJECT_VIEWER_EDIT_TEST_ID,
  DATA_OBJECT_VIEWER_SELECT_LIST_TEST_ID,
  DATA_OBJECT_VIEWER_SELECT_TEST_ID,
  DATA_OBJECT_VIEWER_SNACKBAR_TEST_ID,
} from './constants';

const DataPage = (): JSX.Element => {
  const classes = useStyles();

  const [openDataObjectDialog, setOpenDataDialog] = useState(false);
  const [dataStore, setDataStore] = useDataStore({});
  const [selectedDataObjectKey, setSelectedDataObjectKey] = useState<string>(
    null,
  );
  const [dataObjectSelectDisabled, setDataObjectSelectDisabled] = useState(
    true,
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success' as Color);
  const [editDataObjectKey, setEditDataObjectKey] = useState<string>(null);

  const handleOpenAddDataDialog = () => {
    setEditDataObjectKey(null);
    setOpenDataDialog(true);
  };

  const handleCloseAddDataDialog = () => {
    setOpenDataDialog(false);
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleDataObjectChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    newValue: string,
  ) => {
    setSelectedDataObjectKey(newValue);
  };

  const handleEditSelectedDataObject = () => {
    setEditDataObjectKey(selectedDataObjectKey);
    setOpenDataDialog(true);
  };

  const handleDeleteSelectedDataObject = () => {
    delete dataStore[selectedDataObjectKey];
    setDataStore(dataStore);
    setSelectedDataObjectKey(null);
    setDataObjectSelectDisabled(Object.keys(dataStore).length == 0);
    setAlertSeverity('success');
    setAlertMessage('Chart deleted!');
    setOpenSnackbar(true);
  };

  const handleOnSaveDataObject = (key: string) => {
    setSelectedDataObjectKey(key);
    setOpenDataDialog(false);
    setAlertMessage('Data saved!');
    setAlertSeverity('success');
    setOpenSnackbar(true);
  };

  const handleLocalStorageModifiedExternally = () => {
    setSelectedDataObjectKey(null);
    setEditDataObjectKey(null);
    setAlertSeverity('error');
    setAlertMessage('Local storage data modified externally!');
    setOpenSnackbar(true);
  };

  useEffect(() => {
    if (!dataStore) {
      handleLocalStorageModifiedExternally();
      return;
    }

    if (Object.keys(dataStore).length > 0) {
      setDataObjectSelectDisabled(false);
    } else {
      setDataObjectSelectDisabled(true);
    }
  }, [dataStore]);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        data-testid={DATA_OBJECT_VIEWER_SNACKBAR_TEST_ID}
        onClose={handleCloseSnackbar}
        open={openSnackbar}
      >
        <MuiAlert
          elevation={6}
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          variant="filled"
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      <DataObjectDialog
        dataObject={
          dataStore && editDataObjectKey
            ? { key: editDataObjectKey, data: dataStore[editDataObjectKey] }
            : null
        }
        data-testid={DATA_OBJECT_VIEWER_DIALOG_TEST_ID}
        open={openDataObjectDialog}
        onClose={handleCloseAddDataDialog}
        onSave={handleOnSaveDataObject}
      />
      <Typography paragraph>
        Manage locally stored data for use in charts
      </Typography>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="flex-start"
        spacing={3}
      >
        <Grid item xs={8}>
          <Autocomplete
            data-testid={DATA_OBJECT_VIEWER_SELECT_TEST_ID}
            defaultValue={selectedDataObjectKey}
            disabled={dataObjectSelectDisabled}
            disableClearable
            fullWidth
            getOptionLabel={(c: string) => {
              if (!c) return '';
              return c;
            }}
            getOptionSelected={(option: string, _value: string) =>
              option == selectedDataObjectKey
            }
            id="keys"
            ListboxProps={{
              'data-testid': DATA_OBJECT_VIEWER_SELECT_LIST_TEST_ID,
            }}
            onChange={handleDataObjectChange}
            options={!dataStore ? [] : Object.keys(dataStore).map((k) => k)}
            renderInput={(params: never) => (
              <TextField
                {...params}
                label={dataObjectSelectDisabled ? 'Add a key -->' : 'Keys'}
                variant="outlined"
              />
            )}
            value={selectedDataObjectKey}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            color="primary"
            data-testid={DATA_OBJECT_VIEWER_ADD_TEST_ID}
            onClick={handleOpenAddDataDialog}
            size="large"
            variant="contained"
          >
            Add data
          </Button>
        </Grid>
      </Grid>
      <div className={classes.dataStore}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={1}>
            <Button
              color="primary"
              data-testid={DATA_OBJECT_VIEWER_EDIT_TEST_ID}
              disabled={!selectedDataObjectKey}
              onClick={handleEditSelectedDataObject}
              size="large"
              variant="contained"
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              color="secondary"
              data-testid={DATA_OBJECT_VIEWER_DELETE_TEST_ID}
              disabled={!selectedDataObjectKey}
              onClick={handleDeleteSelectedDataObject}
              size="large"
              variant="contained"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div data-testid={DATA_OBJECT_VIEWER_CODE_TEST_ID}>
              <AceEditor
                fontSize={14}
                highlightActiveLine={true}
                mode="json"
                name="chartCode"
                placeholder="Select a data object to view"
                readOnly={true}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                showGutter={true}
                showPrintMargin={false}
                theme="textmate"
                value={
                  dataStore && selectedDataObjectKey
                    ? (dataStore[selectedDataObjectKey] as string)
                    : ''
                }
                wrapEnabled
                width="100%"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DataPage;
