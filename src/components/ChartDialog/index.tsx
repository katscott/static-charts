import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Theme, createStyles, makeStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools';

import { Chart, ChartType } from '~/types';

import useChartStore from '~/hooks/useChartStore';
import {
  CHART_DIALOG_CANCEL_TEST_ID,
  CHART_DIALOG_EDITOR_TEST_ID,
  CHART_DIALOG_KEY_TEST_ID,
  CHART_DIALOG_SAVE_TEST_ID,
  CHART_DIALOG_TYPE_TEST_ID,
  DEFAULT_CHART_CODE,
  DEFAULT_CHART_NAME,
  DEFAULT_CHART_TYPE,
} from './constants';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    codeEditor: {
      border: '1px solid rgba(0,0,0,0.20)',
      borderRadius: '4px',
    },
  }),
);

type ChartDialogProps = {
  chart?: Chart;
  open: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
};

const ChartDialog: FC<ChartDialogProps> = ({
  chart,
  open,
  onClose,
  onSave,
  ...props
}) => {
  const classes = useStyles();
  const [chartStore, setChartStore] = useChartStore({});

  const [chartName, setChartName] = useState(DEFAULT_CHART_NAME);
  const [chartType, setChartType] = useState(DEFAULT_CHART_TYPE);
  const [chartCode, setChartCode] = useState(DEFAULT_CHART_CODE);

  useEffect(() => {
    if (chart) {
      setChartName(chart.name);
      setChartType(chart.type);
      setChartCode(chart.code);
    } else {
      setChartName(DEFAULT_CHART_NAME);
      setChartType(DEFAULT_CHART_TYPE);
      setChartCode(DEFAULT_CHART_CODE);
    }
  }, [chart]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let guid = uuidv4();
    if (chart) guid = chart.id;

    const newCharts = {
      ...chartStore,
      [guid]: {
        id: guid,
        type: chartType as ChartType,
        name: chartName,
        code: chartCode,
      },
    };
    setChartStore(newCharts);

    onSave(guid);
  };

  const handleChartNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartName(e.target.value);
  };

  const handleChartTypeChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    newValue: ChartType,
  ) => {
    setChartType(newValue);
  };

  const handleChartCodeChange = (
    newValue: string,
    _event: React.ChangeEvent,
  ) => {
    setChartCode(newValue);
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
          {chart ? 'Edit' : 'Add'} Chart
        </DialogTitle>
        <DialogContent>
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="flex-start"
            spacing={3}
          >
            <Grid item xs={8}>
              <TextField
                data-testid={CHART_DIALOG_KEY_TEST_ID}
                id="chartName"
                disabled={!!chart}
                fullWidth
                label="Name"
                onChange={handleChartNameChange}
                required
                value={chartName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="chartType">Type</InputLabel>
                <Select
                  data-testid={CHART_DIALOG_TYPE_TEST_ID}
                  inputProps={{
                    name: 'type',
                    id: 'chartType',
                  }}
                  label="Type"
                  native
                  onChange={handleChartTypeChange}
                  value={chartType}
                >
                  {Object.values(ChartType).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <div data-testid={CHART_DIALOG_EDITOR_TEST_ID}>
                <AceEditor
                  className={classes.codeEditor}
                  enableBasicAutocompletion={true}
                  enableLiveAutocompletion={true}
                  enableSnippets={false}
                  fontSize={14}
                  highlightActiveLine={true}
                  mode="javascript"
                  name="chartCode"
                  onChange={handleChartCodeChange}
                  placeholder="Code to generate chart data and options"
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  showPrintMargin={false}
                  showGutter={true}
                  theme="textmate"
                  width="100%"
                  wrapEnabled
                  value={chartCode}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            data-testid={CHART_DIALOG_CANCEL_TEST_ID}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            data-testid={CHART_DIALOG_SAVE_TEST_ID}
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

export default ChartDialog;
