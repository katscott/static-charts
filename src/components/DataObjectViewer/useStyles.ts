import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export default useStyles;
