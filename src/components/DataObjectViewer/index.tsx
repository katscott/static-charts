import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Grid,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';

import useDataStore from '~/hooks/useDataStore';
import DataObjectDialog from '~/components/DataObjectDialog';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    dataStore: {
      marginTop: '15px',
      height: 400,
      width: '100%',
    },
    textField: {
      marginTop: theme.spacing(1),
    },
  }),
);

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
  const [editDataObject, setEditDataObject] = useState<string>(null);

  const handleOpenAddDataDialog = () => {
    setEditDataObject(null);
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
    setEditDataObject(selectedDataObjectKey);
    setOpenDataDialog(true);
  };

  const handleDeleteSelectedDataObject = () => {
    delete dataStore[selectedDataObjectKey];
    setDataStore(dataStore);
    setSelectedDataObjectKey(null);
    setAlertSeverity('success');
    setAlertMessage('Chart deleted!');
    setOpenSnackbar(true);
  };

  const handleOnSaveDataObject = (key: string) => {
    setSelectedDataObjectKey(key);
    setOpenDataDialog(false);
    setOpenSnackbar(true);
    setAlertMessage('Data saved!');
    setAlertSeverity('success');
    setOpenSnackbar(true);
  };

  useEffect(() => {
    if (!dataStore) return;

    if (Object.keys(dataStore).length > 0) {
      setDataObjectSelectDisabled(false);
    } else {
      setDataObjectSelectDisabled(true);
    }
  });

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <DataObjectDialog
        dataObject={
          editDataObject
            ? { key: editDataObject, data: dataStore[editDataObject] }
            : null
        }
        open={openDataObjectDialog}
        onClose={handleCloseAddDataDialog}
        onSave={handleOnSaveDataObject}
      />
      <Typography paragraph>
        Manage locally stored data for use in charts
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={8}>
          <Autocomplete
            defaultValue={selectedDataObjectKey}
            value={selectedDataObjectKey}
            disabled={dataObjectSelectDisabled}
            disableClearable
            fullWidth
            id="keys"
            options={!dataStore ? [] : Object.keys(dataStore).map((k) => k)}
            getOptionLabel={(c: string) => {
              if (!c) return '';
              return c;
            }}
            renderInput={(params: never) => (
              <TextField
                {...params}
                label={dataObjectSelectDisabled ? 'Add a key -->' : 'Keys'}
                variant="outlined"
              />
            )}
            onChange={handleDataObjectChange}
            getOptionSelected={(option: string, _value: string) =>
              option == selectedDataObjectKey
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenAddDataDialog}
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
              disabled={!selectedDataObjectKey}
              onClick={handleEditSelectedDataObject}
              variant="contained"
              color="primary"
              size="large"
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              disabled={!selectedDataObjectKey}
              onClick={handleDeleteSelectedDataObject}
              variant="contained"
              color="secondary"
              size="large"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <AceEditor
              placeholder="Select a data object to view"
              mode="json"
              theme="textmate"
              name="chartCode"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              readOnly={true}
              highlightActiveLine={true}
              wrapEnabled
              width="100%"
              value={dataStore[selectedDataObjectKey] as string}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DataPage;
