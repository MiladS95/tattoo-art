import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    flex: 1,
  },
  tabContainer: {
    width: '25%',
    height: '100vh',
    display: 'flex',
  },
  tabDisplay: {
    height: '60%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: '50px',
  },
  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'end',
      fontSize: '16px',
      padding: '20px',
      color: 'grey',
    },
    '& .PrivateTabIndicator-colorSecondary-210': {
      backgroundColor: 'white',
    },
    '& .PrivateTabIndicator-colorSecondary-207': {
      backgroundColor: 'white',
    },
    '& .PrivateTabIndicator-colorSecondary-208': {
      backgroundColor: 'white',
    },
  },
  profileImageContainer: {
    height: '50vh',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    margin: '20px',
  },
  submit: {
    color: 'white',
    width: 200,
    height: 56,
    borderRadius: 0,
    marginTop: '20px',
    fontSize: 16,
    backgroundColor: 'black',
    fontWeight: 'bold',
    '&:hover': { color: 'black', backgroundColor: 'white' },
  },
}));

export default useStyles;
