import React, { FC, useEffect, useState } from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';

import useDataStore from '~/hooks/useDataStore';
import {
  DATA_OBJECT_DIALOG_CANCEL_TEST_ID,
  DATA_OBJECT_DIALOG_EDITOR_TEST_ID,
  DATA_OBJECT_DIALOG_KEY_TEST_ID,
  DATA_OBJECT_DIALOG_SAVE_TEST_ID,
} from './constants';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    codeEditor: {
      border: '1px solid rgba(0,0,0,0.20)',
      borderRadius: '4px',
    },
  }),
);

type DataObjectDialogProps = {
  dataObject?: { key: string; data: never };
  open: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
};

const DataObjectDialog: FC<DataObjectDialogProps> = ({
  dataObject,
  open,
  onClose,
  onSave,
  ...props
}) => {
  const classes = useStyles();
  const [dataStore, setDataStore] = useDataStore({});

  const [dataObjectKey, setDataObjectKey] = useState('');
  const [dataObjectValue, setDataObjectValue] = useState('');

  useEffect(() => {
    if (dataObject) {
      setDataObjectKey(dataObject.key);
      setDataObjectValue(dataObject.data);
    } else {
      setDataObjectKey('');
      setDataObjectValue('');
    }
  }, [dataObject]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDataStore = {
      ...dataStore,
      [dataObjectKey]: dataObjectValue as never,
    };
    setDataStore(newDataStore);

    onSave(dataObjectKey);
  };

  const handleDataObjectKeyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDataObjectKey(e.target.value);
  };

  const handleDataObjectValueChange = (
    newValue: string,
    _event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDataObjectValue(newValue);
  };

  return (
    <Dialog
      {...props}
      aria-labelledby="form-dialog-title"
      fullWidth
      keepMounted={true}
      maxWidth="md"
      onClose={onClose}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">
          {dataObject ? 'Edit' : 'Add'} Data Object
        </DialogTitle>
        <DialogContent>
          <Grid
            alignItems="stretch"
            container
            direction="column"
            justify="flex-start"
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                data-testid={DATA_OBJECT_DIALOG_KEY_TEST_ID}
                disabled={!!dataObject}
                fullWidth
                id="dataObjectKey"
                label="Key"
                onChange={handleDataObjectKeyChange}
                required
                value={dataObjectKey}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <div data-testid={DATA_OBJECT_DIALOG_EDITOR_TEST_ID}>
                <AceEditor
                  className={classes.codeEditor}
                  enableBasicAutocompletion={true}
                  enableLiveAutocompletion={true}
                  enableSnippets={false}
                  fontSize={14}
                  mode="json"
                  name="dataObjectValue"
                  onChange={handleDataObjectValueChange}
                  placeholder="Data object value"
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  showGutter={true}
                  showPrintMargin={false}
                  theme="textmate"
                  value={dataObjectValue}
                  width="100%"
                  wrapEnabled
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            data-testid={DATA_OBJECT_DIALOG_CANCEL_TEST_ID}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            data-testid={DATA_OBJECT_DIALOG_SAVE_TEST_ID}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DataObjectDialog;
