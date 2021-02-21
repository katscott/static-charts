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
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">
          {dataObject ? 'Edit' : 'Add'} Data Object
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                id="dataObjectKey"
                label="Key"
                value={dataObjectKey}
                onChange={handleDataObjectKeyChange}
                variant="outlined"
                fullWidth
                required
                disabled={!!dataObject}
              />
            </Grid>
            <Grid item xs={12}>
              <AceEditor
                className={classes.codeEditor}
                placeholder="Data object value"
                mode="json"
                theme="textmate"
                name="dataObjectValue"
                onChange={handleDataObjectValueChange}
                fontSize={14}
                showGutter={true}
                highlightActiveLine={true}
                width="100%"
                value={dataObjectValue}
                wrapEnabled
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={false}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DataObjectDialog;
