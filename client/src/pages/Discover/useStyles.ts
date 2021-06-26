import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    '&::-webkit-Scrollbar': {
      display: 'none',
    },
  },
  contestGrid: {
    flex: '0.8',
    '&::-webkit-Scrollbar': {
      display: 'none',
    },
  },
  title: {
    display: 'inline',
    fontSize: '2.5rem',
    fontWeight: 1000,
  },
  link: {
    width: '100%',
    height: '100%',
    borderRadius: '0%',
    padding: 0,
  },
  contestImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  listContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  pageButton: {
    width: 200,
    height: 56,
    borderRadius: 0,
    margin: 20,
    fontSize: 16,
    backgroundColor: 'black',
    fontWeight: 'bold',
    '&:hover': { color: 'black', backgroundColor: 'white' },
  },
}));

export default useStyles;
