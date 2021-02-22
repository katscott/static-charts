import React, { useEffect, useState } from 'react';
import Chartist, { IBarChartOptions, IChartistData } from 'chartist';

import { Theme, createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { ChartType } from '~/types';

import useChartStore from '~/hooks/useChartStore';
import useDataStore from '~/hooks/useDataStore';

import ChartDialog from '~/components/ChartDialog';
import {
  CHART_VIEWER_ADD_TEST_ID,
  CHART_VIEWER_DELETE_TEST_ID,
  CHART_VIEWER_DIALOG_TEST_ID,
  CHART_VIEWER_EDIT_TEST_ID,
  CHART_VIEWER_SELECT_LIST_TEST_ID,
  CHART_VIEWER_SELECT_TEST_ID,
  CHART_VIEWER_SNACKBAR_TEST_ID,
} from './constants';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    chartArea: {
      marginTop: '20px',
    },
  }),
);

const ChartViewer = (): JSX.Element => {
  const classes = useStyles();

  const [dataStore] = useDataStore();
  const [chartStore, setChartStore] = useChartStore({});
  const [editChartKey, setEditChartKey] = useState<string>(null);
  const [selectedChartKey, setSelectedChartKey] = useState<string>(null);
  const [chartSelectDisabled, setChartSelectDisabled] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAddChartDialog, setOpenChartDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success' as Color);

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChartChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    newValue: string,
  ) => {
    setSelectedChartKey(newValue);
  };

  const handleAddChart = () => {
    setEditChartKey(null);
    setOpenChartDialog(true);
  };

  const handleCloseChartDialog = () => {
    setOpenChartDialog(false);
  };

  const handleOnSaveChart = (key: string) => {
    setEditChartKey(null);
    setSelectedChartKey(key);
    setOpenChartDialog(false);
    setAlertSeverity('success');
    setAlertMessage('Chart saved!');
    setOpenSnackbar(true);
  };

  const handleEditSelectedChart = () => {
    setEditChartKey(selectedChartKey);
    setOpenChartDialog(true);
  };

  const handleDeleteSelectedChart = () => {
    delete chartStore[selectedChartKey];
    setChartStore(chartStore);
    setChartSelectDisabled(Object.keys(chartStore).length == 0);
    setSelectedChartKey(null);
    setAlertSeverity('success');
    setAlertMessage('Chart deleted!');
    setOpenSnackbar(true);
  };

  const handleLocalStorageModifiedExternally = () => {
    setSelectedChartKey(null);
    setEditChartKey(null);
    setAlertSeverity('error');
    setAlertMessage('Local storage data modified externally!');
    setOpenSnackbar(true);
  };

  const createBarChart = () => {
    if (!chartStore) return;

    const chart = chartStore[selectedChartKey];
    if (!chart) return;
    if (!dataStore) return;

    document.getElementById('chart').innerHTML = '';

    let output: {
      data: IChartistData | null;
      options: IBarChartOptions | null;
    } = { data: null, options: null };
    try {
      const chart = chartStore[selectedChartKey];
      const generateOutput = eval(chart.code);
      output = generateOutput(dataStore, Chartist);
    } catch (e) {
      setAlertSeverity('error');
      setAlertMessage('Unable to render chart!');
      setOpenSnackbar(true);
      return;
    }

    if (!(output && output.data && output.options)) return;

    new Chartist.Bar('#chart', output.data, output.options).on(
      'draw',
      (data: Chartist.IChartDrawBarData) => {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 30px',
          });
        }
      },
    );
  };

  useEffect(() => {
    require('chartist-plugin-legend');
    require('chartist-plugin-tooltips-updated');
  });

  useEffect(() => {
    if (!selectedChartKey) return;

    const chart = chartStore[selectedChartKey];

    if (!chart) return;

    switch (chart.type) {
      case ChartType.Bar:
        createBarChart();
        break;
    }
  }, [selectedChartKey]);

  useEffect(() => {
    if (!chartStore) {
      handleLocalStorageModifiedExternally();
    }

    if (chartStore && Object.keys(chartStore).length > 0) {
      setChartSelectDisabled(false);
    } else {
      setChartSelectDisabled(true);
    }
  }, [chartStore]);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        data-testid={CHART_VIEWER_SNACKBAR_TEST_ID}
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
      <ChartDialog
        chart={chartStore && editChartKey ? chartStore[editChartKey] : null}
        data-testid={CHART_VIEWER_DIALOG_TEST_ID}
        onClose={handleCloseChartDialog}
        onSave={handleOnSaveChart}
        open={openAddChartDialog}
      />
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="flex-start"
        spacing={3}
      >
        <Grid item xs={8}>
          <Autocomplete
            data-testid={CHART_VIEWER_SELECT_TEST_ID}
            defaultValue={selectedChartKey}
            disabled={chartSelectDisabled}
            disableClearable
            fullWidth
            id="charts"
            getOptionLabel={(k: string) => {
              return chartStore[k].name;
            }}
            ListboxProps={{
              'data-testid': CHART_VIEWER_SELECT_LIST_TEST_ID,
            }}
            onChange={handleChartChange}
            options={!chartStore ? [] : Object.keys(chartStore).map((k) => k)}
            renderInput={(params: never) => (
              <TextField
                {...params}
                label={chartSelectDisabled ? 'Add a chart -->' : 'Charts'}
                variant="outlined"
              />
            )}
            value={selectedChartKey}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            color="primary"
            data-testid={CHART_VIEWER_ADD_TEST_ID}
            onClick={handleAddChart}
            size="large"
            variant="contained"
          >
            Add Chart
          </Button>
        </Grid>
      </Grid>
      <div className={classes.chartArea}>
        <Grid
          alignItems="center"
          container
          direction="row"
          justify="space-around"
          spacing={3}
        >
          <Grid item xs={1}>
            <Button
              color="primary"
              data-testid={CHART_VIEWER_EDIT_TEST_ID}
              disabled={!selectedChartKey}
              onClick={handleEditSelectedChart}
              size="large"
              variant="contained"
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              color="secondary"
              data-testid={CHART_VIEWER_DELETE_TEST_ID}
              disabled={!selectedChartKey}
              onClick={handleDeleteSelectedChart}
              size="large"
              variant="contained"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div id="chart"></div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ChartViewer;
